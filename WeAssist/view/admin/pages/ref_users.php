<?php
session_start();
if(!isset($_SESSION['u_id']))
{
  header('location:../../main/error_401.php');
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>WeAssist | Referred-Users</title>
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
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Profile Image</th>
                  <th>Referred Agent</th>
                  <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                <?php
                include  '../../../model/dbConnect.php';
                $rs = mysqli_query($conn,"select a.f_name,a.l_name,a.r_user,a.profile_pic,concat(b.f_name,' ',b.l_name),a.u_id from users a inner join users b on  a.r_user=b.r_code where a.u_type='worker'
");
                while($row=mysqli_fetch_row($rs))
                {   
                echo "<tr>
                        <td>$row[0]</td>
                        <td>$row[1]</td>
                        <td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[3]'></td>
                        <td>$row[4]</td>
                        <td><input type='button' style='margin-right:5px;width:63px;margin-bottom:2px' class='btn btn-primary' value='Edit' id='edit' onclick='window.location.href=\"edit_refUsers.php?u_id=$row[5]\"'>
                        <input type='button' class='btn btn-primary' value='Delete' onclick='window.location.href=\"../../../controller/delete_refUsers.php?u_id=$row[5]\"'></td>
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


</body>
</html>