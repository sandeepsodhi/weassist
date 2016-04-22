<?php session_start();
if(!isset($_SESSION['u_type']))
{
  header('location:../../main/error_401.php');
}

 ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Customer | Profile</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/profilelabel.css">
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

h1 {
  font-size: 140%;
font-family: monospace;
color:#000000;
}
</style>
</head>
<?php include('header.php');?>
<div class="content-wrapper"> 
  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><a href="joblist.php">Job List</a></li>
        <li class="active">Edit</li>
      </ol>
    </section>
  <br/>
 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
   
        
    
        <!-- left column -->
   </div>
  <div class="row" style="margin:0% 5% 0% 5%"">

<?php
//    session_start();
  if(isset($_SESSION['logstat'])) 
	if($_SESSION['logstat']=='true')
    { $_SESSION['logstat']='false';
  require_once '../../../model/dbConnect.php';
	$f_name = mysqli_escape_string($conn,$_POST["f_name"]);
	$l_name = mysqli_escape_string($conn,$_POST["l_name"]);
	$email = mysqli_escape_string($conn,$_POST["email"]);
 // $pwd=mysqli_escape_string($conn,$_POST["changepwd"]);

  $city = mysqli_escape_string($conn,$_POST["city"]);
   if($city)
   {
   	$state=mysqli_escape_string($conn,$_POST["State"]);
	$country=mysqli_escape_string($conn,$_POST["Country"]);
   }
   else 
   {
   	$city=$_SESSION['city'];
   	$state=$_SESSION['state'];
   	$country=$_SESSION['country'];
   }
	$phone = mysqli_escape_string($conn,$_POST["phone"]);
	
    $uname=$_SESSION['u_name'];
//    $_SESSION['email']="";
	//$name = mysqli_escape_string($conn,$_FILES['image']['name']);
//$login = mysqli_query($conn,"call updatedetails('".$u_name."','".$pswd."')");	

	//$name = mysqli_escape_string($conn,$_POST['image']);
  //    $sql=mysqli_query($conn,"update users set city='$city',state='$state' where u_name='$uname'");
	if(!empty($_FILES['image']) || $_FILES['image']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['image']['name']);
		$type = $_FILES['image']['type'];
		$error = $_FILES['image']['error'];
		$size = $_FILES['image']['size'];
		$temp = $_FILES['image']['tmp_name'];
	if($error > 0)
		{
		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				if($name)
			    {	move_uploaded_file($temp,"../../image/".$name);	
		
	/*	          if($pwd)
		          {
                  $sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	  tate='$state',country='$country',profile_pic='$name' ,pswd='$pwd'
                  where u_name='$uname' " );
                  echo "if" . $name;
                  $_SESSION['profile_pic']=$name;
    			  }
    			  else*/
    			 if($city)
{    			  $sql=mysqli_query($conn,"Update users set profile_pic='$name',f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	  state='$state',country='$country' 
                  where u_name='$uname' " );
 
                  $_SESSION['profile_pic']=$name;
//                                      echo "else" . $name;
//                                      echo "Update users set profile_pic='$name',f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
//                 state='$state',country='$country' 
//                   where u_name='$uname'"; 
                }
                  else
                  {
                      $sql=mysqli_query($conn,"Update users set profile_pic='$name',f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone'  where u_name='$uname' " );
 
                  $_SESSION['profile_pic']=$name;
            
                  }        
                                           			  
    			}
    			else 
    			{
    				$sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country' 
                where u_name='$uname' " );
	
    			}
			}
		
		}
		        //working
		              if($city)
               {     $sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
                	state='$state',country='$country' 
                    where u_name='$uname' " );  
               }
                 else
                  {
                      $sql=mysqli_query($conn,"Update users set profile_pic='$name',f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone'  where u_name='$uname' " );
 
                  $_SESSION['profile_pic']=$name;
            
                  }
                

	}
	else
	{   $sql=mysqli_query($conn,"Update users set f_name='$f_name',l_name='$l_name',u_name='$email',contact='$phone',city='$city',
            	state='$state',country='$country' 
                where u_name='$uname' " );
	
	
	} 
		
		echo "<br/><h>Profile Updated";	
//echo $name;	
//echo $_FILES['image']; 
$_SESSION['f_name']=$f_name;
$_SESSION['l_name']=$l_name;
$_SESSION['u_name']=$email;	
$_SESSION['contact']=$phone;	
if($city)
{$_SESSION['city']=$city;	
$_SESSION['state']=$state;
$_SESSION['country']=$country;
}
}
else
{

echo "<br/> <h>First Update Profile</h><br/><br/>";
}
?>
  </div>
   </div>
    </div>
     </section>    
  
     
     </div>
   

  <!-- /.content-wrapper -->
   <?php include 'footer_sidebar.php'; ?>

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>



<!-- ./wrapper -->
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/additional-methods.min.js"></script>

<!-- jQuery 2.2.0 -->
<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="../bootstrap/js/bootstrap.min.js"></script>
<!-- Slimscroll -->
<script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>

</body>
</html>
