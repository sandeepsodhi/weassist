<?php

  $jobid=$_REQUEST['id'];
header('Content-Type:application/json');
session_start();
    require_once '../../../model/dbConnect.php';
//  $jobid=57;
    $query="update job_status  set status=1 ,workerassign='".$_SESSION['u_name']."' where job_id='$jobid'";
$res = mysqli_query($conn, $query);
    $query1="select f_name from users where u_name in (select uname  from createjob   where subcat_id='$jobid') ";
$res = mysqli_query($conn, $query1);
 $r1=mysqli_fetch_assoc($res);
 $custnames=$r1['f_name'];
 $query1="select f_name from users where u_name in (select workerassign  from job_status   where job_id='$jobid') ";
$res = mysqli_query($conn, $query1);
 $r1=mysqli_fetch_assoc($res);
 $workernames=$r1['f_name'];              
//include 'emailaccept.php' ; 
echo 'true';
?>