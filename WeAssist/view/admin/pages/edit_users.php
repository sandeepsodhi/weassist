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

  <script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

  </head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">
<?php include 'header.php'; ?>
 <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Categories</a></li>
        <li class="active">Edit Category</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;min-height:900px">
   
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Edit User</h3>
            </div>
            <!-- /.box-header -->
            <?php if (isset($_GET['u_id'])) { ?>
            
            <form method="POST" action="../../../controller/update_user.php?u_id=<?php echo $_GET['u_id']; ?>" enctype="multipart/form-data">
            <div class="box-body no-padding">
              <table class="table table-hover">
                <tbody>
                <?php
                    $u_id = $_GET['u_id']; 
                    include  '../../../model/dbConnect.php';
                    $row = mysqli_fetch_row(mysqli_query($conn,"select f_name,l_name,contact,city,profile_pic from users where u_id=$u_id"));
                    
                 echo "<tr>
                  <td class='col-xs-2'>First Name</style></td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='f_name' value='$row[0]' required></td>
                </tr>
                <tr>
                <td class='col-xs-2'>Last Name</td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='l_name' value='$row[1]' required></td>
                </tr>
                <td class='col-xs-2'>Contact</td>
                  <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='contact' value='$row[2]' required></td>
                </tr>
                <td class='col-xs-2'>City</td>
                  <td>
                   <input type='text' value='$row[3]' class='col-xs-10 col-sm-4 btn btn-border' placeholder='City Name'  id='city' name='city' onkeydown='if (event.keyCode == 13) return false'>
                   <input type='hidden' name='State' id='State'/> 
                   <input type='hidden' name='Country' id='Country'/> 
                  </td>";



                  // <td><input type='text' class='col-xs-10 col-sm-4 btn btn-border' name='city' value='$row[3]' required></td>
                

          echo "</tr>
                <tr>
                  <td class='col-xs-2'>Profile picture</td>
                  <td><img src='../../image/$row[4]' width='100' height='100' alt='NoImage'  style='border-radius:10px;position:absolute;  z-index:1;' id='cat_image' />
                      <input type='file' name='image' style='border-radius:20px;width:100px; height:100px; position:relative;  z-index:2; opacity:0;' onchange='readURL(this)' />
                  </td>
                </tr>
                <tr>
                  <td colspan=2><input style='width:90px;margin-left:180px' class='btn btn-primary' type='submit' value='Update'><input style='width:90px;margin-left:20px' class='btn btn-primary' type='button' value='Delete' onclick='window.location.href=\"../../../controller/delete_user.php?u_id=".$_GET['u_id']."\"'></td>
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
                  <td><input type='text' name='cat_name' id='cat_name' onkeyup="showUser(this.value)" required><div id="txtHint"></div></td> 
                </tr>
                <tr>
                <td>Category Description</td>
                  <td><textarea name='cat_desc' cols=100 rows=8></textarea>
                </tr>
                <tr>
                  <td>Category Image</td>
                  <td><img src='../../image/NewCandidateImage.jpg' width='100' height='100' alt=''  style='border-radius:20px;position:absolute;  z-index:1;' id='cat_image' />
                      <input type='file' name='image' style='width:100px; height:100px; position:relative;  z-index:2; opacity:0;' onchange='readURL(this)' />
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><input style='width:100px;width:90px;margin-left:160px' class='btn btn-primary' type='submit' value='Update'></td>
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
<script>
  function showUser(str) {
     if (str == "") {
          document.getElementById("txtHint").innerHTML = "";
          return;
      } else {
          if (window.XMLHttpRequest) {
              xmlhttp = new XMLHttpRequest();
          } else {
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
              }
          };
          xmlhttp.open("GET","../../../controller/registered_category.php?cat_name="+str,true);
          xmlhttp.send();
      }
  }
</script>
<script>
    $(document).ready(function () {
        $(".table").dataTable();
    });
</script>
<script type="text/javascript">
    function initialize() {
      var options = {
            types: ['(cities)'],
            //componentRestrictions: {country: "in"}
        };
        var input = document.getElementById('city');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
            
    //console.log(autocomplete);
  }
  
  //$("#city").val(function(){alert("kuch hua");});
  
  $('input[name=city]').change(function () {
        setTimeout(function () {
            console.log($("#city").val());
            console.log(($("#city").val().match(/,/g) || []).length); //logs 3
            var val=[];
            if(($("#city").val().match(/,/g) || []).length==2)
            {
                //All City, State, Country Exists
                val=$("#city").val().split(',');
                $("#city").val(val[0]);
                $("#State").val(val[1]);
                $("#Country").val(val[2]);
          //     console.log($("#Country").val());
            }
            else if (($("#city").val().match(/,/g) || []).length == 1)
            {
                //Only City and Country Exists
                val=$("#city").val().split(',');
                $("#city").val(val[0]);
                $("#State").val('NA');
                $("#Country").val(val[1]);

            }

        }, 1000);
    });

    $('input[name=city]').click(function () {
        document.getElementById('city').value = '';
        document.getElementById('State').value = '';
        document.getElementById('Country').value = '';
    });

    google.maps.event.addDomListener(window, 'load', initialize);
</script>




<!-- for checking exsisting user -->

<!--
<script type="text/javascript">
  function change(){
   $('#cat_name').prop("readonly",false);
  }
  </script> -->

</body>
</html>
