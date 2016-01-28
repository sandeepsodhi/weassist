<?php


require_once 'dbConncect.php';

while($rs = mysqli_fetch_assoc($conn,mysqli_query($conn,"select u_name from users")))
{
	echo $rs['u_name'];
	echo "\n";
}

?>