<?php session_start();
 ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Customer | Feedback</title>
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
<style>
input[type='text'] { font-size: 140%;
font-family: monospace; }

h1 {
  font-size: 140%;
font-family: monospace;
color:#000000;
}
.star{
    color: #ccc;
    cursor: pointer;
    transition: all 0.2s linear;
}
.star-checked{
    color: gold;
}
#result{
    display: none;
}
b.r{
    color: red;
}
b.g{
    color: green;
}
</style>
</head>
<?php include('header.php');?>
<div class="content-wrapper"> 
  <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="index.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">feedback</li>
      </ol>
    </section>
  <br/>
 
 <section class="content">
  <div class="box box-primary">
   <div class="box-header with-border" id="hed">
   <h>Feedback Form </h>    
   
        
    
        <!-- left column -->
   </div>
  <div class="row" id="con" style="margin:0% 5% 0% 5%"">
   <br/>
  <form class="form-horizontal"  id="editjob"  >
    <table width="70%" >
    <tr><td>
    <div class="form-group">
  <label id="profile-label"  for="name" style="margin-left:5%;width:80%" size="15%">Select worker name</label></td>
  <td>
  <select class="btn" name="name" id="name" style="border:1px solid grey; color:black ; width:55%; margin-left:0%" >
     <option value='' select=''>-- Select  --</option>
     <!-- <option value='' select=''>All</option> -->
   <?php  require_once '../../../model/dbConnect.php'; 
   $uname=$_SESSION['u_name'];
   $select=mysqli_query($conn,"  select  workerassign,job_id from job_status where status=1 AND job_id in (select subcat_id from createjob where uname='$uname')
");

  //  echo $select->cat_name;
   while($row=mysqli_fetch_assoc($select))
   {
      $wname=$row['workerassign'];
       $sele= mysqli_query($conn,"select u_id,u_name,f_name from users where u_name ='$wname'");
       $row4=mysqli_fetch_assoc($sele);
     echo "<option value=".$row4['u_id']." onclick="."getdet('".$row4['u_id']."','".$row['job_id']."')".">".$row4['f_name']."</option>" ; 
   }
   ?>
  </select>
  </div>
</td>
<td>
<img  class="profile-user-img img-responsive img-circle" src="../../image/"  width='150' height='150' alt=''  style='border-radius:30px;position:absolute;margin-left: -5%;display:none'  id="pic">

</td>
</tr>
<br/>

 <tr><td>
<br/>
 
 <label id="profile-label"  for="" style="margin-left:0%;width:70%;display:inline" size="10%">Service Quality</label> </td>
<td >
<br/>

<div id="star-container" style="display:inline;margin-left:0%">
            <i class="fa fa-star fa-3x star" id="star-1" style="font-size:20px;line-height:32px;cursor: pointer;"></i>
            <i class="fa fa-star fa-3x star" id="star-2" style="font-size:20px;line-height:32px;cursor: pointer;"></i>
            <i class="fa fa-star fa-3x star" id="star-3" style="font-size:20px;line-height:32px;cursor: pointer;"></i>
            <i class="fa fa-star fa-3x star" id="star-4" style="font-size:20px;line-height:32px;cursor: pointer;"></i>
            <i class="fa fa-star fa-3x star" id="star-5" style="font-size:20px;line-height:32px;cursor: pointer;"></i>
        </div>
        <div id="result"></div>
</td></tr>
    <tr><td>
 <label id="profile-label"  for="" style="margin-left:0%;width:70%;padding-bottom:40%" size="">Any Remarks</label></td>
  <td>
  <textarea   rows="5" cols="50" style="margin-left:0%;margin-top:5%;border:1px solid grey; color:black ;font-family:none;font-style:normal;size:150%" >  </textarea>
</td></tr>

 </table>
 <br/><br/>
<div class="form-group">
<input type="button" class="btn btn-info btn-primary" name="btnupdate" id="btnupdate"  style="width:20%; margin-left:20%;" value="Submit"  ></input></div>
</form>
<br/><br/>



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
var id,jid;
function getdet(fr,idd)
{
id=fr;
jid=idd;
var img;
//alert(fr);
$.post('getworkfeed.php',{in:fr},function sucess(res){
img=res;
$('#pic').show();
$('#pic')
  .attr('src', '../../image/'+img)
  .width(100)
  .height(100);

  
} );
}
</script>
<script type="text/javascript">
var star=0;
 var fg=0;
     
    $('.star').click(function(){
        //get the stars index from it id
          fg=1;  
          var star_id = $(this).attr('id');
          console.log("id"+star_id);
        switch (star_id){
            case "star-1":
                $("#star-1").addClass('star-checked');
                break;
            case "star-2":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                break;
            case "star-3":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                break;
            case "star-4":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                $("#star-4").addClass('star-checked');
                break;
            case "star-5":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                $("#star-4").addClass('star-checked');
                $("#star-5").addClass('star-checked');
                break;
        }

$('.star').on("mouseover",function(){
        //get the id of star
        fg=0;
        var star_id = $(this).attr('id');
        switch (star_id){
            case "star-1":
                $("#star-1").addClass('star-checked');
                break;
            case "star-2":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                break;
            case "star-3":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                break;
            case "star-4":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                $("#star-4").addClass('star-checked');
                break;
            case "star-5":
                $("#star-1").addClass('star-checked');
                $("#star-2").addClass('star-checked');
                $("#star-3").addClass('star-checked');
                $("#star-4").addClass('star-checked');
                $("#star-5").addClass('star-checked');
                break;
        }
    }).mouseout(function(){
        //remove the star checked class when mouseout
        if(fg==0)
        $('.star').removeClass('star-checked');
    });

        var star_index = $(this).attr("id").split("-")[1],
            product_id = $("#product_id").val(), //store the product id in variable
            star_container = $(this).parent(), //get the parent container of the stars
            result_div = $("#result"); //result div
            star=star_index;
            console.log(star_index);
            $('#result').html(star_index);
            console.log($("#result").val());
});
 
          </script>    
<script type="text/javascript">
$('#btnupdate').click(function(){
  //alert(star);
$.post('starupdate.php',{in:star,ip:id,jiid:jid},function sucess(res){
console.log(res);
$('#con').html(''); 
$('#hed').html('<h>Feddback Submitted</h><br/><br/>'); 
} );

});
</script>
</body>
</html>

