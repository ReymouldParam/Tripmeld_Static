<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $apiUrl = 'tripmeldcrm-stg-commonnotifications.azurewebsites.net/api/SendEmail';
    
    $postData = [
        "subject" => "Subscription from Tripmeld.com",
        "name" => "--",
        "email" => $_POST["email"],
        "phone" => "--",
        "message" => "Following person has subsribed to Tripmeld.\nEmail : " . $_POST["email"]
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
        header("Location: .?emailSuccess=subscribeTrue");
    }else{
        header("Location: .?emailSuccess=subscribeFalse");
    }
    exit;
}
?>
