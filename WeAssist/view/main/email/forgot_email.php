
<?php
//session_start();
require 'sendgrid-php/vendor/autoload.php';


$mytemp=fopen("forgot.php","r+") ;

$mytemp=fread($mytemp,filesize("forgot.php"));

$to = $_REQUEST['to'];

// $mytemp= str_replace("{{fname}}",ucfirst($custnames),$mytemp);
// $mytemp= str_replace("{{agentname}}",ucfirst($workernames),$mytemp);
$mytemp= str_replace("{{u_namee}}",$to,$mytemp);
// $mytemp= str_replace("{{password}}",ucfirst($workernames),$mytemp);


//echo $to;

$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();

$email->addTo($to)
      ->setFrom("support@weassist.esy.es")
      ->setSubject("Password change request")
      ->setHtml($mytemp);

$sendgrid->send($email)
?>