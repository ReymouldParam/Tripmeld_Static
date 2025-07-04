<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $apiUrl = 'tripmeldcrm-stg-commonnotifications.azurewebsites.net/api/SendEmail';
    
    $postData = [
        "name" => $_POST["fullName"],
        "email" => $_POST["email"],
        "phone" => $_POST["phone"],
        "message" => "Following are company details: <br>"
                    . "Company Name: " . $_POST["companyName"] . "<br>"
                    . "Company Size: " . $_POST["companySize"]
    ];
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode == 200) {
        header("Location: .?emailSuccess=true");
    } else {
        header("Location: .?emailSuccess=false");
    }
    exit;
}
?>
