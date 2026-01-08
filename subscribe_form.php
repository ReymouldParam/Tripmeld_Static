<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize form data
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));

    // Set email recipients
    $to = "contact@tripmeld.com";
    $subject = "Subscription For Tripmeld from Tripmeld Website";
    $body = "Following person has subsribed to Tripmeld.\nEmail : " . $_POST["email"];

    // Send email (no headers)
    $mailStatus = mail($to, $subject, $body);

    // Redirect based on success or failure
    if ($mailStatus) {
        header("Location: .?emailSuccess=subscribeTrue");
    }else{
        header("Location: .?emailSuccess=subscribeFalse");
    }
    exit;
}
?>