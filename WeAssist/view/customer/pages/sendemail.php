<?php
require 'sendgrid-php/vendor/autoload.php';
session_start();

$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();

/*$email->addTo("shuvam.jha007@gmail.com")
      ->setFrom("shuviru219@gmail.com")
      ->setSubject("Sucessfully Created job  "."  " . $jobtitle)
      ->setHtml($mytemp);
*/

//$from = $_REQUEST['from'];
$to = $_REQUEST['to'];
$subject = $_REQUEST['subjectt'];
$message = $_REQUEST['messagee'];

$email->addTo($to)
      ->setFrom($_SESSION['u_name'])
      ->setSubject($subject)
      ->setHtml($message);
                      
$sendgrid->send($email);
?>