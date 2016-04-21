<?php session_start(); ?>
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
  
  
</head>
<body class="hold-transition skin-red-light sidebar-mini">
 <div class="wrapper">
  <?php include('header.php'); ?>
   <div class="content-wrapper">
     <section class="content-header">
     </section>
	 <section>
	   <div class="box-body table-responsive no-padding">
		 <div class="heading"><center><h2><b>Professional Detail</h2></b></center></div>
		  <div class="clear">&nbsp;</div>
	

					
	<section class="page-content">
			 <div class="box">
            <div class="box-header">
				<div class="container">
		<div class="form-horizontal center">
			<div class="box-body table-responsive no-padding">
			 <th>&nbsp;</th>
			 <ul>
			  <table class="table table-hover">
                <tbody><section>
				<tr>
				<th>Image</th>
				<th>Professional Name</th>
				<th>City </th>
				<th>Contact</th>
			<th>Profession </th>
				<th>&nbsp;</th>
				</tr>
				</section>
	

              <?php
//session_start();
                include  '../../../model/dbConnect.php';
			//	$sql=mysqli_fetch_assoc(mysqli_query($conn,"select channel from chat_user where pr_id in(select pr_id from profession where cat_id='$cat_id' and subcat_id='$subcat_id' and u_id in(select u_id from users where city='$subcat_city'))"));
				
				               // $rs = mysqli_query($conn,"select job_date,target_date,uname,photo from createjob");
//$rs=mysqli_query($conn,"select a.profile_pic,a.f_name,a.city,a.contact,b.f_name from users a join  b on a.uname=b.u_name where b.f_name='".$_SESSION['f_name']."' ");
$rs=mysqli_query($conn,"select a.profile_pic,a.f_name,a.city,a.contact,a.u_type from users a join profession b on a.u_id=b.u_id where ((select cat_name from category where cat_name='".$_SESSION['category']."' AND (select subcat_name from sub_category where subcat_name='".$_SESSION['sub_category']."' AND a.city='".$_SESSION['city']."') ");

           while($row=mysqli_fetch_row($rs))
              {   
              echo 
			 " 
			 <strong>
			  <tr> 
					<td><img style='border-radius:10px;width:70px;height:70px;' src='../../image/$row[0]'>
                    <td>$row[1]</td>
                    <td>$row[2]</td>
                    <td>$row[3]</td>  
                    <td>$row[4]</td>               

               </tr>
			   <br>
				   
</strong>
				   
                 				
  ";							  

              }

              ?>


			 

		</tbody>
		<th>&nbsp;</th>
		</table>
		</div>
			</div>
				</div>
				</div>
			</div>
				</div>
				</section>
				</div>
  
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