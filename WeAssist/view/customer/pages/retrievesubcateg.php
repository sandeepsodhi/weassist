<?php
//Config.php file for connecting to PHP.
require_once '../../../model/dbConnect.php';
//id will be posted via Ajax script. please see point no.7
if($_POST['id'])
{
$id=$_POST['id'];
$sql=mysqli_query($conn,"select subcat_name from sub_category where cat_id='$id'");
//       echo "<option value=''disabled='' select=''>-- Select Option --</option>";
     
       
        while($row=mysqli_fetch_array($sql,MYSQL_ASSOC))
	{
	$data=$row['subcat_name'];
	echo '<option value="'.$data.'">'.$data.'</option>';
	}
}
?>


