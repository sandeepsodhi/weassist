<?php
$host = "localhost";
$user = "root";
$pswd = "";
$dbname = "weassist";

$conn = mysqli_connect($host, $user, $pswd, $dbname);
/*
try{
	$dbh = new PDO("mysql:host=$host,dbname=$dbname,$user,$pswd");
}
catch(PDOException $e){
    $e->getMessage();
}
*/

//$conn = mysqli_connect($host,$user,$pswd,$db);

if($conn)
	echo "";  
else
	echo "Database connection failed";

// session_start();
?>