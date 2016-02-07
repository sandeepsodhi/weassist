<?php
require_once '../model/dbConnect.php';
$cat_name = strval($_GET['cat_name']);
$sql="SELECT cat_name FROM category";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_assoc($result))
{
    if($row['cat_name'] ==  $cat_name)
      echo "<p style='color:red'>Same named category already exists!!!</p>";
}

?>