<?php
	
	require_once '../model/dbConnect.php';
	extract($_GET);
    $result = $conn->prepare("delete from category where cat_id='".$_GET['cat_id']."'");
   	$result->execute();
if($result)
{
	header('location:../view/admin/pages/categories.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>