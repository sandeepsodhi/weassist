<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
</head>
<?php

	require_once '../model/dbConnect.php';

	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	$pswd = mysqli_escape_string($conn,$_POST["pswd"]);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);

$u_type=$_POST["u_type"];

	//$city = mysqli_escape_string($_POST["city"]);
//   	$contact = mysqli_escape_string($conn,$_POST["contact"]);
     
	
	/*
	$result = $conn->prepare("call already_register()");
    $result->bind_param("ssssd",$u_name,$f_name,$l_name,$pswd,$contact);
    $result->execute();
	*/
	$c = 0;   //counter for checking existing user emailid

<<<<<<< HEAD
	$qa = mysqli_query($conn,"select u_name from users");
	while($rs=mysqli_fetch_assoc($qa))
	{
		if($rs['u_name']==$u_name)
		{
			echo "Email is already registered with us ";
			echo "<body><script>alert('already_registered');</script></body>";
			$c = 1;
		//	header("location:../view/handy/");
		}
	}
=======
	//$qa = mysqli_query($conn,"select u_name from users");
	//while($rs=mysqli_fetch_assoc($qa))
	//{

//if($rs['u_name']==$u_name)
	//	{
		//	echo "Email is already registered with us ";
	//	echo "<script>alert('already_registered');</script>";
			$c = 1;
		//	header("location:../view/handy/");
		//echo "<script>$(document).ready(function(){  $(document).ajaxSuccess(function(){ alert("AJAX request successfully completed"); });}); </script>";
/*echo "
<script type='text/javascript'>
    alert('The email address  is already registered.');
    history.back();
  </script>		";*/
/*		echo "<script>
$(document).ready(function(){
    $(document).ajaxSuccess(function(){
        alert('AJAX request successfully completed');
    });
    });
</script>
"	;	
	*/	
		//}
	//}
>>>>>>> 897d5244ea11e8a959cd604eeb8f267bb29ffc8d


   /*
    while($rs = mysqli_fetch_assoc(mysqli_query($conn,"select u_name from users")))
    {

    }
		}
*	/




/*	if(!empty($_FILES['image']) && $_FILES['image']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['image']['name']);
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
			elseif (substr($type,0,5)=='image') {
				//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
				$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values (?,?,?,?,?,?,?)");
                                $result->bind_param("sssssds",$u_name,$pswd,$f_name, $l_name, $email,$contact,$name);
                                $result->execute();
                    if($result)
						move_uploaded_file($temp,"image/".$name);			
			}
		}
	}
	else
	{	*/
    


//$u_type=$_POST['u_type'];
		if(isset($u_type) )
			{
		$checked = 'checked';
	  $u_type ='agent' ;
	  }
		else
		{
		$checked = false;
		$u_type = 'customer';
		}
	if($c == 1)
	{
	//$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,contact) values (?,?,?,?,?)");
    $result = $conn->prepare("call insdata(?,?,?,?,?)");
    $result->bind_param("ssssd",$u_name,$f_name,$l_name,$pswd,$u_type);
    $result->execute();

	    if($result)
		{
		    echo '<br>'.'Account Created Sunccessfully';
			
		}
	    else 
		{ 
			echo mysqli_error($conn);
		}
	}
?>
</body>
</html>