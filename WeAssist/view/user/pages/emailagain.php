<?php

require 'sendgrid-php/vendor/autoload.php';
$mytempp=fopen("jobcreated.php","r") ;
//$mytemp= file_get_contents("jobcreated.php");
$mytemp=fread($mytempp,filesize("jobcreated.php"));
//$mytemp= " " .$mytempp ;
$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();
$jobcateg=$_SESSION['jobcategory'];
$_SESSION['jobcat']=$jobcateg;
$_SESSION['subcat']=$subcateg;
$_SESSION['jobti']=$jobtitle;
$_SESSION['jobdes']=$jobdesc;
$_SESSION['jobph']=$name;


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
                       
$sendgrid->send($email);
?>