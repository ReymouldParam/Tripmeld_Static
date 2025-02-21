<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $secretKey = "6LdCO94qAAAAAFbFtmcUcHKD_bDljiIumHTNLU_T"; // Replace with your actual secret key
    $captchaResponse = $_POST["g-recaptcha-response"];

    // Verify reCAPTCHA with Google
    $verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captchaResponse";
    $response = file_get_contents($verifyURL);
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        header("Location: .?emailSuccess=false&captchaFailed=true");
        exit;
    }

    // Proceed with email sending
    $to = "contact@tripmeld.com";
    $subject = "Enquiry From Tripmeld Website";
    $message = "Name : " . $_POST["fullName"].
                "\nEmail : " . $_POST["email"].
                "\nPhone number : " . $_POST["phone"].
                "\nCompany Name : " . $_POST["companyName"].
                "\nCompany size : " . $_POST["companySize"];

    mail('contact@reymould.com', $subject, $message);
    mail('reymould.social@gmail.com', $subject, $message);

    if (mail($to, $subject, $message)) {
        header("Location: .?emailSuccess=true");
    } else {
        header("Location: .?emailSuccess=false");
    }
    exit;
}
?>
