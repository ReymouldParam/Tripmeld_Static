<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $number = htmlspecialchars(trim($_POST['number'] ?? ''));
    $organization = htmlspecialchars(trim($_POST['organization'] ?? ''));
    $companySize = htmlspecialchars(trim($_POST['company_size'] ?? ''));
    $dropMessage = htmlspecialchars(trim($_POST['dropMessage'] ?? ''));

    // Set email recipients
    $to = "contact@tripmeld.com";
    $subject = "Enquiry from Tripmeld Website";
    $body = "Name: $name\nEmail: $email\nNumber: $number\nOrganization: $organization\nCompany Size: $companySize\nMessage:\n$dropMessage";

    // Send email (no headers)
    $mailStatus = mail($to, $subject, $body);

    // Redirect based on success or failure
    if ($mailStatus) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>