<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "contact@tripmeld.com";
    $subject = "Subscribsion From Tripmeld Website";
    $message = "Following person has subsribed to Tripmeld.\nEmail : " . $_POST["email"];

    mail('contact@reymould.com', $subject, $message);
    mail('reymould.social@gmail.com', $subject, $message);
    if(mail($to, $subject, $message)){
        header("Location: .?emailSuccess=subscribeTrue");
    }else{
        header("Location: .?emailSuccess=subscribeFalse");
    }

    exit;
}
?>