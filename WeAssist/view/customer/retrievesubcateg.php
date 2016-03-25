<?php
//Config.php file for connecting to PHP.
require_once '../../../model/dbConnect.php';
//id will be posted via Ajax script. please see point no.7
if($_POST['id'])
{
$id=$_POST['id'];
$sql=mysqli_query($conn,"select sub_cat from category where cat='$id'");
	while($row=mysqli_fetch_array($sql,MYSQL_ASSOC))
	{
	$data=$row['sub_cat'];
	echo '<option value="'.$data.'">'.$data.'</option>';
	}
}
?>
