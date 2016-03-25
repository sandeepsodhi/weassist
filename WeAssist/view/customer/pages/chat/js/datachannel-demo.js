// Initialise DataChannel.js
var datachannel = new DataChannel();

// Set the userid based on what has been defined by DataChannel
datachannel.userid = window.userid;


// Open a connection to Pusher
var pusher = new Pusher("c3c7029e94d3673371a5");

// Storage of Pusher connection socket ID
var socketId;

Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

// Monitor Pusher connection state
pusher.connection.bind("state_change", function(states) {
  switch (states.current) {
    case "connected":
      socketId = pusher.connection.socket_id;
      break;
    case "disconnected":
    case "failed":
    case "unavailable":
      break;
  }
});

// Set custom Pusher signalling channel
// https://github.com/muaz-khan/WebRTC-Experiment/blob/master/Signaling.md
datachannel.openSignalingChannel = function(config) {
  var channel = config.channel || this.channel || "default-channel";
  var xhrErrorCount = 0;
  
  var socket = {
    send: function(message) {
      $.ajax({
        type: "POST",
        //url: "/message", // Node.js & Ruby (Sinatra)
         url: "chat/_servers/php/message.php", // PHP
        data: {
          socketId: socketId,
          channel: channel,
          message: message
        },
        timeout: 1000,
        success: function(data) {
          xhrErrorCount = 0;
        },
        error: function(xhr, type) {
          // Increase XHR error count
          xhrErrorCount++;

          // Stop sending signaller messages if it's down
          if (xhrErrorCount > 5) {
            console.log("Disabling signaller due to connection failure");
            datachannel.transmitRoomOnce = true;
          }
        }
      });
    },
    channel: channel
  };

  // Subscribe to Pusher signalling channel
  var pusherChannel = pusher.subscribe(channel);

  // Call callback on successful connection to Pusher signalling channel
  pusherChannel.bind("pusher:subscription_succeeded", function() {
    if (config.callback) config.callback(socket);
  });

  // Proxy Pusher signaller messages to DataChannel
  pusherChannel.bind("message", function(message) {
    config.onmessage(message);
  });

  return socket;
};

var onCreateChannel = function() {
  console.log('in create');
  var channelName = cleanChannelName(channelInput.value);

  if (!channelName) {
    console.log("No channel name given");
    return;
  }

  disableConnectInput();
  datachannel.open(channelName);

 // if (!this.channels[channelName]) {
 //  datachannel.open(channelName);
 //  console.log("in open");
 //  }else{
 //     datachannel.connect(channelName);
 //     console.log("in connect")
 //  }

};

var onJoinChannel = function() {
 console.log('in join');
  $.getJSON("my.json",function(data){
  //console.log(data);
  var channelName = data;
  //console.log(channelInput);
  //var channelName = cleanChannelName(channelInput.value);
  console.log(channelName);
  if (!channelName) {
    console.log("No channel name given");
    return;
  }
  disableConnectInput();
  // Search for existing data channels
  datachannel.connect(channelName);
  });
  
  // var channelName = cleanChannelName(channelInput.value);
  // if (!channelName) {
  //   console.log("No channel name given");
  //   return;
  // }
  // disableConnectInput();
  // datachannel.connect(channelName);

};

var cleanChannelName = function(channel) {
  return channel.replace(/(\W)+/g, "-").toLowerCase();
};

var onSendMessage = function() {
  var message = messageInput.value;

  if (!message) {
    console.log("No message given");
    return;
  }

  datachannel.send(message);
  addMessage(message, window.userid, true);

  messageInput.value = "";  
};

var onMessageKeyDown = function(event) {
  if (event.keyCode == 13){
    onSendMessage();
  }
};

  var addMessage = function(message, userId, self) {
  var messages = messageList.getElementsByClassName("list-group-item");

  // Check for any messages that need to be removed
  var messageCount = messages.length;
  for (var i = 0; i < messageCount; i++) {
    var msg = messages[i];
    
    if (msg.dataset.remove === "true") {
      messageList.removeChild(msg);
    }
  };

  var newMessage = document.createElement("li");
  newMessage.classList.add("list-group-item");

  var c= localStorage.getItem("notify");

  if(c==null || c==0)
    c = 0;
  
  if (self) {
    var d = new Date();
    newMessage.classList.add("self");
    newMessage.innerHTML = "<span class='badge'>You</span><p>" + message +"</p>\n"+"<i>"+d.getDate()+"/"+(d.getMonth()+1)+" "+d.getHours()+":"+d.getMinutes()+"</i>";
    top.document.title="WeAssist";

    localStorage.setItem("notify",0);
  } else {
    var d = new Date();
    //newMessage.innerHTML = "<span class='badge'>" + userId + "</span><p>" + message + "</p>"
      newMessage.innerHTML = "<span class='badge'>Sender</span><p>" + message + "</p>\n"+"<i>"+d.getDate()+"/"+(d.getMonth()+1)+" "+d.getHours()+":"+d.getMinutes()+"</i>";
   // newMessage.innerHTML = "<p>" + message + "</p>"
    c = parseInt(c)+1;
    localStorage.setItem("notify",c);
    top.document.title="("+c+")"+" New messages";
  }

  messageList.appendChild(newMessage);
};

var disableConnectInput = function() {
  //channelInput.disabled = true;
  createChannelBtn.disabled = true;
   joinChannelBtn.disabled = true;
 // console.log('in disabled connect input');
};

// Demo DOM elements
var channelInput = document.querySelector(".demo-chat-channel-input");
var createChannelBtn = document.querySelector(".demo-chat-create");
var joinChannelBtn = document.querySelector(".demo-chat-join");
var messageInput = document.querySelector(".demo-chat-message-input");
var sendBtn = document.querySelector(".demo-chat-send");
var messageList = document.querySelector(".demo-chat-messages");

// Set up DOM listeners
createChannelBtn.addEventListener("click", onCreateChannel);
joinChannelBtn.addEventListener("click", onJoinChannel);
sendBtn.addEventListener("click", onSendMessage);
messageInput.addEventListener("keydown", onMessageKeyDown);

// Set up DataChannel handlers
datachannel.onopen = function (userId) {
  document.querySelector(".demo-connect").classList.add("inactive");
  document.querySelector(".demo-chat").classList.remove("inactive");
  messageInput.focus();
};

datachannel.onmessage = function (message, userId) {
  addMessage(message, userId);
};