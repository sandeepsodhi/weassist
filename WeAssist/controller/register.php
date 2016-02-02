<?php

	require_once '../model/dbConnect.php';

	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	$pswd = mysqli_escape_string($conn,$_POST["pswd"]);//
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	//$city = mysqli_escape_string($_POST["city"]);
	$contact = mysqli_escape_string($conn,$_POST["contact"]);

	
	/*
	$result = $conn->prepare("call already_register()");
    $result->bind_param("ssssd",$u_name,$f_name,$l_name,$pswd,$contact);
    $result->execute();
	*/
	$c = 0;

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
    

	if($c == 0)
	{
	//$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,contact) values (?,?,?,?,?)");
    $result = $conn->prepare("call insdata(?,?,?,?,?)");
    $result->bind_param("ssssd",$u_name,$f_name,$l_name,$pswd,$contact);
    $result->execute();

	    if($result)
		{
		    echo '<br>'.'Account Created Sunccessfully';
			//header('location:../view/handy/index.php');
		}
	    else 
		{ 
			echo mysqli_error($conn);
		}
	}
?>