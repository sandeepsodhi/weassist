<?php //session_start(); ?>

<!-- Our WebRTC application styling -->
<link rel="stylesheet" type="text/css" href="chat/style/datachannel-demo.css">


<!-- header to be called if page is in admin folder -->
<body class="hold-transition skin-red-light sidebar-mini">
<div class="wrapper">

<header class="main-header">
    <!-- Logo -->
    <a href="index1.php" class="logo">
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

              <!-- Menu Body -->
     <!--         <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="../../main/index.php" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
        </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>

          </li>
		  
        </ul>
		<!--</div>-->
      </div>
	        </div>

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
          <a href="index.php">
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

<li>
          <a href="jobcreation.php">
            <i class="fa fa-edit"></i> <span>Job Creation</span>
          </a>
        </li>
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
<!--<?php
if($_SESSION['u_type']=='Customer')
{
?> 
<!--class ="demo-chat-create" for conneting --
<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <!-- <div onclick="show()" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px"> --
          <div onclick="window.open('chat.php','width=100px', 'height=370px')" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px">

            <div>
              <strong><center>Help & Support</center></strong>
            </div>
          </div>
          
          <!-- here chat window code --


</div>  
<?php 
}
elseif($_SESSION['u_type']=='agent'){
?>
<!--class ="demo-chat-create" for conneting --
<div  onclick="onCreateChannel()" style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <div onclick="show()" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px"><div><strong><center>Help & Support</center></strong></div></div>
          <div style="display: none" id="hbar">
              <div class="box box-success">
                <div class="box-header">
                  <i class="fa fa-comments-o"></i>
                  <h3 class="box-title">Chat</h3>
                </div>
                <div class="box-body chat" id="chat-box">
                  <!-- chat item --
                  <div class="item">
                   <!-- WebRTC demo --
                      <div class="demo" id="demo" style="min-height: 100px;height: 200px; overflow-y:auto">
                        <div class="demo-connect">
                          <!-- <li class="list-group-item" data-remove="true"><br>&nbsp&nbspConnecting...</li> --
                          <?php
                          include '../../../model/dbConnect.php';
                              $ch = mysqli_fetch_row(mysqli_query($conn,"select channel from chat_user where pr_id in(select pr_id from profession where u_id='".$_SESSION['u_id']."')"));    
                              echo "<input type='hidden' value='".$ch[0]."' class='demo-chat-channel-input'></input>";
                            ?>
                            
                            <p><b>Connecting...<br></b></p>
                              
                            <!-- <button visibility='hidden' type='hidden' class="demo-chat-create btn btn-primary">Create</button> --
                            <input type='hidden' class="demo-chat-create btn btn-primary">
              

                            <!-- <input type='hidden' class="demo-chat-create btn btn-primary" value='Create'></input> --
                          <input type="hidden" style='margin-top:5px' class="demo-chat-join btn btn-warning col-xs-4 col-sm-4 pull-right">
                        </div>
                        <div class="demo-chat inactive">
                          <ul class="demo-chat-messages list-group">
                            <li class="list-group-item" data-remove="true">No chat messages available</li>
                          </ul>
                        </div>
                      </div>
                      <!-- /End WebRTC demo --
                  </div>  
                  <!-- /.item --
                </div>
                <!-- /.chat --

                <div class="box-footer">
                  <div class="demo-chat-input">
                         <input name="message" style="width:80%" class="demo-chat-message-input form-control" onkeyup="javscript: if (event.keyCode==13) { sc_roll();/*$('.demo').scrollTop=$('.demo').scrollHeight;*/}"placeholder="Message" on></input>
                         <button style="background-color:#dd4b39;margin-left:78%;margin-top:-58px;width:20%px " onclick="sc_roll();" class="demo-chat-send btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
              <!-- /.box (chat box)  javascript:$('#demo').scrollTop=$('#demo').scrollHeight --
             <div id="sh" visibility="hidden"></div>
          </div>
</div>  
<?php    
}
?>
-->
</div>
</div>

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
<!-- Fill channel name -->

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
