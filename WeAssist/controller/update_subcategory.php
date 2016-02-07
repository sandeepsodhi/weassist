<?php
	
	require_once '../model/dbConnect.php';
	extract($_GET);

	if((isset($_GET['subcat_id'])))
	{
	
		$subcat_name = mysqli_escape_string($conn,$_POST["subcat_name"]);
		$subcat_desc = mysqli_escape_string($conn,$_POST["subcat_desc"]);
	    $subcat_city = mysqli_escape_string($conn,$_POST["subcat_city"]);
		
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
					$result = $conn->prepare("update sub_category set subcat_name='$subcat_name',subcat_desc='$subcat_desc',subcat_image='$name',subcat_city='$subcat_city' where subcat_id='".$_GET['subcat_id']."'");
	  //			$result->bind_param("sss",$cat_name,$cat_desc,$name);
	                $result->execute();
	                if($result)
						move_uploaded_file($temp,"../view/image/".$name);			
				}
			}
		}
		else
		{	  

		    $result = $conn->prepare("update sub_category set subcat_name='$subcat_name',subcat_desc='$subcat_desc',subcat_city='$subcat_city' where subcat_id='".$_GET['subcat_id']."'");
			//$result->bind_param("ss",$cat_name,$cat_desc);
		    $result->execute();
		    //echo "update sub_category set subcat_name='$subcat_name',subcat_desc='$subcat_desc' where subcat_id='".$_GET['subcat_id']."'";

		}
	}
	else
	{	
		$cat_id = mysqli_escape_string($conn,$_POST["cat_id"]);
		$subcat_name = mysqli_escape_string($conn,$_POST["subcat_name"]);
		$subcat_desc = mysqli_escape_string($conn,$_POST["subcat_desc"]);
		$subcat_city = mysqli_escape_string($conn,$_POST["subcat_city"]);			   
		

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
					$result = $conn->prepare("insert into sub_category(cat_id,subcat_name,subcat_desc,subcat_image,subcat_city) values('$cat_id','$subcat_name','$subcat_desc','$name','$subcat_city')");
	  				//$result->bind_param("sss",$cat_name,$cat_desc,$name);
	                $result->execute();
	                if($result)
						move_uploaded_file($temp,"../view/image/".$name);			
				}
			}
		}
		else
		{	  

			//$result = $conn->prepare("INSERT INTO users (u_name,pswd,f_name,l_name,contact) values (?,?,?,?,?)");
		    $result = $conn->prepare("insert into sub_category(cat_id,subcat_name,subcat_desc,subcat_city) values('$cat_id','$subcat_name','$subcat_desc','$subcat_city')");
			//$result->bind_param("ss",$cat_name,$cat_desc);
		  	//$result->execute();
		    $result->execute();
		   }
	}
if($result)
{
	header('location:../view/admin/pages/sub_categories.php');
}
else 
{ 
	echo mysqli_error($conn);
}
?>