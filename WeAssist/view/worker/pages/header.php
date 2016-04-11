
<!-- Our WebRTC application styling -->
<link rel="stylesheet" type="text/css" href="chat/style/datachannel-demo.css">


<!-- header to be called if page is in admin folder -->
<body class="hold-transition skin-red-light sidebar-mini">
<div class="wrapper">

</div>
<header class="main-header">
    <!-- Logo -->
    <a href="index.php" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>W</b>A</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>We</b>Assist</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
         
          <!-- Notifications: style can be found in dropdown.less -->
        
          <!-- Tasks: style can be found in dropdown.less -->
         
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">

            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="image/<?php  echo $_SESSION['profile_pic']; ?>" class="user-image" alt="User Image">
              <span class="hidden-xs"><?php echo $_SESSION['f_name']; ?></span>
            </a>
					<!--	  <li>		  		  						<a href="logout.php">Logout  </a></li>-->

            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="image/<?php  echo $_SESSION['profile_pic']; ?>" class="img-circle" alt="User Image">

                <p>
                 <?php echo $_SESSION['f_name']; ?>
                 <!-- <small>Member since Nov. 2012</small>-->
                </p>
              </li>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="profile.php" style="color:white" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="../../../controller/sign_out.php" style="color:white" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>

          </li>
        </ul>
</div>
    </nav>

  </header>

  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="image/<?php echo $_SESSION['profile_pic']; ?>" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p><?php echo $_SESSION['f_name']; ?></p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form --
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
       
  <li class="active treeview">
          <a href="home.php">
            <i class="fa fa-fw fa-home"></i>
            <span>HOME</span>
            
          </a>
                  </li>
 <li class="treeview">
		 <a href="worker_reg.php">
		 <i class="fa fa-user-plus"></i>
			<span>Add User</span>
		</a>
</li>

<!--<li>
          <a href="jobcreation.php">
            <i class="fa fa-edit"></i> <span>Job Creation</span>
          </a>
        </li>-->
        <li>
          <a href="profile.php">
            <i class="fa fa-user"></i> <span>My Profile</span>
            <small class="label pull-right bg-green">new</small>
          </a>
        </li>
		        <li>
          <a href="myjobs.php">
            <i class="fa fa-th"></i> <span>My Jobs</span>
          </a>
        </li>
		
      <!--  <li class="treeview">
          <a href="searchjob.php">
            <i class="fa fa-pie-chart"></i>
            <span>Search Job</span>
             </a>
           </li>-->
   </ul>
     </section>
    <!-- /.sidebar -->
  </aside>
<?php
if($_SESSION['u_type']=='Customer')
{
?> 
<!--class ="demo-chat-create" for conneting -->
<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <!-- <div onclick="show()" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px"> -->
          <div onclick="window.open('chat.php','width=100px', 'height=370px')" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px">

            <div>
              <strong><center>Help & Support</center></strong>
            </div>
          </div>
</div>  
<?php 
}
elseif($_SESSION['u_type']=='agent' || $_SESSION['u_type']=='worker'){
?>
<!--class ="demo-chat-create" for conneting -->

<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <!-- <div onclick="show()" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px"> -->
          <div onclick="window.open('chat.php','width=100px', 'height=370px')" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px">

            <div>
              <strong><center>Help & Support</center></strong>
            </div>
          </div>
</div>  
<?php    
}
?>

<!-- Web rtc -->
<!-- Zepto for AJAX -->
<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.1.3/zepto.min.js"></script>
<!-- Pusher for WebRTC signalling -->
<script src="//js.pusher.com/2.2/pusher.js"></script>
<!-- DataChannel.js for WebRTC functionality -->
<script src="//webrtc-experiment.com/DataChannel.js"></script>
<!-- Our WebRTC application -->
<script src="chat/js/datachannel-demo.js"></script>
<!-- Our WebRTC application -->
<script src="chat/js/datachannel-demo.js"></script>
<!-- Fill channel name  -->

<script type="text/javascript">
$(document).ready(function(){
$("#cat_id").change(function()
{
var cat_id=$(this).val();
var dataString = 'cat_id='+ cat_id;
$.ajax
({
type: "POST",
url: "retrieve_subcat.php",
data: dataString,
cache: false,
success: function(html)
{
$("#subcat").html(html);
} 
});
}); 
});

</script>
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

<!-- Chat system -->
<script type="text/javascript">
  function show(){
    // $("#hbar").toggle({animate:10000});

}

function sc_roll()
{
 var dem = document.getElementById('demo');
 dem.scrollTop  =dem.scrollHeight-dem.clientHeight;
}
</script>
</body>