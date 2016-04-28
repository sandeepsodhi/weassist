<?php
  
header('Content-Type:application/json');
session_start();
    require_once '../../model/dbConnect.php';
    $email=$_REQUEST['to'];
//$pwd='sodhi';
    $query="select u_name from users  where u_name='$email'";
$res = mysqli_query($conn, $query);

$r1=mysqli_fetch_assoc($res);
//header("Location:index.php");
if($r1['u_name'])
{	
   // $query="update users  set pswd='$npwd' where u_name='$uname'";
  //  $res = mysqli_query($conn, $query);
//    $_SESSION['pwdchange']='true';
	echo '1';
}
else
	echo '0';
?>