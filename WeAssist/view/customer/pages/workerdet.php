<?php
header('Content-Type:application/json');

    require_once '../../../model/dbConnect.php';
  $emailid=$_REQUEST['emailid'];
  //$emailid='sandeep@gmail.com';
  $det=array();
$que=mysqli_query($conn,"select f_name,l_name,contact,city,state,country from users where u_name='$emailid'");
$res=mysqli_fetch_assoc($que);
$det[]=$res;
echo json_encode($det);
?>