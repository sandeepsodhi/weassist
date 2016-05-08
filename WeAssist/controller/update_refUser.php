<?php
	
	require_once '../model/dbConnect.php';
	extract($_GET);

	if((isset($_GET['u_id'])))
	{
	
		$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
		$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
		$contact = mysqli_escape_string($conn,$_POST["contact"]);
		$city = mysqli_escape_string($conn,$_POST["city"]);
		
		
		if(!empty($_FILES['image']) && $_FILES['image']['size']>0){
			$name = mysqli_escape_string($conn,$_FILES['image']['name']);
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
				elseif (substr($type,0,5)=='image') {
					$result = $conn->prepare("update users set f_name='$f_name',l_name='$l_name',contact='$contact',city='$city',profile_pic='$name' where u_id='".$_GET['u_id']."'");
	                $result->execute();
	                if($result)
						move_uploaded_file($temp,"../view/image/".$name);			
				}
			}
		}
		else
		{	  

			//$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,contact) values (?,?,?,?,?)");
		    $result = $conn->prepare("update users set f_name='$f_name',l_name='$l_name',contact='$contact',city='$city' where u_id='".$_GET['u_id']."'");
			//$result->bind_param("ss",$cat_name,$cat_desc);
		    $result->execute();
			//echo "update category set cat_name='$cat_name',cat_desc='$cat_desc' where cat_id='".$_GET['cat_id']."'";

		}
	}
	else
	{	
/*		$cat_name = mysqli_escape_string($conn,$_POST["cat_name"]);
		$cat_desc = mysqli_escape_string($conn,$_POST["cat_desc"]);
			   
		

		if(!empty($_FILES['image']) && $_FILES['image']['size']>0){
			$name = mysqli_escape_string($conn,$_FILES['image']['name']);
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
				elseif (substr($type,0,5)=='image') {
					//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
					$result = $conn->prepare("insert into category(cat_name,cat_desc,cat_image) values('$cat_name','$cat_desc','$name')");
	  //			$result->bind_param("sss",$cat_name,$cat_desc,$name);
	                $result->execute();
	                if($result)
						move_uploaded_file($temp,"../view/image/".$name);			
				}
			}
		}
		else
		{	  

			//$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,contact) values (?,?,?,?,?)");
		    $result = $conn->prepare("insert into category(cat_name,cat_desc) values('$cat_name','$cat_desc')");
	//	    $result->bind_param("ss",$cat_name,$cat_desc);
		  //  $result->execute();
		    $result->execute();
		   }
*/	}
if($result)
{
	header('location:../view/admin/pages/ref_users.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>