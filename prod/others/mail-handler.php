<?php

require_once "recaptchalib.php";

// your secret key
$secret = "6LffLkgUAAAAAJa7iUCPWLatm8G0hjkw74drnyO0";
 
// empty response
$response = null;
 
// check secret key
$reCaptcha = new ReCaptcha($secret);

// if submitted check response
if ($_POST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}
 
if ($response != null && $response->success && isset($_POST['email'])) {
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to      = "vipranarayan14@gmail.com";
    $email_subject = "A Message from TKS Website visitor!";

    function died($error)
    {
        // your error code can go here
        echo "<p>We are very sorry, but there were some error(s) found with the form you submitted.</p>";
        echo "<p>These errors appear below.</p> <ul>";
        echo "<li>" . $error . "</li>";
        echo "</ul> <p>Please go back and fix these errors.<p>";
        echo "<button onclick='window.history.back()'>Go Back</button>";
        die();
    }

    // validation expected data exists
    if (!isset($_POST['full_name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $full_name  = $_POST['full_name']; // required
    $email_from = $_POST['email']; // required
    $message    = $_POST['message']; // required
    $error_message = "";
    $email_exp     = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    $string_exp = "/^[A-Za-z .'-]+$/";    

    if (!preg_match($email_exp, $email_from)) {
        $error_message .= 'The Email Address you entered does not appear to be valid.';
    }

    if (!preg_match($string_exp, $full_name)) {
        $error_message .= 'The Name you entered does not appear to be valid.';
    }

    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.';
    }

    if (strlen($error_message) > 0) {
        died($error_message);
    }

    $email_message = "<html><body>";
    $email_message .= "<h2>Message Details</h2><hr>";

    function clean_string($string)
    {
        $bad = array(
            "content-type",
            "bcc:",
            "to:",
            "cc:",
            "href"
        );
        return str_replace($bad, "", $string);
    }

    $email_message .= "<p><b>Name:</b> " . clean_string($full_name) . "</p>";
    $email_message .= "<p><b>Email:</b> " . clean_string($email_from) . "</p>";
    $email_message .= "<p><b>Message:</b> <br>" . clean_string($message) . "</p>";
    $email_message .= "</body></html>";
    // To send HTML mail, the Content-type header must be set
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    // create email headers
    $headers .= 'From: ' . $email_from . "\r\n" . 'Reply-To: ' . $email_from . "\r\n" . 'X-Mailer: PHP/' . phpversion();
    
    @mail($email_to, $email_subject, $email_message, $headers);
?>
<!-- Mail Sent Success Page -->
<p>
    <center>
        <h1>
            Thank you for contacting us. We will be in touch with you very soon.
        </h1>
        <br>
        <br>
        <button onclick="window.history.back()">Go Back</button>
    </center>
</p>
<?php
}
?>
