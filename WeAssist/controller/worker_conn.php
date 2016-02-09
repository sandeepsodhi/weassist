<!DOCTYPE html>

<html>
<body>

<?php
session_start();


	require_once '../model/dbConnect.php';
 //include('login.php'); 
 
	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	$pswd = mysqli_escape_string($conn,$_POST["pswd"]);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$contact = mysqli_escape_string($conn,$_POST["contact"]);
	$u_type = 'worker';
	$r_code = 'NULL';
	$res = mysqli_fetch_assoc(mysqli_query($conn,"select r_code from users where u_name='".$_SESSION['username']."'"));
	echo "select r_code from users where u_name='".$_SESSION['username']."'";
	$r_user = $res['r_code'];
	


	if(!empty($_FILES['image']) && $_FILES['image']['size']>0)
	{
			$name=$_FILES['image']['name'];
			$type = $_FILES['image']['type'];
			$error = $_FILES['image']['error'];
			$size = $_FILES['image']['size'];
			$temp = $_FILES['image']['tmp_name'];


			if($error > 0)
			{
				die("ERROR uploading file! Code $error");
			}
			else
			{
				if($size > 10000000)
					echo "Format not allowed or file size is too big!";
				elseif(substr($type,0,5)=='image') 
					{
					$in_ch=mysqli_query($conn,"call worker('".$f_name."','".$l_name."','".$u_name."','".$pswd."','".$contact."','".$u_type."','".$name."','".$r_code."','".$r_user."')"); 
					move_uploaded_file($temp,"image/".$name);	

					}		
			}
	}
	else{
		$in_ch=mysqli_query($conn,"/call worker('".$f_name."','".$l_name."','".$u_name."','".$pswd."','".$contact."','".$u_type."','".$name."','".$r_code."','".$r_user."')"); 
	}


	if($in_ch)
	{
		header('location: ../view/user/pages/index.php');
	}
	else 
	{ 
		echo mysqli_error($conn);
	}
	?>
</body>
</html>