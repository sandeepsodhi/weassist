<?php session_start() ;
require_once '../../../model/dbConnect.php';
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
  <title>Customer | Dashboard</title>
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
  <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="../plugins/iCheck/flat/blue.css">
  <!-- Morris chart -->
  <link rel="stylesheet" href="../plugins/morris/morris.css">
  <!-- jvectormap -->
  <!-- <link rel="stylesheet" href="../plugins/jvectormap/jquery-jvectormap-1.2.2.css"> -->
  <!-- Date Picker -->
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>

 <?php include('header.php'); ?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Dashboard
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-4 col-xs-4">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>
                <?php
                $uname=$_SESSION['u_name'];
                $q1="select count(*)  as num from createjob where uname='$uname'";
                $r1=mysqli_query($conn,$q1);
                $res=mysqli_fetch_assoc($r1);
                echo $res['num'];

                ?>


              </h3>

              <p>New Orders</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
          <!--   <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-4 col-xs-4">
          <!-- small box -->
          <div class="small-box bg-blue">
            <div class="inner">
                        <h3>
              <?php
                require_once '../../../model/dbConnect.php'; 
                $result=("select * from job_status where job_status.status='1' and job_id in (select subcat_id from createjob where uname='$uname')");
                $r=mysqli_query($conn,$result);
                $count = mysqli_num_rows($r);
                echo $count;
              ?>
             </h3>
            <p>Completed Jobs</p>
            </div>
            <div class="icon">
              <i class="ion-android-happy"></i>
            </div>

<!--             <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
 -->          </div>
        </div>
        <div class="col-lg-4 col-xs-4">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>
               <?php  require_once '../../../model/dbConnect.php'; 
            $result=("select * from job_status where job_status.status='0' and job_id in (select subcat_id from createjob where uname='$uname') ");
            $r=mysqli_query($conn,$result);
              $count = mysqli_num_rows($r);
              echo $count;
            ?>
              </h3>
            <p>Pending Jobs</p>
            </div>
            <div class="icon">
                    <i class="ion-android-sad"></i>
            </div><!--             <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
 -->          </div>
        </div>

        <!-- ./col -->

      </div>
      <div class="row col-xs-12 col-lg-12">
          <!-- quick email widget -->
          <div class="box box-info">
            <div class="box-header">
              <i class="fa fa-envelope"></i>

              <h3 class="box-title">Quick Email</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <button type="button" class="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
                  <i class="fa fa-times"></i></button>
              </div>
              <!-- /. tools -->
            </div>
            <div class="box-body">
              <form action="#" method="post">
                <div class="form-group">
                  <input type="hidden" class="form-control"  id = "emailfrom" name="emailfrom" placeholder="Email from:" value="<?php $_SESSION['u_name'] ?>">
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" id="emailto" name="emailto" placeholder="Email to:">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject">
                </div>
                <div>

                  <textarea name="message" id="message" class="textarea" placeholder="Message" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>

                </div>
              </form>
            </div>
            <div id="email"class="box-footer clearfix">
              <button type="button" class="pull-right btn btn-default" id="sendEmail">
                <i class="fa fa-arrow-circle-right"></i></button>
            </div>
          </div>
    </div>
      <!-- <div class="row col-xs-12 col-lg-4" style="margin-left: 1%">
          <!-- quick email widget -->
          <!-- <div class="box box-default">

                <div class="box-header with-border">
          <h3 class="box-title">Your Next Job Location</h3>

          <div class="box-tools pull-right">
            <button data-widget="collapse" class="btn btn-box-tool" type="button"><i class="fa fa-minus"></i></button>
            <button data-widget="remove" class="btn btn-box-tool" type="button"><i class="fa fa-remove"></i></button>
          </div>
        </div>
        <div class="box-body">

        <div id="map_wrapper"  style="padding: 0%" >

    <div id="map_canvas" class="mapping"></div>
</div>
  </div>
</div>
    </div> -->
          
      <!-- /.row -->
      <!-- Main row -->
              <!-- /.row -->
            </div>
          </div>
          <!-- /.box -->

        </section>
        <!-- right col -->
      </div>
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
<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
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
<script src="../plugins/morris/morris.min.js"></script>
<!-- Sparkline -->
<script src="../plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<!-- <script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
 --><!-- jQuery Knob Chart -->
<!-- <script src="plugins/knob/jquery.knob.js"></script> -->
<!-- daterangepicker -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js"></script> -->
<!-- <script src="plugins/daterangepicker/daterangepicker.js"></script> -->
<!-- datepicker -->
<!-- <script src="plugins/datepicker/bootstrap-datepicker.js"></script> -->
<!-- Bootstrap WYSIHTML5 -->
<script src="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/app.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="../dist/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> -->

<script type="text/javascript">
  
    $("#email").click(function(){
        var emailFrom = $("#emailfrom").val();
        var emailTo = $("#emailto").val();
      var subject = $("#subject").val();
    var message = $("#message").val();

    console.log(message);

        $.post("sendemail.php", {from:emailFrom,to:emailTo,subjectt:subject,messagee:message}, function(result){
          //alert("d");
          // $("span").html(result);
          // document.getElementById("curBidUser"+bidID); 
          $("#emailfrom").val("");// = "";
          $("#emailto").val("");//= null;
          $("#subject").val(""); //= null;
          $("#message").val(""); //= null;
        });
    });

</script>
<!--
<script type="text/javascript">
  
  jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    var markersA = [];

    <?php 
    $uname=$_SESSION['u_name'];
 //       include '../../model/dbConnect.php';
//        $query = mysqli_query($conn,"select subcat_name,subcat_city,subcat_desc from sub_category limit 1,1");
        $query = mysqli_query($conn,"select city,f_name,l_name from users   where u_name='$uname' ");
        // (select job_id from job_status where workerassign='$uname')");

        while($res = mysqli_fetch_row($query))
        {

    ?>            

    var latt,lng;

    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': '<?php echo $res[1]?>'}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            
            latt = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();



            // Multiple Markers
            var markers = [
                ['<?php echo $res[0]?>',latt,lng]
            ];
            console.log(markers[0]);

            for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });
            
            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
            }

            // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
                this.setZoom(8);
                google.maps.event.removeListener(boundsListener);
            });
        

            var infoWindowContent = [
                ['<div class="info_content">' +
                '<h3><?php echo $res[0] ?></h3>' +
                '<p><?php echo $res[2] ?></p>' +   '</div>']
            ];
                
            var infoWindow = new google.maps.InfoWindow(), marker, i;
    
          } 
        });
    <?php  } ?>
}
</script>
-->
</body>
</html>
