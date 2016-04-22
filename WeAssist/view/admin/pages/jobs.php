<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>WeAssist | Users</title>
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
  <link href="css/jquery.dataTables.min.css" rel="stylesheet" />
  <link href="css/dataTables.bootstrap.min.css" rel="stylesheet" />
  <link href="css/dataTables.jqueryui.min.css" rel="stylesheet" />
  <link href="css/dataTables.foundation.min.css" rel="stylesheet" />



  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">

  <?php include 'header.php';  ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Users</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;">
   
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Users</h3><br><br>
            <!--  <h5><a href="edit_subcategory.php">Create new category</a></h5> --> 
            
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                  <th>Job Category </th>
                  <th>Sub Category </th>
                  <th>Job Title</th>
                  <th>Job Description</th>
                  <th>Job Image</th>
                  <th>Update</th>
                  <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                <?php
                include  '../../../model/dbConnect.php';
                $rs = mysqli_query($conn,"select * from createjob");
                  
                while($row=mysqli_fetch_row($rs))
                { 
                  $jid=$row[0];
                  $q=mysqli_query($conn,"select status,workerassign from job_status where job_id='$jid'");
                  $r=mysqli_fetch_row($q);  
                  if($r[0]==1)
                  {
                     $statuss='Assign';
                     $workername=$r[1];
                  }
                  else
                  $statuss='Not Assign';
                  $res=mysqli_query($conn,"select cat_name from category where cat_id='$row[1]'");
                  $ress=mysqli_fetch_row($res);
                  echo "<tr>
                        <td>$ress[0]</td>
                        <td>$row[2]</td>
                        <td>$row[3]</td>
                        <td>$row[4]</td>
                        <td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[5]'>
                        <td><input type='button' style='margin-right:5px;width:63px;margin-bottom:2px' class='btn btn-primary' value='Edit' id='edit' onclick='window.location.href=\"edit_subcategory.php?cat_id=$row[0]\"'>
                        <input type='button' class='btn btn-primary' value='Delete' onclick='window.location.href=\"delete_category.php?cat_id=$row[0]\"'></td>
                      ";
                      if($statuss=="Not Assign")
                      echo  "<td>$statuss</td>";
                      else 
                      { 
                        echo  "<td>$statuss";
                        echo "<br/> <a  "."onclick="."workerdetail('$workername')". " href='javascript:;' >Details</a></td>";
                      }
                       echo  "</tr>";
                }
                ?>
              </tbody> 



              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
   
<!-- model worker detail -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Worker Details :</h4>
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
   






    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

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
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/dataTables.bootstrap.min.js"></script>
<script src="js/dataTables.jqueryui.min.js"></script>
<script src="js/dataTables.foundation.min.js"></script>
<script>
    $(document).ready(function () {
        $(".table").dataTable();
    });
</script>
<script type="text/javascript">
var detail=[];
  var i=0;
  function workerdetail(inp)
{
// alert('wow'+inp);
$.post('workerdet.php',{emailid:inp},function(response){
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
}</script>


</body>
</html>