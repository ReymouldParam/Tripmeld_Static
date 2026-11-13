<?php

header('Content-Type: application/json; charset=utf-8');

function respond($statusCode, $success, $message)
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed.');
}

$requestBody = file_get_contents('php://input');
$input = json_decode($requestBody, true);

if (!is_array($input)) {
    respond(400, false, 'Invalid request data.');
}

$requiredFields = ['fullName', 'email', 'phone', 'company'];
foreach ($requiredFields as $field) {
    if (!isset($input[$field]) || !is_string($input[$field]) || trim($input[$field]) === '') {
        respond(400, false, 'Please complete all required fields.');
    }
}

$explore = isset($input['explore']) && is_array($input['explore'])
    ? $input['explore']
    : [];

if (count($explore) === 0) {
    respond(400, false, 'Please select at least one option.');
}

$data = [
    'name' => trim($input['fullName']),
    'email' => trim($input['email']),
    'number' => trim($input['phone']),
    'organization' => trim($input['company']),
    'company_size' => '',
    'serviceTpe' => implode(', ', array_map('strval', $explore)),
    'dropMessage' => isset($input['message']) && is_string($input['message'])
        ? trim($input['message'])
        : ''
];

$jsonData = json_encode($data);
if ($jsonData === false) {
    error_log('Contact form: failed to encode API request: ' . json_last_error_msg());
    respond(500, false, 'Unable to process your request right now.');
}

$url = 'https://script.google.com/macros/s/AKfycbwgZIUfDs0a638nOHGEXV5mUg99jxl5BKaWoc_e9aS0SDugwCIgG2WB7A2gNs4LAsgnGw/exec';
$ch = curl_init($url);

if ($ch === false) {
    error_log('Contact form: cURL initialization failed.');
    respond(500, false, 'Unable to submit your request right now.');
}

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $jsonData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$curlError = curl_error($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    error_log('Contact form: API request failed: ' . $curlError);
    respond(502, false, 'We could not submit your request. Please try again.');
}

if ($httpStatus < 200 || $httpStatus >= 300) {
    error_log('Contact form: API returned HTTP status ' . $httpStatus . '.');
    respond(502, false, 'We could not submit your request. Please try again.');
}

$apiResult = json_decode($response, true);
if (is_array($apiResult) && isset($apiResult['success']) && $apiResult['success'] === false) {
    error_log('Contact form: API reported an unsuccessful submission.');
    respond(502, false, 'We could not submit your request. Please try again.');
}

respond(200, true, 'Your enquiry has been successfully submitted.');
?>
