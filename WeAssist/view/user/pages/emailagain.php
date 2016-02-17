<?php
require 'sendgrid-php/vendor/autoload.php';
$sendgrid = new SendGrid("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");
$email    = new SendGrid\Email();
$jobcateg=$_SESSION['jobcategory'];
$email->addTo("shuvam.jha007@gmail.com")
      ->setFrom("sumanjeet46@gmail.com")
      ->setSubject("Sucessfully Created job  "."  " . $jobtitle)
      ->setHtml("  Job Description :  " ."  " . $jobdesc    .  
      	        "  Job Title       :  " ."  ". $jobtitle    . 
                "  Job Category    :  " ."  ".  $jobcateg .
                "  Sub Category    :  " ."  ". $subcateg    
                );

$sendgrid->send($email);
?>