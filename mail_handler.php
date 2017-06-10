<?php
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "vipranarayan14@gmail.com";
    $email_subject = "TKS Website Visitor";
 
    function died($error) {
        // your error code can go here
        echo "<p>We are very sorry, but there were some error(s) found with the form you submitted.</p>";
        echo "<p>These errors appear below.</p> <ul>";
        echo "<li>".$error."</li>";
        echo "</ul> <p>Please go back and fix these errors.<p> <br><br>";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['full_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
     
 
    $full_name = $_POST['full_name']; // required
    $email_from = $_POST['email']; // required
    $message = $_POST['message']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered does not appear to be valid.';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$full_name)) {
    $error_message .= 'The Name you entered does not appear to be valid.';
  }
 
  if(strlen($message) < 2) {
    $error_message .= 'The Message you entered do not appear to be valid.';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "Name: ".clean_string($full_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 
<p><center>Thank you for contacting us. We will be in touch with you very soon.</center></p>
 
<?php
 
}
?>