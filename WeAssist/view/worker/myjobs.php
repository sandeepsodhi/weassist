<?php session_start();
//echo $_SESSION['f_name'];

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
                   <th>Job Date</th>
                  <th>Target Date</th>
                  <th>Worker Name</th>
                  <th>Image</th>
				  
                  </tr>
                </thead>
                <tbody>
                <?php
                  include  '../../../model/dbConnect.php';
	//			echo $_SESSION['f_name'];
$rs=mysqli_query($conn,"select a.job_date,a.target_date,a.photo,b.f_name from createjob a join users b on a.uname=b.u_name where b.f_name='".$_SESSION['f_name']."' ");
               // $rs = mysqli_query($conn,"select job_date,target_date,uname,photo from createjob");
                while($row=mysqli_fetch_row($rs))
                {   
                echo "<tr>
                         <td>$row[0]</td>
                        <td>$row[1]</td>
						<td>$row[3]</td>
						<td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[2]'></td>


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
<script src="js1/jquery.dataTables.min.js"></script>
<script src="js1/dataTables.bootstrap.min.js"></script>
<script src="js1/dataTables.jqueryui.min.js"></script>
<script src="js1/dataTables.foundation.min.js"></script>
<script>
    $(document).ready(function () {
        $(".table").dataTable();
    });
</script>


</body>
</html>