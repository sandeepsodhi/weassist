<?php
  include '../../../model/dbConnect.php';
  session_start();
?>

<!-- Our WebRTC application styling -->
<link rel="stylesheet" type="text/css" href="style/datachannel-demo.css">
<!-- Bootstrap 3.3.5 -->
<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">



<body onload="onCreateChannel()"> 
  <div id="hbar">
      <div  style="margin-left:5px" class="box box-success">
        <div class="box-header">
          <i class="fa fa-comments-o"></i>
          <h3 class="box-title">Chat</h3>
        </div>
        <div class="box-body chat" id="chat-box">
          <!-- chat item -->
          <div class="item">
           <!-- WebRTC demo -->
           <div class="demo" id="demo" style="min-height:50%;max-height:150%;height:250px; overflow-y:auto">
            <div class="demo-connect">
            <!-- <li class="list-group-item" data-remove="true"><br>&nbsp&nbspConnecting...</li> -->
              <?php
                  $ch = mysqli_fetch_row(mysqli_query($conn,"select channel from chat_user where pr_id ='1' ")); 
                    // in(select pr_id from profession where u_id='".$_SESSION['u_id']."')"));    
                  echo "<input type='hidden' value='".$ch[0]."' class='demo-chat-channel-input'></input>";
                ?>
              <p><b>Connecting...<br></b></p>
              <!-- <button visibility='hidden' type='hidden' class="demo-chat-create btn btn-primary">Create</button> -->
              <input type='hidden' class="demo-chat-create btn btn-primary">
              <!-- <input type='hidden' class="demo-chat-create btn btn-primary" value='Create'></input> -->
              <input type="hidden" style='margin-top:5px' class="demo-chat-join btn btn-warning col-xs-4 col-sm-4 pull-right">
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
                 <input name="message" style="width:95%" class="demo-chat-message-input form-control" onkeyup="javscript: if (event.keyCode==13) { sc_roll();/*$('.demo').scrollTop=$('.demo').scrollHeight;*/}"placeholder="Message" on></input>
                 <button style="background-color:#dd4b39;margin-left:79%;margin-top:-33px;width:20%" onclick="sc_roll();" class="demo-chat-send btn btn-primary">Send</button>
          </div>
        </div>
      </div>
      <!-- /.box (chat box)  javascript:$('#demo').scrollTop=$('#demo').scrollHeight -->
     <div id="sh" visibility="hidden"></div>
  </div>
</body>


<!-- jQuery 2.2.0 -->
<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<!-- Bootstrap 3.3.5 -->
<script src="../bootstrap/js/bootstrap.min.js"></script>


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