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
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>

</head>
	 
<body class="hold-transition skin-red-light sidebar-mini">
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
<div class="wrapper">
<?php include('header.php');?>  
<div class="content-wrapper"> 				<th>&nbsp;</th>

		 <div class="heading"><center><h2><b> Add Professional Details</h2></b></center></div>
<section class="content" >
  <div class="box box">
   <div class="box-header with-border">
   
			<div class="box-body box-profile">
			<div class="row">
			<div class="col-md-2">
				</div>
			<div class="col-md-7">
				
		        
                    <form action="../../../controller/profile_conn.php" method="POST" enctype='multipart/form-data' onSubmit="return checkblank();">
                        <div class="form-group">
		                        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-10 dialog-s ">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                            <input type="text" class="form-control" id="u_id" name="u_id"  onkeyup="isalphanum(this) "placeholder="User_Id"  required>
											</div>
											</div>
										<div class="form-group">
		                        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-10 dialog-s ">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
											<select name="cat_name" id="cat_name" class="form-control"required>
											                                        <option value="">

                                        <option value="health">health</option>
                                        <option value="construction">construction</option>
                                        <option value="design">design</option>
										 <option value="security">electrical</option>
                                        <option value="handwork">handwork</option>
                                        <option value="recovery">recovery</option>
                                        <option value="security">security</option>
                                        <option value="home_building">home_building</option>
                                       
                                    </select>
											</div>
											</div>
												<div class="form-group">
		                        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-10 dialog-s ">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                            	<select name="subcat_name" id="subcat_name" class="form-control"placeholder="select"required >
                                        <option value="">

                                        <option value="doctor">doctor</option>
                                        <option value="plumber">plumber</option>
										  <option value="design">kitchen_design</option>
                                        <option value="painter">painter</option>
                                        <option value="electrician">electrician</option>
                                        <option value="cleaner">cleaner</option>
                                        <option value="contractor">contractor</option>
                                        <option value="locksmith">locksmith</option>
                                       
                                    </select>
											</div>
											</div>
													<div class="form-group">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-phone"></i>
		                            </div>
                                           <input type="contact" class="form-control" id="contact" name="contact"  placeholder="Contact"  required>
		                        </div>
		                    </div>
							
											<div class="form-group">
											<div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-home"></i>
										</div>
												<input type="text" name="city" id="searchCityField" class="form-control" placeholder="Enter a Location" required>
												<input type="hidden" id="city"/>
											</div>
										</div>
 <div class="form-group">
                        <div class="input-group col-xs-10 col-sm-10 dialog-s">
                            <div class="input-group-addon">
                                <i class="fa fa-photo"></i>
                            </div>
                            <input type="file" class="form-control" name="image" id="image"  accept=".jpg,.jpeg,.png" required>
                        </div>
                    </div>
					<br>
											<div class="form-group">
		                        <div class="col-xs-offset-3 col-xs-6">
								                            <div class="button-addon">

								 <i class="entypo entypo-check"></i>
								 </div>
		                            <button style="width:120px;margin-left:-30px"type="submit" class="btn btn-info btn-primary">Save</button>
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
<script type="text/javascript">
  function change(){
   $('#cat_name').prop("readonly",false);
  }
  </script>
  
</div> 
</body>
</html>