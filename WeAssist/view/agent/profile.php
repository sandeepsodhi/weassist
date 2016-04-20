	<!DOCTYPE html>

<html>	
<?php
	session_start();

?>
    <head>
  <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="../dist/css/profilelabel.css">

  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
   <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
 

 <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>







  <title>WeAssist | Categories</title>

  
<!----------------------slider----------------------------------------------------------------->
        <meta charset="utf-8">
		<link type="text/css" rel="stylesheet" href="css/rhinoslider-1.05.css" />
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="js/jquery.min.js"></script>
<!--		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>-->
        <script type="text/javascript" src="js/rhinoslider-1.05.min.js"></script>
        <script type="text/javascript" src="js/mousewheel.js"></script>
        <script type="text/javascript" src="js/easing.js"></script>

	<script type="text/javascript"> 



$(document).ready(function()
			{
                $('#slider').rhinoslider({
                    controlsPlayPause: false,
                    showControls: 'always',
                    showBullets: 'always',
                    controlsMousewheel: false,
                    prevText: 'Back',
                    nextText:'Proceed',
		    slidePrevDirection: 'toRight',
		slideNextDirection: 'toLeft'
										});

                $(".rhino-prev").hide();
                $('.rhino-next').after('<a class="form-submit" href="javascript:void(0);">Proceed</a>');
                $(".rhino-next").hide();

				
                var info = ["PERSONAL DETAILS","PROFESSIONAL DETAILS","CONTACT DETAILS"];
                var images = ["personal-details-icon.png","account-details.png","contact-details.png"];
                $('.rhino-bullet').each(function(index)
				{
                    $(this).html('<p style="margin: 0pt; font-size: 13px; font-weight: bold;"><img src="./img/'+
                        images[index]+'"></p><p class="bullet-desc">'+info[index]+'</p></a>');
                });
            });

            $('.form-submit').live("click",function()
			{
				$('.form-error').html("");
                var current_tab = $('#slider').find('.rhino-active').attr("id");
				//alert(current_tab);
                switch(current_tab){
                    case 'rhino-item0':
                        step1_validation();
                        break;
                    case 'rhino-item1':
                        step2_validation();
                        break;
                    case 'rhino-item2':
                        step3_validation();
						break;
									}
            });

            var step1_validation = function()
			{
                var err = 0;

                if($('#f_name').val() == ''){
                    $('#f_name').parent().parent().find('.form-error').html("First Name is Required");
                    err++;
                }
                if($('#l_name').val() == ''){
                    $('#l_name').parent().parent().find('.form-error').html("Last Name is Required");
                    err++;
                }
                if($('#image').val() == ''){
                    $('#image').parent().parent().find('.form-error').html("Please Choose Profile Pic");
                    err++;
                }
				 if($('#searchCityField').val() == ''){
                    $('#searchCityField').parent().parent().find('.form-error').html("City  is Required");
                    err++;
                }
                if(err == 0){
                    $(".rhino-active-bullet").removeClass("step-error").addClass("step-success");
                    $(".rhino-next").show();
                    $('.form-submit').hide();
                    $('.rhino-next').trigger('click');
                }else{
                    $(".rhino-active-bullet").removeClass("step-success").addClass("step-error");
                }


            };

           
		   var step2_validation = function()
		   {
               var err = 0;
		            //  if($('#categories').val() == ''){
                    //$('#categories').parent().parent().find('.form-error').html("Please Select Category");
                    err++;
               // }
               
               
                
                if(err != 0){
                    $(".rhino-active-bullet").removeClass("step-error").addClass("step-success");
                    $(".rhino-next").show();
                    $('.form-submit').hide();
                    $('.rhino-next').trigger('click');
                }else{
                    $(".rhino-active-bullet").removeClass("step-success").addClass("step-error");
                }

            };

            var step3_validation = function()
			{
                var err = 0;

                if($('#email').val() == ''){
                    $('#email').parent().parent().find('.form-error').html("Email is Required");
                    err++;
                }
				if($('#contact').val() == ''){
                    $('#contact').parent().parent().find('.form-error').html("Mobile No is Required");
                    err++;
                }
                if(err == 0){
                    $(".rhino-active-bullet").removeClass("step-error").addClass("step-success");
                    $(".rhino-next").show();
                    $('.form-submit').hide();
                    $('.rhino-next').trigger('click');
					$("#profileform").submit();
                }else{
                    $(".rhino-active-bullet").removeClass("step-success").addClass("step-error");
                }

            };
			
			
			
 
					</script>
			
			
					
					
			
	
      
      <style type="text/css">
            body { background-color:#fff; }
            #wrapper{
                border: 1px solid #DCDADA;
                border-radius: 5px 5px 5px 5px;
                box-shadow: 2px 2px 2px #E1E1E1;
                background: #fff;
                width:700px;
                height:480px;
                background:#f4f4f4;


            }
              #wrapper h3{
                font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
                font-size:16px;
                height:60px;
                background:url(img/title.png) no-repeat left top;
                margin:0;
                padding:16px 0 0 20px;
                text-shadow: 1px 1px 2px #000;
                filter: dropshadow(color=#000, offx=1, offy=1);
                color:#fff;
            }
            #slider {

                background: #fff;
                /*IE bugfix*/
                padding:0;
                margin:0;
                width:700px;
                height:400px;	

            }

            #slider li { list-style:none; }

            #page {
                width:600px;
                margin:80px auto;
            }

            #slider{
                color: #000;
                background:#f4f4f4;
                font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
                font-size:12px;
            }

            .form-step{

                padding:16% 3% !important;


            }

            .form-submit{
                cursor: pointer;
                display: block;
                position: absolute;
                right: 0;
                bottom: 0;
                -moz-user-select: none;
                background: none repeat scroll 0 0 #6F95DC;
                border-radius: 5px 5px 5px 5px;
                color: #FFFFFF;
                display: block;
                margin: 0 20px 20px;
                padding: 10px;
                text-align: center;
                width: 125px;
                z-index: 10;
                font-weight: bold;
                text-decoration: none;
                background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#94b9e9), to(#4870d2));
                background-image: -moz-linear-gradient(#94b9e9, #4870d2);
                background-image: -webkit-linear-gradient(#94b9e9, #4870d2);
                background-image: -o-linear-gradient(#94b9e9, #4870d2);
                filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#94b9e9, endColorstr=#4870d2)";
                -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#94b9e9, endColorstr=#4870d2)";
                font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;

            }

            .errorDisplay{
                border:2px solid red;
            }

            .form-left{
                color: #717171;
                float: left;
                font-size: 13px;
                font-weight: bold;
                padding: 5px;
                width: 200px;
            }
            .form-right{
                float: left;
                width: 214px;
            }
            .row{
                float: left;
                margin: 5px 0;
                width: 100%;
            }
            .form-step input[type='text']{
                border: 1px solid #CFCFCF;
                border-radius: 4px 4px 4px 4px;
                height: 25px;
                padding: 3px;
                width: 200px;
            }
            select{
                border-radius: 4px;
                border: 1px solid #CFCFCF;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                background: #FFF;
                padding: 2px;
                height: 30px;
                width:205px;
                font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
                font-size:12px;
                background:#f4f4f4;
            }

            select option{
                font-family:"Lucida Sans Unicode", "Lucida Grande", sans-serif;
                font-size:12px;
                background:#f4f4f4;
                color:#717171;
            }


            .form-error{
                color: red;
                font-size: 12px;
                padding: 8px;
            }

            .step-error{
                background:#f5715f !important;
                color:#FFF !important;
                -moz-box-shadow:1px 1px 4px #C6C4C4
                    -webkit-box-shadow:1px 1px 4px #C6C4C4
                    box-shadow:1px 1px 4px #C6C4C4
            }
            .step-success{
                background:#72e487 !important;
                color:#FFF !important;
                -moz-box-shadow:1px 1px 1px 4px #C6C4C4
                    -webkit-box-shadow:1px 1px 1px 4px #C6C4C4
                    box-shadow:1px 1px 1px 4px #C6C4C4
            }
            .bullet-desc{
                font-size: 14px;
                font-weight: bold;
            }
.description {
    
   
    
    height: 27px;
    
    width: 198px;
}
        </style>

    </head>
    <body class="skin-red-light sidebar-mini">			 
  <?php include 'header.php';?>  
	          
<div class="box-header with-border">
	<div id="page">
            <div id="wrapper">

                <h3><b>Complete Your Profile</b></h3>
				<div> &nbsp; </div>
                <form action="../../../controller/profile_conn.php" id="profileform" method="POST" enctype='multipart/form-data'>
				<div> &nbsp; </div>
				<div id="slider">
                        <div class="form-step" >
							<input type="hidden" id="u_id" name="u_id" value="5"/>	 
 
                            <div class="row">
                                <div class="form-left">First Name *</div> 
                                <div class="form-right"><input type="text" id="f_name" name="f_name" value="<?php echo $_SESSION['f_name'];?>" class="form-input" /></div>
                                <div class="form-error"></div>
                            </div>
                            <div class="row">
                                <div class="form-left">Last Name *</div>
                                <div class="form-right"><input type="text" id="l_name" name="l_name" value="<?php echo $_SESSION['l_name'];?>" class="form-input" /></div>
                                <div class="form-error"></div>
                            </div>      
							<div class="row">
                                <div class="form-left">Profile Pic *</div>
                                <div class="form-right">
                                 <input type="file" class="form-input" name="image" id="image" accept=".jpg,.jpeg,.png">
                                </div>
                                <div class="form-error"></div>
                            </div>							
                            <div class="row">
                                <div class="form-left">Address *</div>
                                <div class="form-right"><input type="text" name="city" id="city" class="form-input" placeholder="Enter a Location">
								<!--<input type="hidden" name="city" id="city"/> -->
								<input type="hidden" name="State" id="State"/> 
								<input type="hidden" name="Country" id="Country"/> </div>

                                <div class="form-error"></div>
                            </div>
                        </div>
						
					<div class="form-step">
					<!--		<div class="row">
						        <div class="form-left">Category *</div>
								<div class="form-right">
							<input type="text" autocomplete="off" id="categories" name="categories" class="form-input"/></div>
								<div id="dropdown" class="form-input" style='border:1px;border-color:#ararar;position:relative'/></div>
								
								<div id="cats"></div>
								<div class="form-error"></div>
							</div>-->
	
                            <div class="row">
						        <div class="form-left">Subcategory *</div>
								<div class="form-right">
								<input type="text" autocomplete="off" id="subcategories"  name="subcategories" class="form-input" />
								<input type="hidden" name="subcat"></div>
								<div id="dropdown" class="form-input" style='border:1px;border-color:#ararar;position:relative'/></div>
								<div id="cats" name="cats"></div>
																

								<div class="form-error"></div>
							</div>
					</div>
										
						<div class="form-step">
                            <div class="row">
                                <div class="form-left">Email *</div>
                                <div class="form-right"><input type="text" id="u_name" name="u_name" value="<?php echo $_SESSION['u_name'];?>" class="form-input" /></div>
                                <div class="form-error"></div>
                            </div>
                            <div class="row">
                                <div class="form-left">Mobile No *</div>
                                <div class="form-right"><input type="text" id="contact" name="contact" class="form-input" /></div>
                                <div class="form-error"></div>
                            </div>
                        </div>
                    </div>
</form>
</div>
</div>
</div></div>


 
  <div class="control-sidebar-bg"></div>
</div>

<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<!--<script src="../plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="../bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="../plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../plugins/slimScroll/jquery.slimscroll.min.js"></script>

<script src="../dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>
<script src="http://jqueryvalidation.org/files/dist/jquery.validate.min.js"></script>
<script src="http://jqueryvalidation.org/files/dist/additional-methods.min.js"></script>
</div>
		 
<script type="text/javascript"> 
	var catarr = new Array(); 
	function getdata(){
        $.getJSON("data.php", function(data) {
		var i= 0;
		catarr.length=0;
		while(i<data.length){
					catarr.push(data[i]);
			 i++;
		}
		console.log(catarr);	
        });
}




$("#subcategories").bind("keyup",function(e){
	getdata();
	console.log(catarr);
if(e.keyCode==13){
$("#cats").append("<div class='btn btn-info' style='margin-left:5px'>"+$("#subcategories").val()+"</div>");
$("#subcategories").val("");
}
else{
var tarr = $.grep(catarr,function( a ) {
	 return a.indexOf($("#subcategories").val()) == 0;
});

var html="";
for(i=0;i<tarr.length;i++)
{
	html+="<div id='tag_"+tarr[i]+"' onclick='addtag(\""+tarr[i]+"\")' style='font-weight:bold;'>"+tarr[i]+"</div>"
}
$("#dropdown").html(html);
}
});

function addtag(name,id)
{
$("#cats").append("<div id='t_"+name+"' name='t_"+id+"' onclick='removetag(\""+name+"\")' class='btn btn-info'  style='margin-left:5px'>"+name+" </div>");
$("#subcategories").val(id);
$("#tag_"+name).remove(); 
console.log($("#t_"+name).data("cat_id"));
}

function removetag(n)
{
	$("#t_"+n).remove();
	$('#t_name').click(function () {
	document.getElementById("cats").remove();
});
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





</body>
</html>
