  <!-- Our WebRTC application styling -->
  <link rel="stylesheet" type="text/css" href="style/datachannel-demo.css">

<!-- header to be called if page is in admin folder -->

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
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 4 messages</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li><!-- start message -->
                    <a href="#">
                      <div class="pull-left">
                        <img src="../dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Support Team
                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <!-- end message -->
                  <li>
                    <a href="#">
                      <div class="pull-left">
                        <img src="../dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        AdminLTE Design Team
                        <small><i class="fa fa-clock-o"></i> 2 hours</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pull-left">
                        <img src="../dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Developers
                        <small><i class="fa fa-clock-o"></i> Today</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pull-left">
                        <img src="../dist/img/user3-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Sales Department
                        <small><i class="fa fa-clock-o"></i> Yesterday</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pull-left">
                        <img src="../dist/img/user4-128x128.jpg" class="img-circle" alt="User Image">
                      </div>
                      <h4>
                        Reviewers
                        <small><i class="fa fa-clock-o"></i> 2 days</small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">See All Messages</a></li>
            </ul>
          </li>
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 10 notifications</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                      page and may cause design problems
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-red"></i> 5 new members joined
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-user text-red"></i> You changed your username
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <!-- Tasks: style can be found in dropdown.less -->
          <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-flag-o"></i>
              <span class="label label-danger">9</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 9 tasks</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Design some buttons
                        <small class="pull-right">20%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Create a nice theme
                        <small class="pull-right">40%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">40% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Some task I need to do
                        <small class="pull-right">60%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">60% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                  <li><!-- Task item -->
                    <a href="#">
                      <h3>
                        Make beautiful transitions
                        <small class="pull-right">80%</small>
                      </h3>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span class="sr-only">80% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <!-- end task item -->
                </ul>
              </li>
              <li class="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">Admin</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="../dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                <p>
                  Admin
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
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
                  <a href="#" style="background-color:#3c8dbc;color:white" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="#" style="background-color:#3c8dbc;color:white"class="btn btn-default btn-flat">Sign out</a>
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
          <img src="../dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Admin</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
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
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active"><a href="index.php"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
            <li><a href="index2.php"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="categories.php">
            <i class="fa fa-align-justify"></i>
            <span>Categories</span>
          </a>
        </li>
        <li class="treeview">
          <a href="sub_categories.php">
            <i class="fa fa-list"></i>
            <span>Sub-Categories</span>
          </a>
        </li>
        <li class="treeview">
          <a href="users.php">
            <i class="fa fa-user"></i>
            <span>Users</span>
          </a>
        </li>
        <li class="treeview">
          <a href="ref_users.php">
            <i class="fa fa-user"></i>
            <span>Referred-Users</span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-files-o"></i>
            <span>Layout Options</span>
            <span class="label label-primary pull-right">4</span>
          </a>
          <ul class="treeview-menu">
            <li><a href="top-nav.php"><i class="fa fa-circle-o"></i> Top Navigation</a></li>
            <li><a href="boxed.php"><i class="fa fa-circle-o"></i> Boxed</a></li>
            <li><a href="fixed.php"><i class="fa fa-circle-o"></i> Fixed</a></li>
            <li><a href="collapsed-sidebar.php"><i class="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
          </ul>
        </li>
        <li>
          <a href="widgets.php">
            <i class="fa fa-th"></i> <span>Widgets</span>
            <small class="label pull-right bg-green">new</small>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-pie-chart"></i>
            <span>Charts</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="chartjs.php"><i class="fa fa-circle-o"></i> ChartJS</a></li>
            <li><a href="morris.php"><i class="fa fa-circle-o"></i> Morris</a></li>
            <li><a href="flot.php"><i class="fa-circle-o"></i> Flot</a></li>
            <li><a href="inline.php"><i class="fa fa-circle-o"></i> Inline charts</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-laptop"></i>
            <span>UI Elements</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="general.php"><i class="fa fa-circle-o"></i> General</a></li>
            <li><a href="icons.php"><i class="fa fa-circle-o"></i> Icons</a></li>
            <li><a href="buttons.php"><i class="fa fa-circle-o"></i> Buttons</a></li>
            <li><a href="sliders.php"><i class="fa fa-circle-o"></i> Sliders</a></li>
            <li><a href="timeline.php"><i class="fa fa-circle-o"></i> Timeline</a></li>
            <li><a href="modals.php"><i class="fa fa-circle-o"></i> Modals</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-edit"></i> <span>Forms</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="general.php"><i class="fa fa-circle-o"></i> General Elements</a></li>
            <li><a href="advanced.php"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
            <li><a href="editors.php"><i class="fa fa-circle-o"></i> Editors</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-table"></i> <span>Tables</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="simple.php"><i class="fa fa-circle-o"></i> Simple tables</a></li>
            <li><a href="data.php"><i class="fa fa-circle-o"></i> Data tables</a></li>
          </ul>
        </li>
        <li>
          <a href="calendar.php">
            <i class="fa fa-calendar"></i> <span>Calendar</span>
            <small class="label pull-right bg-red">3</small>
          </a>
        </li>
        <li>
          <a href="mailbox.php">
            <i class="fa fa-envelope"></i> <span>Mailbox</span>
            <small class="label pull-right bg-yellow">12</small>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-folder"></i> <span>Examples</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="invoice.php"><i class="fa fa-circle-o"></i> Invoice</a></li>
            <li><a href="profile.php"><i class="fa fa-circle-o"></i> Profile</a></li>
            <li><a href="login.php"><i class="fa fa-circle-o"></i> Login</a></li>
            <li><a href="register.php"><i class="fa fa-circle-o"></i> Register</a></li>
            <li><a href="lockscreen.php"><i class="fa fa-circle-o"></i> Lockscreen</a></li>
            <li><a href="404.php"><i class="fa fa-circle-o"></i> 404 Error</a></li>
            <li><a href="500.php"><i class="fa fa-circle-o"></i> 500 Error</a></li>
            <li><a href="blank.php"><i class="fa fa-circle-o"></i> Blank Page</a></li>
            <li><a href="pace.php"><i class="fa fa-circle-o"></i> Pace Page</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-share"></i> <span>Multilevel</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
            <li>
              <a href="#"><i class="fa fa-circle-o"></i> Level One <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
                <li>
                  <a href="#"><i class="fa fa-circle-o"></i> Level Two <i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                    <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
          </ul>
        </li>
        <li><a href="../Documentation/index.php"><i class="fa fa-book"></i> <span>Documentation</span></a></li>
        <li class="header">LABELS</li>
        <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
        <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

<!--class ="demo-chat-create" for conneting -->
<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <div onclick="show()" style="border-radius:4px;background-color:#3c8dbc;color:white;height:25px"><div><strong><center>Help & Support</center></strong></div></div>
          <div style="display: none" id="hbar">
              <div class="box box-success">
                <div class="box-header">
                  <i class="fa fa-comments-o"></i>
                  <h3 class="box-title">Chat</h3>
                </div>
                <div class="box-body chat" id="chat-box">
                  <!-- chat item -->
                  <div class="item">
                   <!-- WebRTC demo -->
                      <div class="demo" id="demo" style="min-height: 100px;height: 200px; overflow-y:auto">
                        <div class="demo-connect">
                          <!-- <li class="list-group-item" data-remove="true"><br>&nbsp&nbspConnecting...</li> -->
                          <?php
                          include '../../../model/dbConnect.php';
                              $ch = mysqli_fetch_row(mysqli_query($conn,"select channel from chat_user"));    
                              //echo "<input type='hidden' value='".$ch[0]."' class='demo-chat-channel-input'></input>";
                            
                              //category select statement
                              echo "<select name='cat_id' id='cat_id'  class='col-xs-12 col-sm-12 btn btn-border' required>
                              <option value=''  selected disabled><center>Select Category</center></option>";
                              $rs=mysqli_query($conn,"select cat_id,cat_name from category");
                              while($row=mysqli_fetch_assoc($rs))
                              {
                                  echo "<option value=".$row['cat_id'].">".$row['cat_name']."</option>";
                              }
                              echo "</select>";
                             
                              //subcategory select statement 
                            //   echo "<select name='subcat_id' style='margin-top:7px' class='col-xs-12 col-sm-12 btn btn-border' required>
                            //   <option value=''  selected disabled><center>Select SubCategory</center></option>";
                            //   $rs=mysqli_query($conn,"select subcat_id,subcat_name from sub_category");
                            //   while($row=mysqli_fetch_assoc($rs))
                            //   {
                            //       echo "<option value=".$row['subcat_id'].">".$row['subcat_name']."</option>";
                            //   }
                            // echo "</select>";
                            
                            ?>
                            <div id='subcat'></div>
                                <div id='city'></div>

                            <!-- <select name='subcat_id' id='subcat' style='margin-top:7px' class='col-xs-12 col-sm-12 btn btn-border' required>
                            <option value=''  selected disabled><center>Select SubCategory</center></option>";
                            </select>
 -->
                          <!-- <input type="text" style="width:100%"class="demo-chat-channel-input form-control" placeholder="Channel name"></input> -->
                           <input type='hidden' class="demo-chat-create btn btn-primary" value='Create'></input>

                        
                          <button style='margin-top:5px' class="demo-chat-join btn btn-warning col-xs-4 col-sm-4 pull-right">Join</button>
                        </div>
                        <div class="demo-chat inactive">
                          <ul class="demo-chat-messages list-group">
                            <li class="list-group-item" data-remove="true">No chat messages available</li>
                          </ul>
                        </div>
                      </div>
                      <!-- /End WebRTC demo -->
                  </div>  
                  <!-- /.item -->
                </div>
                <!-- /.chat -->
                <div class="box-footer">
                  <div class="demo-chat-input">
                         <input name="message" style="width:80%" class="demo-chat-message-input form-control" onkeyup="javscript: if (event.keyCode==13) { sc_roll();/*$('.demo').scrollTop=$('.demo').scrollHeight;*/}"placeholder="Message" on></input>
                         <button style="margin-left:78%;margin-top:-58px;width:20%px " onclick="sc_roll();" class="demo-chat-send btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
              <!-- /.box (chat box)  javascript:$('#demo').scrollTop=$('#demo').scrollHeight -->
          <div id="sh" visibility="hidden"></div>
          </div></div>  
          

<!-- Web rtc -->
<!-- Zepto for AJAX -->
<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.1.3/zepto.min.js"></script>
<!-- Pusher for WebRTC signalling -->
<script src="//js.pusher.com/2.2/pusher.js"></script>
<!-- DataChannel.js for WebRTC functionality -->
<script src="//webrtc-experiment.com/DataChannel.js"></script>
<!-- Our WebRTC application -->
<script src="js/datachannel-demo.js"></script>
<!-- Our WebRTC application -->
<script src="js/datachannel-demo.js"></script>
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
console.log("he");
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
    $("#hbar").toggle({animate:10000});
}


function sc_roll()
{
 var dem = document.getElementById('demo');
 dem.scrollTop  =dem.scrollHeight-dem.clientHeight;

}
</script>

  