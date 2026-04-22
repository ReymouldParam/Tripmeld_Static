<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $organization = $_POST['organization'];
    $company_size = $_POST['company_size'];
    $dropMessage = $_POST['dropMessage'];

    // Handle checkbox array
    $serviceTpe = isset($_POST['serviceTpe']) ? implode(", ", $_POST['serviceTpe']) : "";

    // Prepare data
    $data = [
        "name" => $name,
        "email" => $email,
        "number" => $number,
        "organization" => $organization,
        "company_size" => $company_size,
        "serviceTpe" => $serviceTpe,
        "dropMessage" => $dropMessage
    ];

    $jsonData = json_encode($data);

    // Google Apps Script URL
    $url = "https://script.google.com/macros/s/AKfycby_19bv7Va9eDHQrjdh-wxiOoxxQGy6jmzUaeb0Mntcrxwvzj7BIFkGNZt3QTCsKPM5/exec";

    // cURL request
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);

    if(curl_errno($ch)){
        header("Location: ./emailStatus=true");
    } else {
        header("Location: ./emailStatus-false");
    }

    curl_close($ch);
}
?>