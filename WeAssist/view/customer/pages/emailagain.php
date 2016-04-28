
<?php
//session_start();
require 'sendgrid-php/vendor/autoload.php';
$jobcateg=$_SESSION['jobcategory'];
$_SESSION['jobcat']=$jobcateg;
$_SESSION['subcat']=$subcateg;
$_SESSION['jobti']=$jobtitle;
$_SESSION['jobdes']=$jobdesc;
$_SESSION['jobph']=$name;
 //$timezone = $_SESSION['time'];
//echo $_SESSION['f_name'] . " " . $_SESSION['l_name'];

$mytemp=fopen("jobcreated.php","r+") ;
//$mytemp= file_get_contents("jobcreated.php");
 //$date = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
date_default_timezone_set('Asia/Kolkata');
  $time=date("l") . ", " . date("d-M-Y") . " " .date("h:i:sa") ;
  //echo $time;
   //echo date_default_timezone_get();

$mytemp=fread($mytemp,filesize("jobcreated.php"));
$mytemp= str_replace("{{fname}}",ucfirst($_SESSION['f_name']),$mytemp);
$mytemp= str_replace("{{lname}}",ucfirst($_SESSION['l_name']),$mytemp);
$mytemp= str_replace("{{jobcat}}",ucfirst($_SESSION['jobcat']),$mytemp);
$mytemp= str_replace("{{subcat}}",ucfirst($_SESSION['subcat']),$mytemp);
$mytemp=str_replace("{{jobdesc}}",ucfirst($_SESSION['jobdes']),$mytemp);
$mytemp=str_replace("{{date}}",$time,$mytemp);
$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();
//print_r($mytemp);
$email->addTo("shuvam.jha007@gmail.com")
      ->setFrom("support@weassist.esy.es")
      ->setSubject("Sucessfully Created job  "."  " . $jobtitle)
      ->setHtml($mytemp);

                      
$sendgrid->send($email);
?>