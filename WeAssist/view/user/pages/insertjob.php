<?php
    session_start();
	require_once '../../../model/dbConnect.php';
    $jobcateg=mysqli_escape_string($conn,$_POST["jobcateg"]);
    //$subcateg=mysqli_escape_string($conn,$_POST["id"]);
    $subcateg=mysqli_escape_string($conn,$_POST["subcateg"]);
    $jobtitle=mysqli_escape_string($conn,$_POST["jobtitle"]);
    $jobdesc=mysqli_escape_string($conn,$_POST["jobdesc"]);
    $uname=$_SESSION['email'];

    if(!empty($_FILES['jobphoto']) || $_FILES['jobphoto']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['jobphoto']['name']);
		$type = $_FILES['jobphoto']['type'];
		$error = $_FILES['jobphoto']['error'];
		$size = $_FILES['jobphoto']['size'];
		$temp = $_FILES['jobphoto']['tmp_name'];


		if($error > 0)
		{
	//	$res = $conn->prepare("call updatedetails(?,?,?,?,?,?,?,?)");
    //$res->bind_param("sssdssss",$f_name,$l_name,$email,$phone,$city,$uname,$state,$country);
    //echo $res->execute();	
	
		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
				    if($name)
					{	move_uploaded_file($temp,"image/".$name);	

  	                    $conn->query("CALL insertjob('$jobcateg','$subcateg','$jobtitle','$jobdesc','$name','$uname')");
                    }

               }

           }
        }
         else {
                       $conn->query("CALL insertjob('$jobcateg','$subcateg','$jobtitle','$jobdesc','','$uname')");
         }  

?>