<?php 
session_start();
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
  <title>Agent | MyJobs</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../assets/dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../assets/dist/css/skins/_all-skins.min.css">
  <!-- data table files --> 
  <link href="../assets/css/jquery.dataTables.min.css" rel="stylesheet" />
  <link href="../assets/css/dataTables.bootstrap.min.css" rel="stylesheet" />
  <link href="../assets/css/dataTables.jqueryui.min.css" rel="stylesheet" />
  <link href="../assets/css/dataTables.foundation.min.css" rel="stylesheet" />

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
                  <th>Name</th>
                  <th>Total Jobs Completed</th>
                  <th>Customer rating</th>
                  <th>Contact Information</th>
                  <th>Profile Image</th>
                  <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                <?php
                include  '../../../model/dbConnect.php';
                $uname = $_SESSION['u_name'];
                $rs = mysqli_query($conn,"select f_name,l_name,profile_pic,u_id,u_name from users where r_user in(select r_code from users where u_name = '$uname')");
                while($row=mysqli_fetch_row($rs))
                {   
                  $rs1 =  mysqli_query($conn,"select count(status),rating from job_status where workerassign in(select u_name from users where u_id = '$row[3]')");
                  $row1 = mysqli_fetch_row($rs1);

                echo "<tr>
                        <td>$row[0] $row[1]</td>
                        <td>$row1[0]</td>";

                        if($row1[0]=='1')
                          echo  "<td>$row1[1]/5</td>";
                        else
                          echo "<td>NA</td>";

                echo "  <td>$row[4]</td>
                        <td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[2]'></td>
                        <td><input type='button' class='btn btn-primary' value='Delete' onclick='window.location.href=\"../../../controller/delete_worker.php?u_id=$row[3]\"'></td>
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
  
  <?php include 'footer_sidebar.php'; ?>   

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<script src="../assets/plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="../assets/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../assets/dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../assets/dist/js/demo.js"></script>
<script type="text/javascript">
  function change(){
   $('#cat_name').prop("readonly",false);
  }
</script>

<!-- data tables --> 
<script src="../assets/js/jquery.dataTables.min.js"></script>
<script src="../assets/js/dataTables.bootstrap.min.js"></script>
<script src="../assets/js/dataTables.jqueryui.min.js"></script>
<script src="../assets/js/dataTables.foundation.min.js"></script>
<script>
    $(document).ready(function () {
        $(".table").dataTable();
    });

</script>
</body>
</html>