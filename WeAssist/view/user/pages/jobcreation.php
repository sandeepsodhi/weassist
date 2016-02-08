<?php session_start()
 ?>
<!DOCTYPE html>
<html>
<head>
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
  
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

h1 {
	font-size: 140%;
font-family: monospace;
color:#000000;
}
.dropdown{
  max-width: 200px;
}
select {
    font-size:14pt;
  width: 50%;
    letter-spacing:0.07em;
    color:#FFFFFF;
    background:transparent;
    border: solid 1px #808080;
    padding:3px;
    cursor:pointer;
}
select option { padding: 1px 5px 1px 3px;}
</style>
  </head>


<?php include('header.php');?>
<div class="content-wrapper"> 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
		  <h >Create Job .....</h>	<hr>	
		
        <!-- left column -->
	 </div>
	
	<form class="form-horizontal"  id="editjob"  method="post" action="updateprofile.php" enctype="multipart/form-data">
	<div class="row">
	<div class="form-group" >
	<div class="col-sm-2">
	</div>
		<div class="col-md-2"><label id="profile-label"  for="jobcateg">Job Category</label>
		</div>
	    	<div class="col-sm-5">
	
   <select name="jobcateg">
     <option value=""></option>
    <option value="Doctor">Doctor</option>
    <option value="Plumber">Plumber</option>
    <option value="Carpenter">Carpenter</option>
    <option value="Painter">Painter</option>
  </select>
  
	</div>
	</div>
	</div>
	
<br/>
<div class="row">
	<div class="form-group" >
	<div class="col-sm-2">
	</div>
		<div class="col-md-2"><label id="profile-label"  for="subcateg">Sub Category</label>
		</div>
	    	<div class="col-sm-5">
	 <select name="subcateg">
     <option value=""></option>
    <option value="Doctor">Doctor</option>
    <option value="Plumber">Plumber</option>
    <option value="Carpenter">Carpenter</option>
    <option value="Painter">Painter</option>
  </select>
	</div>	</div>	
	</div>
	
	</form>
	 </div>
	 </div>
	   </section>	   
</div>    
	   
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
   <?php include 'footer_sidebar.php'; ?>

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>


<!--Javascript Map-->
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
  $('#editprofile').submit(function(){
 return false;
});
 
$('#btnupdate').click(function(){
 $.post( 
 $('#editprofile').attr('action'),
 $('#editprofile :input').serializeArray()
 );
});
</script>
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

</body>
</html>
