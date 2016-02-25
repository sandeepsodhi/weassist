<!DOCTYPE html>
<html>
<head>
  <title>test file</title>
</head>
<body>
  <!-- Our WebRTC application styling -->
<input type='button' id='b' value='ads' onclick='scrol()'>

<!--
<div style="position:fixed;z-index:20;width:280px;bottom:0px;right:2px;padding:2px;scroll-behavior:auto;">
          <div onclick="show()" style="border-radius:4px;background-color:#3c8dbc;color:white;height:25px"><div><strong><center>Help & Support</center></strong></div></div>
          <div style="display: none" id="hbar">
              <div class="box box-success">
                <div class="box-header">
                  <i class="fa fa-comments-o"></i>
                  <h3 class="box-title">Chat</h3>
                </div>
                <div class="box-body chat" id="chat-box">
                  <div class="item">
                      <div class="demo" id="demo" style="min-height: 100px;height: 200px; overflow-y:auto">
                        <div class="demo-connect">
                          <input type="text" style="width:100%"class="demo-chat-channel-input form-control" placeholder="Channel name"></input>
                          <button class="demo-chat-create btn btn-primary">Create</button>
                          <button class="demo-chat-join btn btn-warning">Join</button>
                        </div>
                        <div class="demo-chat inactive">
                          <ul class="demo-chat-messages list-group">
                            <li class="list-group-item" data-remove="true">No chat messages available</li>
                          </ul>
                        </div>
                      </div>
                 </div>  
                </div>
                <div class="box-footer">
                  <div class="demo-chat-input">
                         <input name="message" style="width:80%" class="demo-chat-message-input form-control" onkeyup="javscript: if (event.keyCode==13) { scroll();/*$('.demo').scrollTop=$('.demo').scrollHeight;*/}"placeholder="Message" on></input>
                         <button style="margin-left:78%;margin-top:-58px;width:20%px " onclick="scroll();" class="demo-chat-send btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
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

<script>


function scrol()
{
alert('scroll');
 // var dem = document.getElementById('demo');
 // console.log('before '+dem.scrollTop);
 // dem.scrollTop  =dem.scrollHeight-dem.clientHeight;
 // console.log(dem.scrollTop);
}
</script>




</body>
</html>
