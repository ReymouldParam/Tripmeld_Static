<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "contact@reymodul.com";
    $subject = "Enquiry From Tripmeld Website";
    $message = "Name : " . $_POST["fullName"].
                "\nEmail : " . $_POST["email"].
                "\nPhone number : " . $_POST["phone"].
                "\nCompany Name : " . $_POST["companyName"].
                "\Company size : " . $_POST["companySize"];

    
    if(mail($to, $subject, $message)){
        header("Location: .?emailSuccess=true");
    }else{
        header("Location: .?emailSuccess=false");
    }
    exit;
}
?>