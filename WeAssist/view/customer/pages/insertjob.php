<?php session_start();
if(!isset($_SESSION['u_type']))
{
  header('location:../../main/error_401.php');
}

 ?>
<!DOCTYPE html>
<html>
<head>
  <title>Customer | Job</title>
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
   <div class="box-header ">
          
   
        
    
        <!-- left column -->
   </div>
  <div class="row" style="margin:0% 5% 0% 5%">
  
<?php
//    session_start();
if(isset($_SESSION['jvalid']))
if($_SESSION['jvalid']=='true')
{
 $_SESSION['jvalid']='false';  
	require_once '../../../model/dbConnect.php';
    $jobcategory=mysqli_escape_string($conn,$_POST["jobcateg"]);
    //$subcateg=mysqli_escape_string($conn,$_POST["id"]);
    $subcateg=mysqli_escape_string($conn,$_POST["subcateg"]);
    $jobtitle=mysqli_escape_string($conn,$_POST["jobtitle"]);
    $jobdesc=mysqli_escape_string($conn,$_POST["jobdesc"]);

//    $jobdate=mysqli_escape_string($conn,$_POST["Edate"]);
  $jobdat=$_POST["Edate"];
//  echo  $jobdat . "jobdat"."<br/>";
/*
  $jobdate=date_create($jobdat);
   // echo  $jobdates . "jobdate"."<br/>";
   $jobdate=date_format($jobdate,"Y-m-d");
    //echo  $jobdate . "jobdate   2"."<br/>";
  */
  $myDateTime = DateTime::createFromFormat('m-d-Y', $jobdat);
$jobdate = $myDateTime->format('Y-m-d'); 

    $jobtime=mysqli_escape_string($conn,$_POST["tapp"]);
   $jobprice=mysqli_escape_string($conn,$_POST["jobprice"]);
   $jobtodaydate=date("Y-m-d");
   $jobtime=$jobtime.":"."00"."000000";
    $uname=$_SESSION['u_name'];
   $res=mysqli_query($conn,"select cat_name from category where cat_id='$jobcategory'");
                  $ress=mysqli_fetch_row($res);
 $jobcateg=$ress[0];
   $res4=mysqli_query($conn,"select subcat_id from sub_category where subcat_name='$subcateg'");
                  $ress4=mysqli_fetch_row($res4);
 $subcategid=$ress4[0];
$_SESSION['jobcategory']=$jobcateg;

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
	           //echo "frfr";
          $conn->query("CALL insertjobs('$jobcategory','$subcateg','$jobtitle','$jobdesc','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
         
                            $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");
 
		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
				    if($name)
					{	move_uploaded_file($temp,"../../image/".$name);	

  	                    $conn->query("CALL insertjob('$jobcategory','$subcateg','$jobtitle','$jobdesc','$name','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
                    $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");
                      }
                    else
                    {

                       $conn->query("CALL insertjobs('$jobcateg','$subcateg','$jobtitle','$jobdesc','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
                         $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");


                    }

  
               }
           }
       
        }


         else {
                       
         }  



  echo "<h>Job Created </h><br/><br/><br/>";
       include('emailagain.php');
}
else
{
echo "<h>Please First  Create Job </h><br/><br/>";
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
