<?php
	
		require_once '../../../model/dbConnect.php';
	extract($_GET);
    $result = mysqli_query($conn,"delete from createjob where subcat_id='".$_GET['cat_id']."'");
     $result1 = mysqli_query($conn,"delete from job_status where job_id='".$_GET['cat_id']."'");
   	
if($result)
{
	header('location:joblist.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>