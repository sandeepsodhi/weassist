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
  <title>Customer | Jobs Create</title>
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
  <!-- for claendar -->
      <link href="css/custom.css" rel="stylesheet">
 
    <link href="css/green.css" rel="stylesheet">
    <!-- clock -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap-clockpicker.min.css">
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
    color:#000000;
    background:transparent;
    border: solid 1px #808080;
    padding:3px;
    cursor:pointer;
}
select option { padding: 1px 5px 1px 3px;}
body {
  min-size:90%;
}
</style>
  </head>


<?php include('header.php');?>
<div class="content-wrapper"> 
  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Job Creation</li>
      </ol>
    </section>
	<br/>
 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
	 
		  <h1 >Create Job </h1>	<hr>	
		
        <!-- left column -->
	 </div>
	<div class="row" style="margin:0% 5% 0% 5%">
	

	<form class="form-horizontal"  id="editjob"  method="post"  enctype="multipart/form-data" action="insertjob.php">
   	<div class="form-group">
	<label id="profile-label"  for="jobcateg" style="margin-left:5%;width:11%" size="10%">Job Category</label>
	
  <select class="btn" name="jobcateg" id="jobcateg" style="border:1px solid grey; color:black ; width:25%; margin-left:3%" >
     <option value='' select=''>-- Select Category --</option>
   <?php 	require_once '../../../model/dbConnect.php'; 
   $select=mysqli_query($conn,"select cat_name,cat_id from category");
  //  echo $select->cat_name;
   while($row=mysqli_fetch_array($select,MYSQLI_ASSOC))
   {
	   echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>" ; 
   }
   $_SESSION['jvalid']='true';
   ?>-
  </select>
  <label id="profile-label"  for="subcateg" style="margin-left:5%; width:11%">Sub Category</label> 
<select class="btn" name="subcateg" id="subcateg" style="border:1px solid grey; color:black ; width:25%; margin-left:3%">
 <option value='' select='' required>-- Select Sub-Category --</option>
 
</select>
  </div>
  <div class="form-group">
  <label id="profile-label"  for="jobtitle" style="margin-left:5%; width:11%" size="10%">Job Title</label>
  <input type="text" id="jobtitle" name="jobtitle" placeholder="" style="border:1px solid grey; color:black ;width:25% ;font-family:none;font-size:130%;color:black;  margin-left:3%;" onkeydown="if(event.keyCode == 13) return false" required>
</div>
<div class="form-group">

<label id="profile-label"  for="jobdesc" style="margin-left:5%; width:11% ; margin-top:-50% "; >Job Description</label>
<textarea  rows="5" cols="110"  id="jobdesc" name="jobdesc" style="border:1px solid grey; color:black ; margin-left:3%" onkeydown="if (event.keyCode == 13) return false" required></textarea>

</div>
<div class="form-group">
<label id="profile-label"  for="jobprice" style="margin-left:5%; width:11%" size="10%">Enter Offer Price</label>
  <i class="fa fa-rupee" style="font-size:20px;margin-left:1%"></i>
  <input type="number" class="row" id="jobprice"style="border:1px solid grey; color:black ;width:25% ;font-family:none;font-size:130%;font-color:black;
    margin-left:5px" name="jobprice" placeholder="" onkeydown="if (event.keyCode == 13) return false" required >

</div>
<div class="form-group">
<label id="profile-label"  for="Edate" style="margin-left:5%; width:11%" size="10%">Select date</label>
        <input type="text" name="Edate"  id="Edate" class="row" placeholder="select Date"   style="width:25%;margin-left:3%;font-family:none;font-size:20px" onkeydown="if (event.keyCode == 13) return false" required>
        <span class="fa fa-calendar-o form-control-feedback right" aria-hidden="false"></span>
  <label id="profile-label"  for="tapp" style="margin-left:5%; width:11%">Select Time</label>         
<input type="text" id="tapp" name="tapp"   placeholder="E.g 00:00" style="font-family:none;" class="row"  aria-describedby="inputSuccess2Status" onkeydown="if (event.keyCode == 13) return false" required>
  <span class="glyphicon glyphicon-time form-control-feedback right" aria-hidden="false"></span>
</div>




<div class="form-group">
<label id="profile-label"  for="jobphoto" style="margin-left:5%; width:11%" >Upload Job Photo</label>
 
<img src='../../image/NewCandidateImage.jpg' width='100' height='100' alt=''  style='border-radius:20px;position:absolute;  z-index:1;margin-left: 3%;' id='jobshow' name='jobshow' />
<input type='file' name='jobphoto' style='width:100px; height:100px; position:relative;  z-index:2; opacity:0;margin-left: 19%;margin-top: -5%;'  accept=".jpg,.jpeg,.png,"  onchange='readURL(this)' />


 <!-- <input type="file" class="btn-primary" id="jobphoto" name="jobphoto" style="background-color:white;border:1px solid grey; color:black ;width:25%; margin-left:19%; margin-top:-3%"  accept=".jpg,.jpeg,.png," onchange="readURL(this)" >   -->
</div>
 <!-- <div class="form-group" style="margin-left:19%;width:20%;height:5%"> -->
<!-- <img id="jobshow" src="../../image/NewCandidateImage.jpg" style="width:50%;height:30%;">   -->
<!-- </div> -->



 <br/>
<div class="form-group">
<button type="submit" class="btn btn-info btn-primary" name="btnupdate" id="btnupdate"  style="width:20%; margin-left:20%;  " >Submit</button></div>
  </div>
	 </form>
   </div>
	  </div>
	   </section>	   
  

  <!-- /.content-wrapper -->
   <?php include 'footer_sidebar.php'; ?>

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<?php
if(isset($_SESSION['jobcreate']))
{
echo "<script>alert('Job Created sucessfully'); </script>";
unset($_SESSION['jobcreate']);
}

?>


<!-- wrapper -->

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


<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/additional-methods.min.js"></script>
  
<!-- calenadr -->
<script type="text/javascript" src="js/moment.min2.js"></script>
  <script type="text/javascript" src="js/daterangepicker.js"></script>

<script type="text/javascript">
$(document).ready(function(){
$("#jobcateg").change(function()
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
  $("#subcateg").html(html);

} 
});
});	
	});
</script>    
    <!--clock-->
    <script type="text/javascript" src="js/bootstrap-clockpicker.min.js"></script>
    <script type="text/javascript">
    $('.clockpicker').clockpicker()
    .find('input').change(function(){
        console.log(this.value);
    });
    var input = $('#tapp').clockpicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    'default': 'now'
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
    <script type="text/javascript">
        $(document).ready(function () {
            $('#Edate').daterangepicker({
                singleDatePicker: true,
                calender_style: "picker_1"
            }, function (start, end, label) {
                console.log(start.toISOString(), end.toISOString(), label);
            });
            
        });
    </script>
<!-- <script type="text/javascript">
$('#btnupdate').click(function(){
if(!$('#jobprice').val())
{
return false;
}  
});
</script>
 --></body>
</html>
