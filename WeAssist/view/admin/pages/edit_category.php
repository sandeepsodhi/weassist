<?php include 'header.php'; ?>
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
  <!-- WeAssit Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">

  <!-- for image-->
  <link class="jsbin" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
  
  

  </head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">
 <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Examples</a></li>
        <li><a href="#">Categories</a></li>
        <li class="active">Edit Category</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;min-height:900px">
   
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Edit Categories</h3>
            </div>
            <!-- /.box-header -->
            <?php if (isset($_GET['cat_id'])) { ?>
            
            <form method="POST" action="../../../controller/update_category.php?cat_id=<?php echo $_GET['cat_id']; ?>" enctype="multipart/form-data">
            <div class="box-body no-padding">
              <table class="table table-hover">
                <tbody>
                <?php
                    $cat_id = $_GET['cat_id']; 
                    include  '../../../model/dbConnect.php';
                    $row = mysqli_fetch_row(mysqli_query($conn,"select cat_name,cat_image,cat_desc from category where cat_id=$cat_id"));
                    
                 echo "<tr>
                  <td>Category Name</td>
                  <td><input type='text' name='cat_name' value='$row[0]'</td>
                </tr>
                <tr>
                <td>Category Description</td>
                  <td><textarea name='cat_desc' cols=120 rows=8>$row[2]</textarea>
                </tr>
                <tr>
                  <td>Category Image</td>
                  <td><img src='../../image/$row[1]' width='100' height='100' alt=''  style='position:absolute;  z-index:1;' id='cat_image' />
                      <input type='file' name='image' style='width:100px; height:100px; position:relative;  z-index:2; opacity:0;' onchange='readURL(this)' />
                  </td>
                </tr>
                <tr>
                  <td colspan='2'><input class='btn btn-primary' type='submit' value='Update'></td>
                <tr>
                "; ?>
             </tbody></table>
            </div>
            <!-- /.box-body -->
            <form>
          <?php }
          else
            { ?>

            <form method="POST" action="../../../controller/update_category.php" enctype="multipart/form-data">
            <div class="box-body no-padding">
              <table class="table table-hover">
                <tbody>
                <tr>
                  <td>Category Name</td>
                  <td><input type='text' name='cat_name'></td>
                </tr>
                <tr>
                <td>Category Description</td>
                  <td><textarea name='cat_desc' cols=120 rows=8></textarea>
                </tr>
                <tr>
                  <td>Category Image</td>
                  <td><img src='../../image/NewCandidateImage.jpg' width='100' height='100' alt=''  style='position:absolute;  z-index:1;' id='cat_image' />
                      <input type='file' name='image' style='width:100px; height:100px; position:relative;  z-index:2; opacity:0;' onchange='readURL(this)' />
                  </td>
                </tr>
                <tr>
                  <td colspan='2'><input class='btn btn-primary' type='submit' value='Update'></td>
                <tr>
             </tbody></table>
            </div>
            <!-- /.box-body -->
            <form>
          <?php } ?>
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
<!-- WeAssit App -->
<script src="../dist/js/app.min.js"></script>
<!-- WeAssit for demo purposes -->
<script src="../dist/js/demo.js"></script>
<!-- for image  -->
<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js"></script>
<script type="text/javascript">
         function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#cat_image')
                        .attr('src', e.target.result)
                        .width(100)
                        .height(100);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
</script>




<!--
<script type="text/javascript">
  function change(){
   $('#cat_name').prop("readonly",false);
  }
  </script> -->

</body>
</html>
