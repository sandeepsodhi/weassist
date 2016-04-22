<?php session_start() ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>We Assist | Agent </title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../assets/dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../assets/dist/css/skins/_all-skins.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="../assets/dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="../assets/plugins/iCheck/flat/blue.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

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
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
		  
            <div class="inner">
           <!--   <h3>150</h3>-->
              <h3>
              <?php
               	require_once '../../../model/dbConnect.php'; 
                $result=("select * from createjob");
                $r=mysqli_query($conn,$result);
                $count = mysqli_num_rows($r);
                echo $count;
              ?>
          	  </h3>												
              <p>Total Jobs</p>
            </div>
          <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <!-- <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
			
             <h3>
			        <?php
               	require_once '../../../model/dbConnect.php'; 
                $result=("select * from job_status where job_status.status='1' ");
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
            <!-- <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>
			  			 <?php 	require_once '../../../model/dbConnect.php'; 
            $result=("select * from job_status where job_status.status='0' ");
            $r=mysqli_query($conn,$result);
              $count = mysqli_num_rows($r);
              echo $count;
            ?>
      			  </h3>
            <p>Pending Jobs</p>
            </div>
            <div class="icon">
			              <i class="ion-android-sad"></i>
            </div>
            <!-- <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a> -->
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
        <h3>     
			  <?php 
        	require_once '../../../model/dbConnect.php'; 
          $res = mysqli_fetch_assoc(mysqli_query($conn,"select r_code from users where u_name='".$_SESSION['u_name']."'"));
          $r_code=$res['r_code'];
          $result=("select * from users where r_user='$r_code'");
          $r=mysqli_query($conn,$result);
          $count = mysqli_num_rows($r);
          echo $count;
        ?>
      	</h3>		  
        <p>Total Workers</p>
            </div>
            <div class="icon">
              <i class="ion-person-stalker"></i>
            </div>
            <!-- <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a> -->
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->


           <!-- Main row -->
      <div class="row col-xs-12 col-lg-8">
          <!-- quick email widget -->
          <div class="box box-danger">
            <div class="box-header">
              <i class="fa fa-envelope"></i>

              <h3 class="box-title">Quick Email</h3>
              <!-- tools box -->
              <div class="pull-right box-tools">
                <button type="button" class="btn btn-danger btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove">
                  <i class="fa fa-times"></i></button>
              </div>
              <!-- /. tools -->
            </div>
            <div class="box-body">
              <form action="#" method="post">
                <div class="form-group">
                  <input type="hidden" value ="<?php echo $_SESSION['u_name']?>" class="form-control" id = "emailfrom" name="emailfrom" placeholder="Email from:" readonly>
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


        <div class="col-lg-4 col-xs-12">
        <!-- USERS LIST -->
        <div class="box box-danger">
          <div class="box-header with-border">
            <h3 class="box-title">Latest Workers</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
              <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body no-padding">
          <ul class="users-list clearfix">

          <?php 
            for($i=0;$i<8;$i++)
            {
          $res = mysqli_fetch_assoc(mysqli_query($conn,"select r_code from users where u_name='".$_SESSION['u_name']."'"));
          $r_code=$res['r_code'];
          
          $info = mysqli_fetch_row(mysqli_query($conn,"select f_name,profile_pic,datediff(now(),date(activation_date)) as pend from users where r_user = '$r_code' order by pend limit 1 offset $i"));

          if($info[1] == null)
          {
            break;
          }

          // $start_date = mysqli_fetch_row(mysqli_query($conn,"select current_timestamp from dual"));
          // $end_date = mysqli_fetch_row(mysqli_query($conn,"select entry_date from users where u_id='$info[0]'")); 
          // $days = floor((strtotime($start_date[0]) - strtotime($end_date[0])) / (60 * 60 * 24));
            
           ?>

           <li>
            <img style="width:60px;height:60px" src="../../image/<?php echo $info[1];?>" alt="User Image">
            <div class="user-list-name"> <?php echo $info[0];   ?></div>
            <!-- <a class="users-list-name" href="#">Alexander Pierce</a> -->
            <span class="users-list-date">
            <?php   
             if($info[2]==0)
              {echo "Today";}
             elseif($info[2]==1)
              {echo "Yesterday";}
             else
              {echo $info[2]."days ago";}
            ?>
            </span>
            </li>
        
            <?php
            }
            ?>
            </ul>
            <!-- /.users-list -->
          </div>
          <!-- /.box-body -->
          

          <div class="box-footer text-center">
            <a href="javascript::" class="uppercase">View All Users</a>
          </div>
          <!-- /.box-footer -->
        </div>
        <!-- /.box -->





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
<script src="../assets/plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->

<!-- Bootstrap 3.3.5 -->
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery Knob Chart -->
<script src="../assets/plugins/knob/jquery.knob.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="../assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- FastClick -->
<script src="../assets/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../assets/dist/js/app.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="../assets/dist/js/pages/dashboard.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../assets/dist/js/demo.js"></script>

<!-- Fill channel name -->
<script>
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  var channel = getParameterByName("channel");

  if (channel) {
    document.querySelector(".demo-chat-channel-input").value = channel;
  }
</script>
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



</body>
</html>
