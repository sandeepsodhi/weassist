<?php 
session_start();
include 'header.php';
?>  
<html>
<head>
<!-- <link href="jquery.dreamalert.css"rel="stylesheet"> -->
  <title>Change Password | Agent | We Assist </title>
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
        <li class="active">Change Password</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;min-height:900px">
   
          <div class="box">
            <!-- /.box-header -->
            <div class="box-header">
                <!--<span class="fa fa-user-plus"></span>-->
                <h3>Change Password</h3>
                <!--<h1>Add Worker</h1>-->
              <hr>
            </div>
            <form method="POST" enctype="multipart/form-data">
            <div class="box-body no-padding" >
              <table class="table table-condensed" style="margin-left: 10%;margin-top: 5%;">
              <tbody>
                <tr>
                    <td class='col-xs-2 col-sm-2' style="padding-bottom:3%">Enter Old Password: </td>
                  <td><input type='password' class='col-xs-8 col-sm-6 btn btn-border' id='opwd' required></td>
                  <td>
                    <div id="err1" style="margin-right:50%;color: red;"></div>
                  </td>
                </tr>
                <tr>
                  <td class='col-xs-2 col-sm-2' style="padding-bottom:3%">Enter New Password:</td>
                  <td><input type='password' class='col-xs-8 col-sm-6 btn btn-border' id='pwd' onkeyup="checkl()">
                  </td>
                  <td>
                  <div id="err2" style="margin-left:-371%;color: red;margin-top:0%;"></div>
                  </td>
                </tr>
                <tr>
                  <td class='col-xs-2 col-sm-2' style="padding-bottom:3%">Re-Enter New Password:</td>
                  <td><input type='password' class='col-xs-8 col-sm-6 btn btn-border' id='cpwd' onkeyup='checkp()' required></td>
                  <td>
                  <div id="err3" style="margin-left:-371%;color: red;margin-top:0%;"></div>
                  </td>
                </tr>
                <tr>
                   <td>
                   </td>

                   <td>
                     <div id="err4" style="margin-left:0%;color: red;margin-top:0%;"></div>
                   </td>
                   <td>
                   </td>
                </tr>
                <tr>
                  <td colspan=2><input type="button" style='width:140px;margin-left:19%;margin-bottom:5%' id="btnch" class='btn btn-primary' name='btnch' value='Change Password'  ></td>
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
<?php 
if(isset($_SESSION['registered']))
{
  if($_SESSION['registered'] == "success")
    echo "<script>alert('Worker created Successfully!!!');</script>";
  elseif($_SESSION['registered']=="failure")
    echo "<script>alert('Failed to create a worker!!!');</script>";
  
  unset($_SESSION['registered']);
}


?>

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

<script type="text/javascript">
        $(function () {
            
            $("#btnch").click(function () {
                var opassword=$("#opwd").val();
                var password = $("#pwd").val();
                var confirmPassword = $("#cpwd").val();
                console.log(opassword+password+confirmPassword);
                if(!opassword)
                {
                //  alert('fr');
                  $('#err4').html('<p>Enter Old Password!!</p>');
                  return false;
                }
                else
                {
                  $('#err4').html('');
                }
                // if(!password)
                // {
                //   $('#err2').html('<p>Enter Password it is mandatory</p>');
                //   return false;
                // }
                // else
                // {
                //   $('#err2').html('');
                // }
                // if(!confirmPassword)
                // {
                //   $('#err3').html('<p>Enter Password it is mandatory</p>');
                //   return false;
                // }
                // else
                // {
                //   $('#err3').html('');
                // }
                
                 if (password != confirmPassword) {
                      $('#err4').html('<p>Passwords do not match.</p>');
                      //alert("Passwords do not match.");
                     return false;
                 }
                //old password matching
                $.post('pwdmatch.php',{pw:opassword,npw:confirmPassword},function(res){
                 if(res=='1')
                {
                    $('#err4').html('match');
                    window.location.href="../../../controller/sign_out_pwdchange.php";
                }
                else
                  $('#err4').html('<p>Old Password is Wrong</p>');             
                     });

            });
        });
        function checkp(){
          var confirmPassword = $("#cpwd").val();
          var password = $("#pwd").val();

            if(!confirmPassword)
            {
              $('#err3').html('<p><span class="glyphicon glyphicon-remove" style="margin-left:0%;margin-top:1%"></span></p>');
              return false;
            }
            else
            {
              $('#err3').html('<span class="glyphicon glyphicon-ok" style="margin-left:0%;margin-top:1%;color:blue"></span>');
            }
                 if (password != confirmPassword) {
  //                     $('#err4').html('<p>Passwords do not match.</p>');
                 $('#err3').html('<span class="glyphicon glyphicon-remove" style="margin-left:0%;margin-top:1%"></span>');
                 //alert("Passwords do not match.");
                return false;
            }
            else
            {
              $('#err2').html('<span class="glyphicon glyphicon-ok" style="margin-left:0%;margin-top:1%;color:blue"></span>');
            }

        }
        function checkl(){
              var confirmPassword = $("#cpwd").val();
              var password = $("#pwd").val();
              if(!password)
            {
              $('#err2').html('<span class="glyphicon glyphicon-remove" style="margin-left:0%;margin-top:1%"></span>');
              return false;
            }
            else
            {
              $('#err2').html('<span class="glyphicon glyphicon-ok" style="margin-left:0%;margin-top:1%;color:blue"></span>');
            }
      }
</script>



</body>
</html>
