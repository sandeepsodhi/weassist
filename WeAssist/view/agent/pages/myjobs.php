<?php session_start();
//echo $_SESSION['f_name'];

?>


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Agent | MyJobs</title>
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
                  <th>Worker Name</th>
                  <th>Job Title</th>
                  <th>Create by</th>
                  <th>Job Creation date</th>
                  <th>Job target date</th>
                  <th>Earnings</th> 
                </tr>
                </thead>
                <tbody>
                <?php
                  include  '../../../model/dbConnect.php';
                  $u_idd  = $_SESSION['u_id'];


                  $que = mysqli_query($conn,"select u.f_name,c.jobtitle,c.uname,c.job_date,c.target_date,c.job_price,u.u_name,
                    j.workerassign from createjob c join job_status j join users u  on j.workerassign = u.u_name and c.subcat_id = j.job_id where r_user in (select r_code from users where u_id ='$u_idd')");




                  while($res = mysqli_fetch_row($que))
                  {

                    // mysqli_query($conn,"select strconcat(f_name ")

                  echo "<tr>
                          <td>$res[0]</td>
                          <td>$res[1]</td>
                          <td>$res[2]</td>
                          <td>$res[3]</td>
                          <td>$res[4]</td>
                          <td>Rs.$res[5]</td>
                        </tr>
                       ";
                  }





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

 $.post('acceptjob.php',{id:va},function(response){
 if(response==1)
   alert('hogya');

 });
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

//alert(va);
 $.post('jobrej.php',{id:va},function(response){
if(response=='1')
  alert('hogya');
 });   	
   }	

</script>
</body>
</html>