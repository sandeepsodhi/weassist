<?php
  
header('Content-Type:application/json');
session_start();
    require_once '../../../model/dbConnect.php';
$pwd=$_REQUEST['pw'];
$npwd=$_REQUEST['npw'];
//$pwd='sodhi';
$uname=$_SESSION['u_name'];
    $query="select f_name from users  where pswd='$pwd' AND u_name='$uname'";
$res = mysqli_query($conn, $query);

$r1=mysqli_fetch_assoc($res);
//header("Location:index.php");
if($r1['f_name'])
{	
    $query="update users  set pswd='$npwd' where u_name='$uname'";
    $res = mysqli_query($conn, $query);
//    $_SESSION['pwdchange']='true';
	echo '1';
}
else
	echo '0';
?>