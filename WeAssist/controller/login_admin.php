<?php

    require_once '../model/dbConnect.php';  //this is used to call once data.
	
	session_start();
	
    $u_name = mysqli_real_escape_string($conn,$_POST['username']);
    $pswd = mysqli_real_escape_string($conn,$_POST['password']);

  $login  = $conn->prepare("call login_admin(?,?)");
  $login->bind_param("ss",$u_name,$pswd);
	$login->execute();
  $login->store_result();
  if ($login->num_rows)
    {
      	$_SESSION['u_name']=$_POST['username'];
        $_SESSION['u_id'] = '1';
        header("location:../view/admin/pages/index.php");
      } else {
    $_SESSION['wrong'] = 'r';
		header("location:../view/main/index.php");
   } 
?>

