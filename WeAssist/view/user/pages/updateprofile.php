<?php
    session_start();
	require_once '../../../model/dbConnect.php';
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$email = mysqli_escape_string($conn,$_POST["email"]);
	$city = mysqli_escape_string($conn,$_POST["city"]);
	$phone = mysqli_escape_string($conn,$_POST["phone"]);
	$state=mysqli_escape_string($conn,$_POST["State"]);
	$country=mysqli_escape_string($conn,$_POST["Country"]);
    $uname=$_SESSION['email'];
    $_SESSION['email']="";
	//$name = mysqli_escape_string($conn,$_FILES['image']['name']);
	
	//$name = mysqli_escape_string($conn,$_POST['image']);
	if(!empty($_FILES['image']) || $_FILES['image']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['image']['name']);
		$type = $_FILES['image']['type'];
		$error = $_FILES['image']['error'];
		$size = $_FILES['image']['size'];
		$temp = $_FILES['image']['tmp_name'];


		if($error > 0)
		{
		$res = $conn->prepare("call updatedetails(?,?,?,?,?,?)");
    $res->bind_param("sssdssss",$f_name,$l_name,$email,$phone,$city,$uname,$state,$country);
    $res->execute();	

		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
				    if($name)
						move_uploaded_file($temp,"image/".$name);	
 $res = $conn->prepare("call updatedetail(?,?,?,?,?,?,?)");
    $res->bind_param("sssdsssss",$f_name,$l_name,$email,$phone,$city,$uname,$name,$state,$country);
    $res->execute();	

					
			}
		}
	}
	else
		echo "else";
	
			
//echo $name;	
//echo $_FILES['image']; 
$_SESSION['f_name']=$f_name;
$_SESSION['l_name']=$l_name;
$_SESSION['email']=$email;	
	
?>