<?php

  require_once '../model/dbConnect.php';
  
  session_start();
  
  $u_name = mysqli_real_escape_string($conn,$_POST['username']);
  $pswd = mysqli_real_escape_string($conn,$_POST['password']);

  $login = mysqli_query($conn,"call login_admin('$u_name','$pswd')");
  // $login->bind_param("ss",$u_name,$pswd);
  // $login->execute();
  // $login->store_result();
  //$login->bind_param("ss",$u_name,$pswd);
  // $lo = mysqli_fetch_assoc($login); 
   


  if (mysqli_num_rows($login) == 1) 
  {
      $_SESSION['u_name']=$_POST['username'];
      $_SESSION['u_id'] = '1';
     header("location:../view/admin/pages/index.php");
  }
  else
  {
    echo $_SESSION['wrong'] = 'r';
   header("location:../view/admin/");
  } 
?>

