<?php
require_once '../model/dbConnect.php';
$u_name = strval($_GET['u_name']);
$sql="SELECT u_name FROM users ";//WHERE u_name = '".$u_name."'";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_assoc($result))
{
    if($row['u_name'] ==  $u_name){
      echo '<p style="color:red;font-size:15px;">Email is already Registered with us!!!</p>';
    }
}

?>