<?php

session_start();
	
require_once '../model/dbConnect.php';  
    //$u_id = mysqli_real_escape_string($conn,$_POST['u_id']);
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	
	$contact = mysqli_real_escape_string($conn,$_POST['contact']);
	$city = mysqli_real_escape_string($conn,$_POST['city']);
	$state = mysqli_real_escape_string($conn,$_POST['State']);
	$country = mysqli_real_escape_string($conn,$_POST['Country']);

	echo $subcat_name = mysqli_real_escape_string($conn,$_POST['subcategories']);

	echo "<br>";

	$u_name=$_SESSION['u_name'];
	$u_id =$_SESSION['u_id'];


	$name = $_FILES['image']['name'];

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

				$login=mysqli_query($conn,"update users SET f_name='$f_name',l_name='$l_name',profile_pic='$name',city='$city',state='$state',country='$country',contact='$contact' where u_name='$u_name'"); 
				move_uploaded_file($temp,"../view/image/".$name);	
			
				// inserting all subcategories
				$sub = explode(",",$subcat_name);
				$size = sizeof($sub);
	
				for($i=0;$i<$size-1;$i++)
				{
					$subcatname = ltrim($sub[$i]);
					$cat =  mysqli_fetch_assoc(mysqli_query($conn,"select cat_id,subcat_id from sub_category where subcat_name='$subcatname'"));
					$cat_id = $cat['cat_id'];
					$subcat_id = $cat['subcat_id'];

					$login1=mysqli_query($conn,"call profession('".$u_id."','".$cat_id."','".$subcat_id."','".$u_name."')")or mysqli_error($conn);
										
				}
			}		
		}
	}
	else{
		if(isset($_SESSION['profile_pic']))
		{
			$name = $_SESSION['profile_pic'];
			$login=mysqli_query($conn,"update users SET f_name='$f_name',l_name='$l_name',profile_pic='$name',city='$city',state='$state',country='$country',contact='$contact' where u_name='$u_name'"); 
		
			// inserting all subcategories
			$sub = explode(",",$subcat_name);
			$size = sizeof($sub);

			for($i=0;$i<$size-1;$i++)
			{
				$subcatname = ltrim($sub[$i]);
				$cat =  mysqli_fetch_assoc(mysqli_query($conn,"select cat_id,subcat_id from sub_category where subcat_name='$subcatname'"));
				$cat_id = $cat['cat_id'];
				$subcat_id = $cat['subcat_id'];
				
				$login1=mysqli_query($conn,"call profession('".$u_id."','".$cat_id."','".$subcat_id."','".$u_name."')") or mysqli_error($conn);
				
			}

		}
		else
		{
			$login=mysqli_query($conn,"update users SET f_name='$f_name',l_name='$l_name',profile_pic='NewCandidateImage.jpg',city='$city',state='$state',country='$country',contact='$contact' where u_name='$u_name' " ); 

			// inserting all subcategories
			$sub = explode(",",$subcat_name);
			$size = sizeof($sub);

	
			for($i=0;$i<$size-1;$i++)
			{
				$subcatname = ltrim($sub[$i]);
				$cat =  mysqli_fetch_assoc(mysqli_query($conn,"select cat_id,subcat_id from sub_category where subcat_name='$subcatname'"));
				$cat_id = $cat['cat_id'];
				$subcat_id = $cat['subcat_id'];
				$u_id;
				
				$dup_query = mysqli_query($conn,"select cat_id,subcat_id,u_id from profession");

				$login1=mysqli_query($conn,"call profession('".$u_id."','".$cat_id."','".$subcat_id."','".$u_name."')");
			}
		}
	}

  	if ($login) {
		
		$pic = mysqli_fetch_row(mysqli_query($conn,"select u_id,profile_pic from users where u_name = '$u_name'"));
		
		$_SESSION['f_name'] = $f_name;
	    $_SESSION['l_name']=$l_name;
      	$_SESSION['contact']=$contact;
      	$_SESSION['city']=$city;
      	$_SESSION['profile_pic'] = $pic[1];


  		$_SESSION['update'] = "success";
  		header('location:../view/agent/pages/index.php');
 		
 	} 
  	else
	{
		$_SESSION['update'] = "failed";
		header('location:../view/agent/pages/profile.php');
	}
?>
</body>
</html>