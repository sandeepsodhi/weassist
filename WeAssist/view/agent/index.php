<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>AdminLTE 2 | Dashboard</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="/dist/css/skins/_all-skins.min.css">
<!--  <link rel="stylesheet" href="plugins/iCheck/flat/blue.css">-->
  <!-- Morris chart -->
  <link rel="stylesheet" href="plugins/morris/morris.css">
  <!-- jvectormap -->
 <!-- <link rel="stylesheet" href="plugins/jvectormap/jquery-jvectormap-1.2.2.css">-->
  <!-- Date Picker -->
  <link rel="stylesheet" href="plugins/datepicker/datepicker3.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker-bs3.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <style>

.select {
    
    color:#000000;
    background:transparent;
   
}
select option { padding: 1px 5px 1px 3px;}
</style>
</head>

<body class="hold-transition skin-red-light sidebar-mini" style ="min-hide:900px">
<div class="wrapper">

 <?php include('header.php'); ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      
    <!--  <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>-->
    </section>

    <!-- Main content -->
   <div class="search-box">
						<div class="container">
							<div class="search-box-inner">
							<div class="heading"><center><h2><b>Search For Professionals</h2></b></center></div>
												<div class="clear">&nbsp;

								<form action="../../../controller/search_conn.php" method="POST" role="form">
												<div class="clear">&nbsp;</div>

									<div class="row">
										<div class="col-md-3 col-md-offset-1">
											<div class="form-group">
												<div class="select-style">
													<select class="form-control" name="category" id="category" placeholder="category">
										     <option value=''disabled='' select=''>-- Select Option --</option>
 
												 <?php 	require_once '../../../model/dbConnect.php'; 
													$select=mysqli_query($conn,"select cat_name,cat_id from category");
												   while($row=mysqli_fetch_array($select,MYSQLI_ASSOC))
												   {
													   echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>" ; 
												   }
												   
												   ?>
												   	</select>											
												</div>
											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<div class="select-style">
													<select class="form-control" name="sub_category" id="sub_category" placeholder="sub_category">
										 <option value=''disabled='' select=''>-- Select Option --</option>

													</select>
												</div>
											</div>
										</div>
										
								
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" name="city" id="searchCityField" class="form-control" placeholder="Enter a Location">
												<input type="hidden" id="city"/>
											</div>
										</div>
										<div class="col-md-1">
											<button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search"></i></button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
        <!-- /.Left col -->
        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 <?php include 'footer_sidebar.php'; ?>

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<script src="plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.5 -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="plugins/morris/morris.min.js"></script>
<!-- Sparkline -->
<script src="plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="plugins/knob/jquery.knob.js"></script>
<!-- daterangepicker -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script>
<script src="plugins/daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="plugins/datepicker/bootstrap-datepicker.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/app.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="dist/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>


<script type="text/javascript">
function initialize() {
 var options = {
  types: ['(cities)'],
 //componentRestrictions: {country: "in"}
 };
 var input = document.getElementById('searchCityField');
 var autocomplete = new google.maps.places.Autocomplete(input,options);
 var inputcity = document.getElementById('city');
 if(inputcity!=undefined)
 {
  var autocompletecity = new google.maps.places.Autocomplete(inputcity,options);
 }
}

function myScript()
{
document.getElementById('search').value='';
$(".search-results").hide();
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>
<script type="text/javascript">
$(document).ready(function(){
$("#category").change(function()
{
var id=$(this).val();
console.log(id);
var dataString = 'id='+ id;
console.log(dataString);
$.ajax
({
type: "POST",
url: "retrievesubcateg.php",
data: dataString,
cache: false,
success: function(html)
{
$("#sub_category").html(html);

} 
});
});	
	});
</script>    
<script  type="text/javascript">
function readURL(input){
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#jobshow')
                        .attr('src', e.target.result)
                        .width(100)
                        .height(100);
                };

                reader.readAsDataURL(input.files[0]);
            }


}
</script>

</body>
</html>


