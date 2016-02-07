<?php
require_once '../model/dbConnect.php';
$cat_id = strval($_GET['cat_id']);
$sql="SELECT subcat_id,subcat_name,subcat_image,subcat_desc FROM sub_category where cat_id='$cat_id'";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_row($result))
{
	echo "<tr>
     	   <td>$row[0]</td>
    	   <td>$row[1]</td>
           <td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[2]'></td>
           <td>$row[3]</td>
       	  </tr> 
        ";
}

?>
