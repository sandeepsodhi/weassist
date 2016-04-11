<?php

	require_once '../model/dbConnect.php';
	session_start();

	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	$pswd = mysqli_escape_string($conn,$_POST["pswdd"]);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$u_type= mysqli_escape_string($conn,$_POST["u_type"]);
	$r_user= mysqli_escape_string($conn,$_POST["r_user"]);
	
	
	$result = mysqli_query($conn,"select u_name from users");

	while($row = mysqli_fetch_assoc($result))
	{
	    if($row['u_name'] ==  $u_name){
	      $_SESSION['error'] = 'e';      
	      header("location:../view/main/index.php");
		  break;
		}
	}

	// echo $_SESSION['error'];
	// echo "<script>alert(".$_SESSION['wrong'].")</script>";

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
	
$in_ch=mysqli_query($conn,"call register('".$f_name."','".$l_name."','".$u_name."','".$pswd."','".$u_type."','".$r_code."','".$r_user."','NewCandidateImage.jpg')"); 

if($in_ch==1)  
{  
  
    $_SESSION['u_name']=$u_name;
    $_SESSION['f_name']=$f_name;
    $_SESSION['l_name']=$l_name;
    $_SESSION['u_type'] = $u_type;
 	



 	$pic = mysqli_fetch_row(mysqli_query($conn,"select u_id,profile_pic from users where u_name = '$u_name'"));



 	$_SESSION['profile_pic'] = $pic[0];

	if($_SESSION['u_type']=="agent")     
	{	
		header("location:../view/agent/pages/profile.php");
	}
	elseif($_SESSION['u_type']=="worker") 
 		header("location:../view/worker/pages/profile.php");
    elseif($_SESSION['u_type']=="Customer") 	
       header("location:../view/customer/pages/profile.php");         

 //  header("location:../view/main/index.php");
}  
else  
{  
 $_SESSION['error'] = 'e';
 header("location:../view/main/index.php");
}
?>
