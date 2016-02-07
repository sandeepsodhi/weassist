<?php
require_once '../model/dbConnect.php';
$subcat_name = strval($_GET['subcat_name']);
$sql="SELECT subcat_name FROM sub_category";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_assoc($result))
{
    if($row['subcat_name'] ==  $subcat_name)
      echo "<p style='color:red'>Same named Sub-category already exists!!!</p>";
}

?>