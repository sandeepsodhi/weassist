<!DOCTYPE>
<html>
  <head>
      <title>WeAssist</title>
<?php 
  session_destroy();
  session_start();

  include '../../../model/dbConnect.php'; 

  $uname = $content['person']['email-address'];

  $result = mysqli_query($conn,"select u_id from users where u_name='$uname'") ;

  if(mysqli_num_rows($result) == 1)
  {
    $login =  mysqli_query($conn,"select u_id,u_type,profile_pic,city,contact,l_name,f_name from users where u_name = '$uname'");

    $lo = mysqli_fetch_assoc($login); 
   
    if (mysqli_num_rows($login) == 1) {

      $_SESSION['u_name']=$uname;
      $_SESSION['f_name']=$lo['f_name'];
      $_SESSION['l_name']=$lo['l_name'];
      $_SESSION['contact']=$lo['contact'];
      $_SESSION['city']=$lo['city'];
      $_SESSION['profile_pic']=$lo['profile_pic'];
      $_SESSION['u_type'] = $lo['u_type'];
      $_SESSION['u_id']=$lo['u_id'];
  
      if($_SESSION['u_type']=="worker")     
        {
            echo "<script>
                  opener.location.href = '../../../view/worker/pages/index.php';
                  close();
                  </script>      
                  ";
        }
      elseif($_SESSION['u_type']=="agent") 
            echo "<script>
                  opener.location.href = '../../../view/agent/pages/index.php';
                  close();
                  </script>      
                  ";
      elseif($_SESSION['u_type']=="customer")
            echo "<script>
                  opener.location.href = '../../../view/customer/pages/index.php';
                  close();
                  </script>      
                  ";
      else
          echo "here";
            // echo "<script>
            //       opener.location.href = '../../../view/main/index.php';
            //       close();
            //       </script>      
            //       ";
    }else{
    echo  $_SESSION['wrong'] = 'r';      
            // echo "<script>
            //       opener.location.href = '../../../view/main/index.php';
            //       close();
            //       </script>      
            //       ";
//      header("location:../view/main/index.php");
   }
  }
?>










      <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  
        <!-- CSS
  ================================================== -->
  <!-- Base + Vendors CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/fonts/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="css/fonts/entypo/css/entypo.css">
  <link rel="stylesheet" href="vendor/owl-carousel/owl.carousel.css" media="screen">
  <link rel="stylesheet" href="vendor/owl-carousel/owl.theme.css" media="screen">
  <link rel="stylesheet" href="vendor/magnific-popup/magnific-popup.css" media="screen">
  <link rel="stylesheet" href="vendor/flexslider/flexslider.css" media="screen">
  <link rel="stylesheet" href="vendor/job-manager/frontend.css" media="screen">

  <!-- slider button-->
  <link href="css/bootstrap-switch.css" rel="stylesheet">
      
  <!-- Theme CSS-->
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/theme-elements.css">
  <link rel="stylesheet" href="css/animate.min.css">

  <!-- login dialog -->
  <link href="assets/css/login.css" rel="stylesheet" />
  <link href="assets/css/padd.css" rel="stylesheet" />
      
    <!-- FONT AWESOME ICONS STYLE SHEET -->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    
  
  <!-- Favicons
  ================================================== -->
  <link rel="shortcut icon" href="images/favicons/favicon.ico">
  <link rel="apple-touch-icon" sizes="120x120" href="images/favicons/favicon-120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="images/favicons/favicon-152.png">

  <link href="assets/css/bootstrapValidator.css" rel="stylesheet"/> 



  </head>
  <body style="background-color:white ">




<?php
//print_r($content);
extract($_POST);


if(isset($_POST['sign_up']))
{

  $u_name = mysqli_escape_string($conn,$_POST["u_name"]);
  $pswd = mysqli_escape_string($conn,$_POST["pswdd"]);
  $f_name = mysqli_escape_string($conn,$_POST["f_name"]);
  $l_name = mysqli_escape_string($conn,$_POST["l_name"]);
  $u_type= mysqli_escape_string($conn,$_POST["u_type"]);
  $r_user= mysqli_escape_string($conn,$_POST["r_user"]);
  $profile_pic = $f_name.".jpg";  
  
  // $result = mysqli_query($conn,"select u_name from users");

  // while($row = mysqli_fetch_assoc($result))
  // {
  //     if($row['u_name'] ==  $u_name){
  //       $_SESSION['error'] = 'e';      
  //       // header("location:../view/main/index.php");
  //     break;
  //   }
  // }

  // echo $_SESSION['error'];
  // echo "<script>alert(".$_SESSION['wrong'].")</script>";


  if(isset($r_user))
  {
    if(isset($u_type) && $u_type == 'worker')
    {
      $checked = 'checked';
     echo $value ='worker' ;
      $r_code='NULL';
    }
  }
  
  function gen_random_string($length=16)
  {
    $chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";//length:36
    $r_code='';
    for($i=0;$i<$length; $i++)
    {
      $r_code .= $chars[ rand(0,strlen($chars)-1)];

    }
    return $r_code;
  }
            

  if(isset($u_type) && $u_type == 'agent')
  {
    $checked = 'checked';
   echo $value ='agent' ;
   echo $r_code = gen_random_string(8)."";
    $r_user='NULL';
    gen_random_string(8)."r_code"; //generates a string with length 8

  }
  
  if(isset($u_type) && $u_type == 'customer')
  {
    $checked = 'checked';
   echo $value ='customer' ;
    $r_user='NULL';
    $r_code='NULL';
  }
  
  if(isset($u_type) && $u_type == 'worker')
  {
    $checked = 'checked';
    $value ='worker' ;
    $r_code='NULL';

  }

  
$in_ch=mysqli_query($conn,"call register('".$f_name."','".$l_name."','".$u_name."','".$pswd."','".$u_type."','".$r_code."','".$r_user."','".$profile_pic."')"); 

if($in_ch==1)  
{  
    session_destroy();
    session_start();
  
    $_SESSION['u_name']=$u_name;
    $_SESSION['f_name']=$f_name;
    $_SESSION['l_name']=$l_name;
    $_SESSION['u_type'] = $u_type;
  
  
  $pic = mysqli_fetch_row(mysqli_query($conn,"select u_id,profile_pic from users where u_name = '$u_name'"));



  $_SESSION['profile_pic'] = $pic[1];
  $_SESSION['u_id'] = $pic[0];

  if($_SESSION['u_type']=="agent")     
  { 
    echo "<script>
      opener.location.href = '../../../view/agent/pages/profile.php';
      close();
      </script>      
      ";
 }
  elseif($_SESSION['u_type']=="worker") 
    echo "<script>
      opener.location.href = '../../../view/worker/pages/profile.php';
      close();
      </script>      
      ";
  elseif($_SESSION['u_type']=="customer")   
    echo "<script>
      opener.location.href = '../../../view/customer/pages/profile.php';
      close();
      </script>      
      ";
  else
  {
    echo $_SESSION['error'] = 'e';
    header("location:../view/main/index.php");
  }
}  
else  
{  
 echo $_SESSION['error'] = 'e';
  echo "<script>
    opener.location.href = '../../../view/main/index.php';
    close();
    </script>      
    ";
}


}
else
{
$fname = $content['person']['first-name'];
$lname = $content['person']['last-name'];
$uname = $content['person']['email-address'];
$pic = $content['person']['picture-url'];

// define('DIRECTORY', '../../../view/images/');

$content = file_get_contents($pic);
file_put_contents('../../../view/image/'.$fname.'.jpg', $content);

//require_once '../../../model/dbConnect.php';

//  $fname = $content['person']['first-name'];
//  $lname = $content['person']['last-name'];
//  $uname = $content['person']['email-address'];

// $result = $conn->prepare("call linkedin_login(?,?,?)");
// $result->bind_param("sss",$uname,$fname,$lname);
// $result->execute();

// echo "<script>
//       opener.location.href = '../../../view/handy/job-dashboard.html';
//       close();
//       </script>      
//       ";


?>
<div class="container" style="margin-left: 28%; margin-top: 3%;">
  <img src="logo.png" style="height: 56px; width: 158px; margin-left: -52%;margin-bottom: 20px">
  <img src="linkedin.png" style="height: 43px; width: 131px; margin-left: 10%;margin-bottom: 20px">


  <form class="form-horizontal" enctype="multipart/form-data" name="signupform" id="signupform" method="POST" action="html.php">
      <div class="form-group">
        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-5 dialog-s ">
          <div class="input-group-addon">
              <i class="fa fa-user"></i>
          </div>
          <input type="text" class="form-control" id="f_name" value="<?php echo $fname?>" name="f_name" placeholder="First Name"  required disabled>
          <div class="input-group-addon" style="margin-left:10px" &nbsp;>
            <i class="fa fa-user"></i>
          </div>
          <input type="text" class="form-control"  name="l_name" value="<?php echo $lname?>" id="l_name" placeholder="LastName" disabled>
        </div>
        </div>
        <div class="form-group">
          <div class="input-group col-xs-10 col-sm-5 dialog-s">
            <div class="input-group-addon">
                <i class="fa fa-at"></i>
            </div>
            <input type="email" class="form-control" id="u_name" name="u_name" value = "<?php echo $uname?>" placeholder="Email" onkeyup="showUser(this.value)" required disabled></p>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group col-xs-10 col-sm-5 dialog-s">
            <div class="input-group-addon">
                <i class="fa fa-lock"></i>
            </div>
            <input type="password" class="form-control" id="pswdd" name="pswdd" placeholder="Password" required>
          </div>
        </div>
        <div class="form-group" id="s">
          <div class="input-group col-xs-10 col-sm-5 dialog-s">
            <div class="input-group-addon">
                <i class="fa fa-lock"></i>
            </div>
            <input type="password" class="form-control" id="c_pswd" name="c_pswd" placeholder="Confirm Password" onkeyup="checkPasswordMatch();" required>
          </div>                               
        </div>
        <div class="form-data" style="margin-left:-15px;margin-bottom: 15px">
          <div class="input-group col-xs-10 col-sm-5 dialog-s">
            <div class="input-group-addon">
                <i class="fa fa-user"></i>
            </div>   
            <input  type="text" class="form-control" id="r_user" name="r_user" placeholder="Refered user">
          </div>
        </div>
        <div class="form-group col-xs-10 col-sm-5">
          <div class="input-group col-xs-12 col-sm-5 dialog-s"  style="width:114%; margin-left: 32px;"> 
            <div class="input-group-addon">
              <i class="fa fa-user-secret"></i>
            </div>   
            <select name="u_type" id="u_type" class="form-control col-xs-10 col-sm-5" required>
              <option value="" selected="selected" disabled><center>Choose User type</center></option>
              <option value="agent" id="u_type">Agent</option>
              <option value="worker" id="u_type" >Worker</option>
              <option value="customer" id="u_type" >Customer</option>
            </select>
          </div>
        </div>            
        <div class="form-group" style="margin-left:-50%">
            <div class="col-xs-offset-3 col-xs-6">
                <button type="submit" id="sign_up" name="sign_up" style="width:220px;"class="btn btn-info btn-primary">SignUp</button>
            </div>
        </div>
      <!--   <div class="form-group" style="margin-top:-6%;margin-top:initial;">
            <div class="input-group col-xs-10 col-sm-10 dialog-s">
            </div>
        </div> -->
  </form>
</div>


<?php } ?>


<script src="assets/js/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/bootstrapValidator.js">
</script>

<!-- for sign up -->
<script>
$('#signupform').bootstrapValidator({
container: "popover",
message: 'This value is not valid',
  feedbackIcons: {
            // valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
  fields: {
      f_name: {
          validators: {
              notEmpty: {
                  message: "You're required to fill in a first name!"
                    }, // notEmpty
          regexp: {
                  regexp: /^[A-Za-z\s.'-]+$/,
                  message: "Alphabetical characters, hyphens and spaces"
            }
          } // validators
                },
          // firstname
      l_name: {
          validators: {
              notEmpty: {
                  message: "You've forgotten to provide your last name!"
                    },
        regexp: {
                  regexp: /^[A-Za-z\s.'-]+$/,
                  message: "Alphabetical characters, hyphens and spaces"
              }               // notEmpty
                } // validators
                },  // lastname
      email: {
          validators: {
              notEmpty: {
                  message: "An email address is mandatory."
                    }, // notEmpty
        emailAddress: {
                  message: "This is not a valid email address"
                      } // emailAddress     
                } // validators
                }
          // email
    
    }, // fields
    pswdd: {
          validators: {
              notEmpty: {
                  message: 'The password is required and can\'t be empty'
              }
          }
      },
    c_pswd: {
          validators: {
              notEmpty: {
                  message: 'The confirm password is required and can\'t be empty'
              },
              identical: {
                  field: 'pswdd',
                  message: 'The password and its confirm are not the same',
              }
          }
      }
});
</script>


<script type="text/javascript">
$(document).ready(function(){
    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="worker"){
                $(".form-data").not(".form-data").hide();
                $(".form-data").show();
            }
            else{
                $(".form-data").hide();
            }
        });
    }).change();
});
</script>


  
<script>

function checkPasswordMatch() {
    var pswd = $("#pswdd").val();
    var c_pswd = $("#c_pswd").val();
    if (pswd != c_pswd)
    {
      $('#s').addClass("has-error");
    }
    else
    {
      $('#s').addClass("has-success");
    }
}
</script>


  </body>




</html>
