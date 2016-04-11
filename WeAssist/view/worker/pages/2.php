  <title>AdminLTE 2 | Dashboard</title>
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
  <link rel="stylesheet" href="plugins/iCheck/flat/blue.css">
  <!-- Morris chart -->
  <link rel="stylesheet" href="plugins/morris/morris.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="plugins/jvectormap/jquery-jvectormap-1.2.2.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="plugins/datepicker/datepicker3.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker-bs3.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">











<!-- Our WebRTC application styling -->
<link rel="stylesheet" type="text/css" href="chat/style/datachannel-demo.css">




<!--class ="demo-chat-create" for conneting -->
<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <div onclick="show()" style="border-radius:4px;background-color:#dd4b39;color:white;height:25px"><div><strong><center>Help & Support</center></strong></div></div>
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
                              // $ch = mysqli_fetch_row(mysqli_query($conn,"select channel from chat_user"));    
                              //echo "<input type='hidden' value='".$ch[0]."' class='demo-chat-channel-input'></input>";
                            
                              //category select statement
                              echo "<select name='cat_id' id='cat_id' style='border:1px solid grey' class='col-xs-12 col-sm-12 btn btn-border' required>
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
                         <button style="background-color:#dd4b39;margin-left:78%;margin-top:-58px;width:20%px " onclick="sc_roll();" class="demo-chat-send btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
              <!-- /.box (chat box)  javascript:$('#demo').scrollTop=$('#demo').scrollHeight -->
             <div id="sh" visibility="hidden"></div>
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
    $("#hbar").toggle({animate:10000});
}

function sc_roll()
{
 var dem = document.getElementById('demo');
 dem.scrollTop  =dem.scrollHeight-dem.clientHeight;
}
</script>