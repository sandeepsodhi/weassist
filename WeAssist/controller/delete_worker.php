<?php
	
	require_once '../model/dbConnect.php';
	extract($_GET);
    $result = $conn->prepare("delete from users where u_id='".$_GET['u_id']."'");
   	$result->execute();
if($result)
{
	header('location:../view/agent/pages/all_users.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>