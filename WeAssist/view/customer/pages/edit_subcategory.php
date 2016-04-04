<?php session_start();
 ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Customer | Edit</title>
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
    <!--  -->

  

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
  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><a href="joblist.php">Job List</a></li>
        <li class="active">Edit</li>
      </ol>
    </section>
	<br/>
 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border">
          
	 
		  <h1 >Edit Job </h1>	<hr>	
		
        <!-- left column -->
	 </div>
	<div class="row" style="margin:0% 5% 0% 5%"">
	
  

	<form class="form-horizontal"  id="editjob"  method="post"  enctype="multipart/form-data" action="updatejob.php">
   	<div class="form-group">
	<label id="profile-label"  for="jobcateg" style="margin-left:5%;width:11%" size="10%">Job Category</label>
	
    <?php
      require_once '../../../model/dbConnect.php'; 
  $id=$_GET['cat_id'];
   $_SESSION['jobi_d']=$id; 

   $deta=mysqli_query($conn,"select * from createjob where subcat_id ='$id' ");
   $data=mysqli_fetch_array($deta,MYSQLI_ASSOC);
   $jobtitle=$data['jobtitle'];
  
   $jobdesc=$data['jobdesc'];
   $photo=$data['photo'];
   $subcateg=$data['subcategory'];
   $id=$data['jobcategory'];
   $_SESSION['jobid']=$id;
   $price=$data['job_price'];
//   $jdate=$date['target_date'];

   $res=mysqli_query($conn,"select cat_name from category where cat_id='$id'");
                  $ress=mysqli_fetch_row($res);
 $jobcategory=$ress[0];
$_SESSION['jobcategory']=$jobcategory;
   ?>
  <select class="btn" name="jobcateg" id="jobcateg" style="border:1px solid grey; color:black ; width:25%; margin-left:3%" value="" >
     <option value=''disabled='' select=''>-- Select Option --</option>
     <option value='<?php echo $id?>' selected="selected" ><?php echo $_SESSION['jobcategory'] ?>
   <?php  
    require_once '../../../model/dbConnect.php';
   $select=mysqli_query($conn,"select cat_name,cat_id from category");
  //  echo $select->cat_name;
   while($row=mysqli_fetch_array($select,MYSQLI_ASSOC))
   {
	   echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>" ; 
   }
   
   ?>

  </select>
 
	<label id="profile-label"  for="subcateg" style="margin-left:5%; width:11%">Sub Category</label> 
 <select class="btn" name="subcateg" id="subcateg" style="border:1px solid grey; color:black ; width:25%; margin-left:3%" value="<?php echo $subcateg ?>">
 <option value=''disabled='' select=''>-- Select Option --</option>
 <option value='<?php echo $subcateg ?>' selected="selected" =''><?php echo $subcateg ?></option>
  
  </select>
  </div>
  <div class="form-group">

  <label id="profile-label"  for="jobtitle" style="margin-left:5%; width:11%" size="10%">Job Title</label>
  <input type="text" id="jobtitle" name="jobtitle" placeholder="Job Title" style="border:1px solid grey; color:black ;width:25% ; text; margin-left:3%"
   value="<?php echo $jobtitle; ?>">
</div>
<div class="form-group">

<label id="profile-label"  for="jobdesc" style="margin-left:5%; width:11% ; margin-top:-50% "; >Job Description</label>
<textarea  rows="5" cols="110"  id="jobdesc" name="jobdesc" style="border:1px solid grey; color:black ; margin-left:3%" ><?php echo $jobdesc?></textarea>

</div>
<div class="form-group">
<label id="profile-label"  for="jobprice" style="margin-left:5%; width:11%" size="10%">Enter Price</label>
  <i class="fa fa-rupee" style="font-size:24px;margin-left:1%"></i>
  <input type="number" id="jobprice" name="jobprice" placeholder="" style="border:1px solid grey; color:black ;width:25% ;font-family:none;font-size:130%;font-color:black;
    margin-left:5px" value="">

</div>
<div class="form-group">
<label id="profile-label"  for="Edate" style="margin-left:5%; width:11%" size="10%">Select date</label>
        <input type="text" name="Edate"  id="Edate" placeholder="select Date"   style="width:25%;margin-left:3%" >
        <span class="fa fa-calendar-o form-control-feedback right" aria-hidden="false"></span>
  <label id="profile-label"  for="tapp" style="margin-left:5%; width:11%">Select Time</label>         
<select class="btn" name="tapp" id="tapp" style="border:1px solid grey; color:black ; width:7%; margin-left:1%">
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
  <option value="13">13</option>
  <option value="14">14</option>
  <option value="15">15</option>
  <option value="16">16</option>
  <option value="17">17</option>
  <option value="18">18</option>
  <option value="19">19</option>
  <option value="20">20</option>
  <option value="21">21</option>
</select>

        </div>


<div class="form-group">
<label id="profile-label"  for="jobphoto" style="margin-left:6%; width:11%" >Upload Job Photo</label>
 <input type="file" class="btn-primary" id="jobphoto" name="jobphoto" style="background-color:white;border:1px solid grey; color:black ;width:25%; margin-left:19%; margin-top:-3%"  accept=".jpg,.jpeg,.png," onchange="readURL(this)">	
</div>
<div class="form-group" style="margin-left:19%;width:20%;height:5%">
<img id="jobshow"/ src="image/<?php echo $photo ?>" style="width:50%;height:30%;">  
</div>
<br/>
<div class="form-group">
<button type="submit" class="btn btn-info btn-primary" name="btnupdate" id="btnupdate"  style="width:20%; margin-left:20%;  " >Update</button></div>
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

<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
  
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>

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
<!-- calenadr -->
<script type="text/javascript" src="js/moment.min2.js"></script>
  <script type="text/javascript" src="js/daterangepicker.js"></script>

//for selecting subcategory
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

</body>
</html>
