<!-- Base + Vendors CSS -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/fonts/font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="css/fonts/entypo/css/entypo.css">
<link rel="stylesheet" href="vendor/owl-carousel/owl.carousel.css" media="screen">
<link rel="stylesheet" href="vendor/owl-carousel/owl.theme.css" media="screen">
<link rel="stylesheet" href="vendor/magnific-popup/magnific-popup.css" media="screen">
<link rel="stylesheet" href="vendor/flexslider/flexslider.css" media="screen">
<link rel="stylesheet" href="vendor/job-manager/frontend.css" media="screen">

<!-- slider button-->
<link href="css/bootstrap-switch.css" rel="stylesheet">
	
<!--  calendar -->
<link rel="stylesheet" href="example-page_files/dateTimePicker.css">

<!-- Theme CSS-->
<link rel="stylesheet" href="css/theme.css">
<link rel="stylesheet" href="css/theme-elements.css">
<link rel="stylesheet" href="css/animate.min.css">

<!-- login dialog -->
<link href="assets/css/login.css" rel="stylesheet" />
<link href="assets/css/social.css" rel="stylesheet" />
<link href="assets/css/padd.css" rel="stylesheet" />
    
<!-- FONT AWESOME ICONS STYLE SHEET -->
<link href="assets/css/font-awesome.css" rel="stylesheet" />
<body style="background-color:#fff;">
    <div class="form-group">
        <div style="margin-top:40px;" class="input-group dialog-s col-xs-10 col-sm-10">
			<img src="images/logo.png">

        </div>
    </div>
    <div class="form-group">
        <div style="margin-top:40px;" class="input-group dialog-s col-xs-10 col-sm-10">
            <div class="input-group-addon">
                <i class="fa fa-user"></i>
            </div>
            <input type="email" class="form-control" id="u_name" name="u_name" placeholder="Email-id" required>
        </div>
    </div>
    <div class="form-group">
		<div class="col-xs-offset-3 col-xs-6">
		    <button style="margin-top:2px;margin-bottom:40px;width:90px;margin-right:-90px;" class="btn btn-info btn-primary pull-right" id="forgot" name="forgot">Send</button>
		</div>
	</div>

    <div class="form-group">
        <div style="margin-top:40px;color:red" class="input-group dialog-s col-xs-10 col-sm-10">
	 		**Link to reset password will be sent to your email-id.
        </div>
    </div>
</body>		 


<script type="text/javascript" src="js/jquery.min.js"></script>

<script type="text/javascript">
	
    $("#forgot").click(function(){

      // var emailFrom = $("#emailfrom").val();
      var emailTo = $("#u_name").val();
	    // var subject = $("#subject").val();
		  // var message = $("#message").val();
     if(emailTo)
{        $.post("checkemail.php", {to:emailTo}, function(result){
          // $("span").html(result);
          // document.getElementById("curBidUser"+bidID); 
          //$("#u_name").val("");// = "";
        // $("#emailto").val("");//= null;
        // $("#subject").val(""); //= null;
        // $("#message").val(""); //= null;
        if(result==0)  
       { alert('Please sign up first, Your email id does not exist in our database');
        return false;
      }
      else
      {
        $.post("email/forgot_email.php", {to:emailTo}, function(result){
          // $("span").html(result);
          // document.getElementById("curBidUser"+bidID); 
          $("#u_name").val("");// = "";
        // $("#emailto").val("");//= null;
        // $("#subject").val(""); //= null;
        // $("#message").val(""); //= null;
          
        alert('Email has been sent to your inbox!!!');
        window.close(); 
        });

      }
        });
 
 }
 else
 {
  alert('Please enter your email-id');
 }       
    });

</script>
