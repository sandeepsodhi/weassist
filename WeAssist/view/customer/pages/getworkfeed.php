<?php 

header('Content-Type:application/json');

    require_once '../../../model/dbConnect.php';
  $uid=$_REQUEST['in'];
  //$emailid='sandeep@gmail.com';
//  $det=array();
$que=mysqli_query($conn,"select profile_pic from users where u_id='$uid'");
$res=mysqli_fetch_assoc($que);
//$det[]=$res;
echo json_encode($res['profile_pic']);


?>