<?php 
include '../model/dbConnect.php';
session_start();

$u_name = $_POST['u_name'];
$pswd = $_POST['pswdd'];

mysqli_query($conn,"update users set pswd = '$pswd' where u_name = '$u_name'");
// echo "update user set pswd = '$pswd' where u_name = '$u_name'";

// $_SESSION['pwdchange'] =='true';
// 
header('location:../view/main/')

?>