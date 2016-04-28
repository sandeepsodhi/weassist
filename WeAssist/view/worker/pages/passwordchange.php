<?php session_start();
require_once '../../../model/dbConnect.php'; 
              
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
  <title>Customer | Password</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  
  <!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/profilelabel.css">
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

h1 {
  font-size: 140%;
font-family: monospace;
color:#000000;
}
</style>
</head>
<?php include('header.php');?>
<div class="content-wrapper"> 
  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Change Password</li>
      </ol>
    </section>
  <br/>
 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
   <h>Change Password</h>

        <!-- left column -->
   </div>

  <div class="row" style="margin:5% 10% 10% 10%">
    
       <div class="col-md-10">
        <form class="form-inline"  id="editprofile"  method="post" name="editprofile" enctype="multipart/form-data" action="updateprofile.php" style="font-style: normal">
              <div class="form-group" >
                <table >
                   <tr>
                     <td>
                       <label for="opwd" id="profile-label">Enter Old Password:</label></td>
                     <td >
                       <input type="password" class="form-control" id="opwd" style="margin-left:15%;width:180%;border:1 px solid  black;height:90%" ></td>
                       <td><div id="err1" style="margin-left:15%;color: red;"></div></td>
                       </tr>
                   <tr>
                   
                   <tr>
                     <td>
                       <label for="pwd" id="profile-label" style="margin-top:9%;">Enter New Password:</label></td>
                     <td >
                       <input type="password" class="form-control" id="pwd" onkeyup="checkl()" style="margin-left:15%;width:180%;border:1 px solid  black;height:90%;;margin-top:9%;" ></td>
                       <td><div id="err2" style="margin-left:150px;color: red;margin-top:5px;"></div></td>
                       </tr>
                   <tr>
                     <td>
                       <label for="npwd" id="profile-label" style="margin-top:9%;">Re-Enter New Password:</label></td>
                     <td >
                       <input type="password" class="form-control" id="cpwd" onkeyup="checkp()" style="margin-left:15%;width:180%;border:1 px solid  black;height:90%;margin-top:9%;" ></td>
                       <td><div id="err3" style="margin-left:150px;color: red;margin-top:5px;"></div></td>
                       </tr>     
                   </table>
                   <table>
                     <tr>
                     <td>
                     </td>
                     <td >
                     <div id="err4" style="margin-left:200px;color: red;margin-top:15px;width: 120%"></div>
                     </td>
                       <td></td>
                       </tr>     

                       <tr>
                       <td></td>
                     <td>
                      <input type="button" name="btnch" class="btn btn-info" id="btnch" style="margin-top:15px;margin-left:200px;width:140px;"  value="Change"> </input>
                      </td>
                       </tr>                       
                </table>
                
              </div>
              
        </form>
<br/><br/><br/>
       </div>

  </div>
   </div>
    </div>
     </section>    
  
     
     </div>
   

  <!-- /.content-wrapper -->
   <?php include 'footer_sidebar.php'; ?>

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>



<!-- ./wrapper -->

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
<script src="../dist/js/demo.js"></script>
<script type="text/javascript">
        $(function () {
            
            
            $("#btnch").click(function () {
                var opassword=$("#opwd").val();
                var password = $("#pwd").val();
                var confirmPassword = $("#cpwd").val();
                var s1,s2,s3;
                //s1=$("#opwd").val().length;
                s2=$("#pwd").val().length;
                s3=$("#cpwd").val().length;
                
                if(!opassword)
                {
                  $('#err4').html('<p>Enter Password !!</p>');
                  return false;
                }
                else
                {
                  $('#err4').html('');
                }
                if(!password)
                {
                  $('#err4').html('<p>Enter Password !!</p>');
                  return false;
                }
                else
                {
                  $('#err4').html('');
                }
                if(!confirmPassword)
                {
                  $('#err4').html('<p>Enter Password !!</p>');
                  return false;
                }
                else
                {
                  $('#err4').html('');
                }
                
                 
                 if (password != confirmPassword) {
                      $('#err4').html('<p>Password do not match.</p>');
                      //alert("Passwords do not match.");
                     return false;
                 }
                 if((s2<8||s3<8))
                    {  $('#err4').html('<p>Password should be greater than 8.</p>');
                       return false;
               }
                //old password matching
                $.post('pwdmatch.php',{pw:opassword,npw:confirmPassword},function(res){
                 if(res=='1')
{                  $('#err4').html('match');
                $.post('pwdsame.php',{npw:confirmPassword},function(res){
                 if(res=='1')
 {              //    $('#err4').html('match');
                 window.location.href="../../../controller/sign_out_pwdchange.php";
 }
                else
                  $('#err4').html('<p>You Cant set same password</p>');             
                     });

                
 }
                else
             {     $('#err4').html('<p>Old Password is Wrong</p>');  
                   return false;           
                   
              }
                     });
               

            });
        });
        function checkp(){
              var confirmPassword = $("#cpwd").val();
              var password = $("#pwd").val();

                if(!confirmPassword)
                {
                  $('#err3').html('<p><span class="glyphicon glyphicon-remove" style="margin-left:40px;margin-top:10px"></span></p>');
                  return false;
                }
                else
                {
                  $('#err3').html('<span class="glyphicon glyphicon-ok" style="margin-left:40px;margin-top:10px;color:blue"></span>');
                }
                     if (password != confirmPassword) {
//                     $('#err4').html('<p>Passwords do not match.</p>');
                     $('#err3').html('<span class="glyphicon glyphicon-remove" style="margin-left:40px;margin-top:10px"></span>');
                     //alert("Passwords do not match.");
                    return false;
                }
                else
                {
                  $('#err2').html('<span class="glyphicon glyphicon-ok" style="margin-left:40px;margin-top:10px;color:blue"></span>');
                }

            }
            function checkl(){
                  var confirmPassword = $("#cpwd").val();
                  var password = $("#pwd").val();
                  if(!password)
                {
                  $('#err2').html('<span class="glyphicon glyphicon-remove" style="margin-left:40px;margin-top:10px"></span>');
                  return false;
                }
                else
                {
                  $('#err2').html('<span class="glyphicon glyphicon-ok" style="margin-left:40px;margin-top:10px;color:blue"></span>');
                }
              

            }
    </script>
</body>
</html>
