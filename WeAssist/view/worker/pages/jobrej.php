<?php 
    header('Content-Type:application/json');
    session_start();
    require_once '../../../model/dbConnect.php';
    $jobid=$_REQUEST['id'];
    //$jobid=57;
    $uname=$_SESSION['u_name'];
    $query="insert into reject_job  set u_name='$uname' ,job_id='$jobid' ";
    $res = mysqli_query($conn, $query);
    echo $res;

?>