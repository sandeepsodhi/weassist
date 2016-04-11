<?php

session_start();
	
require_once '../model/dbConnect.php';  
    //$u_id = mysqli_real_escape_string($conn,$_POST['u_id']);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$u_name = mysqli_escape_string($conn,$_POST["u_name"]);
	$password = mysqli_escape_string($conn,$_POST["password"]);

	//$cat_name = mysqli_real_escape_string($conn,$_POST['categories']);
	$subcat_name = mysqli_real_escape_string($conn,$_POST['subcategories']);
	$contact = mysqli_real_escape_string($conn,$_POST['contact']);
	$city = mysqli_real_escape_string($conn,$_POST['city']);
	$State = mysqli_real_escape_string($conn,$_POST['State']);
	$Country = mysqli_real_escape_string($conn,$_POST['Country']);
	$email=$_SESSION['u_name'];
	//$cat_id=$_SESSION['cat_id'];
	//$subcat_id=$_SESSION['subcat_id'];

	//$name = mysqli_real_escape_string($conn,$_POST['profile_pic']);
	$u_id =$_SESSION['u_id'];


	
	


	


	if(!empty($_FILES['image']) && $_FILES['image']['size']>0)
	{
			$name=$_FILES['image']['name'];
			$type = $_FILES['image']['type'];
			$error = $_FILES['image']['error'];
			$size = $_FILES['image']['size'];
				$temp = $_FILES['image']['tmp_name'];


			if($error > 0)
			{
				die("ERROR uploading file! Code $error");
			}
			else
			{
				if($size > 10000000)
					echo "Format not allowed or file size is too big!";
				elseif(substr($type,0,5)=='image') 
					{
	
					$login=mysqli_query($conn,"update users SET f_name='$f_name',l_name='$l_name',profile_pic='$name',pswd='$password',city='$city',State='$State',Country='$Country',u_name='$u_name',contact='$contact' where u_name='$email' " ) or die(mysqli_error($conn	)); 
					move_uploaded_file($temp,"../view/image/".$name);	
					
						}		
			}
	}
	else{
		//$login=mysqli_query($conn,"call edit_profile('".$f_name."','".$l_name."','".$name."','".$city."','".$u_name."','".$contact."')"); 
	}

  if ($login) {

//	header('location:../view/user/pages/index.php');
  } 
	else
	{
				 echo mysqli_error($conn);

		echo'<script>alert("Error!!!!!!!!!!!!!")</script>';  
//header('Refresh:0; url=../view/user/pages/index.php');
	}
	

	
	$sub = explode(",",$subcat_name);

	$size = sizeof($sub);
	
	for($i=0;$i<$size-1;$i++)
	{
		$subcatid = ltrim($sub[$i]);
		$cat =  mysqli_fetch_assoc(mysqli_query($conn,"select cat_id,subcat_id from sub_category where subcat_name='$subcatid'"));
		$cat_id = $cat['cat_id'];
		$subcat_id = $cat['subcat_id'];
		$login1=mysqli_query($conn,"call profession('".$u_id."','".$cat_id."','".$subcat_id."','".$u_name."')"); 
	
	}
	if ($login1) {

	header('location:../view/user/pages/index.php');
// echo " done login1 ";  

	} 
	else
	{
		 echo mysqli_error($conn);
	//	echo'<script>alert("Error!!!!!!!!!!!!!")</script>';  
//header('Refresh:0; url=../view/user/pages/index.php');
	}
	
?>
</body>
</html>