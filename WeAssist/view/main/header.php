<style>
.col-sm-3
{
	margin-left:22px;
}
.form-data
{
	
	width:630px;
}
</style>

<header class="header header-menu-fullw">
	<div class="header-main">
		<div class="container">
			<!-- Logo -->
			<div class="logo">
				<a href="index.html"><img src="images/logo.png" alt="Handyman"></a>
				<!-- <h1><a href="index.html"><span>Handy</span>Man</a></h1> -->
			</div>
			<!-- Logo / End -->

			<button type="button" class="navbar-toggle">
				<i class="fa fa-bars"></i>
			</button>

			<!-- Navigation -->
			<nav class="nav-main">
	<!--		<a href="logout.php">Logout</a>
			/
		<a href="logout.php">Go To Dashboard</a>-->
				<div class="nav-main-inner">
					<ul data-breakpoint="992" class="flexnav">
						<li class="active"><a href="index.php">Home</a></li>
						<!--<li><a href="#">Pages</a>
							<ul>
								<li><a href="page-about.php">About Us</a></li>
								<li><a href="page-services.php">Services</a></li>
								<li><a href="page-team.php">Team</a></li>
								<li><a href="page-team-member.php">Team Member</a></li>
								<li><a href="page-faqs.php">FAQs</a></li>
								<li><a href="page-fullwidth.php">Full Width</a></li>
								<li><a href="page-left-sidebar.php">Left Sidebar</a></li>
								<li><a href="page-right-sidebar.php">Right Sidebar</a></li>
								<li><a href="page-login.php">Login &amp; Register</a></li>
								<li><a href="page-404.php">404</a></li>
							</ul>
						</li>-->
						<!--<li><a href="#">Features</a>
							<ul>
								<li><a href="features-shortcodes.php">Shortcodes</a></li>
								<li><a href="features-pricing-tables.php">Pricing Tables</a></li>
								<li><a href="features-typography.php">Typography</a></li>
								<li><a href="features-columns.php">Columns</a></li>
								<li><a href="features-icons.php">Icons</a></li>
							</ul>
						</li>-->
						<li><a href="#">Jobs</a>
							<ul>
						<!--		<li><a href="job-post-profile.php">Post a Profile</a></li>-->
								<li><a href="../customer/pages/jobcreation.php">Post a Job</a></li>
								<li><a href="professional.php">Professionals</a></li>
								<!--<li><a href="job-dashboard.php">Dashboard</a></li>
								<li><a href="job-profile.php">Profile</a></li>-->
							</ul>
						</li>
					<!--	<li><a href="blog-right-sidebar.html">Blog</a>
							<ul>
								<li><a href="blog-right-sidebar.php">Blog Right Sidebar</a></li>
								<li><a href="blog-left-sidebar.php">Blog Left Sidebar</a></li>
								<li><a href="blog-fullwidth.php">Blog Full Width</a></li>
								<li><a href="blog-post.php">Single Post</a></li>
							</ul>
						</li>-->
						<li><a href="#">Category</a></li>
						<li>
							<a href data-toggle="modal" data-target="#myModal"  class="btn btn-sm"><i class="fa fa-sign-in"></i> Login/Register</a>
				
						</li>

					</ul>
				
				</div>
			</nav>
			<!-- Navigation / End -->

		</div>
	</div>
	
</header>
<div class="container">
			    <!-- Trigger the modal with a button -->
    			<!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

      			<!-- Modal -->
	        <div class="modal fade modal-admin" id="myModal" role="dialog">
    	    <div class="modal-dialog">
    
        	<!-- Modal content-->
        	<div class="modal-content">
    
	   		    <div class="modal-header login-modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                <h4 class="modal-title text-center" id="loginModalLabel">LogIn to WeAssist</h4>
	        	</div>   

		        <ul class="nav nav-tabs">
		            <li class="active"><a data-toggle="tab" href="#login">LogIn</a></li>
		            <li><a data-toggle="tab" href="#signup">SignUp</a></li>
		        </ul>

		        <div class="tab-content">
		            <div id="login" class="tab-pane fade in active">
		                <form class="form-horizontal" id="logform" name="logform" action="../../controller/login.php"  method="POST">
		                    <div class="form-group">
		                        <div style="margin-top:22px;" class="input-group dialog-s col-xs-10 col-sm-10">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                            <input type="email" class="form-control" id="u_name" name="u_name" placeholder="Username" onclick="showUser(this.value)" required>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-lock"></i>
		                            </div>
                                            <input type="password" class="form-control" id="pswd" name="pswd" placeholder="Password" required>
		                        </div>
		                    </div>
		                                    
		                    <div class="form-group">
		                        <div class="col-xs-offset-3 col-xs-6">
		                            <button style="width:120px;margin-left:-30px"type="submit" class="btn btn-info btn-primary" id="btnsub">Login</button>
		                        </div>
		                    </div>
		                    <div class="form-group">
		                      <label class="control-label col-xs-11 col-sm-7" style="font-size:17px;margin-left:-7px">or connect with</label>
		                    </div>
		                    
		                </form>
		                    <div class="form-group">
    		                    <button  style="margin-right:23px" class="btn btn-linkedin" onclick="window.open('http://localhost/WeAssist/controller/api/linkedin/linkedin.php','width=20px', 'height=500')"><i class="fa fa-linkedin">  |</i> linkedIn</button>
			                    <button style="margin-right:23px" class="btn btn-google-plus" onclick="window.open('https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%2FWeAssist%2Fcontroller%2Fapi%2Fgoogle-login-api%2Findex.php&client_id=122120274303-us18a5vafcf6p797b22hf7ajq71ookah.apps.googleusercontent.com&scope=email+profile&access_type=online&approval_prompt=auto','width=20px', 'height=500')"><i class="fa fa-google-plus">  |</i> Google</button> 
			                    <button style="margin-right:23px" class="btn btn-facebook" onclick="window.open('https://www.facebook.com/dialog/oauth?client_id=1499856963656095&redirect_uri=http%3A%2F%2Flocalhost%2FWeAssist%2Fcontroller%2Fapi%2Ffacebook_login_with_php%2F&state=e572c77de5a7507ae81b7546a9c24343&scope=email','width=20px', 'height=500')"><i class="fa fa-facebook">  |</i>  facebook</button> 
		                    </div>
		            </div> 
		         
		            <div id="signup" class="tab-pane fade">
						<form class="form-horizontal" enctype="multipart/form-data" name="signupform" id="signupform" method="POST" action="../../controller/register.php">
		                    <div class="form-group">
		                        <div style="margin-top:22px;"class="input-group col-xs-10 col-sm-10 dialog-s ">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>
                                            <input type="text" class="form-control" id="f_name" name="f_name" placeholder="First Name" onclick="isalpha(this.value)"&nbsp  required>
								
									<div class="input-group-addon" style="margin-left:10px" &nbsp;>
		                            	<i class="fa fa-user"></i>
		                            </div>
                                            <input type="text" class="form-control" style="width:210px" name="l_name" id="l_name" placeholder="LastName" onkeyup="isalpha(this.value)">
		                        </div>
		                    </div>
		                    <div class="form-group">
		                        <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-at"></i>
		                            </div>
                                            <input type="email" class="form-control" id="u_name" name="u_name" placeholder="Email" onclick="showUser(this.value)" required></p>
		                        </div>
		                    </div>
		                    <div class="form-group">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-lock"></i>
		                            </div>
									
                                           <input type="password" class="form-control" id="pswd" name="pswd" placeholder="Password" required>
		                        </div>
		                    </div>
							 <div class="form-group">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-lock"></i>
		                            </div>
									
                                           <input type="password" class="form-control" id="c_pswd" name="c_pswd" placeholder="Confirm Password" onclick="checkPasswordMatch();" required>
		                        </div>                               
								<div> <input type="hidden" id="error" name="error" class="form-control"></div>

		                    </div>
							 <div class="form-data" style="margin-left:-15px">
	 	                       <div class="input-group col-xs-10 col-sm-10 dialog-s">
		                            <div class="input-group-addon">
		                                <i class="fa fa-user"></i>
		                            </div>   
									
                                           <input  type="text" class="form-control" id="r_user" name="r_user" placeholder="Reference user">
		                        </div>
		                  
	</div>

<!-- This select is being replaced entirely by the jqtransorm plugin -->

<div class="col-sm-3" style "float:right"> 
<select name="u_type" id="u_type" required autocomplete="off">
<option value="" selected="selected"> - Choose A Option  -</option>
<option value="agent" id="u_type">Agent</option>
<option value="worker" id="u_type" >Worker</option>
<option value="customer" id="u_type" >Customer</option>
</select>          

<!--<p style="color: black"><b>Agent </b></p>
<input  type="radio"  name="u_type" id="u_type"  value="agent"  onclick="if(this.checked) this.value='agent'; " required autocomplete="off" chacked>
</div>
									   <div class="col-sm-3">			   <div class="col-sm-1" ></div>
					
	<p style="color: black"><b>Customer</b></p>
<input  type="radio" name="u_type" id="u_type" value="customer"  onclick="if(this.checked) this.value='customer'; "  chacked required autocomplete="off"></div>
	   <div class="col-sm-3">
	<p style="color: black"><b>Worker</b></p>
<input  type="radio" name="u_type" id="u_type" value="worker"  onclick="if(this.checked) this.value='worker'; " chacked required autocomplete="off"></div>
--></div>

											
		                    <div class="form-group" syle="margin-top:">
		                        <div class="col-xs-offset-3 col-xs-6">
		                            <button style="width:120px;margin-left:-30px"type="submit" class="btn btn-info btn-primary">SignUp</button>
		                        </div>
								
		                    </div>
							 <div class="form-group">
		                        <div class="input-group col-xs-10 col-sm-10 dialog-s">
                         			<div id="txtHint"></div>
								</div>
		                    </div>

		                    <div class="form-group">
		                        <label class="control-label col-xs-11 col-sm-7" style="font-size:17px;margin-left:-7px">or connect with</label>
		                    </div>
		                </form>
		                <div class="form-group">
		                    <button  style="margin-right:23px" class="btn btn-linkedin" onclick="window.open('http://localhost/WeAssist/controller/api/linkedin/linkedin.php','width=20px', 'height=500')"><i class="fa fa-linkedin">  |</i> linkedIn</button>
		                    <button style="margin-right:23px" class="btn btn-google-plus" onclick="window.open('https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%2FWeAssist%2Fcontroller%2Fapi%2Fgoogle-login-api%2Findex.php&client_id=122120274303-us18a5vafcf6p797b22hf7ajq71ookah.apps.googleusercontent.com&scope=email+profile&access_type=online&approval_prompt=auto','width=20px', 'height=500')"><i class="fa fa-google-plus">  |</i> Google</button> 
		                    <button style="margin-right:23px" class="btn btn-facebook" onclick="window.open('https://www.facebook.com/dialog/oauth?client_id=1499856963656095&redirect_uri=http%3A%2F%2Flocalhost%2FWeAssist%2Fcontroller%2Fapi%2Ffacebook_login_with_php%2F&state=e572c77de5a7507ae81b7546a9c24343&scope=email','width=20px', 'height=500')"><i class="fa fa-facebook">  |</i>  facebook</button> 
		                </div>
		            </div>
            		<div id="menu3" class="tab-pane fade">
                 <!-- without it not working-->
            		</div>
	   			</div>  <!--all tab content over here-->
         
				<!--   ending of modal content    -->
        	</div>
       		</div>
       		</div>
    		</div> <!-- end of container--> 


			  <script>
            function showUser(str) {
                if (str == "") {
                    document.getElementById("txtHint").innerHTML = "";
                    return;
                } else {
                    if (window.XMLHttpRequest) {
                        // code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp = new XMLHttpRequest();
                    } else {
                        // code for IE6, IE5
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
                        }
                    };
                    xmlhttp.open("GET","../../controller/registered.php?u_name="+str,true);
                    xmlhttp.send();
                }
            }
			

        </script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.0/js/bootstrapValidator.js"></script>
    <script>
$('#signupform').bootstrapValidator({
container: "popover",
message: 'This value is not valid',
	feedbackIcons: {
           // valid: 'glyphicon glyphicon-ok',
           // invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
	fields: {
            f_name: {
                validators: {
                    notEmpty: {
                        message: "You're required to fill in a first name!"
                    		  }, // notEmpty
				    regexp: {
                        regexp: /^[A-Za-z\s.'-]+$/,
                        message: "Alphabetical characters, hyphens and spaces"
							}
                } // validators
                      },
					  // firstname
            l_name: {
                validators: {
                    notEmpty: {
                        message: "You've forgotten to provide your last name!"
                    		  },
					regexp: {
                        regexp: /^[A-Za-z\s.'-]+$/,
                        message: "Alphabetical characters, hyphens and spaces"
                    }							  // notEmpty
                			} // validators
                      },  // lastname
            email: {
                validators: {
                    notEmpty: {
                        message: "An email address is mandatory."
                    		  }, // notEmpty
					emailAddress: {
                        message: "This is not a valid email address"
                    				} // emailAddress		  
                			} // validators
                      }
					  // email
			
			} // fields

			});
			
	$('#myModal').on('shown.bs.modal', function() {
   $('#signupform').bootstrapValidator('resetForm', true);
	});

    </script>
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script> 
<script>
var trigger = '.trigger';
var list = '.list';
function toggleIt() {
  $(list).slideToggle(200, 'linear');
}

$(trigger).on('click', function () {
	toggleIt();
});
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<!--input[type='text'], textarea, select {
2
	    border: solid 1px #999;
3
	}
4
	input[type='text'].focus, textarea.focus, select.focus {
5
	    border-color: #000 !important;
6
	}
7
	input[type='text'].invalid, textarea.invalid, select.invalid {
8
	    border-color: red;
9
	}-->
<script type="text/javascript">
$(document).ready(function(){
    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="worker"){
                $(".form-data").not(".form-data").hide();
                $(".form-data").show();
            }
          
            else{
                $(".form-data").hide();
            }
        });
    }).change();
});
</script>

<script>

function checkPasswordMatch() {
    var pswd = $("#pswd").val();
    var c_pswd = $("#c_pswd").val();

    if (pswd != c_pswd)
        $("#error").html("Passwords do not match!").css('color', 'red');
    else
        $("#error").html("Passwords match.").css('color', 'green');
}
  </script>