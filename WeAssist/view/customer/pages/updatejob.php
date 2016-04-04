<?php session_start();
 ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>AdminLTE 2 | Widgets</title>
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
  
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

h1 {
	font-size: 140%;
font-family: monospace;
color:#000000;
}
.dropdown{
  max-width: 200px;
}
select {
    font-size:14pt;
  width: 50%;
    letter-spacing:0.07em;
    color:#FFFFFF;
    background:transparent;
    border: solid 1px #808080;
    padding:3px;
    cursor:pointer;
}
select option { padding: 1px 5px 1px 3px;}
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
  require_once '../../../model/dbConnect.php';
  $jobcategory=$_POST['jobcateg'];
  $subcateg=$_POST['subcateg'];
  $jobid=$_SESSION['jobid'];
  $jobtitle=$_POST['jobtitle'];
  $jobdesc=$_POST['jobdesc'];
  $jobid=$_SESSION['jobi_d'];
   
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
  //  $res = $conn->prepare("call updatedetails(?,?,?,?,?,?,?,?)");
    //$res->bind_param("sssdssss",$f_name,$l_name,$email,$phone,$city,$uname,$state,$country);
    //echo $res->execute(); 
        echo "frfr1";
                    $sql=mysqli_query($conn,"Update createjob set jobcategory='$jobcategory',subcategory='$subcateg',jobtitle='$jobtitle',jobdesc='$jobdesc'
                                     where subcat_id='$jobid' " );
        $sql=mysqli_query($conn,"Update job_status set cat_id='$jobcategory',subcat_id='$subcategid'
                                     where job_id='$jobid' " );
          include('emailagain.php');
 
    }
    else
    {
      if($size > 10000000)
        echo "Format not allowed or file size is too big!";
      elseif (substr($type,0,5)=='image') {
        //$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
            if($name)
          { move_uploaded_file($temp,"image/".$name); 
    /*  $res = $conn->prepare("call updatedetail(?,?,?,?,?,?,?,?,?)");
        $res->bind_param("sssdsssss",$f_name,$l_name,$email,$phone,$city,$uname,$name,$state,$country);
        $res->execute();*/
            $sql=mysqli_query($conn,"Update createjob set jobcategory='$jobcategory',subcategory='$subcateg',jobtitle='$jobtitle',jobdesc='$jobdesc',
                                     photo='$name'  
                                     where subcat_id='$jobid' " );
            $sql=mysqli_query($conn,"Update job_status set cat_id='$jobcategory',subcat_id='$subcategid'
                                     where job_id='$jobid' " );
                                   //   $_SESSION['image']=$name;
                              include('emailagain.php');
                      
                               echo "<h>Job Updated </h>";
          
          }
          else
          {
                    $sql=mysqli_query($conn,"Update createjob set jobcategory='$jobcategory',subcategory='$subcateg',jobtitle='$jobtitle',jobdesc='$jobdesc',
                                     where subcat_id='$jobid' " );
            $sql=mysqli_query($conn,"Update job_status set cat_id='$jobcategory',subcat_id='$subcategid'
                                     where job_id='$jobid' " );
     
          include('emailagain.php');
//echo "frfr2";
          }
      }
    }
  }
  else
  {
/*  $res = $conn->prepare("call updatedetails(?,?,?,?,?,?,?,?)");
    $res->bind_param("sssdssss",$f_name,$l_name,$email,$phone,$city,$uname,$state,$country);
     $res->execute(); 
  //*/     
//  echo "frfr3";  
       $sql=mysqli_query($conn,"Update createjob set jobcategory='$jobcategory',subcategory='$subcateg',jobtitle='$jobtitle',jobdesc='$jobdesc',
                                     where subcat_id='$jobid' " );
            $sql=mysqli_query($conn,"Update job_status set cat_id='$jobcategory',subcat_id='$subcategid'
                                     where job_id='$jobid' " );
     
          include('emailagain.php');

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
