<?php session_start();
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
  <title>Customer | Profile</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/profilelabel.css">
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; 
color:black;
}

</style>
  </head>


<?php include('header.php');?>

<div class="content-wrapper"> 

  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">My Profile</li>
      </ol>
    </section>
	<br/>
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
		  <h >My Profile</h>	<hr>	
		
        <!-- left column -->
		
   <div class="box-body box-profile">
     <div class="row">
        <div class="col-md-2">
		
		</div>
	
        <div class="col-md-7" id="forms">
		<br/>
     
    	<form class="form-inline"  id="editprofile"  method="post" name="editprofile" enctype="multipart/form-data" action="updateprofile.php" style="font-style: normal">
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="f_name">First Name:</label> </div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="f_name" id="f_name" onkeyup="isalphanum(this)"  onblur="fnamevalid()" size="28%" value="<?php echo $_SESSION['f_name']; ?>" readonly required></div>
         <div class="col-md-1">
		 
		<a href="#" onclick="changefname()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
		</div>
	   
	   </div>
	    </div>

	    <br/>
	
	
	
	
	  	
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="l_name">Last Name:</label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="l_name" id="l_name" size="28%" value="<?php echo $_SESSION['l_name'];  ?>" onkeyup="isalphanum(this)" onblur="lnamevalid()" required readonly ></div>
        <div class="col-md-1">	    
		<a href="#" onclick="changelname()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
         </div>
		</div>
		</div>
 	    
		<br/>
	
	
	  	<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="email">Email :  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="email" id="email" size="28%" value="<?php echo $_SESSION['u_name']; ?>" onkeyup="isalphanum(this)" required readonly ></div>
	     <div class="col-md-1">		
<!-- 		<a href="#" onclick="changeemail()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
 -->          </div>
		</div>
	    </div>
     	<br/>
	    
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="phone">Phone No :&nbsp</label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="phone" id="phone" size="28%" value="<?php if(isset($_SESSION['contact'])){
      echo $_SESSION['contact']; }?>"  onkeyup="isalphanum(this)" onkeyup="phonevalid()" required readonly ></div>
	     <div class="col-md-1">		
		<a href="#" onclick="changephone()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
        </div>
		</div>
		</div>

<!-- 	    <br/>
        <div class="row">
    <div class="form-group" >
    <div ><label id="profile-label"  for="changepwd">Change Password :</label>
    &nbsp&nbsp&nbsp&nbsp&nbsp
    <input  type="password" class="form-control" name="changepwd" id="changepwd" style="margin-left: 0%"size="49%" value=""   ></div>
    </div>
    </div>
 --><br/>
	 
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="city">City :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
  <input  type="hidden"  name="State" id="State"  size="0px"  >
    <input  type="hidden"  name="Country" id="Country" size="0px"    >
		</div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="city" id="city" size="28%" value=" " placeholder="Enter Your City" onkeydown="if (event.keyCode == 13) return false" ></div>
	    </div>
		</div>
	    
		
<!-- 		<div class="row">
		<div class="form-group" >
		<div class="col-md-4"><label id="profile-label"  for="image">Picture :&nbsp&nbsp&nbsp&nbsp</label></div>
        <div class="col-md-7">
    	 <input type="file" class="form-control" id="image" name="image"  style="padding:0px;" accept=".jpg,.jpeg,.png," >	
        </div>       
		<div class="col-md-2">
		</div>
	    </div>
		</div>
	  
 -->	    
		  <br/>

        
		<div class="row">
		<div class="form-group" >
	 	<button type="submit" style="width:90%; margin-left:70%;  "type="submit" id="btnupdate" name="btnupdate"  class="btn btn-info btn-primary">Update</button>
    	</div>
		</div>
 	    
	    <br/><br/><br/>
		
	

	</div>
<div class="col-md-2" style="margin-left:-4%">
<?php
$_SESSION['logstat']='true'; 
include('../../../model/dbConnect.php');
$res=mysqli_query($conn,"select profile_pic from users where u_name='".$_SESSION['u_name']."'");
$rs=mysqli_fetch_row($res);
?>
<br/>
<img class="profile-user-img img-responsive img-circle" src="../../image/<?php echo $_SESSION['profile_pic']?>"  width='150' height='150' alt=''  style='border-radius:30px;position:absolute;  z-index:1;'  id="pic">
<input type='file' name='image' id="image" style='width:100px; height:100; position:relative;  z-index:2; opacity:0;' onchange='readURL(this)'  accept=".jpg,.jpeg,.png,"/>

        </div>
</form> 
	
		
		
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


<!--Javascript Map-->

<script type="text/javascript">
         function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#pic')
                        .attr('src', e.target.result)
                        .width(100)
                        .height(100);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
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
<!--End of javascript map-->

<!-- ./wrapper -->

<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/additional-methods.min.js"></script>

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
  function changefname(){
	 $('#f_name').prop("readonly",false);
  }
  function changelname(){
	 $('#l_name').prop("readonly",false);
  }
  function changeemail(){
	 $('#email').prop("readonly",false);
	 }
	 function changephone(){
	 $('#phone').prop("readonly",false);
	 }
  </script>
  <script>
  /*$('#editprofile').submit(function(){
 return false;
});*/
 
/*$('#btnupdate').click(function(){
 $.post( 
 $('#editprofile').attr('action'),
 $('#editprofile :input').serializeArray()
 );
});*/

</script>
<script type="text/javascript">
  function fnamevalid()
  {

  }
  function lnamevalid()
  {
    
  }
  function phonevalid()
  {
    var ph=$('phone').val();
    
  }
</script>
<script type="text/javascript">
  //$(document).ready(function() {
// $('#btnupdate').click(function(){
//     $('#editprofile').bootstrapValidator({
//         container: '#forms',
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             f_name: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The full name is required and cannot be empty'
//                     }
//                 }
//             },
//             l_name: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The full name is required and cannot be empty'
//                     }
//                 }
//             },
//             email: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The email address is required and cannot be empty'
//                     },
//                     emailAddress: {
//                         message: 'The email address is not valid'
//                     }
//                 }
//             },
//             phone: {
//                 validators: {
//                     notEmpty: {
//                         message: 'The content is required and cannot be empty'
//                     },
//                     Length: {
//                         max: 10,
//                         message: 'The content must be less than 500 characters long'
//                     }
//                 }
//             }
//         }
//     });
// });
//});

</script>

<!--
<script>

$(document).ready(function() { 

  $('#btnupdate').click(function() {  

    $(".error").hide();
    var hasError = false;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailblockReg =
     /^([\w-\.]+@(?!yahoo.com)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;

    var emailaddressVal = $("#email").val();
    if(emailaddressVal == '') {
    //  $("#email").after('<span class="error">Please enter your email address.</span>');
      alert("Enter your Email Address");
	  hasError = true;
    }

    else if(!emailReg.test(emailaddressVal)) {
      $("#email").after('<span class="error"><font color="red">?</span>');
      hasError = true;
    }

    else if(!emailblockReg.test(emailaddressVal)) {
      $("#email").after('<span class="error">No yahoo, gmail or hotmail emails.</span>');
      hasError = true
    } 

    if(hasError == true) { return false; }

    });
});
</script>
-->
</body>
</html>
