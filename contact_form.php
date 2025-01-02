<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "contact@tripmeld.com";
    $subject = "Enquiry From Tripmeld Website";
    $message = "Name : " . $_POST["fullName"].
                "\nEmail : " . $_POST["email"].
                "\nPhone number : " . $_POST["phone"].
                "\nCompany Name : " . $_POST["companyName"].
                "\Company size : " . $_POST["companySize"];


    mail('contact@reymould.com', $subject, $message);
    mail('reymould.social@gmail.com', $subject, $message);
    if(mail($to, $subject, $message)){
        header("Location: .?emailSuccess=true");
    }else{
        header("Location: .?emailSuccess=false");
    }
    exit;
}
?>