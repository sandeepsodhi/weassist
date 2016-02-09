


<?php

	require_once '../model/dbConnect.php';


	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);

	$pswd = mysqli_escape_string($conn,$_POST["pswd"]);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$u_type= mysqli_escape_string($conn,$_POST["u_type"]);
	$r_user= mysqli_escape_string($conn,$_POST["r_user"]);
	if(isset($r_user))
	{
	if(isset($u_type) && $u_type == 'worker')
	{
		$checked = 'checked';
		$value ='worker' ;
		$r_code='NULL';

	}
	}

		
function gen_random_string($length=16)
						{
							$chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";//length:36
							$r_code='';
							for($i=0;$i<$length; $i++)
							{
								$r_code .= $chars[ rand(0,strlen($chars)-1)];

							}

							return $r_code;

						}
						

	if(isset($u_type) && $u_type == 'agent')
	{
		$checked = 'checked';
		$value ='agent' ;
		$r_code = gen_random_string(8)."";
		$r_user='NULL';
		gen_random_string(8)."r_code"; //generates a string with length 8


	}
	
	if(isset($u_type) && $u_type == 'customer')
	{
		$checked = 'checked';
		$value ='customer' ;
		$r_user='NULL';
		$r_code='NULL';


	}
	
	if(isset($u_type) && $u_type == 'worker')
	{
		$checked = 'checked';
		$value ='worker' ;
		$r_code='NULL';

	}
	
		$in_ch=mysqli_query($conn,"call agent('".$f_name."','".$l_name."','".$u_name."','".$pswd."','".$u_type."','".$r_code."','".$r_user."')"); 




	if($in_ch==1)  
	   {  
		  echo'<script>alert("Inserted Successfully")</script>';  
	  header("location:../view/main/index.php");

	   }  
	else  
	   {  
		  echo'<script>alert("Failed To Insert")</script>';  
	   }
	?>
	