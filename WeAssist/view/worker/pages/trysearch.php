<?php 
	require_once '../../../model/dbConnect.php';
	$c='plum';
   $res=mysqli_query($conn,"select cat_name from category where cat_name like '%$c%'");
   
while($ress=mysqli_fetch_row($res))
  echo "<li>$ress[0]</br></li>";
?>