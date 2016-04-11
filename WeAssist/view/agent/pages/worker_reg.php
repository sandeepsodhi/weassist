<?php 
session_start();
include 'header.php';
?>  
<html>
<head>
<!-- <link href="jquery.dreamalert.css"rel="stylesheet"> -->
  <title>We Assist | Add Worker</title>
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
  <link rel="stylesheet" href="../dist/css/profilelabel.css">
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  <style type="text/css">
  .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
    border-top: 0px;
    }
   .btn-border{
    border-color:grey;
  }
  .font{
    font-size: 20px;
  }
  </style>
</head>
<body class="hold-transition skin-red-light sidebar-mini">
<div class="wrapper">
    <!-- Content Wrapper -->
     <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Add Worker</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;min-height:900px">
   
          <div class="box">
            <!-- /.box-header -->
            <div class="box-header">
              <h3 class="box-title">Add Worker</h3>
            </div>
            <form method="POST" action="worker_conn.php" enctype="multipart/form-data">
            <div class="box-body no-padding" >
              <table class="table table-hover">
              <tbody>
                <tr>
                    <td class='col-xs-2 col-sm-2'>First Name</td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='f_name' required><div id='txtHint'></div></td>
                </tr>
                <tr>
                  <td class='col-xs-2 col-sm-2'>Last Name</td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='l_name' required><div id='txtHint'></div></td>
                </tr>
                <tr>
                  <td class='col-xs-2 col-sm-2'>User Name</td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='u_name' onkeyup='showUser(this.value)' required><div id='txtHint'></div></td>
                </tr>
                <tr>
                  <td colspan=2><input style='width:90px;margin-left:180px' class='btn btn-primary' type='submit' value='Update'></td>
                </tr>
             </tbody>
             </table>
            </div>
            <!-- /.box-body --> 
            <form>
          </div>
          <!-- /.box -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

    
    
  
<div class="control-sidebar-bg"></div>
<?php include 'footer_sidebar.php' ?>

</div>
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
</body>
</html>
