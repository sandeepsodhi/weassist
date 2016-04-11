  <?php //session_start();
 ?>
 <?php include 'header.php';?>  

<!DOCTYPE html>
<html>
<head>
<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="jquery.dreamalert.js"></script>
<link href="jquery.dreamalert.css"rel="stylesheet">

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>AdminLTE 2 | Widgets</title>
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
  
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

</style>
  </head>
<body class="hold-transition skin-red-light sidebar-mini">

<div class="wrapper">


	 
<div class="content-wrapper"> 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
		                            <div class="label-addon">
          								 <i class="fa fa-user-plus"></i>

		  <h >Add User</h>		
		  			<!--	<h5>	<a href="profession.php">Add Professional Details</a><h5>-->
<hr>
		</div>
        <!-- left column -->
		
   <div class="box-body box-profile">
     <div class="row">
        <div class="col-md-2">
		
		</div>
	
        <div class="col-md-7">
		<br/>
     
  <!--  	<form class="form-inline"  id="editprofile"  method="post" action="updateprofile.php">
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="f_name">First Name:</label> </div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="f_name" id="f_name" size="28%" value="<?php// echo $_SESSION['f_name']; ?>" readonly ></div>
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
	    <div class="col-md-8"><input  type="text" class="form-control" name="l_name" id="l_name" size="28%" value="<?php echo $_SESSION['l_name']; ?>" readonly ></div>
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
		<div class="col-md-3"><label id="profile-label"  for="email">Email :  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="email" id="email" size="28%" value="<?php //echo $_SESSION['email']; ?>" readonly ></div>
	     <div class="col-md-1">		
		<a href="#" onclick="changeemail()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
          </div>
		</div>
	    </div>
     	<br/>
	    
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="phone">Contact : </label></div>
	    <div class="col-md-8"><input  type="contact" class="form-control" name="contact" id="contact" size="28%" value="<?php //echo $_SESSION['l_name']; ?>" readonly ></div>
	     <div class="col-md-1">		
		<a href="#" onclick="changephone()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
        </div>
		</div>
		</div>
	    <br/>
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="r_user">Reference User :  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  </label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="email" id="email" size="28%" value="<!--" readonly ></div>
	     <div class="col-md-1">		
		<a href="#" onclick="changeemail()">
          <span class="glyphicon glyphicon-pencil" style="margin-top:7px"></span>
        </a>
          </div>
		</div>
	    </div>
     	<br/>
	 
		<div class="row">
		<div class="form-group" >
		<div class="col-md-3"><label id="profile-label"  for="phone">City :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label></div>
	    <div class="col-md-8"><input  type="text" class="form-control" name="city" id="city" size="28%" value="<?php //echo $_SESSION['l_name']; ?>"  ></div>
	    </div>
		</div>
	    
		
       


		<div class="row">
		<div class="form-group" >
		<div class="col-md-4"><label id="profile-label"  for="image">Picture :&nbsp&nbsp&nbsp&nbsp</label></div>
        <div class="col-md-7">
    	 <input type="file" class="form-control" id="image" name="image"  style="padding:0px;" accept=".jpg,.jpeg,.png," >	
        </div>       
		<div class="col-md-2">
		</div>
	    </div>
		</div>
	    <br/>
	    
		

        
		<div class="row">
		<div class="form-group" >
	    
		<button type="submit" style="width:80%; margin-left:70%;  "type="submit" id="btnupdate" name="btnupdate"  class="btn btn-info btn-primary">Update</button>
    	</div>
		</div>
 	    </form>	-->
		    <form class="form-horizontal" enctype="multipart/form-data" method="POST" action="../../../controller/worker_conn.php" onsubmit="return validateform">
		                    <div class="form-group">
		                        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-10 dialog-s ">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                            <input type="text" class="form-control" id="f_name" name="f_name"  onkeyup="isalphanum(this)" required>
											</div>
											</div>
		                           <div class="form-group">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                           <input type="text" class="form-control" id="l_name" name="l_name"  required>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-at"></i>
		                            </div>
                                            <input type="email" class="form-control" id="u_name" name="u_name"  onclick="showUser(this.value)"  required>
		                        </div>
		                    </div>
		                    <div class="form-group">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-lock"></i>
		                            </div>
                                           <input type="password" class="form-control" id="pswd" name="pswd"  required>
		                        </div>
		                    </div>
					
						
					
					<div class="form-group">
		                        <div class="col-xs-offset-3 col-xs-6">
								                            <div class="button-addon">

								 <i class="entypo entypo-check"></i>
								 </div>		  				

		                            <button style="width:120px;margin-left:-30px" onclick="validate()" class="btn btn-info btn-primary">SignUp</a></button>
		                        </div>
								
		                    </div>
					</form>
					</div>		
	    <br/><br/><br/>
		
	

	
	
		
		
		</div>
	
	
		</div>
	
       </div>
   </div>
	   </section>	   
</div>    
	   
	   </div>
   </div>
	   </section>	   
</div>
      <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <!-- Main content -->
      <!-- /.row (main row) -->

    </section>
    <!-- /.content -->
  </div>

  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.2
    </div>
    <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>

  <!-- Control Sidebar -->
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
<!-- Slimscroll -->
<script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script type="text/javascript">
function validate(){
var u_name = document.getElementById("u_name").value;
var u_type = document.getElementById("u_type").value;

if ( u_name == "u_name" && u_type == "u_type"){
alert ("Login successfully");
//window.location = "location: index.php"; // Redirecting to other page.
}
else{
alert("You have left  attempt;");
// Disabling fields after 3 attempts.

}

</script>
<script>
$.dreamAlert({

	  'type'      :   'signup',

	  'message'   :   'Completed!'

	});
	$.dreamAlert.close();
	</script>
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
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
  $('input[name=city]').change(function () {
		alert("done");
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
 <script>
  function initialize() {
		
        var options = {
            types: ['(signup)'],
            //componentRestrictions: {country: "in"}
        };
        var input = document.getElementById('signup');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
          	
		//console.log(autocomplete);
	}
            
            function show_code(obj) {
                $(obj).parent().next().slideDown();
            }
            
            $(document).ready(function() {

                $('#button2').click(function(){
                    $.dreamAlert({
                        'type'      :   'success',
                        'message'   :   'Operation completed!'
                    });
                });
              
        </script>

</body>
</html>
