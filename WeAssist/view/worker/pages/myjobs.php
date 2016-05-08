<?php session_start();
//echo $_SESSION['f_name'];
require_once '../../../model/dbConnect.php'; 
              
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
  <title>WeAssist | Categories</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  <!-- data table files --> 
  <link href="css1/jquery.dataTables.min.css" rel="stylesheet" />
  <link href="css1/dataTables.bootstrap.min.css" rel="stylesheet" />
  <link href="css1/dataTables.jqueryui.min.css" rel="stylesheet" />
  <link href="css1/dataTables.foundation.min.css" rel="stylesheet" />



  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-red-light sidebar-mini">
<div class="wrapper">

  <?php include 'header.php';  ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Categories</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;">
   
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">My Jobs</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                   <th>Job Date/Time</th>
                  <th>Target Date/Time</th>
                  <th>Customer Name</th>
                  <th>Image</th>
                  <th>Action </th>				  
                  </tr>
                </thead>
                <tbody>
                <?php
                  include  '../../../model/dbConnect.php';
	//			echo $_SESSION['f_name'];
// $rs=mysqli_query($conn,"select a.job_date,a.target_date,a.photo,b.f_name from createjob a join users b on a.uname=b.u_name where b.f_name='".$_SESSION['f_name']."' ");
//                 $rs = mysqli_query($conn,"select job_date,target_date,uname,photo from createjob");
  $que1=mysqli_query($conn,"select cat_id,subcat_id from profession where u_name='".$_SESSION['u_name']."'");
  while($row1 =mysqli_fetch_assoc($que1))
{
$catid=$row1['cat_id'];
 $subcatid=$row1['subcat_id'];            

  $que2=mysqli_query($conn,"select job_id,status from job_status where cat_id='".$catid."' AND subcat_id='".$subcatid."'");
  
   
  while($row2 =mysqli_fetch_assoc($que2))
{ 
 $jobid=$row2['job_id'];
 
 $qrej=mysqli_query($conn,"select rej_id from reject_job where job_id='$jobid' AND u_name='".$_SESSION['u_name']."'");
 $rowrej =mysqli_fetch_assoc($qrej);
 if(!$rowrej)
{ $status=$row2['status'];            
  $que3=mysqli_query($conn,"select * from createjob where subcat_id='".$jobid."' ");
  //echo "select * from ceatejob where subcat_id='".$jobid."' ";
  $row3 =mysqli_fetch_assoc($que3);
  $imag=$row3['photo'];
  $email=$row3['uname'];
  $_SESSION['cust_email']=$email;
 // echo $email;
  $que5=mysqli_query($conn,"select * from users where u_name='$email'");
  $row5=mysqli_fetch_assoc($que5);
  $username=$row5['f_name']. " ". $row5['l_name'];
  //$f_name=$row5['f_name'];
  //$useremail=$row5['u_name'];
              //  while($row=mysqli_fetch_row($rs))
              if($status==0)
                {   
                echo "<tr>"
                         ."<td>".$row3['job_date']."</td>".
                        "<td>".$row3['target_date'].$row3['job_time']."</td>".
						            "<td>".$username."<br/><a  "."onclick="."custdetail('$email')". " href='javascript:;' >More Details</a> "."</td>".
						            "<td><img src='../../image/$imag' style='border-radius:10px;width:60px;height:50px;'></td>".
                        "<td><input type='button' value='Accept' class='btn btn-success' style='color:white;font-family:Arial;margin-right:1px;width:75px;margin-bottom:2px' id='btnaccept'". "onclick='acceptfun(".$jobid.")' >".
                         "<input type='button' value='Reject'  class='btn btn-primary' style='color:white;font-family:Arial;margin-right:1px;width:75px;margin-bottom:2px' id='btnreject'". "onclick='rejectfun(".$jobid.")' >".
                         " </td>".
                        "</tr>" 
                      ;
 }
                }
}}
                ?>
              </tbody></table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        

    </section>
    <!-- /.content -->
  </div>
  
  <!-- /.content-wrapper -->
<!-- model customer detail -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Customer Details :</h4>
        </div>
        <div class="modal-body">
         <div id="cont" style="margin-left: 30px;margin-right: 30px;background-color: #fffff0">
          <p style="display: inline;margin-left: 13px;font-size:18px">First Name : </p><p id="fname" style="display: inline;margin-left: 10px;font-size:18px"> </p>
          <p style="display: inline;margin-left: 73px;font-size:18px">Last Name : </p><p id="lname" style="display: inline;margin-left: 10px;font-size:18px"> </p><br/><br/>
          <p style="display: inline;margin-left: 13px;font-size:18px">Contact : </p><p id="contact" style="display: inline;margin-left: 30px;font-size:18px"> </p><br/><br/>
          <p style="display: inline;margin-left: 13px;font-size:18px">City : </p><p id="city" style="display: inline;margin-left: 60px;font-size:18px"> </p><br/><br/>
          <p style="display: inline;margin-left: 13px;font-size:18px">State : </p><p id="state" style="display: inline;margin-left: 50px;font-size:18px"></p><br/><br/>
          <p style="display: inline;margin-left: 13px;font-size:18px">Country : </p><p id="country" style="display: inline;margin-left: 30px;font-size:18px"> </p><br/><br/>

          </div>
        </div>
      </div>
      
    </div>
</div>
  
  <!-- adding foorer + sidebar to out page -->
  

  <?php include 'footer_sidebar.php'; ?>   

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="../bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="../plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>
<script type="text/javascript">
  function change(){
   $('#cat_name').prop("readonly",false);
  }
</script>

<!-- data tables --> 
<script src="js1/jquery.dataTables.min.js"></script>
<script src="js1/dataTables.bootstrap.min.js"></script>
<script src="js1/dataTables.jqueryui.min.js"></script>
<script src="js1/dataTables.foundation.min.js"></script>
<script>
    $(document).ready(function () {
        $(".table").dataTable();
    });

</script>
<script >
     function  acceptfun(va)
   {
    var r = confirm("Are you Sure You Want to accept!");
//alert(va);
if (r == true) {
  $.post('acceptjob.php',{id:va},function(response){
  if(response=='true')
  { //alert('hogya');
     location.reload(); 
 }
      location.reload();
  }); }

}
</script>
<script type="text/javascript">
 var detail=[];
  var i=0;
  function custdetail(inp)
{
//alert('wow'+inp);
$.post('custdet.php',{emailid:inp},function(response){
 size=response.length;
 detail[0]=response[0].f_name;
 detail[1]=response[0].l_name;
 detail[2]=response[0].contact;
 detail[3]=response[0].city;
 detail[4]=response[0].state;
 detail[5]=response[0].country;
// alert(detail[0]);
 $('#myModal').modal('show'); 
document.getElementById('fname').innerHTML=detail[0];
document.getElementById('lname').innerHTML=detail[1];
document.getElementById('contact').innerHTML=detail[2];
document.getElementById('city').innerHTML=detail[3];
document.getElementById('state').innerHTML=detail[4];
document.getElementById('country').innerHTML=detail[5];
 
});
}

</script>
<script type="text/javascript">
function  rejectfun(va)
   {
   var r = confirm("Are you Sure You Want to reject!");
if (r == true) {
 $.post('jobrej.php',{id:va},function(response){
if(response)
  {
//  alert('hogya');
 location.reload(); 
 }
 location.reload(); 
 });   	
}
   }	

</script>
</body>
</html>