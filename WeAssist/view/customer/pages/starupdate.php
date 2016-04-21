<?php 

header('Content-Type:application/json');

    require_once '../../../model/dbConnect.php';
  $star=$_REQUEST['in'];
  $idd=$_REQUEST['ip'];
  $jidd=$_REQUEST['jiid'];
  //$emailid='sandeep@gmail.com';
//  $det=array();
$que=mysqli_query($conn,"select rating from job_status where job_id='$jidd'");
$res=mysqli_fetch_assoc($que);
//$det[]=$res;
$st=$res['rating'];
$str=0;
if(!$st)
	$str=$star;
else
{
	$str=($st+$star)/2;
}
$que1=mysqli_query($conn,"update job_status set rating='$str' where job_id='$jidd'");
//$res=mysqli_fetch_assoc($que1);
//$res=mysqli_fetch_assoc($que);
echo $str;


?>