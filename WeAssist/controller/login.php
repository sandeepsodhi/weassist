<?php

  require_once '../model/dbConnect.php';  //this is used to call once data.
	
	session_start(); 
	
  $u_name = mysqli_real_escape_string($conn,$_POST['u_name']);
  if (!filter_var($u_name, FILTER_VALIDATE_EMAIL)) {
    $emailErr = "Invalid email format";
  }
  
  $pswd = mysqli_real_escape_string($conn,$_POST['pswd']);
	
  //$login  = $conn->prepare("call login('$u_name','$pswd')");
    
	$login = mysqli_query($conn,"call login('$u_name','$pswd')");
	//$login->bind_param("ss",$u_name,$pswd);
	$lo = mysqli_fetch_assoc($login);	
	 
    if (mysqli_num_rows($login) == 1) {
		
      $_SESSION['u_name']=$_POST['u_name'];
      $_SESSION['f_name']=$lo['f_name'];
      $_SESSION['l_name']=$lo['l_name'];
      $_SESSION['contact']=$lo['contact'];
      $_SESSION['city']=$lo['city'];
      $_SESSION['profile_pic']=$lo['profile_pic'];
      $_SESSION['u_type'] = $lo['u_type'];
      $_SESSION['u_id']=$lo['u_id'];
  
      if($_SESSION['u_type']=="worker")     
	      header("location:../view/worker/pages/index.php");
      elseif($_SESSION['u_type']=="agent") 
        header("location:../view/agent/pages/index.php");
      elseif($_SESSION['u_type']=="customer")
        header("location:../view/customer/pages/index.php");
      else
        header("location:../view/main/index.php");
    }else{
      $_SESSION['wrong'] = 'r';      
      header("location:../view/main/index.php");
   }
?>

