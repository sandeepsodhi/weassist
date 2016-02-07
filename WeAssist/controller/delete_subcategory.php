<?php
	
	require_once '../model/dbConnect.php';
	extract($_GET);
    $result = $conn->prepare("delete from sub_category where subcat_id='".$_GET['subcat_id']."'");
   	$result->execute();
if($result)
{
	header('location:../view/admin/pages/sub_categories.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>