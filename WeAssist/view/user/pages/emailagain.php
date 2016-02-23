
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
date_default_timezone_set("Asia/Calcutta");
  $time=date("l") . " , " . date("Y/m/d") . " " .date("h:i:sa") ;
  //echo $time;
   //echo date_default_timezone_get();

$mytemp=fread($mytemp,filesize("jobcreated.php"));
$mytemp= str_replace("{{fname}}",$_SESSION['f_name'],$mytemp);
$mytemp= str_replace("{{lname}}",$_SESSION['l_name'],$mytemp);
$mytemp= str_replace("{{jobcat}}",$_SESSION['jobcat'],$mytemp);
$mytemp= str_replace("{{subcat}}",$_SESSION['subcat'],$mytemp);
$mytemp=str_replace("{{jobdesc}}",$_SESSION['jobdes'],$mytemp);
$mytemp=str_replace("{{date}}",$time,$mytemp);
//$mytemp= " " .$mytempp ;
$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();
//str_replace("{{fname}}",$_SESSION['jobcat'],$mytemp);
//str_replace("{{lname}}",$_SESSION['l_name'],$mytemp);
//str_replace("{{jobcat}}"," fhf ",$mytempp);
//str_replace("{{subcat}}",$_SESSION['subcat'],$mytemp);
//str_replace("{{jobdesc}}",$_SESSION['jobdes'],$mytempp);

//print_r($mytemp);
/*
$email->addTo("shuvam.jha007@gmail.com")
      ->setFrom("sumanjeet46@gmail.com")
      ->setSubject("Sucessfully Created job  "."  " . $jobtitle)
      ->setHtml("  Job Description :  " ."  " . $jobdesc    .  
      	        "  Job Title       :  " ."  ". $jobtitle    . 
                "  Job Category    :  " ."  ".  $jobcateg .
                "  Sub Category    :  " ."  ". $subcateg    
                );

*/
$email->addTo("shuvam.jha007@gmail.com")
      ->setFrom("sumanjeet46@gmail.com")
      ->setSubject("Sucessfully Created job  "."  " . $jobtitle)
      ->setHtml($mytemp);
                       
//$sendgrid->send($email);
?>