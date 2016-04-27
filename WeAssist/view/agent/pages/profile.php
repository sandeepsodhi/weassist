<!DOCTYPE html>
<html>	
<?php
    session_start();
    if(!isset($_SESSION['u_type']))
    {
      header('location:../../main/error_401.php');
    }

    require_once '../../../model/dbConnect.php';
    $qu = mysqli_query($conn,"select contact,city from users where u_name = '".$_SESSION['u_name']."'");
    $fe = mysqli_fetch_assoc($qu);
    
    $qu1 = mysqli_query($conn,"select subcat_name from sub_category where subcat_id in (select subcat_id from profession where u_name = '".$_SESSION['u_name']."')");
    $subcat = "";
    while($fe1 = mysqli_fetch_assoc($qu1))
    {
      $subcat .= $fe1['subcat_name'].', ';
    }
?>
<head>
  <title>WeAssist | Profile</title>

  <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="../assets/dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="../assets/dist/css/skins/_all-skins.min.css">
  <link rel="stylesheet" href="../assets/dist/css/profilelabel.css">

  <!-- phone number validation -->
  <link href="../assets/css/bootstrap-form.css" rel="stylesheet">
  <link href="../assets/css/bootstrapValidator.css" rel="stylesheet"/> 
 
  <!--<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">-->
  <!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
 

  <script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<!-- slide-->
<!--<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">--
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<!--<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>-->




<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<!--<script src="//code.jquery.com/jquery-1.10.2.js"></script>-->
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<style type="text/css">
body {
}
.stepwizard-step p {
    margin-top: -15%;
}
.stepwizard-row {
    display: table-row;
}
.stepwizard {
    margin-top: 7%;
    margin-left: 11%;
    display: table;
    width:80%;
    position: relative;
}
.stepwizard-step button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
}
.stepwizard-row:before {
    top: 14px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 52%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;
    margin-top: -12%;
    margin-left:26%;

}
.stepwizard-step {
    display: table-cell;
    text-align: center;
    position: relative;
    /*width: 98%;*/
}
.btn-circle {
    width: 50px;
    height: 30px;
    text-align: center;
    /*padding: 6px 0;*/
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 5px;
    margin-top: -45%;
}
.btn-border{
  border: 1px solid grey;
}
.has-error:focus {
        border-color:rgba(221, 75, 57, 0.87);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(221, 75, 57, 0.37);
}
.has-success:focus {
        border-color:rgba(79, 166, 0, 0.93);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(105, 221, 57, 0.42);
}
.error{
    border-color:rgba(221, 75, 57, 0.87);
    /*box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(221, 75, 57, 0.37);*/
    margin-top: 8px;
}

/*  css for tool tip*/

#content{
  background-color: #FFF;
  border-radius: 4px;
  padding: 40px;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  margin: 0 auto 100px;
}

.help-tip{
    background-color: #bcdbea;
    border-radius: 50%;
    cursor: default;
    font-size: 13px;
    height: 17px;
    line-height: 17px;
    position: absolute;
    right: 405px;
    text-align: center;
    top: 208px;
    width: 17px;
}

.help-tip:before{
  content:'?';
  font-weight: bold;
  color:#fff;
}

.help-tip:hover p{
  display:block;
  transform-origin: 100% 0%;

  -webkit-animation: fadeIn 0.3s ease-in-out;
  animation: fadeIn 0.3s ease-in-out;

}

.help-tip p{
  display: none;
  text-align: left;
  background-color: #1E2021;
  padding: 20px;
  width: 300px;
  position: absolute;
  border-radius: 3px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  right: -4px;
  color: #FFF;
  font-size: 13px;
  line-height: 1.4;
}

.help-tip p:before{
  position: absolute;
  content: '';
  width:0;
  height: 0;
  border:6px solid transparent;
  border-bottom-color:#1E2021;
  right:10px;
  top:-12px;
}

.help-tip p:after{
  width:100%;
  height:40px;
  content:'';
  position: absolute;
  top:-40px;
  left:0;
}

@-webkit-keyframes fadeIn {
  0% { 
    opacity:0; 
    transform: scale(0.6);
  }

  100% {
    opacity:100%;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% { opacity:0; }
  100% { opacity:100%; }
}
</style>

</head>
<body class="skin-red-light sidebar-mini">			 
  <?php include 'header.php';?>  
  

<div class="wrapper">
    <!-- Content Wrapper -->
     <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">My Profile</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content" style="margin-top:20px;min-height:900px">
          <div class="box">
            <!-- /.box-header -->
            <div class="box-header">
                <!--<span class="fa fa-user-plus"></span>-->
                <h3>My Profile</h3>
            </div>
            
           <div style="border: 5px;">   
            <div class="stepwizard col-md-offset-3">
                <div class="stepwizard-row setup-panel">
                  <div class="stepwizard-step">
                    <a href="#step-1" type="button" style="background-color:#3c8dbc;color:white" class="btn btn-primary btn-circle">1</a>
                    <p>Step 1</p>
                  </div>
                  <div class="stepwizard-step">
                    <a href="#step-2" type="button" style="background-color:#3c8dbc;color:white" class="btn btn-default btn-circle" disabled="disabled">2</a>
                    <p>Step 2</p>
                  </div>
                </div>
             </div>

            <form role="form" action="../../../controller/profile_conn.php" id="profileform" method="POST" enctype='multipart/form-data'>
                <div class="row setup-content" id="step-1">
                  <div class="col-sm-6 col-sm-offset-3 col-xs-12">
                    <div class="col-md-12" style="margin-bottom:10%">
                      <h3> Step 1</h3>
                      <div class="form-group">
                        <label class="control-label">First Name</label>
                        <input  maxlength="100" type="text" style="font-size:14px" required="required" class="btn btn-border form-control" id="f_name" name="f_name" placeholder="Enter first Name" value="<?php echo $_SESSION['f_name'];?>" onkeydown="if (event.keyCode == 13) return false"/>
                      </div>
                      <div class="form-group">
                        <label class="control-label">Last Name</label>
                        <input maxlength="100" type="text" required="required" class="btn btn-border form-control" placeholder="Enter Last Name" id="l_name" name="l_name" value="<?php echo $_SESSION['l_name'];?>" onkeydown="if (event.keyCode == 13) return false" />
                      </div>
                      <div class="form-group">
                          <label class="control-label" style="margin-top:1%">Profile Pic</label>
                        
                        <img src='../../image/<?php echo $_SESSION['profile_pic']; ?>' width='100' height='100' alt=''  style='border-radius:10px;position:absolute; z-index:1;margin-left: 5%;margin-top:1%' id='image' onkeydown="if (event.keyCode == 13) return false"/>
                        <input type='file' name='image' id="image" accept=".jpg,.jpeg,.png" style='border-radius:20px;width:100px;height:100px;position:relative;z-index:2;margin-top: -5%;opacity:0;margin-left: 19%;' onchange='readURL(this)' />
                        <!--<input type="file" required="required" class="form-control" placeholder="Image" name="image" id="image" accept=".jpg,.jpeg,.png" >-->
                      </div>
                      <button class="btn btn-primary nextBtn btn-lg pull-right" type="button" >Next</button>
                    </div>
                  </div>
                </div>
                <div class="row setup-content" id="step-2">
                  <div class="col-xs-6 col-md-offset-3">
                    <div class="col-md-12" style="margin-bottom:10%">
                      <h3> Step 2</h3>
                      
                      <div class="form-group">
                        <label class="control-label">Mobile No</label>
                        <input maxlength="200" type="text" class="form-control btn btn-border" placeholder="Enter Contact" id="contact" name="contact" value="<?php echo $fe['contact'];?>" onkeyup="phonenumber(this)" sdata-error="Please give a correct phone number." onkeydown="if (event.keyCode == 13) return false" />
                      </div>
                      <div class="form-group">
                        <label class="control-label">Address</label>
                        <input type="text" value="<?php echo $fe['city']; ?>" class="form-control btn btn-border" placeholder="Enter your address" id="city" name="city" onkeydown="if (event.keyCode == 13) return false">
                        <input type="hidden" name="State" id="State"/> 
                        <input type="hidden" name="Country" id="Country"/> 
                      </div>
                      <div class="form-group">
                        <label class="control-label">Specialization
                          <div class="help-tip">
                            <p>Choose those services which are being offered by you and your workers.</p>
                          </div>
                        </label>
                        <input maxlength="200" value="<?php echo $subcat;?>" type="text"  class="form-control btn btn-border" placeholder="Enter Subcategory" id="subcategories"  name="subcategories" onkeydown="if (event.keyCode == 13) return false" />
                      </div>
                      <input class="btn btn-success btn-lg pull-right" style="background-color:#3c8dbc" type="submit" value="Submit">
                    </div>
                  </div>
                </div>
<!--                <div class="row setup-content" id="step-3">
                  <div class="col-xs-6 col-md-offset-3">
                    <div class="col-md-12">
                      <h3> Step 3</h3>
                      
                    </div>
                  </div>
                </div>-->
              </form>


            </div>


          </div>
          <!-- /.box -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


<?php 

if(isset($_SESSION['update']))
{
  if($_SESSION['update'] == "failed")
  {
    echo "alert('Profile updation failed!!! Please try again.')";
    unset($_SESSION['update']);
  }
}
?>
  
<div class="control-sidebar-bg"></div>
<?php include 'footer_sidebar.php' ?>
</div>
    
    
<!-- jQuery 2.2.0 -->
<!--<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="../assets/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../assets/plugins/slimScroll/jquery.slimscroll.min.js"></script>

<script src="../assets/dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../assets/dist/js/demo.js"></script>
<!--<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>-->
<script src="../assets/js/jquery.validate.js"></script>

</div>
<!-- <script type="text/javascript" src="js/bootstrap-form.js"></script> -->

<script type="text/javascript">
    $("#profileform").validate({
        //set this to false if you don't what to set focus on the first invalid input
        focusInvalid: false,
        //by default validation will run on input keyup and focusout
        //set this to false to validate on submit only
        onkeyup: false,
        onfocusout: false,
        //by default the error elements is a <label>
        errorElement: "div",
        //place all errors in a <div id="errors"> element
        // errorPlacement: function(error, element) {
        //     error.appendTo("div#errors");
        // }, 
        rules: {
            "city": {
                 required: false,
                // minlength: 5
            },  
            "contact": {
                // required: true,
                number: true,
                minlength: 10,
                maxlength: 10
                
            },
            "example2-zip": {
                required: true,
                number: true,
                rangelength : [3, 5]
            }
        },
        messages: {
            "example2-fullname": {
                required: "You must enter your full name",
                minlength: "First name must be at least 5 characters long"
            },  
            "example2-phone": {
                required: "You must enter your phone number",
                number : "Phone number must contain digits only",
                minlength:"Not a Valid number",
                maxlength:"Not a Valid number"
            },
            "example2-zip": {
                required: "You must enter your zip code",
                number: "Zip code must contain digits only",
                rangelength : "Zip code must have between 3 to 5 digits"
            }
        }
    });


</script>




<script type="text/javascript">
function phonenumber(inputtxt)  
{  
  var phoneno = /^\d{10}$/;  
  if(inputtxt.value.match(phoneno))  
  {  
    $('#contact').removeClass("has-error");
    $('#contact').addClass("has-success");
    return true
  }  
  else  
  {  

    $('#contact').removeClass("has-success");
    $('#contact').addClass("has-error");
    // console.log(inputtxt.value);
     return false;  
  }  
 }  
</script>

<script type="text/javascript">
         function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image')
                        .attr('src', e.target.result)
                        .width(100)
                        .height(100);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
</script>


<script type="text/javascript">
    function initialize() {
	    var options = {
            types: ['(cities)'],
            //componentRestrictions: {country: "in"}
        };
        var input = document.getElementById('city');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
          	
		//console.log(autocomplete);
	}
	
	//$("#city").val(function(){alert("kuch hua");});
	
  $('input[name=city]').change(function () {
		    setTimeout(function () {
            console.log($("#city").val());
            console.log(($("#city").val().match(/,/g) || []).length); //logs 3
            var val=[];
            if(($("#city").val().match(/,/g) || []).length==2)
            {
                //All City, State, Country Exists
                val=$("#city").val().split(',');
                $("#city").val(val[0]);
                $("#State").val(val[1]);
                $("#Country").val(val[2]);
          //     console.log($("#Country").val());
            }
            else if (($("#city").val().match(/,/g) || []).length == 1)
            {
                //Only City and Country Exists
                val=$("#city").val().split(',');
                $("#city").val(val[0]);
                $("#State").val('NA');
                $("#Country").val(val[1]);

            }

        }, 1000);
    });

    $('input[name=city]').click(function () {
        document.getElementById('city').value = '';
        document.getElementById('State').value = '';
        document.getElementById('Country').value = '';
    });

    google.maps.event.addDomListener(window, 'load', initialize);
</script>
<script type="text/javascript">
  $(document).ready(function () {
  var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
              $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
          //alert("Hello! I am an alert box!!");
         //$("#profileform").submit();

  });

  $('div.setup-panel div a.btn-primary').trigger('click');
		//$("#profileform").submit();

});
  </script>
 <script type="text/javascript">
       
$(function() {
    $( "#subcategories" ).autocomplete({
        source: 'demo1.php'
    });
});

    </script>
    <script>
$(function() {
    function split( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        return split( term ).pop();
    }
    
    $( "#subcategories" ).bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
            event.preventDefault();
        }
    })
    .autocomplete({
        minLength: 1,
        source: function( request, response ) {
            // delegate back to autocomplete, but extract the last term
            $.getJSON("demo1.php", { term : extractLast( request.term )},response);
        },
        focus: function() {
            // prevent value inserted on focus
            return false;
        },
        select: function( event, ui ) {
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = terms.join( ", " );
            return false;
        }
    });
});
</script>
</body>
</html>


	    