<?php

    require_once '../model/dbConnect.php';  //this is used to call once data.
	
	session_start();
	
    $u_name = mysqli_real_escape_string($conn,$_POST['u_name']);
if (!filter_var($u_name, FILTER_VALIDATE_EMAIL)) {
  $emailErr = "Invalid email format";
}
    echo "<br>";
    $pswd = mysqli_real_escape_string($conn,$_POST['pswd']);
	
    //$login  = $conn->prepare("call login('$u_name','$pswd')");
    
	$login = mysqli_query($conn,"call login('$u_name','$pswd')");
	//$login->bind_param("ss",$u_name,$pswd);
	$lo = mysqli_fetch_assoc($login);	
	 
    if (mysqli_num_rows($login) == 1) {
		
          $_SESSION['u_name']=$_POST['u_name'];
		      $_SESSION['f_name']=$lo['f_name'];
	        $_SESSION['l_name']=$lo['l_name'];
	        $_SESSION['f_name']=$lo['f_name'];
          $_SESSION['l_name']=$lo['l_name'];
          $_SESSION['contact']=$lo['contact'];
          $_SESSION['city']=$lo['city'];
          $_SESSION['profile_pic']=$lo['profile_pic'];
          $_SESSION['u_type'] = $lo['u_type'];

    
     
	   header("location:../view/user/pages/index.php");
           
    } else {
        echo "<body onload='alert(\"LOGIN FAILED !!! TRY AGAIN WITH CORRECT CREDENTIAL\");'></body> ";
		header("location:../view/main/index.php");
   } 
?>

