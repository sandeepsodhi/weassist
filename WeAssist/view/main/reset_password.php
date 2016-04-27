
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
    
<link href="assets/css/bootstrapValidator.css" rel="stylesheet"/> 



<!-- FONT AWESOME ICONS STYLE SHEET -->
<link href="assets/css/font-awesome.css" rel="stylesheet" />
<body style="background-color:#fff;">
<form method="POST" action="../../controller/reset_pswd.php">
    <div class="form-group">
        <div style="margin-top:120px;" class="input-group dialog-s col-xs-10 col-sm-10">
      <img src="images/logo.png">

        </div>
    </div>
    <div class="form-group" style="margin-top:70px">
        <div class="input-group col-xs-8 col-sm-5 dialog-s" style="margin-left:25%">
          <div class="input-group-addon">
              <i class="fa fa-lock"></i>
          </div>
          <input type="password" class="form-control" id="pswdd" name="pswdd" placeholder="Password" required>
        </div>
      </div>
     <div class="form-group" id="s">
       <div class="input-group col-xs-8 col-sm-5 dialog-s" style="margin-left: 25%">
          <div class="input-group-addon">
            <i class="fa fa-lock"></i>
          </div>
          <input type="password" class="form-control" id="c_pswd" name="c_pswd" placeholder="Confirm Password" onkeyup="checkPasswordMatch();" required>
       </div>                               
    </div>
    <div class="form-group">
              <div class="col-xs-offset-3 col-xs-6">
                  <button style="width:120px;margin-left:50%"type="submit" class="btn btn-info btn-primary" id="btnsub">Login</button>
              </div>
    </div>
    <div class="form-group" style="margin-top:70px">
          <input type="hidden" class="form-control" id="u_name" name="u_name" value="<?php echo $_REQUEST['u_name'] ?>">
      </div>
     


</form>                


</body>    


<script type="text/javascript" src="js/jquery.min.js"></script>
<!-- <script src="assets/js/jquery.min.js"></script> -->
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/bootstrapValidator.js"></script>

<script type="text/javascript">

function checkPasswordMatch() {
    var pswd = $("#pswdd").val();
    var c_pswd = $("#c_pswd").val();
    if (pswd != c_pswd)
    {
      $('#s').addClass("has-error");
    }
    else
    {
      $('#s').addClass("has-success");
    }
}

</script>
