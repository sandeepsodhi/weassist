<?php
	session_start();
	
	require_once '../model/dbConnect.php';
 
	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	// $pswd = mysqli_escape_string($conn,$_POST["pswd"]);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	// $contact = mysqli_escape_string($conn,$_POST["contact"]);
	$u_type = 'worker';
	$r_code = 'NULL';
	
	$chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";//length:36
	$worker_pswd = '';
	for($i=0;$i<8; $i++)
	{
		$worker_pswd .= $chars[rand(0,strlen($chars)-1)];
	}


	$res = mysqli_fetch_assoc(mysqli_query($conn,"select r_code from users where u_name='".$_SESSION['u_name']."'"));
	$r_user = $res['r_code'];
	
	$profile_pic = "NewCandidateImage.jpg";

	$in_ch=mysqli_query($conn,"call worker('".$f_name."','".$l_name."','".$u_name."','".$worker_pswd."','".$u_type."','".$profile_pic."','".$r_code."','".$r_user."')"); 

	if($in_ch)
	{
		$_SESSION['registered'] = "success";		

		$u_name_agent = $_SESSION['u_name'];

		// sending email to newly registered user
		
		require '../view/agent/pages/sendgrid-php/vendor/autoload.php';

		$mytemp=fopen("../view/agent/pages/worker_add.php","r+") ;

		$mytemp=fread($mytemp,filesize("../view/agent/pages/worker_add.php"));
		$mytemp= str_replace("{{fname}}",ucfirst($f_name." ".$l_name),$mytemp);
		$mytemp= str_replace("{{agentname}}",$u_name_agent,$mytemp);
		$mytemp= str_replace("{{username}}",$u_name,$mytemp);
		$mytemp= str_replace("{{password}}",$worker_pswd,$mytemp);

		$sendgrid = new SendGrid("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");
		$email    = new SendGrid\Email();
		//print_r($mytemp);
		$email->addTo($u_name)
		      ->setFrom("support-no-reply@weassist.com")
		      ->setSubject("Congrats!!! Your Account has been successfully created  ")
		      ->setHtml($mytemp);

		$sendgrid->send($email);

	
		header('location: ../view/agent/pages/worker_reg.php');
	}
	else 
	{ 
		$_SESSION['registered'] = "failed";	
		header('location:../view/agent/pages/worker_reg.php');
	}
?>