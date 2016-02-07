<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>WeAssist | Sub-categories</title>
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
        <li class="active">Sub-categories</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;">
   
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Sub-categories</h3>
              <h5><a href="edit_category.php">Create new category</a></h5> 
              <div class="box-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input name="table_search" class="form-control pull-right" placeholder="Search" type="text">
                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-body table-reponsive no padding">
              <select name="cat_id" class="box" onchange="getCategory(this.value)">
                <option value=""  selected disabled>Select Category</option>
                <?php
                    include  '../../../model/dbConnect.php';
                    $rs=mysqli_query($conn,"select cat_id,cat_name from category");
                    while($row=mysqli_fetch_assoc($rs))
                    {
                        echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>";
                    }
                ?>
            </select>
            <?php echo "
            <table class='table table-striped table-bordered table-hover'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Category Description</th>
              </tr>
            </thead>
            <tbody>";

            if(isset($_GET['cat_id']))
            {
            
              $cat_id = strval($_GET['cat_id']);
              $sql="SELECT subcat_id,subcat_name,subcat_image,subcat_desc FROM sub_category where cat_id='$cat_id'";
              $result = mysqli_query($conn,$sql);

              while($row = mysqli_fetch_row($result))
              {
                echo "<tr>
                       <td>$row[0]</td>
                       <td>$row[1]</td>
                         <td><img style='border-radius:10px;width:60px;height:50px;' src='../../image/$row[2]'></td>
                         <td>$row[3]</td>
                        </tr> 
                      ";
              }
            }
            echo "</tbody>
            </table> "; ?>
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
  function change(){
   $('#cat_name').prop("readonly",false);
  }
</script>
<script>
  function getCategory(str) {
    if (str == "") {
          document.getElementById("sub_select").innerHTML = "";
          return;
      } else {    
        window.location.href='sub_categories1.php?cat_id='+str;
      }
   /*  if (str == "") {
          document.getElementById("sub_select").innerHTML = "";
          return;
      } else {
          if (window.XMLHttpRequest) {
              xmlhttp = new XMLHttpRequest();
          } else {
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  document.getElementById("sub_select").innerHTML = xmlhttp.responseText;
              }
          };
          xmlhttp.open("GET","../../../controller/category_disp_select.php?cat_id="+str,true);
          xmlhttp.send();
      }
  */
}
  
</script>
</body>
</html>