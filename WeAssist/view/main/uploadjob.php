<?php
header('Content-Type:application/json');
    require_once '../../model/dbConnect.php';
$subname=$_REQUEST['subcat'];
$catname=$_REQUEST['cat_name'];
$tinp=$_REQUEST['timec'];
$dinp=$_REQUEST['datec'];
$namelog=$_REQUEST['uname'];
$workname=$_REQUEST['reg_name'];
$jobdate=date("Y-m-d");
$query1="select cat_id from category where cat_name='$catname'";

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$catid=$row1['cat_id'];

$que="Insert into createjob  (jobcategory,subcategory,jobtitle,jobdesc,photo,uname,job_date,target_date,job_time) 
                       Values('".$catid."','".$subname."','".$subname."','".$subname."','def.jpg','".$namelog."','".$jobdate."','".$dinp."','".$tinp."') ";
$res = mysqli_query($conn, $que);
if($res)
echo json_encode($res);
?>