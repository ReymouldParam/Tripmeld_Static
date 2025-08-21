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
    $subject = "Enquiry from Website";
    $body = "Name: $name\nEmail: $email\nNumber: $number\nOrganization: $organization\nCompany Size: $companySize\nMessage:\n$dropMessage";

    // Headers for better email formatting
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email to primary recipient
    $mailStatus = mail($to, $subject, $body, $headers);

    // Redirect based on success or failure
    if ($mailStatus) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>