<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Collect and sanitize form data
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));
    $role = htmlspecialchars(trim($_POST['role'] ?? ''));
    $business = htmlspecialchars(trim($_POST['business'] ?? ''));

    // Get selected solutions
    $solutions = "";
    if (isset($_POST['solution']) && is_array($_POST['solution'])) {
        $solutions = implode(", ", $_POST['solution']);
    }

    // Set email recipient
    $to = "contact@tripmeld.com";
    $subject = "Pricing Request from TripMeld Website";

    // Email body
    $body = "Full Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone Number: $phone\n";
    $body .= "Company Name: $company\n";
    $body .= "Role: $role\n";
    $body .= "Solutions Interested In: $solutions\n\n";
    $body .= "Business Details:\n$business";

    // Send email
    $mailStatus = mail($to, $subject, $body);

    // Redirect based on success or failure
    if ($mailStatus) {
        header("Location: pricing.html?emailSuccess=true");
    } else {
        header("Location: pricing.html?emailSuccess=false");
    }

    exit;
}
?>