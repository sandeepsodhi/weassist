<?php
    session_start();
	require_once '../../../model/dbConnect.php';
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$email = mysqli_escape_string($conn,$_POST["email"]);

	$city = mysqli_escape_string($conn,$_POST["city"]);
   if($city)
   {
   	$state=mysqli_escape_string($conn,$_POST["State"]);
	$country=mysqli_escape_string($conn,$_POST["Country"]);
   }
   else 
   {
   	$city=$_SESSION['city'];
   	$state=$_SESSION['state'];
   	$country=$_SESSION['country'];
   }
	$phone = mysqli_escape_string($conn,$_POST["phone"]);
	
    $uname=$_SESSION['u_name'];
//    $_SESSION['email']="";
	//$name = mysqli_escape_string($conn,$_FILES['image']['name']);
//$login = mysqli_query($conn,"call updatedetails('".$u_name."','".$pswd."')");	

	//$name = mysqli_escape_string($conn,$_POST['image']);
  //    $sql=mysqli_query($conn,"update users set city='$city',state='$state' where u_name='$uname'");
	if(!empty($_FILES['image']) || $_FILES['image']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['image']['name']);
		$type = $_FILES['image']['type'];
		$error = $_FILES['image']['error'];
		$size = $_FILES['image']['size'];
		$temp = $_FILES['image']['tmp_name'];
	if($error > 0)
		{
		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				    if($name)
					{	move_uploaded_file($temp,"image/".$name);	
		
            $sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country',profile_pic='$name' 
                where u_name='$uname' " );
                 $_SESSION['profile_pic']=$name;
    			}
    			else 
    			{
    				$sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country' 
                where u_name='$uname' " );
	
    			}
			}
		
		}
		        //working
				$sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country' 
                where u_name='$uname' " );

	}
	else
	{   $sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country' 
                where u_name='$uname' " );
	
	
	}
		
		//echo "updated";	
//echo $name;	
//echo $_FILES['image']; 
$_SESSION['f_name']=$f_name;
$_SESSION['l_name']=$l_name;
$_SESSION['u_name']=$email;	
$_SESSION['contact']=$phone;	

$_SESSION['city']=$city;	
$_SESSION['state']=$state;
$_SESSION['country']=$country;
?>