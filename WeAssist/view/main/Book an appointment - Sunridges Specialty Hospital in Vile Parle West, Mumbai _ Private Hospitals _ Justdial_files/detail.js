var flt_hdr;
var scroll_status = true;
var bestdealform = false;
var onfocusvar = 0;
var closebestdealform = false;
var smsemailsource = '';
var writeReviewMovie;
var writeReviewProd;
var gl_delFlg;
var gl_itemId;
var gl_orderDetailId;
var gl_page;
var focusId;
var divFlg = 0;
var blackflag;
var mvie = (onloadFn == "read_mreview") ? 1 : 0;
var timerID = null;
var scrvto = 0;
var shwbd = 1;
var mvseotag = 0;
var glblkid = '' ;
var ver_msg = '';
var address_error = '';
var temp_domvar = '';
var domcookieid = $.trim($('#domId').val());
var area_by_geolocation = 1;
var checkAjx = 0;
var checkOutAjx = 0;
var openDet = 0;
var addCart = 0;
var movieName = '';
var movieUrl = '';
var pgurl = '';
var hiq_url = '';
//Submit Review for Listing
var rw_detail = 0;




function getareafromprevorder(){
    $.ajax({
        url:WEBROOT+"functions/deliveryDetByPrevOrdr.php",
        dataType:"json", 
        type: "post",
        data :{
            'res_city':$('#city').val(),
            'docId':$("#docid").val()
        }, 
        success:function(res){
            //if(res.results.matchedArea != ''){
            //    var area=  $.trim(res.results.matchedArea);
            //    $("#areafrmordr").val(area); 
            //}
            if($.trim(res.results.matchedPin) != ''){
                var pin=  $.trim(res.results.matchedPin);
                $("#txtPin").val(pin);
            }
        }
    });	
}


function submitWriteReview()
{
	var userAgent = navigator.userAgent.toUpperCase();
	var ct		=	$("#rcity").val();
    var photo_array = document.frmreview.elements["photo[]"];
    
    if(photo_array.length > 1)
    {
        for(i=0;i<photo_array.length;i++)
        {
            for(j=0;j<photo_array.length;j++)
            {
                if(i != j)
                {
                    if(photo_array[i].value.length != '' && photo_array[j].value.length != '')
                    {
                        if(photo_array[i].value == photo_array[j].value && userAgent.indexOf('IPAD') == -1)
                        {
                            alert("You have selected same image multiple times.");
                            return false;
                        }
                    }
                }
            }
        }
    }
    for(i=0; i < photo_array.length; i++)
    {
        if(photo_array[i].value != "")
        {
            file_name = photo_array[i].value;
            last_dot_pos = photo_array[i].value.lastIndexOf(".");
            string_length = photo_array[i].value.length;
            file_extension = file_name.slice(last_dot_pos,string_length);
            if(	file_extension.toLowerCase() != ".jpg" && file_extension.toLowerCase() != ".jpeg" && file_extension.toLowerCase() != ".gif" && file_extension.toLowerCase() != ".png")
            { 
                alert("Please select jpg/png/gif image file only");
                return false;
            }
        }
    }

	if($('#rating').val() == "")
	{
		$('#ratingErr').css('display','block');		
		$('#ratingErr').html("Please select rating");		
		window.location.hash = '#rating_stars';
		return false;
	}	
	
	//if(validateReview("rating","Please select one rating")==true){
		if(validateForm("wrname","Please enter your name")==true) {
			var uname = trim($("#wrname").val());
			$("#wrname").val(uname);
			if($('#wrname').val() == 'e.g Ravi Verma' || $('#wrname').val() == 'Name*') {
				$('#wrnameErr').html("Please enter your name");
				return false;	
			}
			if(/^[a-zA-Z]+([.]{0,1}[']{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(uname) == false || /^[\.]+$/.test(uname) == true)
			{
				ed("wrnameErr").innerHTML =  "Please enter your valid name";
				ed("wrname").focus();
				return false;
			}
			var wrnamelength = $("#wrname").val().length;
			if(wrnamelength > 50)
			{
				ed("wrnameErr").innerHTML =  "Please enter your valid name";
				ed("wrname").focus();
				return false;
			}
			if(validateMobile_review("wrmob","Please enter your mobile number")==true) {
				if($('#wrmob').val() == '9867045061' || $('#wrmob').val() == 'e.g 9867045061' || $('#wrmob').val() == 'Mobile Number*') {
					$('#wrmobErr').html("Please enter your mobile number");
					return false;	
				}
				if($('#wrereview').val() == 'Add Review')
				{
					$('#wrereview').val('');
				}
				if(review_validate_email("wremail")==true) {
					if($('#wremail').val() == 'Email ID') {
						$('#wremailErr').html("Please enter valid email id");
						return false;	
					}
					$('.revprog').removeClass('dn');
				   $('#frmreview').attr( "enctype", "multipart/form-data" );
				   $('#frmreview').attr( "action", WEBROOT+"webmain/review_save.php?city="+ct );
				   $('#frmreview').attr( "method", "post" );
				   var options = {
					success:       rshowResponse  // post-submit callback 
					}; 
				   $('#frmreview').ajaxSubmit(options);			
					return false;
				}
			}
		}
	//}
	return false;
}

function rshowResponse(data)
{
	if(data == 'updated')
	{
		window.location.href = WEBROOT+"Account/Friend-Ratings?fid=my";
	}
	else if(data != '' && (data == 'rev10' || data == 'rev8' || data == 'rev6' || data == 'rev5' || data == 'rev9'))
	{
		window.location.href = baseurl +'?tab='+data+'&xid='+xmlID;
	}
	else
	{
		window.location.href = baseurl + '?tab=rev6&xid='+xmlID;
	}
}
// Validate Email - Review
function review_validate_email(id)
{
	var x = trim(ed(id).value);
	if(x == 'Email ID')
	{
		$('#'+id).val('');
		x = '';
	}
	if(x != '')
	{
		/*
		var emailExpJD = /^[a-zA-Z0-9._-]+@justdial.com$/i;
	    if(x.match(emailExpJD))
		{
			$("#"+id+"Err").show();
			ed(id+"Err").innerHTML = "Please do not use your justdial email id";
			ed(id).focus();
			return false;
		}*/
		if(id == 'rpemail')
		{
			return validateEmail("rpemail","Please enter a valid e-mail address");
		}
		else
		{
			return validateEmail("wremail","Please enter a valid e-mail address");
		}
	}
	return true;
}

function trim(val)
{
	return val.replace(/^\s+|\s+$/g, '');
}

//Validate Mobile - Review
function validateMobile_review(id,msg)
{    
    var x = ed(id).value;
	if(x == "")
	{
		ed(id+"Err").innerHTML = "Please enter mobile number";
		$("#"+id+"Err").show();
		ed(id).focus();
		return false; 
	}
	if(isNaN(x)|| x.indexOf(" ")!=-1)
	{
		ed(id+"Err").innerHTML = "Please enter numeric value";
		$("#"+id+"Err").show();
		ed(id).focus();
		return false; 
	}
	var alphaExp = /^[0-9]+$/;
	if(!x.match(alphaExp))
	{
		ed(id+"Err").innerHTML = "Please enter valid mobile number";
		$("#"+id+"Err").show();
		ed(id).focus();
		return false; 
	}
	if(x.length != 10)
	{
		ed(id+"Err").innerHTML = "Please enter valid 10 digit mobile number";
		$("#"+id+"Err").show();
		ed(id).focus();
		return false; 
	}
	$fchar = x.charAt(0);	
	if($fchar != 7 && $fchar != 8 && $fchar != 9)
	{
		ed(id+"Err").innerHTML = "Please enter valid 10 digit mobile number";
		$("#"+id+"Err").show();
		ed(id).focus();
		return false; 
	}
	$("#"+id+"Err").hide();
	ed(id+"Err").innerHTML = "";
	return true;
}

//Validate Review
function validateReview(id,msg)
{
	var chk=0;
	lenrating=document.frmreview.rating.length;

	for(i=0;i<lenrating;i++)
	{

		if(document.frmreview.rating[i].checked==true)
		{

		chk=1;
		}
	}

	if(chk==1)
	{
	 ed(id+"Err").innerHTML = "";

	}
	else
	{
		ed(id+"Err").innerHTML =msg;
		 ed(id).focus();
		return false;

	}

    return true;
}


$(document).ready(function (){
	$(window).mousedown(function(event){
		 shwbd == 0
	}); 
	if(tab=='servprocerr'){
		openDiv('procerr');
	}
	
    if($("#isreg").val() == 5 || $("#isreg").val() == 1 || $.trim($('#domId').val()) != ''){
        if(tab == 'checkoutorder' && tabVal == 2){
            if($.trim(getCookie('ln')) != ''){ 
               getareafromprevorder();
            }
            if(area_by_geolocation == 1){
                if((getCookie('LocDetErrflg') != 1 && getCookie('LocDetCty')== $('#city').val()) || getCookie('LocDetCty')== ''){
                    showloc();
                }
            }
               if($("#addarea_scroll").length)
	{   var param = false;
                if(touchy){
                    param =true;
		}else{
                    param = false;
                }
               $("#addarea_scroll").niceScroll({
                  touchbehavior:param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });       
			
	}
        }
    }
     
//        if($("#isreg").val() == 5 || $("#isreg").val() == 1){
//            if(getCookie('orderId_'+MDOCIDJ)==''){
//                if($.trim(getCookie('ln')) != ''){ 
//                   getareafromprevorder();
//                }
//                if(area_by_geolocation == 1){
//                    if((getCookie('LocDetErrflg') != 1 && getCookie('LocDetCty')== $('#city').val()) || getCookie('LocDetCty')== ''){
//                            showloc();
//                    }
//                }
//            }
//        }
	

	$('.btnnav li').each(function(){
		var totalWidth = $('.btnnav').width();
		var subWidth = $('.btnnav').width()-$('.nav_rtn').width();
		var liCount = $('.btnnav li').length;
		
		var $this =  $(this);
		if(liCount<=3)	
			{
				$this.css({'width':totalWidth/liCount});
			}
			
		if(liCount>3 && !$(this).hasClass('nav_rtn'))
			{
				if($('.nav_rtn').length == 0)
				{
					$this.css({'width':subWidth/(liCount)});
				}	
				else
				{
					$this.css({'width':subWidth/(liCount-1)});
				}
			}
	});
	
	$('.undone').on('hover click', function(event) {
	 ratingready();
	});
	$('.undone_sf').on('hover click', function(event) {
	 ratingready_SF();
	});

	if(tab == 'writereview_product' && star_ratng_email!=''){

		if(star_ratng_email>5)
			star_ratng_email=5;
		else if(star_ratng_email<=1)
			star_ratng_email=1;
		ProductRatingEmail(star_ratng_email);
	}
	
	
});
/*
$(document).ready(function() {	
	if(flt_hdr == 1)
	{
		$('.pht1').change(function(){
			$('.rpht2').css('display','block');			
		});

		$('.pht2').change(function(){
			$('.rpht3').css('display','block');			
		});
		
		$('#rating').val('');
		
		if($("#wrname").val().substr(0,4)!="e.g ")
		{
			$("#wrname").css('color','#424242');
		}
		
		if($("#wrmob").val().substr(0,4)!="e.g ")
		{
			$("#wrmob").css('color','#424242');
		}
		
		if($("#wremail").val().substr(0,4)!="e.g.")
		{
			$("#wremail").css('color','#424242');
		}
	}
	
	$('.adpt a').click(function() {
			$('.adpt').css("display","none");
			var c = $('.adpt a').html();
			$('.adpt a').replaceWith(c);
			$("#spacer").remove();
			$(".upht").show();
	});
	
	$('.undone').hover(
		function() {
			if($('#rating').val() == "")
			{
				var rel_att = $(this).attr('rel');	
				
				if(rel_att == 1)
					mo_text = 'Poor';
				else if(rel_att == 2)
					mo_text = 'Average';
				else if(rel_att == 3)
					mo_text = 'Good';
				else if(rel_att == 4)
					mo_text = 'Very Good';
				else if(rel_att == 5)
					mo_text = 'Excellent';
					
				$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
			}
			
			$(this).prevAll().andSelf().addClass('rhvr');
			$(this).prevAll().andSelf().removeClass('done');
			$(this).nextAll().andSelf().removeClass('done');

		}, function() {
			$(this).prevAll().andSelf().removeClass('rhvr');
			if($('#rating').val() != "")
			{
				for(var i=1;i<=$('#rating').val();i++)
				{
					$('.edit'+i).addClass('done');
				}
			}
			else
			{
				var rtm = $('#rtText4movie').val();
				
				if(rtm != "movie")
					rtm = "establishment";
					
				$('#rtText').html('Click on the stars to rate this '+rtm+'...');
			}
	});
	$('.undone').click(function(){
		$('#ratingErr').html("");	
		var r_text = "";
		$(this).prevAll().andSelf().removeClass('rhvr');
		$(this).prevAll().andSelf().addClass('done');
		
		var rate_val = $(this).attr('rel');				
		$('#rating').val(rate_val);	
		
		if(rate_val == 1)
			r_text = 'Poor';
		else if(rate_val == 2)
			r_text = 'Average';
		else if(rate_val == 3)
			r_text = 'Good';
		else if(rate_val == 4)
			r_text = 'Very Good';
		else if(rate_val == 5)
			r_text = 'Excellent';
			
		$('#rtText').html('You are rating this as <b><i>"'+r_text+'"</b></i>');	
	});
});
*/

$.fn.sandbox = function(fn) {
	var element = $(this).clone(), result;
	// make the element take space in the page but invisible
	element.css({visibility: 'hidden', display: 'block'}).insertAfter(this);
	// to override any display: none !important you may have been using
	element.attr('style', element.attr('style').replace('block', 'block !important'));
	result = fn.apply(element);
	element.remove();
	return result;
	};

function detailReady()
{
   
		$(document).keydown(function(e){
            var code = e.keyCode ? e.keyCode : e.which;
            
            
            if($("#addon_popup").is(':visible')){
                
                if(code == 13){
                     $('#item_qty').focus().blur();
                    $("#addBtn").click();
                    return false;
                }
                
            }
            
         });
         
        
        if(touchy == true || (($.browser.version.substr(0, 2) > 9) && (navigator.userAgent).indexOf("Tablet PC") != -1) || (($.browser.version.substr(0, 2) < 7) && (navigator.userAgent).indexOf("MSIE") != -1))
        {
           
            $(".alkdescrp").live('click',function() {
                
                var lkid = $(this).attr('id');
                
        
                var tmp = lkid.split("_");
                var typ = 'msbx';
                 if(tmp[0] == 'lkbx' || tmp[0] == 'aothr'){
                    typ = 'lkbx';
                }
                 if(tmp[0] == 'msbx1' || tmp[0] == 'msaothr1'){
                    typ = 'msbx1';
                }
                
               
                 if(typ+"_"+tmp[1] != glblkid && glblkid !=''){
                     
                    $("#"+glblkid).hide(); 
                 }
                
                 if($("#"+typ+"_"+tmp[1]).css("display") == 'block'){
                   
                  
                   
                    lkBx(tmp[1],0,typ);
                    /*$("#"+lkid).css({
                      "z-index": "1095"
                  }); */
                  
                  glblkid = typ+"_"+tmp[1];
                  
                }
                else 
                { 
                 
                    lkBx(tmp[1],1,typ);

                     /*$("#"+lkid).css({
                    "z-index": "1110"
                   });*/
                    glblkid = typ+"_"+tmp[1];
                
                }
                
           
                
            });
        
        }
        else {
            
            
             $(".alkdescrp, .othrppl").live('mouseenter',function() {
                var lkid = $(this).attr('id');
               
                var tmp = lkid.split("_");
               
                
                var typ = 'msbx';
                 if(tmp[0] == 'lkbx' || tmp[0] == 'aothr'){
                    typ = 'lkbx';
                }
                 if(tmp[0] == 'msbx1' || tmp[0] == 'msaothr1'){
                    typ = 'msbx1';
                }

                 lkBx(tmp[1],1,typ);

                     /*$("#"+lkid).css({
                    "z-index": "1110"
                });*/
                /*$("#pohelp").fadeIn();*/
                });
            $(".alkdescrp,.othrppl").live('mouseleave',function() {
                 // $("#pohelp").fadeOut();
                 //$("#pohelplink").css({"z-index":"1095"});
                 // console.log("mouseleaveid--"+lkid);
                 var lkid = $(this).attr('id');

                var tmp = lkid.split("_");
                var typ = 'msbx';
                 if(tmp[0] == 'lkbx' || tmp[0] == 'aothr'){
                    typ = 'lkbx';
                }

                 if(tmp[0] == 'msbx1' || tmp[0] == 'msaothr1'){
                    typ = 'msbx1';
                }

                 lkBx(tmp[1],0,typ);
                  /*$("#"+lkid).css({
                    "z-index": "1095"
                });*/

           });
            
            
            
            
        }
         
        
       
        
        
         
        /*$("span.lkdescrp").live('mouseleave',function() {
             ///$(this).find('a').click();
        
            var lkid = $(this).attr('id');
             var tmp = lkid.split("_");
             lkBx(tmp[1],0,'lkbx');
        });*/
         
         
         /*$('.lkdescrp').mouseleave(function(){
                    $(this).click();
                    //onmouseout="lkBx('<?=$item['itemId']?>',0,'lkbx');return false;"
                    
         });*/
         
         
         
        $('#filterBox').keyup(function(){
            if (timerID)
               clearTimeout(timerID);

            timerID = setTimeout(function() {
               timerID = null;
               filterItems();
            }, 200);
         });
        /*$('#filterBoxMin').keyup(function(){
            if (timerID)
               clearTimeout(timerID);

            timerID = setTimeout(function() {
               timerID = null;
               filterMinItems();
            }, 200);
         });*/
         
        var vflg = getCookie('vflg');
        if($("#isreg").val() != 5){
           
            var func = getCookie('func');
            eval(func);
             document.cookie = 
            'func=0'+ 
            '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
            '; path=/' +
            '; domain='+cookieondomain;
            
        }
        
       
        
        
        if(vflg == 1 || $("#isreg").val() != 5){
            $("#custoverly").hide(); 
       } 
        
    if(touchy == false && (navigator.userAgent).indexOf("Tablet PC") == -1){
         $("div.slctoutr").on('mouseenter',function() {
       
            catVis('slcat','block');
        }).on('mouseleave',function() {
        
            catVis('slcat','none');
        });
         
    }
    
    var paid_status = (document.getElementById('paid_status')) ? document.getElementById('paid_status').value : ''; 	
    
    if($("#isreg").val() == 5 &&  vflg != 1 && tab != "checkoutorder" && tab == 'menu order'){

        //openDiv('verage');

    } 
    if($("#isreg").val() == 5 && onloadFn == "detailsPage" && vflg != 1 && tab != "menu order"  && tab != "checkoutorder" && comptbanner < 1){

        //$("#custoverly").show(); 
        //$("#verage").show(); 
        //openDiv('verage');

    }

	if($("#storeClose").val() == 1 && onloadFn == "detailsPage" && tab != "menu order"){
		//openDiv('offline_popup');
	}
    
    if(touchy == true)
    {
        $("#slcta").on('click',function() {
            $('#slcat').toggle();
        });
        
        if((onloadFn == "detailsPage" || onloadFn == "menuPage") && tabVal == '2'){
        	//touchScroll("chkoutAuto");
        }
        else if((onloadFn == "detailsPage" || onloadFn == "menuPage")  && tabVal == 'menu order'){
                touchScroll("area_Suggest_popup");
        }
          
    }
    else if(($.browser.version.substr(0, 2) > 9) && (navigator.userAgent).indexOf("Tablet PC") != -1)
    {
        $("#slcta").on('click',function() {
            $('#slcat').toggle();
        });
    }
   
   /*for Ipad*/
   $(document).ready(function(){
	$('.jw').on('click',function(e){
		var trgt = $(e.target);
		if(trgt.hasClass("smcdrp") || trgt.hasClass("mnuarw")){
		}
		else{
		$('#slcat').hide(0);
		}		
	});
});
         
    /*if(touchy == false){
         
           $("span.mnuspn").mouseenter(function() {
               //console.log($(this).find('a').attr('id'));
                itmDet($(this).find('a').attr('id'));

           }).mouseleave(function() {

               itmDetOut();
           });
        }*/
        
        
        if((onloadFn == "menuPage" && tabVal == '2') || (onloadFn == "detailsPage" && tabVal == '2')){
            var i= 0;
            $(".address").each(function () {
                if($('#addrDiv_'+i).length && $('#addrDiv_'+(i+1)).length){

                        var height1 = $('#addrDiv_'+i).sandbox(function(){ return this.height(); });
                        var height2 = $('#addrDiv_'+(i+1)).sandbox(function(){ return this.height(); });
                        if(height1 > height2){
                                $('#addrDiv_'+i).height(height1);
                                $('#addrDiv_'+(i+1)).height(height1);
                                $('#adrM_'+i).show();
                                $('#adrM_'+(i+1)).show();
                                $('#addrDiv_'+i).show();
                                $('#addrDiv_'+(i+1)).show();


                        }
                        else{
                           $('#addrDiv_'+i).height(height2);
                           $('#addrDiv_'+(i+1)).height(height2);
                           $('#adrM_'+i).show();
                           $('#adrM_'+(i+1)).show();
                           $('#addrDiv_'+i).show();
                           $('#addrDiv_'+(i+1)).show();

                        }
                }
                           $('#adrM_'+i).show();
                           $('#addrDiv_'+i).show();

                i=i+2;
            });
        }
	
	 $('.allopt').click(function(){
			 
			 
			 
			  $('#tblMenuList tr').each(function(){
				 if($(this).is(':visible'))
				 {
					 $this = $(this);
					
					 var id = $(this).attr('id');
					 $('.allopt a').addClass('actm');
					 $('li.menuSection a').not($this.find('a')).removeClass('actm');
					 
					//$('li.menuSection a').not($this.find('a')).removeClass('actm');
					 fleXenv.scrollTo(id);
	  
					$('#menuTbl_mcontentwrapper').animate({
						scrollTop : $('#'+ id).offset().top - $('#menuTbl_mcontentwrapper').offset().top + $('#menuTbl_mcontentwrapper').scrollTop()
					});
					return false;
				 }

            });
			
			
		});

        $('.menuSection').click(function(){
		$this = $(this);
		var id = $this.attr('id');
		
		$this.find('a').addClass('actm');
		$('li.menuSection a').not($this.find('a')).removeClass('actm');
		 $('.allopt a').removeClass('actm');
	   
		fleXenv.scrollTo("sec_"+id);
	  
		$('#menuTbl_mcontentwrapper').animate({
			scrollTop : $('#sec_'+ id).offset().top - $('#menuTbl_mcontentwrapper').offset().top + $('#menuTbl_mcontentwrapper').scrollTop()
		});
		
		if($('#compdetails').css('position') == 'fixed'){
			$('html,body').animate({
			scrollTop : $('.breadcrumb').offset().top
			},'slow');
		}
		
		return false;
	});
        
        $('#txtMobile').keypress(isNumberKey);
        $('#txtPin').keypress(isNumberKey);
        $('#lnkCancel').click(cancelOrder);
        
        useExistAddress();
        changeTabo();
        evalTab();

        $('#btnSubmit').click(function(){
			if($.trim($('#domId').val()) != '')
			{
				_ct('submit','domaddress','4194304');
			}
			else
			{
				_ct('submit','address',lnk_vid);
			}
                if(($("#isreg").val() == 5 || $("#isreg").val() == 1) && $.trim($('#domId').val()) == ''){
                    if(!validateAddress_food()) 
                        return false;
                }else{
                    if(!validateAddress()) 
                        return false;
                }
                $('#btnSubmit').attr("disabled", true);
                
                var orderId = getCookie('orderId_'+MDOCIDJ);
                var c_verify = getCookie('verify_'+orderId);
                
                var clid = getCookie('clid');
                var clientUID = getCookie('inClienUID');
                //if($.trim($('#txtMobile').val()) == c_verify)
                if($.trim(clid) != '' &&  $.trim(clientUID) != '' || temp_domvar == 'open')
				{
                   
                        if($.trim(clid) !=  $.trim($('#txtMobile').val())){
                           
                            var now = new Date();
                            var time = now.getTime();
                            time += 3600 * 1000;
                            now.setTime(time);
                            document.cookie = 
                                'clid=' + escape($.trim($('#txtMobile').val())) + 
                                '; expires=' + now.toGMTString() + 
                                '; path=/' +
                                '; domain='+cookieondomain;
                         
                        }
                        var newUserFlg = 0;
                        var vcode = 0;
                        $.ajax({
                        url:WEBROOT+"functions/ajxUserSignUp.php", 
                        type: "post",
                        data :{
                            'mobile' : $.trim($('#txtMobile').val()),
                            'emailId' : $.trim($('#txtEmail').val()),
                            'case' : '1'
                        },
                        success:function(res)
                        {
                            //console.log("log---"+res);
                            //return false;	
                            if(res == 'REGISTERED')
                            {
                            }
                            else
                            {
                                newUserFlg = 2;
                            }
                            
                            $.ajax({
                                    url:WEBROOT+"functions/VerifiedUser.php",
                                    dataType:"json", 
                                    type: "post",
                                    data :{
                                        mob:$.trim($('#txtMobile').val()),
                                        mode:'ins',
                                        timeStamp: new Date().getTime()
                                    }, 
                                    success:function(res){
										 $.ajax({
											url:WEBROOT+"functions/ajxblacklisted.php",
											dataType:"json", 
											type: "post",
											data :{
												mob:$.trim($('#txtMobile').val())
											}, 
											success:function(result){
												if(result == "true")
												{
													blackflag = 1;
													openDiv('blacklist');
													$('#btnSubmit').removeAttr("disabled"); 
												}
												else
												{
													enterAddress(vcode,newUserFlg,'','');
												}
											}
										});
                                    }
                                });

                        }
                    });
                    
			
                }
				else 
				{
							
						$.ajax({
						url:WEBROOT+"functions/VerifiedUser.php",
						dataType:"json", 
						type: "post",
						data :{
							mob:$.trim($('#txtMobile').val()),
							mode:'sel',
							timeStamp: new Date().getTime()
						}, 
						success:function(res){
							if(res.results.isVerified == 1 && $.trim(getCookie('ln')) != '' && $.trim(getCookie('inLogMobile')) == $.trim($('#txtMobile').val())){
								$.ajax({
									url:WEBROOT+"functions/ajxblacklisted.php",
									dataType:"json", 
									type: "post",
									data :{
										mob:$.trim($('#txtMobile').val())
									}, 
									success:function(result){
										if(result == "true")
										{
											blackflag = 1;
											openDiv('blacklist');
											$('#btnSubmit').removeAttr("disabled"); 
										}
										else
										{
											enterAddress();
										}
									}
								});
							}
							else
							{
								$.ajax({
								url:WEBROOT+"functions/ajxblacklisted.php",
								dataType:"json", 
								type: "post",
								data :{
									mob:$.trim($('#txtMobile').val())
								}, 
								success:function(result){
										if(result == "true")
										{
											blackflag = 1;
											openDiv('blacklist');
											$('#btnSubmit').removeAttr("disabled"); 
										}
										else
										{
											$.post(WEBROOT+"functions/verification.php",{
												mob:$.trim($('#txtMobile').val())
											}, function(res){
												if(res)
												{
													$("#verMob").html("<b>"+$.trim($('#txtMobile').val())+"</b>");
													$('#btnSubmit').removeAttr("disabled"); 
													openDiv('vercode');
												}		  
											});   
										}
									}
								});                                 
							}
						}
					});		
				}       
			});

	if(flt_hdr == 1)
	{
		$('.pht1').change(function(){
			$('.rpht2').css('display','block');			
		});

		$('.pht2').change(function(){
			$('.rpht3').css('display','block');			
		});
		if(tab != 'updatereview')
		{
			$('#rating').val('');
		}
		if($("#wrereview").val().substr(0,4)!="e.g " && $("#wrereview").val().indexOf("Add Review")==-1)
		{
			$("#wrereview").css('color','#424242');
		}
		if($("#wrname").val().substr(0,4)!="e.g " && $("#wrname").val().indexOf("Name*")==-1)
		{
			$("#wrname").css('color','#424242');
		}
		
		if($("#wrmob").val().substr(0,4)!="e.g " && $("#wrmob").val().indexOf("Mobile Number*")==-1)
		{
			$("#wrmob").css('color','#424242');
		}
		
		if($("#wremail").val().substr(0,4)!="e.g." && $("#wremail").val().indexOf("Email ID")==-1)
		{
			$("#wremail").css('color','#424242');
		}
	}
	
	$('.adpt').click(function() {
			$('.adpt').css("display","none");
			var c = $('.adpt a').html();
			$('.adpt a').replaceWith(c);
			$("#spacer").remove();
			$(".upht").show();
	});
	
	/*if(tab == 'updatereview')
	{	
		
		var rate_val = $('#rating').val();		
		
		if(rate_val == 1)
			r_text = 'Poor';
		else if(rate_val == 2)
			r_text = 'Average';
		else if(rate_val == 3)
			r_text = 'Good';
		else if(rate_val == 4)
			r_text = 'Very Good';
		else if(rate_val == 5)
			r_text = 'Excellent';
			
		$('#rtText').html('You are rating this as <b><i>"'+r_text+'"</b></i>');	
	}*/
	
	$('.empty').hover(
		function() {
			var rel_att = $(this).attr('rel');
			var frel_att = rel_att.charAt(0);	
			$(this).prevAll().andSelf().addClass('rhvr');
			$(this).prevAll().andSelf().removeClass('done');
			$(this).nextAll().andSelf().removeClass('done');

		}, function() {
		var rel_att = $(this).attr('rel');
			var frel_att = rel_att.charAt(0);
			$(this).prevAll().andSelf().removeClass('rhvr');
			$(this).prevAll().andSelf().removeClass('rhvr');
			var temp = $('#rating'+frel_att).val();
			if($('#rating'+frel_att).val() != "")
			{
				for(var i=1;i<=$('#rating'+frel_att).val();i++)
				{
					$('.edit'+frel_att+i).addClass('done');
				}
			}
	});
	
	$('.empty').click(function(){
		$('#ratingErr').html("");	
		var r_text = "";
		$(this).prevAll().andSelf().removeClass('rhvr');
		$(this).prevAll().andSelf().addClass('done');
		
		var rate_val = $(this).attr('rel');
		var frel_att = rate_val.charAt(0);			
		$('#rating'+frel_att).val(rate_val.substring(1));	
			
	});
	if(vertical == 'shopfront')
	{
		//shopbk();
	}
}

function ratingready()
{
	if(navigator.userAgent.indexOf("iPad") == -1 && navigator.userAgent.indexOf("os 8") == -1)
	{
		$('.undone').hover(
			function() {
				var rel_att = $(this).attr('rel');
				if($('#rating').val() == "")
				{					
					if(rel_att == 1)
						mo_text = 'Poor';
					else if(rel_att == 2)
						mo_text = 'Average';
					else if(rel_att == 3)
						mo_text = 'Good';
					else if(rel_att == 4)
						mo_text = 'Very Good';
					else if(rel_att == 5)
						mo_text = 'Excellent';
						
					if($('#rtText').length > 0)
					{
						$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
					}	
				}
				if($('#dprtng'))
				{
					$('#dprtng').html(rel_att);
				}
				$(this).prevAll().andSelf().addClass('rhvr');
				$(this).prevAll().andSelf().removeClass('done');
				$(this).nextAll().andSelf().removeClass('done');

			}, function() {
				$(this).prevAll().andSelf().removeClass('rhvr');
				if($('#rating').val() != "")
				{
					if(tab != 'writereview_product' && onloadFn == "detailsPage")
					{
						for(var i = 0.5; i <= $('#rating').val(); i += 0.5)
						{
							$('.edit'+i*2).addClass('done');
						}
						$('#dprtng').html($('#rating').val());
					}
					else
					{
						for(var i=1;i<=$('#rating').val();i++)
						{
							$('.edit'+i).addClass('done');
						}
					}
				}
				else
				{
					if($('#dprtng') && tab != 'writereview_product' && onloadFn == "detailsPage")
					{
						$('#dprtng').html('-');
					}
					if($('#rtText4prod').val())
						var rtm = $('#rtText4prod').val();
					else
					var rtm = $('#rtText4movie').val();
					
					if(rtm != "movie" && rtm != "product")
						rtm = "establishment";
					
                    if($('#rtText').length > 0)
                    {
                        $('#rtText').html('Click on the blocks to rate this '+rtm+'...');
                    }
				}
		});
	}
	
	$('.undone').click(function(){
		$('#ratingErr').html("");	
		var r_text = "";
		$(this).prevAll().andSelf().removeClass('rhvr');
		
		var userAgent = navigator.userAgent.toUpperCase();
		
		// only for touch devices
		if(userAgent.indexOf("IPAD") != -1)
		{
			$('.rstrs a').removeClass('done');
		}
		
		$(this).prevAll().andSelf().addClass('done');
		
		var rate_val = $(this).attr('rel');
		if($('#dprtng'))
		{
			$('#dprtng').html(rate_val);
		}
		if(rate_val != $('#rating').val())
		{		
			$('#rating').val(rate_val);
			if(tab != 'writereview' && tab != 'updatereview' && tab != 'writereview_movie' && tab != 'writereview_product' && onloadFn == "detailsPage")
			{
				_ct('sbmtrtng', lnk_loc);
				submitreview_detail(0,'','');
			}
		}
		if(rate_val == 1)
			r_text = 'Poor';
		else if(rate_val == 2)
			r_text = 'Average';
		else if(rate_val == 3)
			r_text = 'Good';
		else if(rate_val == 4)
			r_text = 'Very Good';
		else if(rate_val == 5)
			r_text = 'Excellent';
			
		 if($('#rtText').length > 0)
		{
			$('#rtText').html('You are rating this as <b><i>"'+r_text+'"</b></i>');	
		}	
	});
}

function ratingready_SF()
{
	if(navigator.userAgent.indexOf("iPad") == -1 && navigator.userAgent.indexOf("os 8") == -1)
	{

		$(".undone_sf").mousemove(function(e){

			var prev_index=$(this).attr("id");
			$('.undone_sf').removeClass('rhvr hstr done_rhvr done_hs');

		   var parentOffset = $(this).offset(); 
		   var relwidth = $(this).width(); 
		   var relX = e.pageX - parentOffset.left;
		   var rel_att = $(this).attr('rel');
    	//console.log('current_pos='+relX+'----Total='+relwidth);
    		$('.rating-pints').removeClass('dn');
    		$(".undone_sf").each(function(){

    			var current_index=$(this).attr("id");

    			if(prev_index==current_index){
			    		if(relX<=(relwidth/2) && current_index>1){
			    			$(this).removeClass('rhvr');  			
			    			$(this).addClass('hstr');
			    			current_index=(current_index-0.5);
			    			$(this).attr('rel',current_index);
			    			$('#dprtng').html(current_index);
			    			//$('#rating').val(current_index);
			    			rel_att = $(this).attr('rel');
			    		}
			    		else{
			    			$(this).removeClass('hstr');
			    			$(this).addClass('rhvr').attr('rel',current_index);	
			    			$('#dprtng').html(current_index);
			    			//$('#rating').val(current_index);
			    			rel_att = $(this).attr('rel');
			    		}
			    		if(rel_att <= 1)
							mo_text = 'Poor';
						else if(rel_att <= 2)
							mo_text = 'Average';
						else if(rel_att <= 3)
							mo_text = 'Good';
						else if(rel_att <= 4)
							mo_text = 'Very Good';
						else if(rel_att <= 5)
							mo_text = 'Excellent';
							
						if($('#rtText').length > 0)
						{
							$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
						}	
			    	return false;
    			}
    			$(this).addClass('rhvr').attr('rel',current_index);
    			$('#dprtng').html(current_index);
    			//$('#rating').val(current_index);
    			rel_att = $(this).attr('rel');
					if(rel_att <= 1)
						mo_text = 'Poor';
					else if(rel_att <= 2)
						mo_text = 'Average';
					else if(rel_att <= 3)
						mo_text = 'Good';
					else if(rel_att <= 4)
						mo_text = 'Very Good';
					else if(rel_att <= 5)
						mo_text = 'Excellent';
						
					if($('#rtText').length > 0)
					{
						$('#ratingErr').html("");
						$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
					}
    		});
     		
		});

		$('.undone_sf').mouseout(function() {
	       $(this).prevAll().andSelf().removeClass('rhvr hstr');
	       if($('#rating').val() != ""){
		       var fullRate = parseInt($('#rating').val());
		       var partRate = $('#rating').val() - fullRate;

		       var i = 0;
		       for(;i<fullRate;i++)
				{
					$('.edit'+(i+1)).addClass('done_rhvr');
				}
				if(partRate && i<5){
					$('.edit'+(i+1)).addClass('done_hs');
				}
				var rate_val = $('#rating').val();

				$('.rating-pints').removeClass('dn');
				$('#dprtng').html(rate_val);

					if(rate_val <= 1)
						mo_text = 'Poor';
					else if(rate_val <= 2)
						mo_text = 'Average';
					else if(rate_val <= 3)
						mo_text = 'Good';
					else if(rate_val <= 4)
						mo_text = 'Very Good';
					else if(rate_val <= 5)
						mo_text = 'Excellent';
						
					if($('#rtText').length > 0)
					{
						$('#ratingErr').html("");
						$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
					}
			}
			else{
				$('.rating-pints').addClass('dn');
				if($('#rtText').length > 0)
                {
                    $('#rtText').html('Click on the stars to rate this product...');
                }
			}
		});

	}
	
	$('.undone_sf').click(function(event){
		$('#ratingErr').html("");	
		var r_text = "";
		//$(this).prevAll().andSelf().removeClass('rhvr hstr');
		$(this).prevAll().nextAll().andSelf().removeClass('done_rhvr done_hs');
		var userAgent = navigator.userAgent.toUpperCase();
		
		// only for touch devices
		if(userAgent.indexOf("IPAD") != -1)
		{
		   	var parentOffset1 = $(this).offset(); 
		   	var relwidth1 = $(this).width(); 
		  	var relX1 = event.pageX - parentOffset1.left;
			$('.rstrs span').removeClass('done_rhvr done_hs');
			if(relX1<=(relwidth1/2) && $(this).attr("id")>1){
				$(this).prevAll().addClass('done_rhvr');
				$(this).andSelf().addClass('done_hs');
			}else{
				$(this).prevAll().andSelf().addClass('done_rhvr');
			}
		}
			var prev_index=$(this).attr("id");
			var rate_val = $(this).attr('rel');

			var parentOffset = $(this).offset(); 
		   var relwidth = $(this).width(); 
		   var relX = event.pageX - parentOffset.left;
		   var rel_att = $('#rating').val();
    	//console.log('current_pos='+relX+'----Total='+relwidth);

    		$(".undone_sf").each(function(){

    			var current_index=$(this).attr("id");
    			$('.rating-pints').removeClass('dn');
    			if(prev_index==current_index){
			    		if(relX<=(relwidth/2) && current_index>1){
			    			$(this).removeClass('done_rhvr');  
			    			$(this).prevAll().addClass('done_rhvr');			
			    			$(this).addClass('done_hs');
			    			current_index=(current_index-0.5);
			    			$(this).attr('rel',current_index);
			    			$('#dprtng').html(current_index);
			    			$('#rating').val(current_index);
			    			rel_att = $('#rating').val();
			    		}
			    		else{
			    			$(this).prevAll().andSelf().removeClass('done_hs');
			    			$(this).prevAll().andSelf().addClass('done_rhvr');	
			    			$('#dprtng').html(current_index);
			    			$('#rating').val(current_index);
			    			rel_att = $('#rating').val();
			    		}
			    		if(rel_att <= 1)
							mo_text = 'Poor';
						else if(rel_att <= 2)
							mo_text = 'Average';
						else if(rel_att <= 3)
							mo_text = 'Good';
						else if(rel_att <= 4)
							mo_text = 'Very Good';
						else if(rel_att <= 5)
							mo_text = 'Excellent';
							
						if($('#rtText').length > 0)
						{
							$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
						}	
			    	return false;
    			}	
		});
	});
}

function ProductRatingEmail(star_ratng_email){

	if(star_ratng_email != ""){
		var fullRate = parseInt(star_ratng_email);
		var partRate = star_ratng_email - fullRate;
		if(partRate>0.5)
			partRate=0.5;
		else if(partRate<0.5)
			partRate=0;

		var i = 0;
		for(;i<fullRate;i++)
		{
			$('.edit'+(i+1)).addClass('done_rhvr');
		}
		if(partRate && i<5){
			$('.edit'+(i+1)).addClass('done_hs');
		}

		$('.rating-pints').removeClass('dn');
		star_ratng_email = partRate+fullRate;
		$('#dprtng').html(star_ratng_email);
		$('#rating').val(star_ratng_email);

		if(star_ratng_email <= 1)
			mo_text = 'Poor';
		else if(star_ratng_email <= 2)
			mo_text = 'Average';
		else if(star_ratng_email <= 3)
			mo_text = 'Good';
		else if(star_ratng_email <= 4)
			mo_text = 'Very Good';
		else if(star_ratng_email <= 5)
			mo_text = 'Excellent';

		if($('#rtText').length > 0)
		{
			$('#ratingErr').html("");
			$('#rtText').html('You are rating this as <b><i>"'+mo_text+'"</b></i>');	
		}
	}
	else{
		$('.rating-pints').addClass('dn');
		if($('#rtText').length > 0)
		{
			$('#rtText').html('Click on the stars to rate this product...');
		}
	}
}

function onload_gallery()
{
		var galhtml = '';
	var doc_id = $("#docid").val();
	$.ajax({url:WEBROOT+"functions/getGallphotos.php?id="+doc_id,async:true, success:function(result){
		var d = eval('(' + result + ')');
		if(d.photo_count > 2 || (d.photo_count > 1 || d.video.showvideo)){
			galhtml +='<ul>';
			var maxph = (d.photo_count > 10) ? 9 : d.photo_count;
			var tot_ctg = (d.video.showvideo) ? d.photo_count+1 : d.photo_count;
			if(d.video.showvideo)
			{
				galhtml +='<li>';
				galhtml +='<a href="javascript:;" onclick="openGall(\'phouter\',\''+doc_id+'\',\'vlogo\');_ct(\'glryvideo\', lnk_loc);" style="background:url('+d.video.videothumb+') 50% 50% no-repeat; background-size:cover;" ><span class="varow"></span></a>';
				galhtml	  +='</li>';
				maxph = (maxph > 9) ? maxph - 2 : ((d.photo_count > 9) ? maxph - 1 : maxph);
			}		
			for(var i=0; i<maxph; i++){
				var imgExtension = getImageExtension(d.photos[i].image_org);
				var imgDomainNum = i % 4;
				imgDomainNum = (imgDomainNum > 0) ? imgDomainNum : '';
				
				d.photos[i].image_org = d.photos[i].image_org.replace('images.jdmagicbox.com', 'content'+imgDomainNum+'.jdmagicbox.com');
				d.photos[i].image_thumb = d.photos[i].image_org.replace('images.jdmagicbox.com', 'content'+imgDomainNum+'.jdmagicbox.com');
				
				d.photos[i].image_org += '?fit=inside|' + DEFAULT_GAL_DET_WIDTH + ':' + DEFAULT_GAL_DET_HEIGHT + '&output-format=' + imgExtension;
				d.photos[i].image_thumb += '?fit=inside|' + DEFAULT_GAL_DET_WIDTH + ':' + DEFAULT_GAL_DET_HEIGHT + '&output-format=' + imgExtension;
				
				galhtml +='<li>';
				galhtml +='<a data-original="'+d.photos[i].image_org+'" href="javascript:;" title="'+d.photos[i].image_name+'" onclick="openGall(\'phouter\',\''+doc_id+'\',\'plogo\',this);_ct(\'glryimg\', lnk_loc);" style="background:url('+d.photos[i].image_thumb+') 50% 50% no-repeat; background-size:cover;" ></a>';
				galhtml	  +='</li>';
			} 
			if(tot_ctg > 10)
			{
				galhtml +='<li class="cnt"><a href="javascript:;" onclick="openGall(\'phouter\',\''+doc_id+'\',\'chg_dtl_logo\');_ct(\'glryimg\', lnk_loc);">+'+(tot_ctg-9)+'</a></li>';
			}
			else
			{
				var mbcheck = 	(getCookie('ln')) ? getCookie('ln') : getCookie('storeMobile');
				if(tot_ctg < 6)
				{
					for(var i=0; i<(6-tot_ctg); i++){
						if(typeof(d.photos[i]) != 'undefined'){
						galhtml +='<li>';
						galhtml +='<a data-original="'+d.photos[i].image_org+'" href="javascript:;" title="'+d.photos[i].image_name+'" onclick="openGall(\'phouter\',\''+doc_id+'\',\'chg_dtl_logo\',this);" style="background:url('+d.photos[i].image_thumb+') 50% 50% no-repeat; background-size:cover;" ></a>';
						galhtml	  +='</li>';
						}
					}
					tot_ctg = 6;
				}
				for(var i=0; i<(10-tot_ctg); i++)
				{
					galhtml +='<li class="cnt"><a href="javascript:;"  onclick="uploadLogin(\''+mbcheck+'\',\''+catalogurl+'\',\''+$("#chksum").val()+'\')">+</a></li>';
				}
			}
			galhtml	  +='</ul>';
		}
		$('#phgal_dtl').html(galhtml);
	}});
}

function submitreview_multiple(verified)
{
	var rtpr = 0;
	var datastring = '';
	for(var i=1;i<6;i++)
	{
		if($('#rating'+i).val() > 0)
		{
			rtpr = 1;
			datastring += '|~|'+$('#rpdocid'+i).val()+'##'+$('#rating'+i).val();		
		}
	}
	if(rtpr == 1 && datastring !='')
	{
		if(getCookie('inLogMobile') || verified == 1)
		{
			_ct('rtp_sub','dtpg');	
			$.post(WEBROOT+"webmain/review_save_multiple.php",{datastring:datastring}, function(data){
				if(verified == 1)
				{
					closeDiv('rtfm');



					closeDiv('rtvc');
					openDiv('rtpmtk');
				}
				else
				{
					closeDiv('rp');
					openDiv('rtpmtk');
				}
			}); 
		}
		else
		{
			var a = $('#rtfm').offset();
			$('html, body').animate({scrollTop: a.top}, 800);
			openDiv('rtfm');
		}	
	}
	else
	{
		$('#ratingmerror').css('display','block');		
		$('#ratingmerror').html("Please give rating to atleast one company.");
		return false;
	}
}

function submitreview_detail(verified,name,email)
{
	if($('#rating').val() > 0)
	{
		if(getCookie('inLogMobile') || verified == 1)
		{
			rw_detail=0;
			$.post(WEBROOT+"webmain/review_save_detail.php",{docid:$('#docid').val(), rating : $('#rating').val(),revid : $('#revid').val(), city : $("#city").val(), paid : $("#paid_status").val(), name : escape(name), email : escape(email)}, function(data){
				if(verified == 1)
				{
					closeDiv('rtfm');
					closeDiv('rtvc');
				}
				if(data == 'rev9')
				{
					openDiv('revvermax');
				}
				else
				{
					openDiv('rtpmtk');
				}
			}); 
		}
		else
		{
			rw_detail = 1;
			var a = $('#rtfm').offset();
			$('html, body').animate({scrollTop: a.top}, 800);
			openDiv('rtfm');
		}	
	}
	else
	{
		$('#ratingmerror').css('display','block');		
		$('#ratingmerror').html("Please give rating to atleast one company.");
		return false;
	}
}

function delete_review(revid, docid, city)
{
	$.get(WEBROOT+"functions/review_delete.php", {docid:docid,city:city,mobile:getCookie('inLogMobile'), revid : revid},function(data) {
		if(data != '')
		{
			openDiv('delt');
			setTimeout('window.location.reload(true)',200);
		}
	});
	
}

function validate_rtfm()
{
	if(validateForm("rpname","Please enter your name")==true) {
		var uname = trim($('#rpname').val());
		$('#rpname').val(uname);
		var reguname = /^[a-zA-Z]+([.]{0,1}[']{0,1}[ ]{0,1}[a-zA-Z]+)*$/;
		if($('#rpname').val() == 'e.g Ravi Verma') {
			$('#rpnameErr').html("Please enter your name");
			return false;	
		}
		if(reguname.test(uname) == false  || /^[\.]+$/.test(uname) == true)
		{
			ed("rpnameErr").innerHTML =  "Please enter your valid name";
			ed("rpname").focus();
			return false;
		}
		if(validateMobile_review("rpmobile","Please enter your mobile number")==true) {
			if($('#rpmobile').val() == '9867045061' || $('#rpmobile').val() == 'e.g 9867045061') {
				$('#rpmobileErr').html("Please enter your mobile number");
				return false;	
			}
			if(review_validate_email("rpemail")==true) {
				if($('#rpemail').val() == '9867045061') {
					$('#rpemailErr').html("Please enter valid email id");
					return false;	
				}
				$.post(WEBROOT+"functions/verification.php",{
                            mob:$('#rpmobile').val() , mul_review:1
                        }, function(res){
							
							if(res){
								if($('#rp').length)
								{
									closeDiv('rp');
								}
								//$("#rtfm").addClass('dn');
								closeDiv('rtfm');
								$('#rtvc_mb').val($('#rpmobile').val());
								openDiv('rtvc');
							}
									  
						});
			}
		}
	}
	return false;
}

function review_verify_multiple()
{
	var vcodelft = $('#vcodelft2').val();
	var vcodert = $('#vcodert2').val();
	var v = vcodelft +'-'+ vcodert;
	if(v == '-')
	{
		$('#rtpvc_error').show();
		$('#rtpvc_error').html('Please Enter Verification Code');
		$('#vcodelft2').focus();
		return false;
	}
	else
	{
		$.post(WEBROOT+"functions/verification.php",{
					'vcode':v , 'mul_review':1
                        }, function(res){
							
							if(res == 1){
								$.post(WEBROOT+"functions/ajxuserlogin.php", {name:$('#rpname').val(),mobile:$('#rtvc_mb').val(),email:$('#rpemail').val(),mul_review:1}, function(data)
								{
									//location.reload(true);
									if(rw_detail == 1)
										submitreview_detail(1,$('#rpname').val(),$('#rpemail').val());
									else
										submitreview_multiple(1);
								});
							}
							else
							{
								$('#rtpvc_error').show();
								$('#rtpvc_error').html('Please Enter correct Verification Code');
								$('#vcodelft2').val('');
								$('#vcodert2').val('');
								$('#vcodelft2').focus('');
								return false;
							}
									  
						});
	}
}

function clear_text_box_val(eg_type,id,event,pageplc) 
{	
	if(event=="onfocus") {
		if( document.getElementById(id).value=="e.g Ravi Verma" 	|| 
			document.getElementById(id).value=="" 					|| 
			document.getElementById(id).value=="e.g 9867045061" 	|| 
			document.getElementById(id).value=="e.g. abc@xyz.com" 	|| 
			document.getElementById(id).value=="e.g. Malad East" 	|| 
			document.getElementById(id).value=="e.g. Malad West"	||
			document.getElementById(id).value=="Add Review"			||
			document.getElementById(id).value=="Enter A Caption For This Image"			||
			document.getElementById(id).value=="Name*" 				||
			document.getElementById(id).value=="Mobile Number*" 	||
			document.getElementById(id).value=="Email ID") {
			
			document.getElementById(id).value = "";
			document.getElementById(id).style.color = "#000000";
		}
	}
	if(event == "onblur") {
		if(document.getElementById(id).value=="") {
			if(id == 'wrereview'){
				document.getElementById(id).value = "Add Review";
			}
			if(/^caption\d$/.test(id)){
				document.getElementById(id).value = "Enter A Caption For This Image";
			}
			if(id == "wrname" || id == "sname" || id == "sname1" || id == "sname2" || id == "shrenm1" || id == "shrenm2" || id == "shrenm3" || id == "shrenm4" || id == "shrenm5" || id == "shrmnm1" || id == "shrmnm2" || id == "shrmnm3" || id == "shrmnm4" || id == "shrmnm5")	{
				document.getElementById(id).value = (pageplc && pageplc == 'detail') ? "Name*" : "e.g Ravi Verma";
			}
			if(id == "wremail" || id == "smail" || id == "shrem" || id == "shrem1" || id == "shrem2" || id == "shrem3" || id == "shrem4" || id == "shrem5") {
					document.getElementById(id).value = (pageplc && pageplc == 'detail') ? "Email ID" : "e.g. abc@xyz.com";
			}
			if(id == "wrmob" || id == 'shrmn' || id == "shrmn1" || id == "shrmn2" || id == "shrmn3" || id == "shrmn4" || id == "shrmn5") {
				document.getElementById(id).value =  (pageplc && pageplc == 'detail') ? "Mobile Number*" : "e.g 9867045061";
			}
			if(id == "where_a") {
				document.getElementById(id).value = "e.g. Malad East";
			}
			if(id == "where_b") {
				document.getElementById(id).value = "e.g. Malad West";
			}
			
			document.getElementById(id).style.color = "#BDBDBD";
		}
		else
		{
			document.getElementById(id).style.color = "#000000";
		}
	}
}

function submitWriteReview_movie()
{
	if($('#rating').val() == "")
	{
		$('#ratingErr').css('display','block');		
		$('#ratingErr').html("Please select rating");		
		window.location.hash = '#rating_stars';
		return false;
	}
	if($('#wrereview').val() == 'Add Review')
	{
		$('#wrereview').val('');
	}
	if(validateForm("wrname","Please enter your name")==true) {
		var uname = trim($('#wrname').val());
		$('#wrname').val(uname);
		if($('#wrname').val() == 'e.g Ravi Verma' || $('#wrname').val() == 'Name*') {
			$('#wrnameErr').html("Please enter your name");
			return false;	
		}
		if(/^[a-zA-Z]+([.]{0,1}[']{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(uname) == false || /^[\.]$/.test(uname) == true)
		{
			ed("wrnameErr").innerHTML =  "Please enter your valid name";
			ed("wrname").focus();
			return false;
		}
		if(validateMobile_review("wrmob","Please enter your mobile number")==true) {
			if($('#wrmob').val() == '9867045061' || $('#wrmob').val() == 'e.g 9867045061' || $('#wrmob').val() == 'Mobile Number*') {
				$('#wrmobErr').html("Please enter your mobile number");
				return false;	
			}
			if(review_validate_email("wremail")==true) {
				if($('#wremail').val() == 'Email ID') {
					$('#wremailErr').html("Please enter valid email id");
					return false;	
				}
				return true;
			}
		}
	}
	return false;
}

window.onscroll = function () 
{
	if(document.getElementById('lnkipad')!=null)
	{
		fixIpadBanner();
	}
	if(scroll_status==false)
	{
		return false;
	}
	if((lowprice == 1))
	{
	  	/*if(getCookie('prevcatid') == document.index.catid.value || getCookie('prevcatid') != '')
		{
			bestdealform = false;
			//return false;
	
		}*/
		bestdealform = true;
	}

	if(document.getElementById("map_container"))
	{
		if (window.pageYOffset != null) {
			var top_t = window.pageYOffset+"px";
			document.getElementById("map_container").style.top = top_t;
		}
		else {
			var map_frame = document.getElementById("map_container");
			var map_frame_top = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
			var top1 = map_frame_top + 50;
			map_frame.style.top = top1 + 'px';
		}
	}
	//if (document.getElementById("best_deal_form") && touchy == false && bestdealform ==  true)
	if (document.getElementById("best_deal_form") && bestdealform ==  true && closebestdealform == false)
	{
		if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) {
				if(touchy == true)
				{
					if(!onfocusvar)
					{
						var botBlock = $(window).scrollTop()+$(window).height()-90;
						//$('#best_deal_form').attr("style","position:absolute;top:"+botBlock+"px;left:0px;");
					}
					else
					{
						var botBlock = $(window).scrollTop()+$(window).height()-485;
						//$('#best_deal_form').attr("style","position:absolute;top:"+botBlock+"px;left:0px;");
					}
				}
				else
				{
					var botBlock = $(window).scrollTop()+$(window).height()-$("#best_deal_form").height()-150;
					//$('#best_deal_form').attr("style","position:absolute;top:"+botBlock+"px;left:0px;");
				}
			}
	}
	
	if(onloadFn == "detailsPage" && flt_hdr == '' && $(".topLinks").is(":visible")) 
	{
		
		var top = $(window).scrollTop();

		var Topheight = $(".topLinks").offset().top+$(".topLinks").height();
				
		/*if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) {*/
		if(($.browser.msie && ($.browser.version=="6.0")) || touchy == true) {
			if (top <= Topheight && touchy == false)
			$('#compdetails,#compBnr','#comphdr').attr("style","top:0px");
		else if (touchy == false)
		{
			$('#compdetails,#compBnr','#comphdr').attr("style",(top-(Topheight+1))+"px");
		}
		else
		{
			if (touchy == true && top >= 265) {
				if (top <= Topheight) top = Topheight+1;
				$('#compdetails,#compBnr','#comphdr').attr("style","position:relative;top:"+(top-220)+"px");
			}
			else {
				$('#compdetails,#compBnr','#comphdr').removeAttr("style");
			}
		}
		}
		else
		{
			fltdiv()
		}
	}
        
        
        
        if((onloadFn == "menuPage" || onloadFn == "detailsPage") && ($("#isreg").val() == 5 || $("#isreg").val() == 1) && tabVal != 2 && tabVal != 3)
        {
			
            var top = $(window).scrollTop();
            
            if($(".mtr").length){

            var Topheight = ($(".mtr")) ? $(".mtr").offset().top+$(".mtr").height() : '';
            
           if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) 
            {
                    if (top <= Topheight && touchy == false){
                            $('#ordSummry').attr("style","top:0px");
                     }
                    else if (touchy == false)
                    {
                            $('#ordSummry').attr("style",(top-(Topheight+1))+"px");
                    }
                    else
                    {
                            //if (touchy == true && top >= 550) 
                            if (touchy == true && top >= Topheight){
                                   // if (top <= Topheight) top = Topheight+1;

                                            if((navigator.userAgent).indexOf("OS 6") == -1 && (navigator.userAgent).indexOf("OS 5") == -1 && (navigator.userAgent).indexOf("OS 7_0") == -1)
                                                    {                                      
                                                   //$('#ordSummry').attr("style","position:fixed;top:"+(top-1)+"px");
                                                   $('#ordSummry').attr("style","position:fixed;top: 0px");   
													   $('.minsum').attr("style","position:relative;");
                                    }
                                    else{
                                        $('#ordSummry').attr("style","position:fixed;top:0px;");
										$('.minsum').attr("style","position:relative;");
                                    }
                                       if($("#mst_ord_div").is(":visible")){
                                            $("#mst_ord_div_plus").hide();
                                            $("#mst_ord_div_minus").show();
                                            $("#mst_ord_div").slideUp(150);
                                        }
                                        if($("#prev_tabs").is(":visible")){
                                            $("#hstico_plus").show();
                                            $("#hstico_minus").hide();
                                            $("#prev_divs").slideUp(150);
                                            $("#prev_tabs").slideUp(150);
                                        }
                                        $("#scroll_prev_div").getNiceScroll().remove();
                                        $("#scroll_prev_div_2").getNiceScroll().remove();
                                        var oid =  $('#dteid').val();
                                        $('#dte_itms_lst_'+oid).getNiceScroll().remove();
                            }
                            else 
                            {
                                    $('#ordSummry').removeAttr("style");
                            }
                             var Bottomheight = $(".dsclmr").offset().top+$(".dsclmr").height()-$("#ordSummry").height();
                            if(top >= Bottomheight){
                                $('#ordSummry').attr("style","top:0px;");
                            }
                    }
                    }
                    else
                    {
                            fltOrderDiv();
                    }
                }
        }
            
            
        
        
        if((onloadFn == "menuPage" || onloadFn == "detailsPage") && tabVal == '3')
        {
            var top = $(window).scrollTop();

		var Topheight = $(".bread_crumb").offset().top+$(".bread_crumb").height();
				

	if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) 
	{
			if (top <= Topheight && touchy == false)
			$('#smryCont').attr("style","top:0px");
		else if (touchy == false)
		{
			$('#smryCont').attr("style",(top-(Topheight+1))+"px");
		}
		else
		{
			if (touchy == true && top >= 265) {
				if (top <= Topheight) top = Topheight+1;
				$('#smryCont').attr("style","position:relative;top:"+(top-158)+"px;");
			}
			else {
				$('#smryCont').removeAttr("style");
			}
		}
		}
		else
		{
			fltSmryDiv();
		}
    }
            
       /* if(onloadFn == "detailsPage" &&  tab !='' && (tabVal == 'grocerytab' || tabVal == 'pharmacytab')  && (tab != 'grocerycheckout' && tab!= 'pharmacycheckout'))
        {
            var top = $(window).scrollTop();
			var Topheight = $(".grymtr").offset().top+$(".grymtr").height();
            
			if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) 
			{
				if (top <= Topheight && touchy == false)
				{
					$('#gcyord').attr("style","top:0px");
        		}
				else if (touchy == false)
				{
					$('#gcyord').attr("style",(top-(Topheight+1))+"px");
				}
				else
				{
					if (touchy == true && top >= 550) 
					{
						if (top <= Topheight) 
							top = Topheight+1;
						if((navigator.userAgent).indexOf("OS 6") == -1 && (navigator.userAgent).indexOf("OS 5") == -1 && (navigator.userAgent).indexOf("OS 7_0") == -1)
						{
						   $('#gcyord').attr("style","position:fixed;top:"+(top-1)+"px");
						}
						else
						{
							$('#gcyord').attr("style","position:fixed;top:0px;");
						}
					}
					else 
					{
						$('#gcyord').removeAttr("style");
					}
				}
			}
			else
			{
				fltGcyOrderDiv();
			}  
        }*/
        if(onloadFn == "detailsPage" && tabGroceryVal == 1)
        {
            var top = $(window).scrollTop();
			var Topheight = $(".bread_crumb").offset().top+$(".bread_crumb").height();
			
			if(($.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0")) || touchy == true) 
			{
				if (top <= Topheight && touchy == false)
					$('#smryCont').attr("style","top:0px");
				else if (touchy == false)
				{
					$('#smryCont').attr("style",(top-(Topheight+1))+"px");
				}
				else
				{
					if (touchy == true && top >= 265) 
					{
						if (top <= Topheight) top = Topheight+1;
						$('#smryCont').attr("style","position:relative;top:"+(top-158)+"px;");
					}
					else 
					{
						$('#smryCont').removeAttr("style");
					}
				}
			}
			else
			{
				fltSmryDiv();
			}   
        }
        
              
    getBlockDivScroll();
}

function getDocHeight() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
	);
}

function getDocWidth() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollWidth, d.documentElement.scrollWidth),
        Math.max(d.body.clientWidth, d.documentElement.clientWidth)
	);
}

function clear_check_box()
{
	var chks = document.getElementsByName('cat_chkbox');	
	for (var z=0;z<chks.length;z++)
	{
		if (chks[z].checked==true)
		{				
			chks[z].checked=false;			
		}
	}	
}

if(document.getElementById("ibse_vcode_detail") || document.getElementById("ibse_vcode")) { 
$(document).keydown(function (e) {
	if(e.keyCode=="27")
	{
		catname_str="";
		catid_str="";
		category_name = "";
		clear_check_box();
		if(document.getElementById("ibse_vcode_detail"))
		{
			$("#ibse_vcode_detail").hide();
			document.getElementById("bddnd_dtl").innerHTML = "";
		}
		if(document.getElementById("ibse_vcode"))
		{
			$("#ibse_vcode").hide();
			document.getElementById("bddnd").innerHTML = "";
		}
	}
});
}

function closePopUp(divname) {
	if(divname == "GetInfo")
	{
		if(showinfo == 1) {
			//$("#best_deal_form").show();
		}
	}
	if(divname == "best_deal_resp")
	{
		if(getCookiebest("bdsuccess") == 1)
		{
			document.cookie = "bdcheck = ''" + ";  path=/; domain=" + cookieondomain;
			$("#best_deal_form").hide();
		}
	}
	if(divname =="best_deal_resp_detail" || divname=="best_deal_dnd_detail")
	{
		catname_str="";
		catid_str="";
		category_name = "";
		clear_check_box();
	}
	if(document.getElementById("ibse_vcode_detail"))
	{
		$("#ibse_vcode_detail").hide();
		document.getElementById("bddnd_dtl").innerHTML = "";
	}
	if(divname == "best_deal_div")
	{
		//$("#best_deal_form").show();
		closebestdealform = true;
		document.cookie = escape('BDprofile') + "=" + escape(1) + ";  path=/; domain=" + cookieondomain;
	}
	if(document.getElementById("ibse_vcode"))
	{
		$("#ibse_vcode").hide();
		document.getElementById("bddnd").innerHTML = "";
	}
	if(divname == "smssuccess")
	{
		document.getElementById("smssuccess").innerHTML = "";
	}
}

function go_to_rev_auc(search_term, city, docId, compname,area) {
	var html = "<input type='hidden' name='city' value='" + city + "' />";
	html += "<input type='hidden' name='search_term' value='" + search_term + "' />";
	html += "<input type='hidden' name='area' value='" + area + "' />";
	html += "<input type='hidden' name='docId' value='" + docId + "' />";
	html += "<input type='hidden' name='compname' value='" + compname + "' />";
	html += "<input type='hidden' name='rev_result' value='1' />";
	document.frm_rev.innerHTML = html;
	document.frm_rev.action = WEBROOT+'jd_reverse/index.php';
	document.frm_rev.submit();
}

function loadScript_search() {
	/*if(document.getElementById("map_holder")) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=initialize_search";
		document.body.appendChild(script);
	}*/
}

function map_all_comp(index,markerflg) {
	var map_holder ='map_holder';
	var div_id ='map_container';
	var markers= new Array();
	var winwidth = $(window).width();
	var containerwidth = $('#contentArea').width();
	var addwidth = (winwidth - containerwidth)/2;
	var divwidth = $('#'+div_id).width();
	var leftpx = Math.ceil(containerwidth-divwidth+addwidth-1);

	document.getElementById(div_id).style.left = leftpx+'px';
	document.getElementById(div_id).style.display = "block";
	var comp_lat	=	document.getElementById('lat'+index).value;
	var comp_lng	=	document.getElementById('lng'+index).value;
	var mapAdd		=	document.getElementById('dispads'+index).value;

	var myLatlng = new google.maps.LatLng(comp_lat,comp_lng);
	var myOptions = {
		zoom: 15,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map_holder"), myOptions);

	if(markerflg == 1) {
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		var infowindow = new google.maps.InfoWindow({
		 content: mapAdd
		 });
		google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
		});
	}
	else {
		 var circleOptions = {
			strokeColor: "#1274C0",
			strokeOpacity: 0.3,
			strokeWeight: 2,
			fillColor: "#1274C0",
			fillOpacity: 0.15,
			map: map,
			center: new google.maps.LatLng(comp_lat,comp_lng),
			radius: 500
		};
		var cityCircle = new google.maps.Circle(circleOptions);
	}
}

var showinfo = 0;
function getCookiebest(c_name) {
  if (document.cookie.length > 0) {
    var c_start=document.cookie.indexOf(c_name + "=");
    if(c_start!=-1) {
      c_start=c_start + c_name.length+1;
      var c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}
function setCookiebest(CookieName,CookieValue,onlycook) {
	var expDate = new Date();
	var offset = 2 / 1;
	expDate.setYear(expDate.getFullYear() + offset);
	document.cookie = escape(CookieName) + "=" + escape(CookieValue) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
	if((CookieValue == 'ratings' || CookieValue == 'fratings' || CookieValue == 'mratings') && onloadFn != 'Result')
	{
		if($( "#toprvw" ).hasClass( "dn" )) {
			disprevs('toprvw','toprevc')
		}
		change_tab(CookieValue,onlycook);
	}
}
var tid = "";
var currentPicId="1";
var currentTabId="";
var scrollStep=3;
var timerLeft="";
var timerRight="";
function getPhotoBlur(obj,id, event) {
	document.getElementById("PhotosId"+id).className = "picMOuseOut";
	if (event == "Blur") {
		obj.className="picMOuseOut";
	}
	else if (event == "Focus") {
		obj.className="picMOuseUp";
	}
}
function scrollDivRight(id) {
	clearTimeout(timerLeft)
	document.getElementById(id).scrollLeft-=scrollStep
	timerLeft=setTimeout("scrollDivRight('"+id+"')",10)
}
function toRight(id) {
	document.getElementById(id).scrollLeft=document.getElementById(id).scrollWidth
}
function stopMe() {
	clearTimeout(timerRight)
	clearTimeout(timerLeft)
}
function scrollDivLeft(id) {
	clearTimeout(timerRight)
	document.getElementById(id).scrollLeft+=scrollStep
	timerRight=setTimeout("scrollDivLeft('"+id+"')",10)
}
function fltdiv()
{
    var top = $(window).scrollTop();

	var Topheight = $(".topLinks").offset().top+$(".topLinks").height();
	

	
    if (top >= Topheight)
    {
        $('#compdetails,#compBnr').attr("style","position:fixed;top:0px;");
		$('.Bdetl').attr("style","border-bottom:1px solid #D3CFCF");
    }
    else
    {
        $('#compdetails,#compBnr').attr("style","top:0px");
		$('.Bdetl').removeAttr("style");
    }

}
function fltOrderDiv()
{
    
    var top = $(window).scrollTop();

    var Topheight = $(".mtr").offset().top+$(".mtr").height();
	
	
    if (top >= Topheight)
    {
        if($("#mst_ord_div").is(":visible")){
            $("#mst_ord_div_plus").hide();
            $("#mst_ord_div_minus").show();
            $("#mst_ord_div").slideUp(150);
        }
        if($("#prev_tabs").is(":visible")){
            $("#hstico_plus").show();
            $("#hstico_minus").hide();
            $("#prev_divs").slideUp(150);
            $("#prev_tabs").slideUp(150);
            $("#scroll_prev_div").getNiceScroll().remove();
            $("#scroll_prev_div_2").getNiceScroll().remove();
            var oid =  $('#dteid').val();
            $('#dte_itms_lst_'+oid).getNiceScroll().remove();
        }
        
        $('#ordSummry').attr("style","position:fixed;top:2px;");
       
    }
    else
    {
        $('#ordSummry').attr("style","top:0px");
        
    }

    var Bottomheight = $(".dsclmr").offset().top+$(".dsclmr").height()-$("#ordSummry").height();
    if(top >= Bottomheight){
        $('#ordSummry').attr("style","top:0px;");
    }

}
function fltSmryDiv()
{
    
    var top = $(window).scrollTop();

    var Topheight = $(".bread_crumb").offset().top+$(".bread_crumb").height();
	
       
	
    if (top >= Topheight)
    {
        $('#smryCont').attr("style","position:fixed;top:0px;");
		//$('.Bdetl').attr("style","border-bottom:1px solid #D3CFCF");
    }
    else
    {
        $('#smryCont').attr("style","top:0px");
		//$('.Bdetl').removeAttr("style");
    }

}
function fltGcyOrderDiv()
{
    var top = $(window).scrollTop();
	var Topheight = $(".grymtr").offset().top+$(".grymtr").height();
    if (top >= Topheight)
    {
        $('#gcyord').attr("style","position:fixed;top:2px;");
    }
    else
    {
        $('#gcyord').attr("style","top:0px");  
    }
}
document.onkeydown=evntcapture
function evntcapture(evt)
{	
	evt=evt ? evt : event;
	if(evt.keyCode==27)
	{
		document.cookie = escape('BDprofile') + "=" + escape(1) + ";  path=/; domain=" + cookieondomain;
		//$.unblockUI();
	}
	if(evt.keyCode==37)
	{
		if(onloadFn == "detailsPage")
		{
			if(document.getElementById('previd'))
				window.location = $("#previd").attr("href");
		}
	}
	if(evt.keyCode==39)
	{
		if(onloadFn == "detailsPage")
		{
			if(document.getElementById('nextid'))
				window.location = $("#nextid").attr("href");
		}
	}
}
function disablepopup(){
	if($("#bdp").is(':checked') == true){
		document.cookie = "bdp = 1" + ";  path=/; domain=" + cookieondomain;
		document.cookie = "bdpdet = 1" + ";  path=/; domain=" + cookieondomain;
		document.cookie = "bdend  = 1" + ";  path=/; domain=" + cookieondomain;
		closePopUp("best_deal_div");
		//$("#best_deal_form").show();
	}
	else{
		if(onloadFn == "detailsPage")
			document.cookie = "bdpdet = 2" + ";  path=/; domain=" + cookieondomain;
	}
}
function getSrchReady()
{
	socialmedia();

}
function socialmedia()
{
	/*
	var anchor = '<a href="javascript:void(0);" onclick="Javascript: window.open(\''+WEBROOT+'8888888888/phonesearch.php?auto=1\',\'JD\',\'width=610,height=680,left=250,top=20,scrollbars=yes,resizable=yes\');" class="ab_banner"></a>';
	$(".B2").html(anchor);
	*/
	
	//$.post(WEBROOT + "functions/socialmedia.php",{furl:$("#furl").val()}, function(data){
		//$(".socialmedia").html(data);
		
		/*$.get(WEBROOT + "template/search_youtube.html",{}, function(datab2){
			$(".B2").html(datab2);
		});*/

		/*
		$.get(WEBROOT + "template/search_youtubeb1.html",{}, function(datab1){
			$(".B1").html(datab1);
			if(document.getElementById('ad_iframe')) {
				bigb_cookie();
				var autoplay = 0;
				var ad_cookie = getCookie('ad_auto');
				if(ad_cookie > 2) {
					autoplay = 0;
				}
				random_ad_film(autoplay);
			}
		});
		*/

	//});
}

var ajaxRequest = '';
/*function showMore(){
ajaxRequest = getXMLHTTPReqObj();
		var url = "../html/details.html";
		ajaxRequest.onreadystatechange = showDetails;
		ajaxRequest.open("GET", url, true);
		ajaxRequest.send(null);
}*/

function showDetails(){
var contID = document.getElementById('detailPage');
	if (ajaxRequest.readyState == 4){
		if(contID.style.display == 'none'){
			contID.style.display = 'block';
			contID.innerHTML = ajaxRequest.responseText;
			document.getElementById('moreLess').innerHTML = 'Less...';
		}
		else{
			contID.style.display = 'none';
			document.getElementById('moreLess').innerHTML = 'More...';
		}
	}
}

function highlightTab(selectedTab){
ajaxRequest = getXMLHTTPReqObj();
	var arr1 = new Array('tab_contact', 'tab_map', 'tab_photos', 'tab_services', 'tab_moreInfo', 'tab_ownListings');
	var arr2 = new Array('Contact', 'Map', 'Photos', 'Services', 'More Info', 'Own this listing?');
	var arr3 = new Array('contact.html', 'map.html', 'photos.html', 'services.html', 'moreInfo.html', 'ownListings.html');
	for(var i=0; i<arr1.length; i++){

		if(selectedTab == arr1[i]){
			document.getElementById(arr1[i]).innerHTML = "<span class='selected'>"+ arr2[i] +"</span>";
			var url = webroot+"/template/html/tabDetails/" + arr3[i];
			ajaxRequest.onreadystatechange = tabsDetails;
			ajaxRequest.open("GET", url, true);
			ajaxRequest.send(null);
		}
		else {
			document.getElementById(arr1[i]).innerHTML = "<a href='#'>"+ arr2[i] +"</a>";
		}
	}
}
function tabsDetails(){
var contID = document.getElementById('tabDetails');
	if (ajaxRequest.readyState == 4){
			contID.innerHTML = ajaxRequest.responseText;
	}
}

function initialize() {
	/*var myLatlng = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
	var myOptions = {
		zoom: 15,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), myOptions);

	if(document.getElementById("mpfl").value=='1')
	{

		var stars = document.getElementById('star').value.split(',');
		var starstr = '<div class="Star0" style="padding:4px 0 0 0;float:left;">';
		for (var i=0;i<stars.length ;i++ )
		{
			starstr += '<span class="s'+stars[i]+'"></span>';
		}
		starstr += '</div>';

		var contentString = '<div id="content">'+
		'<h1 style="color:black;float:left;padding:0 5px 0 0;font-size:18px;margin:0;"><b>'+document.getElementById('cn').value+'</b></h1>'+starstr+
		'<div id="bodyContent">'+
		'<p style="color:black;float:left;">'+document.getElementById('add').value+'</p>'+
		'</div>'+
		'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var image = new google.maps.MarkerImage('http://img.jdmagicbox.com/webstatic/marker1.png');

		var marker = new google.maps.Marker({
			position: myLatlng,
			icon: image,
			map: map
		});

		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
	}
	else
	{
		var circleOptions = {
			strokeColor: "#1274C0",
			strokeOpacity: 0.3,
			strokeWeight: 2,
			fillColor: "#1274C0",
			fillOpacity: 0.15,
			map: map,
			center: new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value),
			radius: 500
		};
		cityCircle = new google.maps.Circle(circleOptions);
	}*/
}

function loadScript()
{
	var  docids	;

/*

	var uploadpht = getCookie('uploadphoto');
    if(uploadpht == 1)
    {
		document.cookie = 'uploadphoto=0; '+date+'; path=/';
		openDiv("uploadsuccess","")
	}
	else if(uploadpht == 2)
	{

		document.cookie = 'uploadphoto=0; '+date+'; path=/';
		openDiv("uploadfail","")
	}
*/
    /*if(document.getElementById("map") && navigator.userAgent.toLowerCase().indexOf("bot") == -1)
	{
		if(WEBROOT)
		{
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=initialize";
			document.body.appendChild(script);
			var now = new Date();
			var cur_time = now.getTime();
			$.ajax({
			url:WEBROOT+"functions/map_log.php?date="+cur_time,
			async:false
			});
		}
	}
	else
	{
		$(".lightbox").lightbox({
			fitToScreen: true,
			imageClickClose: false
		});
	}*/
	if(tabpage=='photos' && pcount>0)
	{
		//galleriffic();
	}
/*
	var bdcheck	=	getCookie("bdcheck");
	var curr_company = getCookie("curr_comp");

	
	var revID = window.location.href;
	revID  = revID.split("#");
*/          
	
	if(vertical == '2' && tab != 'writereview' && tab != 'writereview_movie' && tab != 'rev5' && tab != 'rev6' && tab != 'rev7' && tab != 'rev8' && tab != 'rev9' && tab != 'rev55' && tab != 'rev66' && tab != 'rev77' && tab != 'rev88' && tab != 'rev99') {
		if (typeof($('#bookDateId').val()) =='undefined' || $('#bookDateId').val()==''){
		var currentDate = new Date();		
		currentDate = $.datepicker.formatDate('dd M yy', currentDate); //yy		
		var dateStr = currentDate+', Today';
		}
		else {
			var currentDateObj = new Date($('#bookDateId').val());			
			currentDate = $.datepicker.formatDate('dd M yy', currentDateObj); //yy
			var todayDate = new Date();
			todayDate = $.datepicker.formatDate('dd M yy', todayDate);
			if (currentDate==todayDate) {
				var dateStr = currentDate+', Today';
			}
			else {
				var tomDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

					tomDate = $.datepicker.formatDate('dd M yy', tomDate);
					if (currentDate==tomDate) {
						var dateStr = currentDate+', Tomorrow';
					}
					else {						
						var dateStr = $.datepicker.formatDate('dd M yy, DD', currentDateObj);
					}
			}			
		}
		
		var movieCity = (typeof(autoValue)!='undefined' && autoValue!='')?autoValue: $('#city').val();		
		get_movie_info(MDOCIDJ,dateStr,movieCity, $('#where').val(), 'a1');	
	}
	if((lowprice == 1))
	{
		if(getCookie('BDprofile') != 1 && flt_hdr == '' && tabVal != 'menu' && vertical != 'shopfront' && srchType == 3  && isfnp != 1 && typeof(HOTEL_VERTICAL)=='undefined')
		{		
			setTimeout("open_bestdeal()",7000);
		}
	}
	if(document.getElementById('rp'))	
	{
		setTimeout("open_rp()",8000);
	}
	
	if(tab != 'rev5' && tab != 'rev6' && tab != 'rev7' && tab != 'rev8' && tab != 'rev9' && tab != 'rev55' && tab != 'rev66' && tab != 'rev77' && tab != 'rev88' && tab != 'rev99')
	{
		//logdata();
	}
	if($('#restrict_vlc').val() != 1)
	{
		if(tab != 'bookatable' && tabpage != "grocerytab"  && tabpage != "pharmacytab")
		{
			getphotos($('#review_paid_id').val(),'detail');
		}
		//getphotos($('#review_paid_id').val(),'detail');
	}
	

	
	if(tabpage != "grocerytab"  && tabpage != "pharmacytab"  && tab!= 'tcare' && tab!= 'tcarecheckout' && tab!= 'tcareaddress' && tab!= 'tcareconfirm' && tab !='courier' && tab !='bookatable' && tab !='menu' && tab !='menu order' && tab !='laundrypickup' && tab !='bookaservice' && tab !='testdrive' && tab != 'tblchkout' && tab != 'writereview' && tab != 'writereview_movie' && tab != 'booklab address')
	{
		if(($('#rtis').val()) == 1)
		{
			loadreviewsdata();
		}
		else if(tab == 'moreinfo')
		{
			goToByScrolldetail('mrtab');
		}
		var paid	=	$("#paid_status").val();
		if(paid > 0 && $('#restrict_vlc').val() != 1)
		{
			onload_gallery();
		}
	}
	if(onloadFn == "read_prodreview")
	{
		loadreviewsdata_product();
	}
	
	
	if(tab == 'shp')
	{
		goToByScrolldetail('othProd');
	}
}

function loadScriptmovie()
{
	var  catid	;

	if(catid != '' && getCookie('ln') != '' && attn_user != 'logout')
	{
		 $.get(WEBROOT+"webmain/ajxmain.php", {docids: $("#review_paid_id").val(),cases: 'srchfratings',city: $('#city').val()}, function(data) {
			review_rating_lp(data);
		});

	}
	else
	{
		$(".lightbox").lightbox({
			fitToScreen: true,
			imageClickClose: false
		});
	}

	var revID = window.location.href;
	revID  = revID.split("#");

	//logdata();
	loadreviewsdatamovie();

	var a = $('.jbrd').offset();
	
	if(typeof a !=  'undefined')
	{
		window.scrollTo(0,a.top);
	}
	//$('html, body').animate({scrollTop: a.top}, 800);

	if(document.getElementById('ad_iframe')) {
		var pre_ad_cookie = getCookie('ad_auto');		
		(pre_ad_cookie == '') ? bigb_cookie() : '';
		var autoplay = 1;
		var ad_cookie = getCookie('ad_auto');
		if(ad_cookie > 1 || pre_ad_cookie) {
			autoplay = 0;
		}
		random_ad_film(autoplay);
	}
}





function loadreviewsdatamovie()
{
	var ct			=	$("#mpctr").val();
	var catid		=	$("#catid").val();
	var cn			=	$("#cn").val();
	var jd_rating	=	$("#jd_rating").val();
        mvseotag                =       1;

/*	$('#rvw').block({ message: '<img src="http://img.jdmagicbox.com/webstatic/ajax-loader.gif">',
			css: {
                padding:	0,
				margin:		0,
				textAlign:	'center',
				backgroundColor:'#fff',
				cursor:		'wait',
				zIndex:	2,
				width:'704px'
            }});
*/
	$.get(WEBROOT+"functions/movies_reviews_initial.php", {ct: ct,cid: catid,tab: tab, city: ct, cn:cn, jd_rating:jd_rating}, function(data) {
		var d = eval('(' + data + ')');
		var mvdet_len = 0;
		var poster_html = '';
		
		if(d.poster)
		{
			//$('#mvposter').attr('src',d.poster);
			poster_html = '<img id="mvposter" src="'+d.poster+'" border="0" class="Clogo">';
			$('.wtrailer_d .mlogo').html(poster_html);
			$('.wtrailer_d .mlogo').show();
		}
		
		movieName = d.movie_name;
		if (movieName == ''){
			movieName  = $('#searchterm').val()	;		
		}
		movieNameShrt = movieName.replace(/ *\([^)]*\) */g, "");
	var catid = parseInt(d.cid);
	$('#mvcatid').val(catid);
	movieUrl = 'http://www.justdial.com/Movies/'+encodeURI(movieName)+'/'+catid;	
	//movieUrl = WEBROOT+'Movies/'+encodeURI(movieName)+'/'+catid;	
	
	var shareMv = ''+
		'<ul>'+										
			'<li><a title="Share via Facebook" href="javascript:void(0);"  onclick="fbs_click(\''+encodeURI(movieUrl+'?flg=fb&version=1.0')+'\');sharetogle(\'\');_ct(\'mvfbshare\',\'moviedtpg\',\'16777216\');"><span class="fb_cls"></span> Facebook</a></li>'+																													
			'<li><a title="Share via Twitter" id=\'headerSocialTwitter\' title="twitter" class="sprite twts" href="https://twitter.com/intent/tweet?url='+encodeURI(movieUrl+'?flg=tw')+'&via=Just_Dial&text=Check out the show details and reviews for '+movieNameShrt+' on Justdial'+'" onclick="javascript:sharetogle(\'\');_ct(\'mvtwittershare\',\'moviedtpg\',\'16777216\');""><span class="twt_cls"></span> Twitter</a></li>'+																														
			'<li><a title="Share via Google Plus" href="https://plus.google.com/share?url='+encodeURI(movieUrl+'?flg=gm')+'" onclick="javascript:sharetogle(\'\');_ct(\'mvgmailshare\',\'moviedtpg\',\'16777216\');window.open(this.href,  \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600\');return false;"><span class="gplus_cls"></span> Google plus</a></li>'+
			'<li class="rst"><a title="Share via Email" onclick="openSvemail(\'\',\'moviedtpg\',\'\');" href="javascript:void(0);"><span class="email_cls"></span>  E-mail</a></li>'+
		'</ul>'+
	'';
	
	$('#rshare').html(shareMv);
	$('#rating').show();
		
		/*
		$('#dtlstar').html(topBarRatingHtmlmovie(d));

		
		if($('.mvtle').is(':visible'))
		{
			if(d.totRatings.total > 0)
			{
				$('#mvtrhd').html(topBarMovieTrailer(d));
				$('#mvtrhd').show();
			}
		}
		*/
		
		$('#jdrat').html(jdhtml(d.jd_rating));
		//$('#usrrat').html(userhtml(d.user_rating));
		//$('#ratot').html(ratingtxthtml(d.totrates));
		$('#usrrat').show();
		$('#ratot').show();
		$('#crts_review').html(criticsRatingsHtml(d));
		if(d.isCritic || d['movie_name'].toLowerCase().search('forthcoming') == -1)
		{			
			$('#rthis').show();
		}
		if(d['movie_name'].toLowerCase().search('forthcoming') == -1)
		{			
			//$('#rthis').show();
			
			if(d.totRatings.total > 0)
			{
				$('#pip').show();
				$('#rdrvw').show();
			}
		}
		
		if(d.movie_details)
		{
			//mvdet_len = Object.getOwnPropertyNames(d.movie_details).length;
			mvdet_len = Object.size(d.movie_details);
		}
		
		/*Details Page Movie Details & Trailers Scenarios*/
		
		if(!d.trailer_id && (mvdet_len == 0 || mvdet_len == 1))
		{
			$(".mdetail").addClass('wide');
			$("#shwdn").css('display','block');
		}
		else if(!d.trailer_id && mvdet_len > 1)
		{	
			$(".mdetail").addClass('wide');
			$("#shwdn").css('display','block');
		}
		else if(d.trailer_id && mvdet_len == 0)
		{
			$(".mvideo_o").addClass('wide');
		}
		else if(d.trailer_id && mvdet_len == 1)
		{
			$("#shwdn").css('display','block');
		}
		else if(d.trailer_id && mvdet_len > 1)
		{
			$("#shwdn").css('display','block');
		}
		
		if(d.trailer_id)
		{
			var vdolink = 'https://www.youtube.com/embed/' + d.trailer_id + '?autoplay=1&wmode=transparent&rel=0';
			
			$('.mvideo').attr('src', vdolink);
			$('.mvideo').show();
		}
		
		if(mvdet_len > 0)
		{
			movie_details(d);
		}
		
		if(d.totfriendreviews.total > 0)
		{	
			mvfrndhtml = movie_frnd_bar_html(d);
			$('.frnd_rate').html(mvfrndhtml);
			$('.frnd_rate').show();
		}
		
		if(d.totRatings.total > 0)
		{
			$('#graphs_div').html(graphHtml(d));
			$('#graphs_div').show();
		}
		else
		{
			
			//if((d.trailer_id && mvdet_len == 0) || (!d.trailer_id && mvdet_len > 0))
			//{
				$('.jco').css('width','100%');
				$('.jcrv').css('width','100%');
				$('#tabratings').css('width','100%');
			//}
			
		}
		
		//if(d['movie_name'].toLowerCase().search('forthcoming') == -1)
		if(d.ratings.length > 0)
		{
			$('#rvw').html(reviewHtml(d));
		}
		
		$('.jcrv li').corner("top 5px");
		$('.jcrv aside a').corner("top 5px");
		$('.mdetail .show_time').corner("5px");
		$('.mdetail .frnd_rate').corner("5px");
		$('#allratings .jpbg').corner("15px");
		$('#allfratings .jpbg').corner("15px");
		$('#allmratings .jpbg').corner("15px");
		$('#bftr .jpbg').corner("15px");
		var reviewername = $("#mvrname").val();
		reviewername = 'mvcrnm'+reviewername.replace(/[^a-zA-Z0-9]/g,'');
		if ($('#'+reviewername).length > 0) {
			_ct('mvrevsharelink','moviedtpg','16777216');
			$('html, body').animate({ scrollTop: $('#'+reviewername).offset().top }, 'slow');		
		}
		else if ($("#mvrvflag").val() !=''){
			_ct('mvsharelink','moviedtpg','16777216');
			_ct('mvsharelink'+$("#mvrvflag").val(),'moviedtpg','16777216');
		}
		
	});
}

function topBarRatingHtmlmovie(d)
{
	var c = $("#what").val().toLowerCase();
	var classstar = (c.length <70) ? 'cstars ' : 'stars';

	var html = '';
	var ratetxt = '';
	var urlpart = ''; 

	urlpart = (d.starlength == 0) ? '?tab=writereview' : '#rvw';

	html += '<a class="'+classstar+'"  href="'+window.location+urlpart+'">';

	if(d.starlength >= 0)
	{
		$('.value-title').attr('title', d.totRatings.stars);
		var i;
		var len = d.star.length;
		for(i=0; i<len; i++)
		{ 
			html += '<span class="s'+d.star[i]+'"></span>';
		}
	}
	
	return html;
}

function jdhtml(jdr)
{	
	var html = '';
	var popupstars = '';
	
	if(jdr != null && jdr[0] > 0)
	{
		var len = jdr.length;
		html += '<aside>Critics Rating<span class="stars">';
		html += '<a href="javascript:;" onclick="return openDiv(\'jdpop\');">';
		
		for(i=0; i<len; i++)
		{ 
			html += '<span class="s'+jdr[i]+'"></span>';
			popupstars += '<span class="mw'+jdr[i]+'"></span>';
		}
		
		html += '</a>';
		
		$('#jdpop .stars_m').html(popupstars);
		
		html += '</span></aside>';
	}
	/*else
	{
		for(i=0; i<5; i++)
		{ 
			html += '<span class="s0"></span>';
			popupstars += '<span class="mw0"></span>';
		}
		
		$('#jdpop .stars_m').html(popupstars);
		
		//html += '</span><a class="help_txt" href="javascript:;" onclick="return openDiv(\'jdpop\');">[?]</a></aside>';
		html += '</span></aside>';
	}*/
	
	return html;
}

function userhtml(usr)
{	
	var html = '';
	var popupstars = '';
	
	if(usr != null && usr[0] > 0)
	{
		var len = usr.length;
		html += '<aside>JD User Ratings<span class="stars">';
		html += '<a href="#rvw" onclick="change_tab(\'ratings\')">';
		
		for(i=0; i<len; i++)
		{ 
			html += '<span class="s'+usr[i]+'"></span>';
			popupstars += '<span class="mw'+usr[i]+'"></span>';
		}
		
		html += '</a>';
		html += '</span>';
		html += '</aside>';
		$('#usrpop .stars_m').html(popupstars);
		
		//html += '</span><a class="help_txt" href="javascript:;" onclick="return openDiv(\'usrpop\');">[?]</a></aside>';
	}
	/*else
	{
		for(i=0; i<5; i++)
		{ 
			html += '<span class="s0"></span>';
			popupstars += '<span class="mw0"></span>';
		}
		
		$('#usrpop .stars_m').html(popupstars);
		
		//html += '</span><a class="help_txt" href="javascript:;" onclick="return openDiv(\'usrpop\');">[?]</a></aside>';
		//html += '</span><p>Currently none of our users have rated this movie.</p></aside>';
	}*/
	return html;
}

function ratingtxthtml(tot)
{
	var txt = '';
	
	if(tot > 0)
	{
		txt = (tot == 1) ? tot + " Rating" : tot + " Ratings";
	}
	/*else
	{
		txt = tot + " Ratings";
	}*/	
	return txt;
}

var actPosition = 0;
var slideWidth ="";
var slides = $('.slide');
var numberOfSlides = "";
function bindSlider()
{
  numberOfSlides = $('.slide').length;
  slideWidth = $('.slide').width();
  $('#slideInner').css('width', slideWidth * numberOfSlides);
  manageControls(actPosition);
  $('.control')
    .bind('click', function(){
  	actPosition = ($(this).attr('id')=='rightControl') ? actPosition+1 : actPosition-1;
    manageControls(actPosition);
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-actPosition)
    });
  });
}

function manageControls(position){
    if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
    if(position==numberOfSlides-1){ $('#rightControl').hide() } else{ $('#rightControl').show() }
}
function galleriffic()
{
// We only want these styles applied when javascript is enabled
				$('div.content').css('display', 'block');

				// Initially set opacity on thumbs and add
				// additional styling for hover effect on thumbs
				var onMouseOutOpacity = 0.67;
				$('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
					mouseOutOpacity:   onMouseOutOpacity,
					mouseOverOpacity:  1.0,
					fadeSpeed:         'fast',
					exemptionSelector: '.selected'
				});

				// Initialize Advanced Galleriffic Gallery
				var gallery = $('#thumbs').galleriffic({
					delay:                     2500,
					numThumbs:                 6,
					preloadAhead:              10,
					enableTopPager:            false,
					enableBottomPager:         false,
					imageContainerSel:         '#slideshow',
					controlsContainerSel:      '#controls',
					captionContainerSel:       '#caption',
					loadingContainerSel:       '#loading',
					enableKeyboardNavigation:  false,
					renderSSControls:          true,
					renderNavControls:         true,
					playLinkText:              'Play',
					pauseLinkText:             'Pause',
					prevLinkText:              '&lsaquo; Previous',
					nextLinkText:              'Next &rsaquo;',
					nextPageLinkText:          'Next &rsaquo;',
					prevPageLinkText:          '&lsaquo; Prev',
					enableHistory:             false,
					autoStart:                 false,
					syncTransitions:           true,
					defaultTransitionDuration: 0,
					onSlideChange:             function(prevIndex, nextIndex) {
						// 'this' refers to the gallery, which is an extension of $('#thumbs')
						this.find('ul.thumbs').children()
							.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
							.eq(nextIndex).fadeTo('fast', 1.0);

						// Update the photo index display
						this.$captionContainer.find('div.photo-index')
							.html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
					},
					onPageTransitionOut:       function(callback) {
						this.fadeTo('fast', 0.0, callback);
					},
					onPageTransitionIn:        function() {
						var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
						var nextPageLink = this.find('a.next').css('visibility', 'hidden');

						// Show appropriate next / prev page links
						if (this.displayedPage > 0)
							prevPageLink.css('visibility', 'visible');

						var lastPage = this.getNumPages() - 1;
						if (this.displayedPage < lastPage)
							nextPageLink.css('visibility', 'visible');

						this.fadeTo('fast', 1.0);
					}
				});

				/**************** Event handlers for custom next / prev page links **********************/

				gallery.find('a.prev').click(function(e) {
					gallery.previousPage();
					e.preventDefault();
				});

				gallery.find('a.next').click(function(e) {
					gallery.nextPage();
					e.preventDefault();
				});

				/****************************************************************************************/

				/**** Functions to support integration of galleriffic with the jquery.history plugin ****/

				// PageLoad function
				// This function is called when:
				// 1. after calling $.historyInit();
				// 2. after calling $.historyLoad();
				// 3. after pushing "Go Back" button of a browser
				function pageload(hash) {
					// alert("pageload: " + hash);
					// hash doesn't contain the first # character.
					if(hash) {
						$.galleriffic.gotoImage(hash);
					} else {
						gallery.gotoIndex(0);
					}
				}

				// Initialize history plugin.
				// The callback is called at once by present location.hash.
				//$.historyInit(pageload, "advanced.html");

				// set onlick event for buttons using the jQuery 1.3 live method
				$("a[rel='history']").on('click', function(e) {
					if (e.button != 0) return true;

					var hash = this.href;
					hash = hash.replace(/^.*#/, '');

					// moves to a new page.
					// pageload is called at once.
					// hash don't contain "#", "?"
					//$.historyLoad(hash);

					return false;
				});

}
function initializeLarge() {
	/*var myLatlng = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
	var myOptions = {
		zoom: 16,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map = new google.maps.Map(document.getElementById("large_map"), myOptions);

	if(document.getElementById("mpfl").value == '1')
	{

		var stars = document.getElementById('star').value.split(',');
		var starstr = '<div class="Star0" style="padding:4px 0 0 0;float:left;">';
		for (var i=0;i<stars.length ;i++ )
		{
			starstr += '<span class="s'+stars[i]+'"></span>';
		}
		starstr += '</div>';

		var contentString = '<div id="content">'+
		'<h1 style="color:black;float:left;padding:0 5px 0 0;font-size:18px;margin:0;"><b>'+document.getElementById('cn').value+'</b></h1>'+starstr+
		'<div id="bodyContent">'+
		'<p style="color:black;float:left;width:205px;">'+document.getElementById('add').value+'</p>'+
		'<div style="float:right;"><img src="'+document.getElementById('ff').value+'" width="83" height="56"></div>'+
		'</div>'+
		'</div>';
		var infowindow = new google.maps.InfoWindow({
		content: contentString
		});

		var image = new google.maps.MarkerImage('http://img.jdmagicbox.com/webstatic/marker1.png');

		var marker = new google.maps.Marker({
			draggable: false,
			position: myLatlng,
			icon: image,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
		});
	}
	else{
		var circleOptions = {
		strokeColor: "#1274C0",
		strokeOpacity: 0.3,
		strokeWeight: 2,
		fillColor: "#1274C0",
		fillOpacity: 0.15,
		map: map,
		center: new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value),
		radius: 500
		};
		cityCircle = new google.maps.Circle(circleOptions);
	}*/
}

function openmap(divname,area)
{
	if(divname=='enlarge_map_div') {
		if(area	== "drgmp"){
			$("#drgmp").val("1");
		}
		else{
			$("#drgmp").val("0");
		}
		loadScriptLarge();
		openDiv('enlarge_map_div');
	}
}

function loadScriptLarge()
{
	/*if(document.getElementById("large_map"))

	{
		var script = document.createElement("script");
		script.type = "text/javascript";
		if($("#drgmp").val() == 1){
			script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=correctLocation";
		}
		else{
			script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=initializeLarge";
		}
		document.body.appendChild(script);
	}
	else
	{
		$(".lightbox").lightbox({
			fitToScreen: true,
			imageClickClose: false
		});
	}*/
}


function changephototab(id,albids)
{
	var arr = albids.split(',');
	for(var i=0;i<arr.length;i++)
	{
		if(id == arr[i])
		{
			document.getElementById(id).className = "slct";
			document.getElementById('div_'+id).style.display = 'block';
		}
		else
		{
			document.getElementById(arr[i]).className = '';
			document.getElementById('div_'+arr[i]).style.display = 'none';
		}
	}
}

function changephotoalbum(cid,val,allvals,city)
{
	if(document.getElementById('vid_link') && $( "#vid_link" ).hasClass( "slct" ))
	{ 
		$('.vidwrp').addClass('dn');
		$('#vid_link').removeClass('slct');
	}
	var allval = allvals.split(',');
	$.get(WEBROOT+"functions/getphotos.php", {compid: cid,val: val,city: city}, function(data) {
		$(".content").html(data);
		for(var i=0;i<allval.length;i++) {
		
			//alert(allval[i]);
		
			if(val==allval[i]) {
				if(document.getElementById(val))
					document.getElementById(val).className = "slct";
			}
			else if(allval[i]){
				if(document.getElementById(allval[i]))
					document.getElementById(allval[i]).className = "";
			}
		}
		galleriffic();
	})
}

function routeKeyPress(e)
{
	// look for window.event in case event isn't passed in
	if (window.event) { e = window.event; }
	if (e.keyCode == 13)
	{
		document.getElementById('routebuttn').click();
	}
}

function getdirections(divname)
{
	/*openDiv(divname,'');
	if(document.getElementById("map_directions"))
	{
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=initializeDirections";
		document.body.appendChild(script);

		var directionsDisplay = new google.maps.DirectionsRenderer();
		var myLatlng = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
		var myOptions = {
			zoom: 16,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var map = new google.maps.Map(document.getElementById("map_directions"), myOptions);
		directionsDisplay.setMap(map);

		var directionsService = new google.maps.DirectionsService();

		var start = document.getElementById('get_my_directions').value;//'andheri west';
		var end = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
		var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status)
		{
			if (status == google.maps.DirectionsStatus.OK)
			{
				directionsDisplay.setDirections(result);
			}
		});
	}
	else
	{
		$(".lightbox").lightbox({
			fitToScreen: true,
			imageClickClose: false
		});
	}*/
}

function initializeDirections() {

	/*var directionsDisplay = new google.maps.DirectionsRenderer();
	var myLatlng = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
	var myOptions = {
		zoom: 16,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	var map = new google.maps.Map(document.getElementById("map_directions"), myOptions);
	directionsDisplay.setMap(map);

	var directionsService = new google.maps.DirectionsService();

	var start = document.getElementById('get_my_directions').value;//'andheri west';
	var end = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
	var request = {

		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode.DRIVING
	};

	//alert(document.getElementById('lt').value+'---'+document.getElementById('ln').value);

	$.get(WEBROOT+"functions/directions.php", {from: $("#get_my_directions").val(),lat: $("#lt").val(),lng: $("#ln").val(),cn: $("#cn").val(),add: $("#add").val()}, function(data) {

		//alert(data);

		$("#routes").html(data);
		directionsService.route(request, function(result, status)
		{
			if (status == google.maps.DirectionsStatus.OK)
			{
				directionsDisplay.setDirections(result);
			}
		});
	});*/
}

function getvalueBack(userevent)
{
	if(userevent=='blur')
	{
		if(document.getElementById('get_my_directions').value=='')
		{
			document.getElementById('get_my_directions').value = 'Get Directions From?';
		}
	}
	if(userevent=='focus')
	{
		if(document.getElementById('get_my_directions').value=='Get Directions From?')
		{
			document.getElementById('get_my_directions').value = '';
		}
	}
}

function showmore(divopen,divclose)
{
	if(divopen=='more')
	{
		document.getElementById('showonmore').style.display='block';
	}
	else
	{
		document.getElementById('showonmore').style.display='none';
	}
	document.getElementById(divopen).style.display='block';
	document.getElementById(divopen+'div').style.display='block';
	document.getElementById(divclose).style.display='none';
	document.getElementById(divclose+'div').style.display='none';
}



function getvcode(a, c, b, d) {
    if(a == 1) 
	{
        if(document.getElementById("rdoOwn").checked == false && document.getElementById("rdoUser").checked == false) 
		{
            alert("Please choose the appropriate option");
            return false
        } 
		else 
		{

            if (document.getElementById("rdoUser").checked == true) {
				
				var wurl = window.location.href;
				loc1 = wurl.substr(-2);
				if(loc1 == '/5') {
				  url_href = wurl.replace(wurl.substr(-2),'');
				}
				else {
				  url_href = window.location.href;
				}
                //var url = WEBROOT+"functions/editlisting.php?city=" + c + "&docid=" + b + "&companyid=" + d + "&wth=0.00"+"&search_type="+$("#what").val()+"&comp="+$("#what").val()+"&url="+window.location.href;
				var url = WEBROOT+"webmain/os_index.php?city=" + c + "&docid=" + b + "&companyid=" + d + "&wth=0.00"+"&search_type="+$("#what").val()+"&comp="+$("#what").val()+"&url="+url_href+"&rduser=1";
                window.location = url;
                return false;
            }
			else 
			{
				closeDiv('edsb');
                openDiv('elv');
            }
        }
    }
	else
	{
        if (a == 2) 
		{
			closeDiv('edsb');
			openDiv('elv');
        }
    }
}

function _click(docid,city,a, d) {
    a = escape(a);d = escape(d);
	$.ajax({
	url:WEBROOT+"functions/editlisting_click_tracker.php?city="+city+"&li="+a+"&ll="+d+"&rnd="+Math.random()+"&docid="+docid,
	async:false
	});
}

function verify_uploader(f, h, c, b, d) {
    if (c == 1) 
	{
        var a = WEBROOT+"functions/verify_catalog_uploader.php?did=" + f + "&city=" + h + "&type=" + c + "&module=" + b + "&wovcode=" + d;
        $.get(a, {did: f,city:h,type:c,module:b,wovcode:d }, function(data) {
            $("#elv").html(data);
			$('#elv .jpbg').corner("15px");
		});
    }
	else 
	{
        if (c == 2) 
		{
         
            var vcodelft = $("#vcodelftedt").val();
			var vcodert = $("#vcodertedt").val();
			var j = vcodelft+'-'+vcodert;
			
			if(d != 'y') 
			{
				var illegalc = /^[A-Za-z0-9]+-[A-Za-z0-9]+$/;
				
				if (!j.match(illegalc))
				{
					alert("Enter valid characters in verification code");	
					return false;
				}
			} 
            
            b = "EL";
            var a = WEBROOT+"functions/verify_catalog_uploader.php?did=" + f + "&city=" + h + "&type=" + c + "&vcode=" + j + "&module=" + b + "&wovcode=" + d;
            $.get(a, {did: f,city:h,type:c,vcode:j,module:b,wovcode:d }, function(data) {
				if(data.search("nonhtml") != -1)
				{
					//window.location = data;
					params = data.split("|~|");
					
					frm_url  = WEBROOT+'webmain/os_index.php?city='+escape(params[0])+'&parentid='+escape(params[1])+'&docid='+escape(params[2]);
					
					$('<form action="'+frm_url+'" method="POST">' + 
						'<input type="hidden" name="checksum" value="' + params[3] + '">' +
						'<input type="hidden" name="wovc" value="' + params[4] + '">' +
						'</form>').appendTo($(document.body)).submit();
				}
				else
				{
					$("#elv").html(data);
					$('#elv .jpbg').corner("15px");
				}
			});
        }
    }
}

function showlargeimg(id)
{
	document.getElementById('pic'+id).style.display = 'block';
}
function hidelargeimg(id)
{
	document.getElementById('pic'+id).style.display = 'none';
}

function enqiryemail(docid,paid,city)
{
	nm 		=	document.getElementById('enqname').value;
	ph 		=	document.getElementById('enqmobile').value;
	eid 	=	document.getElementById('enqemail').value;
	subj 	=	document.getElementById('enqsub').value;
	bd 		=	document.getElementById('enqbd').value;
	document.getElementById('enqerr').innerHTML = "";
	var msg	=	validateEnq(nm,ph,eid,subj,bd);

	if(msg == "0"){
		ajax = getXMLHTTPReqObj();
		var url = WEBROOT+"/functions/ajxenq.php?name="+nm+"&ph="+ph+"&eid="+eid+"&subj="+subj+"&bd="+bd+"&city="+city+"&docid="+docid+"&paid="+paid;
		ajax.onreadystatechange = getenq;
		ajax.open("GET", url, true);
		ajax.send(null);
	}
	else{
		document.getElementById('enqerr').innerHTML = msg;
		$('#enqerr').show();
		return false;
	}
}

function getenq(){
		if (ajax.readyState == 4){
		var res = ajax.responseText
		if(res == "1" || res == "4")
		{
			closeDiv('sbep');
			openDiv('sbes');
			setTimeout('closeDiv("sbes")',3000);
		}
		if(res == "2"){
			alert("No BadWords Please!");
		}
	}
}

function validateEnq(nm,ph,eid,subj,bd)
{
	if(nm == ""){
		var msg	=	"Enter name";
		$("#enqname").focus();
		return msg;
	}
	else if(ph != ""){

		var alert_msg = mobile_validation(ph);
		if(alert_msg != "valid"){
			var msg	=	"Enter valid Mobile number ";
			$("#enqmobile").focus();
			return msg;
		}
		else if(eid == ""){
			var msg	=	"Enter E-mail Id";
			$("#enqemail").focus();
			return msg;
		}
		else if(!isValid(eid, 'email')){
			var msg	=	"Enter Valid E-mail Id";
			$("#enqemail").focus();
			return msg;
		}
		else if(subj == ""){
			var msg	=	"Enter Subject";
			$("#enqsub").focus();
			return msg;
		}
		else if(bd == ""){
			var msg	=	"Enter Body";
			$("#enqbd").focus();
			return msg;
		}
		else{
			var msg	=	"0";
			return msg;
		}
	}
	else if(eid == ""){
		var msg	=	"Enter E-mail Id";
		$("#enqemail").focus();
		return msg;
	}
	else if(!isValid(eid, 'email')){
		var msg	=	"Enter Valid E-mail Id";
		$("#enqemail").focus();
		return msg;
	}
	else if(subj == ""){
		var msg	=	"Enter Subject";
		$("#enqsub").focus();
		return msg;
	}
	else if(bd == ""){
		var msg	=	"Enter Body";
		$("#enqbd").focus();
		return msg;
	}
	else{
		var msg	=	"0";
		return msg;
	}
}
function count_positive_review(id,index)
{
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	revid	=	getCookie('revid');
	if(revid != id)
	{
		setCookieRev('revid',id);
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				if(xmlhttp.responseText != 0){
					document.getElementById("th_up"+index).innerHTML = xmlhttp.responseText;
				}
			}
		}
		xmlhttp.open("GET",webroot+"functions/ajxthumsup.php?revid="+id,true);
		xmlhttp.send();
	}
	else{
		alert("You are not allowed to give more than one ratings");
	}
}

function setCookieRev(cname,cvalue){
	document.cookie = escape(cname) + "=" + escape(cvalue) + ";  path=/; domain=" + cookieondomain;
}

function reportAbuseReview(ct,cn){

	var id		=	$("#hidrevid").val();
	var name	=	$("#revabname").val();
	var num		=	$("#revabnum").val();
	var eid		=	$("#revabeid").val();
	var cmts	=	$("#revabcmts").val();
	var revnm	=	$("#revabnm").html();
	var revrep	=	$("#revabrep").html();

	document.getElementById('revabmsg').innerHTML = "";
	var msg	=	reportAbuseReviewVal(name,num,eid,cmts);
	if(msg == "0"){
		ajax = getXMLHTTPReqObj();
		var url = webroot+"/functions/ajxrevabuse.php?name="+name+"&ph="+num+"&eid="+eid+"&cmts="+cmts+"&cn="+cn+"&ct="+ct+"&revnm="+revnm+"&revrep="+revrep+"&revid="+id;
		ajax.onreadystatechange = getrevack;
		ajax.open("GET", url, true);
		ajax.send(null);
	}
	else{
		document.getElementById('revabmsg').innerHTML = msg;
		return false;
	}
}
function getrevack()
{
	document.getElementById('msgdone').innerHTML = "";
	if (ajax.readyState == 4){
		var res = ajax.responseText
		if(res == 1){
			openDiv('report_abuse_done','');
			document.getElementById('msgdone').innerHTML = "<b>Thank You for visiting Justdial.com.</b>";
			setTimeout('closePopUp("report_abuse_done")',3000);
		}
	}
}

function reportAbuseReviewVal(name,num,eid,cmts){

	var msg	=	"";
	if(name == ""){
		msg	=	"Enter Name";
		$("#revabname").focus();
		return msg;
	}
	else if(num == ""){
		msg	=	"Enter Your Contact Number";
		$("#revabnum").focus();
		return msg;
	}
	else if(num != ""){
		var msg	=	mobile_validation(num) // undefined
		if(msg != "valid"){ // TRUE
			msg	=	"Enter a valid number";
			$("#revabnum").focus();
			return msg;
		}
		else if(eid == ""){
			var msg	=	"Enter Valid E-mail Id";
			$("#revabeid").focus();
			return msg;
		}
		else if(!isValid(eid, 'email')){
			var msg	=	"Enter Valid E-mail Id";
			$("#revabeid").focus();
			return msg;
		}
		else if(cmts == ""){
				msg	=	"Enter Comments";
				$("#revabcmts").focus();
				return msg;
		}
		else{
			msg	=	0;
			return msg;
		}
	}

}

function openDivRevab(divname,id){
	$("#hidrevid").val(id);
	ajax = getXMLHTTPReqObj();
	var url = webroot+"/functions/ajxrevdetails.php?id="+id;
	ajax.onreadystatechange = getrevdet;
	ajax.open("GET", url, true);
	ajax.send(null);
}
function getrevdet(){
	if (ajax.readyState == 4){
		var res = ajax.responseText
		var revname	=	res.split("|~|");
		openDiv('report_abuse_review','');
		$("#revabnm").html(revname[1]);
		$("#revabrep").html(revname[0]);
	}
}
var opt = 0;
function selected_opt(t){
	opt = t;
}
function capture_lat_lng(lat, lng){
	if(opt == 0){
		alert('Please select an option.');
		return false;
	}
	else{
		insert_lat_lng(lat, lng,opt);
	}
}
function insert_lat_lng(lat,lng,opt){
	var docId 	= $("#mpdocid").val();
	var map_ct 	= $("#mpct").val();
	var newlt	= $("#crnlt").val();
	var newln	= $("#crnln").val();
	//alert(lat+"new="+newlt);alert(lng+"new="+newln);return false;
	var answer = confirm("Are you SURE you want to SAVE this location?");
	if (answer){
		ajax = getXMLHTTPReqObj();
		var url = WEBROOT+'/functions/ajxlatlng.php?lat=' + lat + '&lng=' + lng + '&docId=' + docId + '&ct=' + map_ct + '&opt=' + opt + '&nwlt='+newlt+'&nwln='+newln;
		ajax.onreadystatechange = getmap;
		ajax.open("GET", url, true);
		ajax.send(null);
	}
}
function getmap(){
	if (ajax.readyState == 4){
		if(ajax.responseText == 1){
			alert("Details Saved Successfully.");
		}
		else{
			alert("Error occurred while adding details.");
		}
		closeDiv("enlarge_map_div");
	}
}

function correctLocation(){
	var myLatlng = new google.maps.LatLng(document.getElementById('lt').value,document.getElementById('ln').value);
	var myOptions = {
	zoom: 16,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.HYBRID
	}
	var map = new google.maps.Map(document.getElementById("large_map"), myOptions);
	if(document.getElementById("mpfl").value == '1'){
		var infoWindow3 = new google.maps.InfoWindow({});
		markers = new Array();
		var stars = document.getElementById('star').value.split(',');
		var starstr = '<div class="Star0" style="padding:4px 0 0 0;float:left;">';
		for (var i=0;i<stars.length ;i++ ){
			starstr += '<span class="s'+stars[i]+'"></span>';
		}
		starstr += '</div>';
		var contentString = '<div id="content">'+
		'<h1 style="color:black;float:left;padding:0 5px 0 0;font-size:18px;margin:0;"><b>'+document.getElementById('cn').value+'</b></h1>'+starstr+
		'<div id="bodyContent">'+
		'<p style="color:black;float:left;width:205px;">'+document.getElementById('add').value+'</p>'+
		'<div style="float:right;"><img src="'+document.getElementById('ff').value+'" width="83" height="56"></div>'+
		'</div>'+
		'</div>';
		var infowindow = new google.maps.InfoWindow({
		content: contentString
		});
		var contentString1 = "<b>Drag Marker</b><br>to Locate this Business";
		var infowindow1 = new google.maps.InfoWindow({
			content: contentString1
		});
		var contstrng = '<div id="locate_div"><ul>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo1" value="exact" onclick="selected_opt(1);" /> <label title="Exact Location" for="rdo1">Exact Location</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo2" value="apprx_100" onclick="selected_opt(2);"/> <label title="Approx By 100 Metres" for="rdo2">Approx By 100 Metres</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo3" value="apprx_200" onclick="selected_opt(3);"/> <label title="Approx By 200 Metres" for="rdo3">Approx By 200 Metres</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo4" value="within" onclick="selected_opt(4);"/> <label title="Within This Area" for="rdo4">Within This Area</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo5" value="not_sure" onclick="selected_opt(5);"/> <label title="I am NOT sure" for="rdo5">I am NOT sure</label></li>';
		contstrng += '<li class="btn_li"><input class="jbtn" type="button" name="btn_submit" value="Submit" onclick=\"capture_lat_lng(\''+$("#lt").val()+'\',\''+$("#ln").val()+'\')\" /></li></ul></div>';
		var infowindow2 = new google.maps.InfoWindow({
		content: contstrng
		});

		var image = new google.maps.MarkerImage('http://img.jdmagicbox.com/webstatic/marker1.png');

		for(i=0;i<2;i++){
			if(i == 0)
			{
				marker = new google.maps.Marker({
					draggable: false,
					position: myLatlng,
					icon: image,
					//animation: google.maps.Animation.DROP,
					map: map
				});
				google.maps.event.addListener(marker, 'click', function(event) {
					infoWindow3.setContent(contentString);
					infoWindow3.open(map, this);
					infowindow2.close();
				});
			}
			else
			{
				marker = new google.maps.Marker({
				draggable: true,
				position: myLatlng,
				map: map
				});
				google.maps.event.addListener(marker, 'click', function(event) {
					infoWindow3.setContent(contstrng);
					infoWindow3.open(map, this);
					infowindow2.close();
				});
			}
			markers.push(marker);
		}
		infowindow1.open(map,marker);

		google.maps.event.addListener(marker, 'dragstart', function() {
			infowindow.close();
			infowindow1.close();
			infowindow2.close();
		});

		google.maps.event.addListener(marker, 'dragend', function(evt) {
			$("#crnlt").val(evt.latLng.lat());
			$("#crnln").val(evt.latLng.lng());
			infowindow2.open(map,markers[1]);
		});
	}
	else{
		var contentString1 = "<b>Drag Marker</b><br>to Locate this Business";
		var infowindow1 = new google.maps.InfoWindow({
			content: contentString1
		});
		var contstrng = '<div id="locate_div"><ul>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo1" value="exact" onclick="selected_opt(1);" /> <label title="Exact Location" for="rdo1">Exact Location</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo2" value="apprx_100" onclick="selected_opt(2);"/> <label title="Approx By 100 Metres" for="rdo2">Approx By 100 Metres</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo3" value="apprx_200" onclick="selected_opt(3);"/> <label title="Approx By 200 Metres" for="rdo3">Approx By 200 Metres</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo4" value="within" onclick="selected_opt(4);"/> <label title="Within This Area" for="rdo4">Within This Area</label></li>';
		contstrng += '<li><input type="radio" name="rdo" id="rdo5" value="not_sure" onclick="selected_opt(5);"/> <label title="I am NOT sure" for="rdo5">I am NOT sure</label></li>';
		contstrng += '<li class="btn_li"><input class="button" type="button" name="btn_submit" value="Submit" onclick=\"capture_lat_lng(\''+$("#lt").val()+'\',\''+$("#ln").val()+'\')\" /></li></ul></div>';
		var infowindow2 = new google.maps.InfoWindow({
		content: contstrng
		});
		var marker = new google.maps.Marker({
			draggable: true,
			position: myLatlng,
			map: map
		});
		infowindow1.open(map,marker);
		google.maps.event.addListener(marker, 'dragstart', function() {
			infowindow1.close();
			infowindow2.close();
		});
		google.maps.event.addListener(marker, 'dragend', function(evt) {
			$("#crnlt").val(evt.latLng.lat());
			$("#crnln").val(evt.latLng.lng());
			//$("#crnln").val(evt.latLng.lng().toFixed(3));
			//$("#crnln").val(evt.latLng.lng().toFixed(3));
		infowindow2.open(map,marker);
		});
		google.maps.event.addListener(marker, 'click', function(event) {
			infowindow2.open(map,marker);
		});
	}
}
function sendcode(docid,type,module){

	var vcodelft =	$("#ovcodelft2").val();
	var vcodert	=	$("#ovcodert2").val();
	var vcode	=	vcodelft+'-'+vcodert;

	$.post(WEBROOT+"functions/ajxcatalog.php",{docid:docid,type:type,module:module,vcode:vcode}, function(data){
		if(data.search("http") != -1){
		
		data1 = data.split("|~|");
		url = data1[0];
		chk = data1[1];
		
		closeDiv("ownp");
		if (typeof swfobject != "undefined")
		{
			var playerVersion = swfobject.getFlashPlayerVersion();
			if(playerVersion.release == 0 || playerVersion.release == '')
			{
				url = url.replace('mcatalog','catalog');
			}
		}
		if(navigator.userAgent.match(/MSIE/i))
		{
			url += '&listedon=1';
		}
	
	//	document.getElementById('vdhref').href = data;
	//	document.getElementById('vdhref').target = '_blank';
		
		$('#vdhref').click(function() {uploadVLC(url,chk);closeDiv('vfdown');});
		closeDiv('hui');
		openDiv("vfdown");
		//window.location = ""+data+"";
		}
		else{
			closeDiv("ownl");
			closeDiv("ooru");
			$("#ownp").html(data);
			round_popup();
			openDiv("ownp","");
		}
	});
}

function sendsmscode(mobile,type){
	if(mobile == '' && !mobile){
		mobile	=	$("#mob").val();
	}
	
	if(type == '2'){
		if(trim($('#mob').val()) == ''){
			$('#mobError').show();
			$('#mobError').html('Please Enter mobile number');
			$('#mob').focus();
			return false;
		}
	}
	
	$.post(WEBROOT+"functions/ajxprmmobile_verification.php",{mobile:mobile}, function(data){
		if(type == '1'){
			closeDiv("prmvrf");
		}else{
			closeDiv("entmob");
		}
		openDiv("plvcode");
	});
}

function codeverify(docid,city)
{
	var v = trim($('#vrcode').val());
	if(v == '')
	{
		$('#vcodeError').show();
		$('#vcodeError').html('Please Enter Verification Code');
		$('#vrcode').focus();
		return false;
	}
	else
	{
		$.post(WEBROOT+"functions/ajxprmmobile_verification.php",{mobcode:v,docid:docid,city:city}, function(res){
			if(res == 1){
				$("#thnkyou").addClass('dt');
				$("#thnkyou").removeClass('dn');
				$("#mainpg").addClass('dn');
				closeDiv("plvcode");
			}
			else
			{
				$('#vcodeError').show();
				$('#vcodeError').html('Please Enter correct Verification Code');
				$('#vrcode').focus();
				return false;
			}
									  
		});
	}
}

function prmlstClickCount(id){
	
	$.post(WEBROOT+"functions/ajxPrmlst.php",{docid:id}, function(res){
			//alert(res);					  
		});
}
function iminterest(docid,city,flg){
	$.post(WEBROOT+"functions/ajxprmmobile_verification.php",{flg:flg,docid:docid,city:city}, function(res){
	
	});
}

function getmore()
{
	document.getElementById('more').style.display = 'block';
	document.getElementById('short').style.display = 'none';
}
function hidemore()
{
	document.getElementById('short').style.display = 'block';
	document.getElementById('more').style.display = 'none';
}


function uploadLogin(logname, catlogurl, chksum)
{
	if(logname == "" )
	{
		openDiv("ooru");
		//$(".nt").html(" Sign in to your Justdial account to upload photos. ");
		//fn_loginStart();
	}
	else
	{
		if(catlogurl != '')
		{
			if (typeof swfobject != "undefined")
			{
				var playerVersion = swfobject.getFlashPlayerVersion();
				if(playerVersion.release == 0 || playerVersion.release == '')
				{
					catlogurl = catlogurl.replace('mcatalog','catalog');
				}
			}
			if(navigator.userAgent.match(/MSIE/i))
			{
				catlogurl += '&listedon=1';
			}
			//window.open(catlogurl, '_blank');
			//window.location = ""+catlogurl+"";
			
			uploadVLC(catlogurl,chksum);
		}
		else
		{
			openDiv("upload","");
		}
	}

}

function uploadphoto()
{
	var multi_upload_filename = document.frm_upload_photo.elements["upload_filename[]"];
	var validation_flag = 0;

	if(document.getElementById('i_agree').checked)
	{
		for(i=0; i < multi_upload_filename.length; i++)
		{
			if(multi_upload_filename[i].value != "")
			{
				file_name = multi_upload_filename[i].value;
				last_dot_pos = multi_upload_filename[i].value.lastIndexOf(".");
				string_length = multi_upload_filename[i].value.length;
				file_extension = file_name.slice(last_dot_pos,string_length);
				if(	file_extension.toLowerCase() != ".jpg" && file_extension.toLowerCase() != ".jpeg" && file_extension.toLowerCase() != ".gif" && file_extension.toLowerCase() != ".png")
				{
					alert("Please select jpg/png/gif image file only.");
					return;
				}
				validation_flag = 1;
			}
		}

		if(validation_flag == 1)
		{
			document.frm_upload_photo.submit();

			/*$.post(DOMAIN+"functions/ajxuploadphoto.php",{docid:docid,cn:cn,type:type,city:city,area:area}, function(data){
					alert(data);
			});*/

		}
		else
		{
			alert("There are no photos to upload.");
			return;
		}
	}
	else
	{
		alert("Please accept terms and conditions.");
		return;
	}
}

function opentooltip(id,aid)
{
	var letp = $(aid).offset();
	document.getElementById(id).style.left = letp.left;
	document.getElementById(id).style.left = (letp.top-10);
	document.getElementById(id).style.display='block';
}

function review_verify(docid, p)
{
	var vcodelft = trim($('#vcodelft').val());
	var vcodert = trim($('#vcodert').val());
	var vcode = vcodelft+"-"+ vcodert;
	if(vcode == '-')
	{
		$('.jerr').show();
		$('#ver_error').html('Please Enter Verification Code');
		$('#vcodelft').focus();
		return false;
	}
	
	if(writeReviewMovie == 1)
		var rev = 'Movie';
	else if (writeReviewProd == 1)
		var rev = 'Product';
	else
		var rev = 'Listing';
		
	$.post(WEBROOT+"functions/review_verification.php", {docid:docid, paid:p, ver:vcode, rev:rev, cases:'review_verification'}, function(result) {
		if(result == 'incorrect_verification')
		{
			$('.jerr').show();
			$('#ver_error').html('Please enter correct Verification Code');
			$('#vcodelft').val('');
			$('#vcodert').val('');
			$('#vcodelft').focus();
			return false;
		}
		else if(result == 'logged_in_user')
		{
			openDiv("revack");
		}
		else if(result == 'registered_user')
		{
			rev_login();
		}
		else if(result == 'new_user')
		{
			openDiv("revpaswrd");
		}
   });
}

function rev_login()
{
	$.post(WEBROOT+"functions/login_log.php", {dl:1}, function(result) {
		if(writeReviewMovie && writeReviewMovie == 1)
		{
			rev_redirect_detail('rev66');
		}
		else if(writeReviewProd && writeReviewProd == 1){
			closeDiv("rtpp");
			openDiv("rtpk");	
		}
		else
		{
			rev_redirect_detail('rev6');
		}
	});
}

function register_user()
{
	var p = trim($('#rev_password').val());
	if(p == '')
	{
		$('#pass_err').html('Please enter Password');
		$('#rev_password').focus();
		return false;
	}
	else
	{
		if(p.length < 6)
		{
			$('#pass_err').html('Please enter atleast 6 characters');
			$('#rev_password').val('');
			$('#rev_password').focus();
			return false;
		}
	}

	$.post(WEBROOT+"functions/review_verification.php", {dl:1, pass:p, cases:'register'}, function(result) {
		if(result == "registration_successful")
		{
			rev_login();
		}
		else
		{
			$("#pass_err").html("Unable to register. Please try after some time.");
		}
	});
}

function rev_redirect_detail(t)
{
	var cflag = 0;
	var url = location.href;
	
	if(writeReviewMovie == 1) {
		//url = url.replace(/\\?tab=rev55|\\?tab=rev66|\\?tab=rev77|\\?tab=rev88|\\?tab=rev99$/, '');
		url = url.replace(/\/rev55|\/rev66|\/rev77|\/rev88|\/rev99$/, '');
	} else if (writeReviewProd == 1) {	
		//url = url.replace(/\\?tab=rev55|\\?tab=rev66|\\?tab=rev77|\\?tab=rev88|\\?tab=rev99$/, '');
		url = url.replace(/\/rev55|\/rev66|\/rev77|\/rev88|\/rev99$/, '');
		if(t=='')
		{
			str = $('#psearch').val();
			str = str.replace(/ /g, "-");
			str = str.replace(/--/g, "-");
			url = WEBROOT+str+'/pid-'+$('#prid').val();
		}
	} else {
		url = url.replace(/\\?tab=rev5|\\?tab=rev6|\\?tab=1|\\?tab=2|\\?tab=3|\\?tab=4|\\?tab=moreinfo|\\?tab=map|\\?tab=rev7|\\?tab=rev8|\\?tab=rev9|\\?tab=rev10$/, '');
		url = url.replace(/[?]/g,'');
		if (url.indexOf("&xid=")){
			url = url.replace('&xid','?xid');
		}
		url += (t != '') ? '?tab='+t : '';
	}
	//window.location.href = url;
	
	var urlsplit = location.href.split('/');
	/*if(urlsplit[6] == 'rev6' || urlsplit[6] == 'rev66')
	{
		if(urlsplit[6] == 'rev6')
			var crefval = 'writereviewm';
		if(urlsplit[6] == 'rev66')
			var crefval = 'writereviewl';
		cflag = 1;	
	}
	*/
	
	if(url.indexOf('_review')!=-1)
	{
		var changeurl = url.replace(WEBROOT,'');
		changeurl = changeurl.replace('_reviews','');
		var changeurlarr = changeurl.split('/');
		changeurlarr[0] = 'Movies';
		if(changeurlarr[3])
			url = WEBROOT+changeurlarr.join('/');
		else
		{
			var endid = changeurlarr[2].split('_');
			changeurlarr[2] = endid[0];
			if(endid[1])
				url = WEBROOT+changeurlarr.join('/')+'?xid='+endid[1];
			else
				url = WEBROOT+changeurlarr.join('/');
		}
	}
	
	//console.log(changeurlarr);return false;
	
	if(window.event) {//IE 6
		window.event.returnValue = false;
        window.location = url;
		/*if(cflag == 1) {
			window.open(WEBROOT+'contest/register.php?cref=' + crefval,'_blank');
		}*/
        return false;
    }else {//firefox 
    	window.location = url;
		/*if(cflag == 1) {
			window.open(WEBROOT+'contest/register.php?cref=' + crefval,'_blank');
		}*/
    }	
}

function trim(val)
{
	return val.replace(/^\s+|\s+$/g, '');
}

function userRating(rid,uid,docids,paid,type,start)
{
	$.get(WEBROOT+"functions/sameuserrating.php", {rid: rid, uid: uid, docids: docids, paid: paid, type: type, start: start, city: $("#city").val()}, function(result) {
		$('#'+start+'_'+uid).html(result);
	});
}

function moreLoc(mrdisp)
{
	if(mrdisp == 'alsltd')
{
		$(".alsmore").addClass('dn');
		$("#alsdisp").removeClass('dn');
		$(".tblals").removeClass('dn');
	}
}

function otherLocation()
{
	var a = $('#otherLoca').offset();
	$('html, body').animate({scrollTop: a.top}, 800);
}

function ratethisScroll()
{
	var a = $('.jbrd').offset();
	window.scrollTo(0,a.top);
}

function moviedata(name,id)
{
	document.cookie = 'moviename='+name+'; '+date+'; path=/';
	document.cookie = 'movieid='+id+'; '+date+'; path=/';
}
/**********************************/

function goToByScrolldetail(id){
	if(id){
		$('html,body').animate({scrollTop: ($("#"+id).offset().top)},'slow',function(){
		});
	}
}

function submitrepo(a,b,c)
{
    var paid_status = (document.getElementById('paid_status')) ? document.getElementById('paid_status').value : ''; 	
	if($("#repoincorrcomm").val() != '')
	{
		$.post(WEBROOT+"functions/ajxreportincorrect.php", {"city":a,"compname":b,"docid":c,"comment":$("#repoincorrcomm").val(),"paid_status":paid_status}, function(data) {$("#er_txt").html(data);openDiv('tfi');$("#btn_ok").focus();});
	}
	else
	{
		alert("Please enter comment");
		$("#repoincorrcomm").focus()
		return false;
	}
}

function popeditlist(paid_status,city,comp_name,docid)
{
	//closePopUp('popeditlisting');
    if ($("#rdoimprorep:checked").val()==1)
    {
		closeDiv('hui');
        setTimeout("openDiv('ri');",300);
    }
    else if ($("#rdoeditbusi:checked").val()==1)
    {
		closeDiv('hui');
        setTimeout("openDiv('edsb');",300);
    }
    else if ($("#rdolocate:checked").val()==1)
    {
		closeDiv('hui');
        openmap('enlarge_map_div','drgmp');
    }
	else if ($("#rdoshutdown:checked").val()==1)
    {	
		closeDiv('hui');
        $.post(WEBROOT+"functions/business_shutdown.php", {"city":city,"compname":comp_name,"docid":docid,"paid_status":paid_status}, function(data) 
        {
			if(data == "1")
			{
				$("#er_txt").html('<h3>Thank you for your inputs.</h3><aside>We shall verify and update the same.</aside>');
				setTimeout("openDiv('tfi');",300);
			}
			else if(data == "2")
			{
				$('#er_txt').html('<aside>You have already submitted the request to report this business as shutdown.</aside><form>	<button class="jbtn jcl btn_ok" type="button">OK</button></form>');
				setTimeout("openDiv('tfi');",300);
			}
			else if(data == "3")
			{
				$('#er_txt').html('<aside>You have reached your daily limit of reporting companies to shutdown.</aside><form>	<button class="jbtn jcl btn_ok" type="button">OK</button></form>');
				setTimeout("openDiv('tfi');",300);
			}
		});
    }
}

function ratings(pgno,total,totrnr,paid,cid,cn)
{
	document.cookie = 'rtpage='+pgno+'; '+date+'; path=/; domain=' + cookieondomain;
	var jsonArr = unescape(totrnr);
	var type = ( vertical =="shopfront" && $("#allratings_prod").is(":visible")) ? 'prod' : "";
	$.get(WEBROOT+"functions/ratingsbypage.php", {city: $("#mpctr").val(),cases: 'allreviews',jsonArr: jsonArr,pgno: pgno,total: total,paid: paid,cid: cid,cn: cn,type : type}, function(data) {
		
		if( vertical =="shopfront" && $("#allratings_prod").is(":visible"))
		{
			$("#allratings_prod").html(data);		
		} else	{	
			$("#allratings").html(data);
			if(hiq_url && pgno == 1)
			{
				$('.holdiqwrp').prepend("<div class='holdiq'><a href='"+hiq_url+"' target='_blank' onclick='_ct(\"hiqlink\", \"dtpg\");' rel='nofollow' >More Reviews from HolidayIQ.com &gt;&gt;</a></div>");
			}
		}
	});
}

function fratings(pgno,total,totrnr,paid,cid,cn)
{
	if($("#allfratings").length)
	{
		/*
		$('#rvw').block({ message: '<img src="http://img.jdmagicbox.com/webstatic/ajax-loader.gif">',
		css: {
			padding:	0,
			margin:		0,
			textAlign:	'center',
			backgroundColor:'#fff',
			cursor:		'wait'
		}})
		*/
	}
	document.cookie = 'frpage='+pgno+'; '+date+'; path=/; domain=' + cookieondomain;
	var jsonArr = unescape(totrnr);
	$.get(WEBROOT+"functions/fratingsbypage.php", {city: $("#mpctr").val(),cases: 'allreviews',jsonArr: jsonArr,pgno: pgno,total: total,paid: paid,cid: cid,cn: cn }, function(data) {
		//$('#rvw').unblock();
		$("#allfratings").html(data);
	});
}

function mratings(pgno,total,totrnr,paid,cid,cn)
{
	document.cookie = 'mrpage='+pgno+'; '+date+'; path=/; domain=' + cookieondomain;
	var jsonArr = unescape(totrnr);
	$.get(WEBROOT+"functions/mratingsbypage.php", {city: $("#mpctr").val(),cases: 'allreviews',jsonArr: jsonArr,pgno: pgno,total: total,paid: paid,cid: cid,cn: cn }, function(data) {
		$('#rvw').unblock();
		$("#allmratings").html(data);
	});
}


function reportAbuse(id,ct,cn)
{
	var paid_stat = document.getElementById('paid_stat').value;
	nm		= document.getElementById('raname').value;
	ph		= document.getElementById('ranum').value;
	eid		= document.getElementById('raeid').value;
	cmts	= document.getElementById('racmts').value;
	ajax	= getXMLHTTPReqObj();
	var url = WEBROOT+"/webmain/ajxmain.php?cases=ra&nm="+nm+"&ph="+ph+"&eid="+eid+"&cmts="+cmts+"&cid="+id+"&ct="+ct+"&cn="+cn+"&city="+ct+"&paid_stat="+paid_stat;
	ajax.onreadystatechange = getdets;
	ajax.open("GET", url, true);
	ajax.send(null);
}

function getdets(){
	document.getElementById('errmsg').innerHTML = "";
	if (ajax.readyState == 4){
		var res = ajax.responseText
		var show = res.split('|@|');
		if(show[0]==1)
		{
			document.getElementById('errmsg').innerHTML = show[1];
		}
		else
		{

			$("#er_txt").html(show[1]);
			openDiv('tfi');

//			setTimeout('closePopUp("report_abuse_done")',3000);

		}
	}
}

function changetab(label,divid)
{
	var tabs = new Array('room', 'business', 'general');
	for(var i=0;i<tabs.length;i++)
	{
		if(divid == tabs[i])
		{
			document.getElementById('id_'+divid).className = "selected";
			document.getElementById(divid).className = 'sri';
		}
		else
		{
			if(document.getElementById('id_'+tabs[i]).className != 'dn')
				document.getElementById('id_'+tabs[i]).className = '';
			if(document.getElementById(tabs[i]))
				document.getElementById(tabs[i]).className = 'dn';
		}
	}
}

function change_tab(divid,onlycook)
{
	document.cookie = 'showpage='+divid+'; '+date+'; path=/; domain=' + cookieondomain;
	
	if(divid.indexOf("_prod") != -1)
		var tabs = new Array('ratings_prod', 'fratings_prod', 'mratings_prod');
	else	
		var tabs = new Array('ratings', 'fratings', 'mratings');
	
	for(var i=0;i<tabs.length;i++)
	{
		if(divid == 'fratings')
		{
			var ln = getCookie('ln');
			if(!ln || attn_user == 'logout')
			{
				//openDiv('login_div','');
				if(onloadFn != 'Result')
				{
					if(onlycook == 1)
					{
						setTimeout('fn_loginStart();',100);
					}
					else
					{
						fn_loginStart();
					}
				}
			}
			document.getElementById('user_graph_div').style.display = 'none';
			document.getElementById('my_graph_div').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('friend_graph_div').innerHTML == '')
				{
					document.getElementById('friend_graph_div').style.display = 'none';
					document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#friend_graph_div .jrot').length == 0)
					{
						$("#abinner").addClass('abcontent');
					}
					else
					{
						$("#abinner").removeClass('abcontent');
					}
					document.getElementById('friend_graph_div').style.display = 'block';
					document.getElementById('abcont').style.display = 'block';
				}
			}
			else if(document.getElementById('friend_graph_div').innerHTML == '')
			{
				document.getElementById('friend_graph_div').style.display = 'none';
			}
			else
			{
				document.getElementById('friend_graph_div').style.display = 'block';
			}
		}
		else if(divid == 'fratings_prod')
		{
			var ln = getCookie('ln');
			if(!ln || attn_user == 'logout')
			{
				//openDiv('login_div','');
				fn_loginStart();
			}
			document.getElementById('user_graph_div_prod').style.display = 'none';
			document.getElementById('my_graph_div_prod').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('friend_graph_div_prod').innerHTML == '')
				{
					document.getElementById('friend_graph_div_prod').style.display = 'none';
					//document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#friend_graph_div_prod .jrot').length == 0)
					{
						//$("#abinner").addClass('abcontent');
					}
					else
					{
						//$("#abinner").removeClass('abcontent');
					}
					document.getElementById('friend_graph_div_prod').style.display = 'block';
					//document.getElementById('abcont').style.display = 'block';
				}
			}
			else if(document.getElementById('friend_graph_div_prod').innerHTML == '')
			{
				document.getElementById('friend_graph_div_prod').style.display = 'none';
			}
			else
			{
				document.getElementById('friend_graph_div_prod').style.display = 'block';
			}
		}
		else if(divid == 'mratings')
		{
			var ln = getCookie('ln');
			if(!ln)
			{

				//openDiv('login_div','');
				if(onloadFn != 'Result')
				{
					fn_loginStart();
				}
			}
			document.getElementById('user_graph_div').style.display = 'none';
			document.getElementById('friend_graph_div').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('my_graph_div').innerHTML == '')
				{
					document.getElementById('my_graph_div').style.display = 'none';
					document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#my_graph_div .jrot').length == 0)
					{
						$("#abinner").addClass('abcontent');
					}
					else
					{
						$("#abinner").removeClass('abcontent');
					}
					document.getElementById('my_graph_div').style.display = 'block';
					document.getElementById('abcont').style.display = 'block';
				}
			}			
			else if(document.getElementById('my_graph_div').innerHTML == '')
			{
				document.getElementById('my_graph_div').style.display = 'none';
			}
			else
			{
				document.getElementById('my_graph_div').style.display = 'block';
			}
		}
		else if(divid == 'mratings_prod')
		{
			var ln = getCookie('ln');
			if(!ln)
			{

				//openDiv('login_div','');
				fn_loginStart();
			}
			document.getElementById('user_graph_div_prod').style.display = 'none';
			document.getElementById('friend_graph_div_prod').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('my_graph_div_prod').innerHTML == '')
				{
					document.getElementById('my_graph_div_prod').style.display = 'none';
//					document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#my_graph_div .jrot').length == 0)
					{
//						$("#abinner").addClass('abcontent');
					}
					else
					{
//						$("#abinner").removeClass('abcontent');
					}
					document.getElementById('my_graph_div_prod').style.display = 'block';
//					document.getElementById('abcont').style.display = 'block';
				}
			}			
			else if(document.getElementById('my_graph_div_prod').innerHTML == '')
			{
				document.getElementById('my_graph_div_prod').style.display = 'none';
			}
			else
			{
				document.getElementById('my_graph_div_prod').style.display = 'block';
			}
		}
		else if(divid == 'ratings_prod')
		{
			document.getElementById('friend_graph_div_prod').style.display = 'none';
			document.getElementById('my_graph_div_prod').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('user_graph_div_prod').innerHTML == '')
				{
					document.getElementById('user_graph_div_prod').style.display = 'none';
//					document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#user_graph_div_prod .jrot').length == 0)
					{
//						$("#abinner").addClass('abcontent');
					}
					else
					{
//						$("#abinner").removeClass('abcontent');
					}
					document.getElementById('user_graph_div_prod').style.display = 'block';
//					document.getElementById('abcont').style.display = 'block';
				}
			}
			else if(document.getElementById('user_graph_div_prod').innerHTML == '')
			{
				document.getElementById('user_graph_div_prod').style.display = 'none';
			}
			else
			{
				document.getElementById('user_graph_div_prod').style.display = 'block';
			}
		}
		else
		{
			document.getElementById('friend_graph_div').style.display = 'none';
			document.getElementById('my_graph_div').style.display = 'none';

			if(abgraph == 1)
			{
				if(document.getElementById('user_graph_div').innerHTML == '')
				{
					document.getElementById('user_graph_div').style.display = 'none';
					document.getElementById('abcont').style.display = 'none';
				}
				else
				{
					if($('#user_graph_div .jrot').length == 0)
					{
						$("#abinner").addClass('abcontent');
					}
					else
					{
						$("#abinner").removeClass('abcontent');
					}
					document.getElementById('user_graph_div').style.display = 'block';
					document.getElementById('abcont').style.display = 'block';
				}
			}
			else if(document.getElementById('user_graph_div').innerHTML == '')
			{
				document.getElementById('user_graph_div').style.display = 'none';
			}
			else
			{
				document.getElementById('user_graph_div').style.display = 'block';
			}
		}

		if(divid == tabs[i])
		{
			var cls = (tabs[i] == 'mratings' || tabs[i] == 'mratings_prod') ? ' jsel nm' : 'jsel';
			
			document.getElementById('tab'+divid).className = cls;

			if(document.getElementById('all'+divid))
				document.getElementById('all'+divid).style.display = 'block';
		}
		else
		{
			var cls = (tabs[i] == 'mratings' || tabs[i] == 'mratings_prod') ? 'nm' : '';

			if(document.getElementById('tab'+tabs[i]))
				document.getElementById('tab'+tabs[i]).className = cls;

			if(document.getElementById('all'+tabs[i]))
				document.getElementById('all'+tabs[i]).style.display = 'none';
			
		}
	}
}



function graphHtml(d,vert)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	
	html += userGraphHtml(d,vert);
	html += friendGraphHtml(d,vert);
	html += myGraphHtml(d,vert);
	return html;
}

function reviewHtml(d,vert,prid)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	prid = (typeof prid == 'undefined' ? 0 : prid);
	ad = (vert)?'_prod':'';
	
	if(tab=='highestrate')
	{
		html += reviewTabhrating(d);
	}
	else
	{
		html += reviewTabHtml(d,vert);
	}
	
	if(d.totRatings.total > 0 || (d.totRatings.modtotal && d.totRatings.modtotal > 0))
	{
		/* Display Graph under tab for non paid clients */
		if(onloadFn != "read_mreview" && vert != "shopfront") {
			var paidnorat = (d.totRatings.modtotal && d.totRatings.total == 0 && d.paid > 0) ? " cn" : "";
			html += '<p class="shwrev '+paidnorat+'"><b>Showing all Reviews &amp; Ratings <a href="javascript:void(0);" onclick="disprevs(\'toprevc\',\'toprvw\')">(Undo this)</a>'; 
			if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
			html += '<span class="seprt2">|</span> <a href="'+baseurl+'?tab=writereview">Rate &amp; Review</a> ';
			html += '</b></p>';
			if(abgraph == 0)
			{
					html += graphHtml(d,vert);
			}
		}
		if(tab!='highestrate')
		{
			if(d.hratings)
			{
				hotels_content(d);
				hiq_url = (d.hiq_url) ? d.hiq_url : '';
			}
			html += allRatingsHtml(d,vert);
		}
		if(d.totRatings.total > 0)
		{
			html += friendRatingsHtml(d,vert);
			html += myRatingsHtml(d,vert);
		}
	}
	else
	{
		var sty = ''; 
		/*if(vert == 'shopfront')
			sty = 'margin-left:255px';*/
			
			//html += '<section class="btxt">Be first to rate.</section><section id="bftr'+ad+'" style='+sty+' class="jpop"><section class="jpbg">';
			//html += '<span>actly there are no reviews posted for this listing.</span>';
			if(onloadFn == "read_mreview")
			{
				if($('#rthis').attr('href')!='') {
					html += '<section class="btxt">Be first to rate.</section><section id="bftr'+ad+'" style='+sty+' class="jpop"><section class="jpbg">';
					html += '<a class="jbtn" onclick="'+_ct('bftr_m','dtpg')+'" href="'+$('#rthis').attr('href')+'">Rate This</a>';
				}
				else {
					html += '<section class="btxt">Be first to rate.</section><section id="bftr'+ad+'" style='+sty+' class="jpop"><section class="jpbg">';
					html += '<a class="jbtn" onclick="'+_ct('bftr_m','dtpg')+'" href="'+window.location+'/writereview_movie">Rate This</a>';
				}
			}
			else if(vert == "shopfront")
			{
				html += '<section class="btxt">Be first to rate.</section><section id="bftr'+ad+'" style='+sty+' class="jpop"><section class="jpbg">';
				var rate_href = (baseurl.indexOf('http')!=-1) ? baseurl : WEBROOT+baseurl;
				if( rate_href.indexOf('pid-') != -1 ) 
				{
						var n = rate_href.indexOf('/pid-');
						rate_href = rate_href.substring(0, n != -1 ? n : rate_href.length)+'/pid-'+prid+'/writereview_product';
				}
				else
				{
						var n = rate_href.indexOf('/?pid=');
						rate_href = rate_href.substring(0, n != -1 ? n : rate_href.length)+'/pid-'+prid+'/writereview_product';
				}	
				html += '<a class="jbtn" onclick="'+_ct('bftr','dtpg')+'" href="'+rate_href+'">Rate This</a>';
			}	
			else
			{
				if ($('#closedown_flag0').length && $('#closedown_flag0').val()>0)
				{
					html += '<section class="btxt">There are no reviews / ratings posted for this listing.</section><section><section>';
				}
				else
				{
					html += '<section class="btxt">Be first to rate.</section><section id="bftr'+ad+'" style='+sty+' class="jpop"><section class="jpbg">';
					html += '<a class="jbtn" onclick="'+_ct('bftr','dtpg')+'" href="'+baseurl+'?tab=writereview">Rate This</a>';
					$("#rvw").addClass('cvrwdth');
				}
			}
		html += '</section></section>';
	}
	return html;
}

function reviewTabHtml(d,vert)
{
	var html = '';
	var mvdet_len = 0;
	var tabwidth = '700px';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	ad = (vert)?'_prod':'';
	
	if(d.movie_details)
	{
		//mvdet_len = Object.keys(d.movie_details).length;
		mvdet_len = Object.size(d.movie_details)
	}

	if(d.totRatings.total > 0)
	{
		if(d.totRatings.modtotal)
			var tr = (d.totRatings.modtotal > 0)	? '('+d.totRatings.modtotal+')'		: '(0)';
		else
			var tr = (d.totRatings.total > 0)	? '('+d.totRatings.total+')'		: '(0)';
		
		var fr = (d.totfriendreviews.total > 0) ? '('+d.totfriendreviews.total+')'	: '';
		var mr = (d.totmyratings.total > 0)		? '('+d.totmyratings.total+')'		: '';
		
		html += '<aside>';
			html += '<a onclick="change_tab(\'ratings'+ad+'\');" class="'+d.selectratings+'" id="tabratings'+ad+'">All Ratings '+tr+'</a>';
			html += '<a onclick="change_tab(\'fratings'+ad+'\');setRedirect(1);" class="'+d.selectfratings+'" id="tabfratings'+ad+'">Friends Ratings '+fr+'</a>';
			html += '<a onclick="change_tab(\'mratings'+ad+'\');setRedirect(1);" class="'+d.selectmratings+' nm" id="tabmratings'+ad+'">My Ratings '+mr+'</a>';
		html += '</aside>';
	}
	else if(d.totRatings.modtotal && d.totRatings.modtotal > 0)
	{
		html += '<aside>';
			html += '<a style="width: 100%; margin:0;" onclick="change_tab(\'ratings'+ad+'\');" class="'+d.selectratings+'" id="tabratings'+ad+'">All Ratings '+'('+d.totRatings.modtotal+')'+'</a>';
		html += '</aside>';
	}
	else
	{		
		if(onloadFn == "read_mreview" || vert=="shopfront")
		{
			tabwidth = '100%';
		}
		
		html = '<aside><a id="tabratings" class="'+d.selectratings+'" style="width:'+tabwidth+';">All Ratings</a></aside>';
	}
	return html;
}

function reviewTabhrating(d)
{
	var html = '';

	if(d.totRatings.modtotal > 0)
	{

		var tr = (d.totRatings.modtotal > 0)		? '('+d.totRatings.modtotal+')'		: '(0)';
		var fr = (d.totfriendreviews.total > 0) ? '('+d.totfriendreviews.total+')'	: '';
		var mr = (d.totmyratings.total > 0)		? '('+d.totmyratings.total+')'		: '';

		html += '<section class="demo2"><span class="seqr"><span class="nmb">2</span></span><aside>';
			html += '<a onclick="change_tab(\'ratings\');" class="'+d.selectratings+'" id="tabratings">All Ratings '+tr+'</a>';
			html += '<span class="demo3"><span class="seq"><span class="nmb">3</span></span><a style="cursor: text;" class="'+d.selectfratings+'" id="tabfratings">Friends Ratings '+fr+'</a></span>';
			html += '<a style="cursor: text;" class="'+d.selectmratings+' nm" id="tabmratings">My Ratings '+mr+'</a>';
		html += '</aside>';
	}
	else
	{
		html = '<a id="tabratings" class="'+d.selectratings+'">All Ratings</a>';
	}
	return html;
}

function userGraphHtml(d,vert)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	ad = (vert)?'_prod':'';
	
	if(tab == 'highestrate')
		var rrdtl = '';
	else if(onloadFn == "read_mreview"  || vert == 'shopfront')
		var rrdtl = 'mjug';
	html += '<section id="user_graph_div'+ad+'"  class="jug'+rrdtl+'" style="'+d.graph+'">';
        if(mvseotag == 1)
        {
            var cmpynm = $("#cn").val().split("(");
            alt_text = title_text = trim(cmpynm[0]) + ' Reviews and Ratings';
        }
        else
        {
            alt_text = title_text = 'JD Ratings for ' + $("#cn").val() + " in " + $("#whr").val() + ", " + $("#mpctr").val();
        }

	if(d.overallrating)
	{
		var paidnorat = (d.totRatings.modtotal && d.totRatings.total == 0 && d.paid > 0) ? " cn" : "";
		html += '<section class="jgb'+paidnorat+'">';
			html += '<span class="jgt">Overall Ratings (';
			html += (typeof d.totRatings.modtotal != 'undefined') ? d.totRatings.modtotal : d.totRatings.total;
			html += ')</span><span class="stars_m">';

				if(d.showstars)
				{
					var i;
					var len = d.star.length;
					for(i=0; i<len; i++)
					{
						html += '<span class="ms'+d.star[i]+'"></span>';
					}
				}
			html += '</span>';
			if (onloadFn == 'read_mreview'){
				ratingImgSrc = d.overallrating.replace('465x110','297x110');
			}
			else {
				ratingImgSrc = ((abgraph == 1 && comptbanner == 1) ? d.overallrating.replace('375x120','240x105') : d.overallrating );
			}
			html += '<dt class="rating_chart'+ad+'"><img alt="'+alt_text+'" title="'+title_text+'" src="'+ratingImgSrc+'" /></dt>';
			
		html += '</section>';
	}
	if(d.overtimerating)
	{

		html += '<section class="jrot">';
			/*html += '<span class="jgt">Ratings Over Time('+d.overtimetotal.total+')</span>';
			html += '<dt class="stars_m">';
			
				var i;
				var len = d.overtimestar.length;
				for(i=0; i<len; i++)
				{
					html += '<span class="ms'+d.overtimestar[i]+'"></span>';
				}
			html += '</dt>';*/
			html += '<span class="jgt">Ratings Over Time</span>';
			if (onloadFn == 'read_mreview'){
				ratingImgSrc = d.overtimerating.replace('465x110','297x110');
			}
			else {
				ratingImgSrc = ((abgraph == 1 && comptbanner == 1) ? d.overtimerating.replace('378x120','240x105') : d.overtimerating );
			}
			html += '<dt class="rating_chart'+ad+'"><img alt="'+alt_text+'" title="'+title_text+'" src="'+ratingImgSrc+'" /></dt>';
		html += '</section>';
	}
	html += '</section>';
	if(tab == 'highestrate')
	{
		html += '</section>';
	}

	return html;
}

function friendGraphHtml(d,vert)
{
	var html = '';
	
	vert = (typeof vert == 'undefined' ? 0 : vert);
	var ad = (vert)?'_prod':'';
	
	var gclass = (onloadFn == "read_mreview"  || vert == 'shopfront') ? 'mjug' : 'jug';
	
    if(mvseotag == 1)
	{
            var cmpynm = $("#cn").val().split("(");
            alt_text = title_text = trim(cmpynm[0]) + ' Reviews and Ratings';
        }
        else
        {
            alt_text = title_text = 'JD Ratings for ' + $("#cn").val() + " in " + $("#whr").val() + ", " + $("#mpctr").val();
        }
	
	html += '<section id="friend_graph_div'+ad+'" class="'+gclass+'" style="'+d.fgraph+'">';

	if(d.foverallrating)
	{
		html += '<section class="jgb">';
			html += '<span class="jgt">Friends Overall Ratings ('+d.totfriendreviews.total+')</span>';
			html += '<dt class="stars_m">';

				var i;
				var len = d.fstar.length;
				for(i=0; i<len; i++)
				{
					html += '<span class="ms'+d.fstar[i]+'"></span>';
				}
			html += '</dt>';
			if (onloadFn == 'read_mreview'){
				ratingImgSrc = d.foverallrating.replace('465x110','297x110');
			}
			else {
				ratingImgSrc = ((abgraph == 1 && comptbanner == 1) ? d.foverallrating.replace('375x120','240x105') : d.foverallrating );
			}
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+ratingImgSrc+'" /></dt>';
		html += '</section>';
	}
	if(d.fovertimerating)
	{
		html += '<section class="jrot">';
			html += '<span class="jgt">Friends Ratings Over Time ('+d.fovertimetotal.total+')</span>';
			html += '<dt class="stars_m">';
			
				var i;
				var len = d.fovertimestar.length;
				for(i=0; i<len; i++)
				{
					html += '<span class="ms'+d.fovertimestar[i]+'"></span>';
				}
			html += '</dt>';
			//html += '<span class="jgt">Friends Ratings Over Time</span>';
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+((abgraph == 1 && comptbanner == 1) ? d.fovertimerating.replace('378x120','240x105') : d.fovertimerating )+'" /></dt>';
		html += '</section>';
	}
	html += '</section>';

	return html;
}

function myGraphHtml(d,vert)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	var ad = (vert)?'_prod':'';
	
	var gclass = (onloadFn == "read_mreview"  || vert == 'shopfront') ? 'mjug' : 'jug';
	
        if(mvseotag == 1)
        {
            var cmpynm = $("#cn").val().split("(");
            alt_text = title_text = trim(cmpynm[0]) + ' Reviews and Ratings';
        }
        else
        {
            alt_text = title_text = 'JD Ratings for ' + $("#cn").val() + " in " + $("#whr").val() + ", " + $("#mpctr").val();
        }
	
	html += '<section id="my_graph_div'+ad+'" class="'+gclass+'" style="'+d.mgraph+'">';

	if(d.moverallrating)
	{
		html += '<section class="jgb">';
			html += '<span class="jgt">My Overall Ratings ('+d.totmyratings.total+')</span>';
			html += '<dt class="stars_m">';

				var i;
				var len = d.mstar.length;
				for(i=0; i<len; i++)
				{
					html += '<span class="ms'+d.mstar[i]+'"></span>';
				}
			html += '</dt>';
			if (onloadFn == 'read_mreview'){
				ratingImgSrc = d.moverallrating.replace('465x110','297x110');
			}
			else {
				ratingImgSrc = ((abgraph == 1 && comptbanner == 1) ? d.moverallrating.replace('375x120','240x105') : d.moverallrating );
			}
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+ratingImgSrc+'" /></dt>';
		html += '</section>';
	}
	if(d.movertimerating)
	{
		html += '<section class="jrot">';
			/*html += '<span class="jgt">My Ratings Over Time ('+d.movertimetotal.total+')</span>';
			html += '<dt class="stars_m">';
			
				var i;
				var len = d.movertimestar.length;
				for(i=0; i<len; i++)
				{
					html += '<span class="ms'+d.movertimestar[i]+'"></span>';
				}
			html += '</dt>';*/
			html += '<span class="jgt">My Ratings Over Time</span>';
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+((abgraph == 1 && comptbanner == 1) ? d.movertimerating.replace('378x120','240x105') : d.movertimerating )+'" /></dt>';
		html += '</section>';
	}
	html += '</section>';

	return html;
}

function hotels_content(d)
{
	var html = '';
	html += '<div class="newrtnblock">';
	html += '<div class="newrtnblock_left"> <div class="nrtb_inner"><p class="newrtn_img">Rating</p>';
	html +=	'<span class="rating"><span title="'+d.totRatings.stars+'" class="value-title" style="border-radius: 5px;"></span><span class="star_m" id="dtlstar">';
	var i;
	var len = d.star.length;
	for(i=0; i<len; i++)
	{
		html += '<span class="s'+d.star[i]+'"></span>';
	}
	html += '</span></span>';
	html +=	'<p class="lstbig_text">'+d.totRatings.stars+' of 5 based on <b>'+d.totRatings.modtotal+' ratings</b></p>';
	html +=	'</div></div>';
	html += '<div class="newrtnblock_right"> <div class="nrtb_inner"><p class="newrtn_img">HolidayIQ.com  Rating</p>';
	html +=	'<span class="rating"><span title="4.4" class="value-title" style="border-radius: 5px;"></span><span class="star_m" id="dtlstar">';
	len = d.hstar.length;
	for(i=0; i<len; i++)
	{
		html += '<span class="s'+d.hstar[i]+'"></span>';
	}
	html += '</span></span>';
	html +=	'<p class="lstbig_text">'+d.hstars+' of 7 based on <b>'+d.hratings+' ratings</b></p>';
	html +=	'</div></div>';
	html +=	'</div>';
	
	$('#tglsct').prepend(html);
}

function allRatingsHtml(d,vert)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	ad = (vert)?'_prod':'';
	
	html += '<section id="allratings'+ad+'" class="jurat" style="'+d.showratings+'">';
	/*html += '<section class="revdt">';	
	html += '<span class="revimg"><img src="../../tools/img/useimg.jpg" /><span class="fdtxt">Super Foodie</span></span>';
	html += '<div class="revrgt">';
	html += '<div class="revrt">';
	html += '<span class="revnmw">';
	html += '<a class="revnm" href="javascript:;">Natasha Diwan</a> ';
	html += '<a class="gbg" href="javascript:;">FOLLOW</a>';
	html += '<span class="revcnt">200 Reviews | 500 Followers</span>';
	html += '</span>';
	html += '<span class="revstar">';
	html += '<span class="starwrp"><span class="rs10"></span><span class="rs10"></span><span class="rs10"></span><span class="rs0"></span><span class="rs0"></span></span>';
	html += '<span class="startxt">Very Good</span>';
	html += '</span>';
	html += '<span class="dtyrw"><span>cynt*****@gmail.com&nbsp;|&nbsp;98*****709</span><span class="dtyr">4 Days Ago</span></span>';
	html += '</div>';
	html += '</div>';
	html += '<p>One of the best as per me. A huge place with prime location, with the classic sea view. even the staff are excellent. Luxury Rooms & specialty Restaurant . Really love it... <a href="javascript:;">More</a></p>';
	html += '</section>';*/
	
	var i;	
	var rcnt = d.ratings.length;
	var reviewpgurl;
	var reviewName;	
	var isMovie = false;
	if ((typeof(d.movie_name) != 'undefined') && d.movie_name !=''){
		isMovie = true;
		if (movieName == ''){
			movieName  = $('#searchterm').val()	;
			}	
		var catid = parseInt(d.cid);	
		movieNameShrt = movieName.replace(/ *\([^)]*\) */g, "");
	}

	for(i=0; i<rcnt; i++)
	{		
		reviewName = d.ratings[i].reviewer_name.replace(/[^a-zA-Z0-9]/g,'');		
		reviewernameId = 'rwnm'+reviewName;
		reviewText = (d.ratings[i].final_opinion).trim();
		reviewlen = reviewText.length;

		html += '<dt class="jurev">';
			html += '<dl class="jrevi"><img width="50px" height="50px" src="'+d.ratings[i].login_image+'" alt="" id="rwimg'+i+'"/></dl>';
			html += '<span class="jrev">';
				html += '<span class="jurn">';
					html += '<span class="rName"   id="rwname'+i+'" >'+d.ratings[i].reviewer_name+'</span>';
					html += (d.ratings[i].hotel_review == 1) ? '<span class="gryimg"></span>' : '';

						var p;
						var len = d.ratings[i].star.length;
						var rwstars = (eval(d.ratings[i].star)).toString();
						html += '<dl class="stars_m" id="rwstars'+i+'" star="'+rwstars+'">';												 
						for(p=0; p<len; p++)
						{
							html += '<span class="ms'+d.ratings[i].star[p]+'"></span>';
						}
					html += '</dl></span>';

					html += '<span id="jcme">';
					if(d.ratings[i].reviewer_email && d.ratings[i].reviewer_phone)
					{
						html += '<span>'+d.ratings[i].reviewer_email;
						html += '&nbsp;|&nbsp;';

						html += d.ratings[i].reviewer_phone+'</span>';
					}
					else if(d.ratings[i].reviewer_email)
					{
						html += '<span>'+d.ratings[i].reviewer_email+'</span>';
					}
					else if(d.ratings[i].reviewer_phone)
					{
						html += '<span class="dtemml">'+d.ratings[i].reviewer_phone+'</span>';
					}
					if(d.ratings[i].city)
					{
						html += '<span>'+d.ratings[i].city+'</span>';
					}
					html += '<span class="dago">';					
					html += '<span class="dtyr ratx">'+d.ratings[i].Cur_Date +'</span>';
					html += '</span>';
				html += '</span>';//jcme
				//Image Uploaded by User start				
				html += '<div class="bttmbrd"></div>';
				html += '<span class="grayPointer"></span>';

				var img_len = d.ratings[i].image_cation.length;
				if(img_len > 0)
				{
					html += '<div id="review_thumb_img_div">';
						var c;
						for(c=0; c<img_len; c++)
						{
							html += '<div>';
								html += '<span><img class="review_thumb" id="'+i+c+'" onmouseout="hidelargeimg(this.id);" onmouseover="showlargeimg(this.id);" src="'+d.ratings[i].image_cation[c].thumb_img+'" alt="" /></span>';

								html += '<div style="display:none;" id="pic'+i+c+'" onmouseout="hidelargeimg('+i+c+');" onmouseover="showlargeimg('+i+c+');" class="big_th" name="pic16"><img style="border: 5px solid #B9B9B9;"src="'+d.ratings[i].image_cation[c].big_img+'" /><span class="imgdic"></span></div>';
							html += '</div>';
						}
					html += '</div>';
				}
				//Image Uploaded by User End		
				if(d.ratings[i].title)
				{
					html += '<span class="gr_txt">&ldquo;'+d.ratings[i].title+'&rdquo;</span>';
				}
				if(reviewText)
				{
					if(mvie)
					{
						 if(reviewText.length > 120)
						 {
							 ihtml = reviewText;
						 }
					}
					
					html += '<p id="rwopinion'+i+'">'+reviewText+'</p>';
				}				
			html += '</span>';
		html += '</dt>';
	}
	html += ratingPaginationHtml(d,'rating');
	html += '</section>';
	if(d.hratings)
	{
		$('.holdiq').removeClass('dn');
	}
	return html;
}

function friendRatingsHtml(d,vert)
{	
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	ad = (vert)?'_prod':'';
	
	html += '<div id="allfratings'+ad+'" class="jurat" style="'+d.showfratings+';">';

	if(d.totfriendreviews.total > 0)
	{
		var i;
		var rcnt = d.fratings.length;
		for(i=0; i<rcnt; i++)
		{
			html += '<dt class="jurev">';
				html += '<dl class="jrevi"><img width="50px" height="50px" src="'+d.fratings[i].login_image+'" alt="" /></dl>';
				html += '<span class="jrev">';
					html += '<span class="jurn">';
						html += '<span class="rName">'+d.fratings[i].reviewer_name+'</span>';
						html += '<dl class="stars_m">';

							var p;
							var len = d.fratings[i].star.length;
							var countStar=0;
							for(p=0; p<len; p++)
							{
								html += '<span class="ms'+d.fratings[i].star[p]+'"></span>';
								if(d.fratings[i].star[p]==10)
								{
									countStar++;
								}
							}
							
						html += '</dl></span>';
						html += '<span id="jcme">';
						
						if(d.fratings[i].reviewer_email && d.fratings[i].reviewer_phone)
						{
							html += '<span>'+d.fratings[i].reviewer_email;
							html += '&nbsp;|&nbsp;';

							html += d.fratings[i].reviewer_phone+'</span>';
						}
						else if(d.fratings[i].reviewer_email)
						{
							html += '<span>'+d.fratings[i].reviewer_email+'</span>';
						}
						else if(d.fratings[i].reviewer_phone)
						{
							html += '<span class="dtemml">'+d.fratings[i].reviewer_phone+'</span>';
						}
						
					html += '<span class="dtyr">'+d.fratings[i].Cur_Date +'</span>';
					html += '</span>';

					//Image Uploaded by User start				
					html += '<div class="bttmbrd"></div>';
					html += '<span class="grayPointer"></span>';

					var img_len = 0; //d.ratings[i].image_cation.length;
					if(img_len > 0)
					{
						html += '<div id="review_thumb_img_div">';
							var c;
							for(c=0; c<img_len; c++)
							{
								html += '<div>';
									html += '<span><img class="review_thumb" id="'+i+c+'" onmouseout="hidelargeimg(this.id);" onmouseover="showlargeimg(this.id);" src="'+d.ratings[i].image_cation[c].thumb_img+'" alt="" /></span>';

									html += '<div style="display:none;" id="pic'+i+c+'" onmouseout="hidelargeimg('+i+c+');" onmouseover="showlargeimg('+i+c+');" class="big_th" name="pic16"><img style="border: 5px solid #B9B9B9;"src="'+d.ratings[i].image_cation[c].big_img+'" /><span class="imgdic"></span></div>';
								html += '</div>';
							}
						html += '</div>';
					}
					//Image Uploaded by User End
					var comments     = new Array();
						comments[1]  = "Poor";
						comments[2]  = "Average";
						comments[3]  = "Good";
						comments[4]  = "Very Good";
						comments[5]  = "Excellent";
					var comments_old = new Array("poor","average","good","very good","excellent","below average","above average");
					var finalOpinion = d.fratings[i].final_opinion;
					if(jQuery.inArray(d.fratings[i].final_opinion, comments_old) > -1)
					{	
						finalOpinion = comments[countStar];	
					}
					
					if(d.fratings[i].final_opinion)
					{	
						if(mvie)
						{
							 if(finalOpinion.length > 120)
							 {
								 ihtml = finalOpinion;
							 }
						}
						
						html += '<p>'+finalOpinion+'</p>';
					}
					
			html += '</span>';

			html += '</dt>';

		}
		html += ratingPaginationHtml(d,'friendrating');
	}
	else
	{
		if(!d.message)
		{
			html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
					html += '<p><b>Login</b> to view your friends ratings</p>';
					html += '<a class="jbtn" href="javascript:void(0);" onclick="fn_loginStart();">Login</a>';
			html += '</section></section>';
		}
		else
		{
			if(d.message=='tag')
			{
				html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
					html += '<p><span class="alert"></span> <b>Sorry '+getCookie('inLogName')+'</b> You don\'t have any tagged friends<br/> you must tag friends to view their ratings.</p>';
					html += '<a class="jbtn" href="'+WEBROOT+'Account/Friend-Ratings/Tag-More-Friends">Tag Your Friends</a>';
				html += '</section></section>';
			}
			else if(d.message == 'privacy')
			{
				html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
				html += '<p>Cannot view <b>Friends Ratings</b> due to Privacy Settings.</p>';
				html += '</section></section>';
			}
			else
			{
				html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
					if(onloadFn == "read_mreview")
					{
						html += '<p>None of your friends rated this. <b>Tag more friends</b> to find if they have rated this movie.</p>';
					}
					else if ( vert == 'shopfront' )
					{
						html += '<p>None of your friends rated this. <b>Tag more friends</b> to find if they have rated this product.</p>';
					}	
					else
					{
						html += '<p>None of your friends rated this. <b>Tag more friends</b> to find if they have rated this establishment.</p>';
					}
					html += '<a rel="nofollow" class="jbtn" href="'+WEBROOT+'Account/Friend-Ratings/Tag-More-Friends">Tag Friends</a>';
				html += '</section></section>';
			}
		}
	}

	html += '</div>';

	return html;
}

function myRatingsHtml(d,vert)
{
	var html = '';
	vert = (typeof vert == 'undefined' ? 0 : vert);
	ad = (vert)?'_prod':'';
	
	html += '<section id="allmratings'+ad+'" class="jurat" style="'+d.showmratings+';">';

	if(d.totmyratings.total > 0)
	{
		var i;
		var rcnt = d.mratings.length;
		for(i=0; i<rcnt; i++)
		{
			html += '<dt class="jurev">';
				html += '<dl class="jrevi"><img width="50px" height="50px" src="'+d.mratings[i].login_image+'" alt="" /></dl>';
				html += '<span class="jrev">';
					html += '<span class="jurn">';
						html += '<span class="rName">'+d.mratings[i].reviewer_name+'</span>';
						html += '<dl class="stars_m">';

							var p;
							var len = d.mratings[i].star.length;
							for(p=0; p<len; p++)
							{
								html += '<span class="ms'+d.mratings[i].star[p]+'"></span>';
							}
						html += '</dl></span>';
						
						html += '<span id="jcme">';
						if(d.mratings[i].reviewer_email && d.mratings[i].reviewer_phone)
						{
							html += '<span>'+d.mratings[i].reviewer_email;
							html += '&nbsp;|&nbsp;';
							html += d.mratings[i].reviewer_phone+'</span>';
						}
						else if(d.mratings[i].reviewer_email)
						{
							html += '<span>'+d.mratings[i].reviewer_email+'</span>';
						}
						else if(d.mratings[i].reviewer_phone)
						{
							html += '<span class="dtemml">'+d.mratings[i].reviewer_phone+'</span>';
						}

						html += '<span class="dtyr">'+d.mratings[i].Cur_Date +'</span>';
					html += '</span>';
						
					//Image Uploaded by User start
					html += '<div class="bttmbrd"></div>';
					html += '<span class="grayPointer"></span>';

					var img_len = d.mratings[i].image_cation.length;
					if(img_len > 0)
					{
						html += '<div id="review_thumb_img_div">';
							var c;
							for(c=0; c<img_len; c++)
							{
								html += '<div>';
									html += '<span><img class="review_thumb" id="m'+i+c+'" onmouseout="hidelargeimg(this.id);" onmouseover="showlargeimg(this.id);" src="'+d.mratings[i].image_cation[c].thumb_img+'" alt="" /></span>';

									html += '<div style="display:none;" id="picm'+i+c+'" onmouseout="hidelargeimg(\'m'+i+c+'\');" onmouseover="showlargeimg(\'m'+i+c+'\');" class="big_th" name="pic16"><img style="border: 5px solid #B9B9B9;"src="'+d.mratings[i].image_cation[c].big_img+'" /><span class="imgdic"></span></div>';
								html += '</div>';
							}
						html += '</div>';
					}
					//Image Uploaded by User End
					if(d.mratings[i].final_opinion)
					{
						if(mvie)
						{
							 if(d.mratings[i].final_opinion.length > 120)
							 {
								 ihtml = d.mratings[i].final_opinion;
							 }
						}
						
						html += '<p>'+d.mratings[i].final_opinion+'</p>';
					}
					
				html += '</span>';
			html += '</dt>';
		}
		html += ratingPaginationHtml(d,'myrating');
	}
	else
	{
		if(!d.mymessage)
		{
			html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
					html += '<p><b>Login</b> to view your ratings</p>';
					html += '<a class="jbtn" href="javascript:void(0);" onclick="fn_loginStart();">Login</a>';
			html += '</section></section>';
		}
		else
		{
			html += '<section id="bftr'+ad+'" class="jpop"><section class="jpbg">';
				
				if(onloadFn == "read_mreview")
				{
					html += '<p><b>Hi '+getCookie('inLogName')+'</b>, you have not rated this movie yet.</p>';
					if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
					html += '<a rel="nofollow" onclick="'+_ct('ratethis_m','dtpg')+'" class="jbtn" href="'+window.location+'/writereview_movie">Write Review</a>';
				}
				else if(onloadFn == "Result" && vert == "shopfront")
				{
					html += '<p><b>Hi '+getCookie('inLogName')+'</b>, you have not rated this product yet.</p>';
					if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
					html += '<a rel="nofollow" onclick="'+_ct('ratethis_m','dtpg')+'" class="jbtn" href="'+WEBROOT+baseurl+'/writereview_product">Write Review</a>';
				}
				else if (vert == "shopfront")
				{
					html += '<p><b>Hi '+getCookie('inLogName')+'</b>, you have not rated this product yet.</p>';
					if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
					html += '<a rel="nofollow" onclick="'+_ct('ratethis_m','dtpg')+'" class="jbtn" href="'+baseurl+'/writereview_product?prid='+$('#prid').val()+'">Write Review</a>';
				}	
				else
				{
					html += '<p><b>Hi '+getCookie('inLogName')+'</b>, you have not rated this listing yet.</p>';
					if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
					html += '<a rel="nofollow" onclick="'+_ct('ratethis','dtpg')+'" class="jbtn" href="'+baseurl+'?tab=writereview">Write Review</a>';
				}
			html += '</section></section>';
		}
	}
	html += '</section>';

	return html;
}

function ratingPaginationHtml(d, t)
{
	var html = '';

	var lastpage = '';
	var page = '';
	var lpm1 = '';
	var fn = '';
	var totrev = '';

	if(t == 'myrating')
	{
		totrev = d.totrates;
		lastpage = d.mlastpage;
		page = d.pagert;
		lpm1 = d.mlpm1;
		fn = 'mratings';
	}
	else if(t == 'friendrating')
	{
		totrev = d.totfriendreviews.total;
		lastpage = d.flastpage;
		page = d.pagert;
		lpm1 = d.flpm1;
		fn = 'fratings';
	}
	else
	{
		totrev = d.totrates;
		lastpage = d.lastpage;
		page = d.page;
		lpm1 = d.lpm1;
		fn = 'ratings';
	}
		
	if (typeof (d.company_name) == 'undefined') { 
		d.company_name = '';
	}
	if(page == 1 && d.hratings && fn == 'ratings' && d.hiq_url && d.hiq_url != '')
	{
		html += "<div class='holdiqwrp'><div class='holdiq'><a href='"+d.hiq_url+"' target='_blank' onclick='_ct(\"hiqlink\", \"dtpg\");' rel='nofollow' >More Reviews from HolidayIQ.com &gt;&gt;</a></div>";
	}
	if(lastpage > 1)
	{
		var c;
		html += "<div class='jpag'>";
		prev = page - 1;
		//previous button
		if(page > 1)
		{
			html += '<a href="#rvw" onclick="'+fn+'('+prev+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');"><span>&lsaquo;&lsaquo;</span> Prev</a>';
		}
		else
		{
			html += '<span class="dis"><span>&lsaquo;&lsaquo;</span> Prev</span>';
		}

		//pages	
		if(lastpage < 7 + (d.adjacents * 2))	//not enough pages to bother breaking it up
		{
			for(c=1; c<=lastpage; c++)
			{
				if(c == page)
				{
					html += '<span class="act">'+c+'</span>';
				}
				else
				{
					html += '<a href="#rvw" onclick="'+fn+'('+c+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+c+'</a>';
				}
			}
		}
		else if(lastpage > 5 + (d.adjacents * 2))	//enough pages to hide some
		{
			//close to beginning; only hide later pages
			if(page < 1 + (d.adjacents * 2))
			{
				
				for(c=1; c<4 + (d.adjacents * 2); c++)
				{
					if(c == page)
					{
						html += '<span class="act">'+c+'</span>';
					}
					else
					{
						html += '<a href="#rvw" onclick="'+fn+'('+c+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+c+'</a>';
					}
				}
				html += '...';
				html += '<a href="#rvw" onclick="'+fn+'('+lpm1+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+lpm1+'</a>';
				html += '<a href="#rvw" onclick="'+fn+'('+lastpage+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+lastpage+'</a>';		
			}
			//in middle; hide some front and some back
			else if(lastpage - (d.adjacents * 2) > page && page > (d.adjacents * 2))
			{
				html += '<a href="#rvw" onclick="'+fn+'(1,'+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">1</a>';
				html += '<a href="#rvw" onclick="'+fn+'(2,'+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">2</a>';
				html += '...';
				
				for(c = page - d.adjacents; c <= page + d.adjacents; c++)
				{
					if(c == page)
					{
						html += '<span class="act">'+c+'</span>';
					}
					else
					{
						html += '<a href="#rvw" onclick="'+fn+'('+c+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+c+'</a>';
					}
				}
				html += '...';
				html += '<a href="#rvw" onclick="'+fn+'('+lpm1+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+lpm1+'</a>';
				html += '<a href="#rvw" onclick="'+fn+'('+lastpage+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+lastpage+'</a>';
			}
			//close to end; only hide early pages
			else
			{
				html += '<a href="#rvw" onclick="'+fn+'(1,'+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">1</a>';
				html += '<a href="#rvw" onclick="'+fn+'(2,'+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">2</a>';
				html += '...';
				
				for(c = lastpage - (2 + (d.adjacents * 2)); c <= lastpage; c++)
				{
					if(c == page)
					{
						html += '<span class="act">'+c+'</span>';
					}
					else
					{
						html += '<a href="#rvw" onclick="'+fn+'('+c+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">'+c+'</a>';
					}
				}
			}
		}

		var next = page + 1;
		if(page < c - 1)
		{
			html += '<a href="#rvw" onclick="'+fn+'('+next+','+totrev+',\'\','+d.paid+',\''+d.jsreviewdocids+'\',\''+d.company_name+'\');">Next <span>&rsaquo;&rsaquo;</span></a>';
		}
		else
		{
			html += '<span class="dis">Next <span>&rsaquo;&rsaquo;</span></span>';
		}
		html += '</div>';
		//html += '<div class="clearfix"></div>';
	}
	if(page == 1 && d.hratings && fn == 'ratings')
	{
		html += '</div>';
	}
	return html;
}

function only_rat(ratarr)
{
	html = '';
	html += '<section class="jrev"><span class="rcntrtng"><b>Recent Ratings of</b><i>'+$("#cn").val()+'</i></span><section class="OvrallRatings">';
	for(var i = 0; i < ratarr.length; i++) {
		html += '<span class="rghtrntg"><span>Rated</span><span class="stars_m">';
		var p;
		var len = ratarr[i].star.length;
		for(p=0; p<len; p++)
		{
			html += '<span class="ms'+ratarr[i].star[p]+'"></span>';
		}
		html += '</span><span>By '+ratarr[i].reviewer_name+'</span><span class="time">'+ratarr[i].Cur_Date +'</span></span>';
	}
	html += '</section></section>';
	
	return html;
}

function topreviewhtml(d)
{
	if(d.paid == 0)
	{
		if(d.ratings[0].hotel_review == 1)
		{
			var j;
			for(j=0; j<d.ratings.length; j++)
			{
				if(d.ratings[j].hotel_review == 0)
				{
					d.topratings[0] = d.ratings[j];
					break;
				}
			}
		}
		else
		{
			d.topratings[0] = d.ratings[0];
		}
	}
	html = '';
	html += '<section id="toprevc" class="revtop">';
	html += '<section class="revdt">';	
	html += '<dt class="jurev">';
		html += '<dl class="jrevi"><img width="50px" height="50px" src="'+d.topratings[0].login_image+'" alt="" /></dl>';
		html += '<span class="jrev">';
			html += '<span class="jurn">';
				html += '<span class="rName">'+d.topratings[0].reviewer_name+'</span>';
				html += '<dl class="stars_m">';

					var p;
					var len = d.topratings[0].star.length;
					for(p=0; p<len; p++)
					{
						html += '<span class="ms'+d.topratings[0].star[p]+'"></span>';
					}
				html += '</dl></span>';

				html += '<span id="jcme">';
				if(d.topratings[0].reviewer_email && d.topratings[0].reviewer_phone)
				{
					if(d.topratings[0].reviewer_email.indexOf('justdial.com') < 0)
					{
						html += '<span>'+d.topratings[0].reviewer_email;
						html += '&nbsp;|&nbsp;';
					}
					else
						html += '<span>';

					html += d.topratings[0].reviewer_phone+'</span>';
				}
				else if(d.topratings[0].reviewer_email && d.topratings[0].reviewer_email.indexOf('justdial.com') < 0)
				{
					html += '<span>'+d.topratings[0].reviewer_email+'</span>';
				}
				else if(d.topratings[0].reviewer_phone)
				{
					html += '<span class="dtemml">'+d.topratings[0].reviewer_phone+'</span>';
				}
				if(d.paid == 0)
				{
					html += '<span class="dtyr">'+d.topratings[0].Cur_Date +'</span>';
				}
				html += '</span>';
	
			//Image Uploaded by User start				
			html += '<div class="bttmbrd"></div>';
			html += '<span class="grayPointer"></span>';		
			if(d.topratings[0].final_opinion)
			{
				if(mvie)
				{
					 if(d.topratings[0].final_opinion.length > 120)
					 {
						 ihtml = d.topratings[0].final_opinion;
					 }
				}
				
				html += '<p>';
				html += (d.topratings[0].final_opinion.length > 284 ) ? d.topratings[0].final_opinion.substr(0,276)+'...<a id="vars" href="javascript:void(0);" onclick="disprevs(\'toprvw\',\'toprevc\');change_tab(\'ratings\');">more</a>' : d.topratings[0].final_opinion ; 
				html += '</p>';
			}
		html += '<p><a id="vars" href="javascript:void(0);" onclick="disprevs(\'toprvw\',\'toprevc\');change_tab(\'ratings\');_ct(\'viewara\',lnk_loc,lnk_vid);">View All Ratings</a> ';
		if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
		html += '<span class="seprt">|</span> <a href="'+baseurl+'?tab=writereview" onclick="_ct(\'raterev\',lnk_loc,lnk_vid)">Rate &amp; Review</a>';
		html += '</p></span>';
	html += '</dt>';
	html += '</section>';	
	


	html += '<section class="revgraph"><section id="user_graph_div_top"  class="jug" >';
	alt_text = title_text = 'JD Ratings for ' + $("#cn").val() + " in " + $("#whr").val() + ", " + $("#mpctr").val();

	if(d.overallrating)
	{
		html += '<section class="jgb">';
				html += '<span class="jgt">Overall Ratings (';
			html += (typeof d.totRatings.modtotal != 'undefined') ? d.totRatings.modtotal : d.totRatings.total;
			html += ')</span><dt class="stars_m">';

				if(d.showstars)
				{
					var i;
					var len = d.star.length;
					for(i=0; i<len; i++)
					{
						html += '<span class="ms'+d.star[i]+'"></span>';
					}
				}
			html += '</dt>';
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+d.overallrating.replace('320x120','240x105')+'" /></dt>';
			
		html += '</section>';
	}
	if(d.overtimerating_min)
	{
		html += '<section class="jrot">';
			html += '<span class="jgt">Ratings Over Time</span>';
			html += '<dt class="rating_chart"><img alt="'+alt_text+'" title="'+title_text+'" src="'+d.overtimerating_min.replace('341x120','240x105')+'" /></dt>';
		html += '</section>';
	}
	html += '</section>';

	html += '</section>';

	html += '</section>';

	
	return html;
}

function disprevs(dispr,currr)
{
	if(dispr == 'toprvw'){
		$('#vars').addClass('dn');
		$('.seprt').addClass('dn');
	}else if(currr == 'toprvw'){
		$('#vars').removeClass('dn');
		$('.seprt').removeClass('dn');
	}	
	$('#'+currr).addClass('dn');
	$('#'+dispr).removeClass('dn');
}

function logdata()
{
	var cn		=	$("#cn").val();
	var where	=	$("#whr").val();
	var ct		=	$("#mpct").val();
	var docid	=	$("#mpdocid").val();
	var usr		=	$("#user").val();
	var what	=	$("#searchterm").val();
	var catid	=	$("#catid").val();
	var utcook 	=	getCookie('__utma');
	var dmodule;
	var dmcookie = getCookie('detailmodule');
	var alphaExp = /^[0-9]+$/;
	if(dmcookie == docid && !tab.match(alphaExp))
		{
		dmodule = tab;
						}
						
	$.get(WEBROOT+"functions/ajxlogprofile.php", {"cn":cn,"where":where,"ct":ct,"docid":docid,"usr":usr,"what":what,"catid":catid,"uniqid":utcook,"dmodule":dmodule}, function(data) {});

	var domain = cookieondomain;
	var expire = new Date();
	expire.setTime(expire.getTime() + 3600000*24);
	document.cookie = 'detailmodule'+"="+escape(docid)+ ";expires="+expire.toGMTString()+ "; path=/"+"; domain="+domain;;
						}
function deleteCookie(c_name, value, expiredays)
						{
	var domain = cookieondomain;//get_domain();
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - expiredays);
    document.cookie = c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+ "; path=/"+"; domain="+domain;
};

function loadreviewsdata()
						{
	var ct		=	$("#mpctr").val();
	var docid	=	$("#mpdocid").val();
	var paid	=	$("#paid_status").val();
	var mbcheck = 	(getCookie('ln')) ? getCookie('ln') : getCookie('storeMobile');
	
	if($('#rtis').val() == 1)
	{
		$.get(WEBROOT+"functions/reviews_initial.php", {ct: ct,cid: docid,paid: paid,tab: tab, city: ct, abgraph: abgraph}, function(data) {
		
		var d = eval('(' + data + ')');
		
		$('#dtlstar').html(topBarRatingHtml(d));

		/* Display Amitabh's Graph above business card for paid clients having paid for it */
		if(abgraph == 1 && d.totRatings.total > 0)
		{
			if(d.abinner)
			{
				$("#abinner").addClass(d.abinner);
			}
			var abgraph_html = graphHtml(d);
			$('#abcont').css('display', d.abgraphd);
		}
		if(tab != 'highestrate')
		{
			var rate_class = ($('#rtis').val() == 1) ? '' : 'disable';
			var rrhtml = '';
		rrhtml += (d.totRatings.total > 0 && abgraph != 1) ? topreviewhtml(d) : '';
			
			if(($('#jdrr_tag').val()) == 1)
			{
				rrhtml += '<div id="abcont"><div id="abinner"><div class="ab_pointer" title="Amitabh Bachchan"></div><div id="abgraph">'+abgraph_html+'</div><a id="vars" href="javascript:void(0);" onclick="disprevs(\'toprvw\',\'toprevc\');change_tab(\'ratings\');">View All Ratings</a> <span class="seprt">|</span> <a href="'+baseurl+'?tab=writereview">Rate &amp; Review</a></div></div>';
			}
			
			
			rrhtml += '<section id="toprvw" class="dn"><section id="rvw" class="jcrv '+rate_class+'"></section>';
			//if(!document.getElementById('Banners'))
			//{
				rrhtml += '<section class="jdrc">';
				if(d.onlyrat.length > 0)
				{
					if ($('#closedown_flag0').length && $('#closedown_flag0').val()==0)
					{
					rrhtml += '<a href="'+baseurl+'?tab=writereview" class="jrvw" id="usrRev">Write a Review</a> <a href="javascript:;" onclick="uploadLogin(\''+mbcheck+'\',\''+catalogurl+'\',\''+$("#chksum").val()+'\')" class="upld">Upload Photos</a>';
					}
					rrhtml += only_rat(d.onlyrat);
				}
				else if ($('#closedown_flag0').length && $('#closedown_flag0').val() == 0)
				{
					rrhtml += '<a href="'+baseurl+'?tab=writereview" class="jrvw jrvwnt" id="usrRev"><span class="wrrvw"></span>Write a Review</a> <a href="javascript:;" onclick="uploadLogin(\''+mbcheck+'\',\''+catalogurl+'\',\''+$("#chksum").val()+'\')" class="upld">Upload Photos</a>';
				}
				rrhtml += '</section>';
			//}
			if(rrhtml != '' && document.getElementById("tglsct"))
				ed("tglsct").innerHTML= rrhtml;
		}
		$('#rvw').html(reviewHtml(d));
		if(tab == 'moreinfo')
		{
			goToByScrolldetail('mrtab');
		}
		else if(window.location.href.indexOf("#rvw") != -1 && $('#rtis').val() == 1)
		{
			disprevs('toprvw','toprevc');
			goToByScrolldetail('tglsct');
		}  
		if(d.totfriendreviews.total < 1 || d.totmyratings.total < 1)
			round_popup();

		$('.jcrv aside a').corner("top 5px");
		if(tabpage == 'map')
		{
			if(ed('mpfl').value > 0)
			{
				goToByScrolldetail('mrtab');
			}
			else
			{
				goToByScrolldetail('breadCrumb');
			}
		}
		});
	}
}

function topBarRatingHtml(d)
{
	var c = $("#what").val().toLowerCase();
	var classstar = (c.length <70) ? 'cstars ' : 'stars';

	var html = '';
	var ratetxt = '';
	var urlpart = ''; 

	urlpart = (!d.totRatings || d.totRatings.stars == 0) ? '?tab=writereview' : '#rvw';

	if(window.location.href.indexOf("#rvw") > -1) {
		urlpart = '';
	}



	if(d.showstars == 1 && d.totRatings)
	{
		$('.value-title').attr('title', d.totRatings.stars);
		var i;
		var len = d.star.length;
		if(d.totRatings.stars > 0){
			for(i=0; i<len; i++)
			{
				html += '<span class="s'+d.star[i]+'"></span>';
			}
		}
		else
		{
			for(i=0; i<5; i++)
			{
				html += '<span class="s0"></span>';
			}
		}
		html +='</span>'
	}
	if(c.indexOf('std code') < 0 && c.indexOf('stdcode') < 0 && c.indexOf('isd code') < 0 && c.indexOf('isdcode') < 0 && ratethisvar)
	{
		show_rate_this = 1;
		if(d.totRatings && d.totRatings.total >= 0 && d.showstars == 1)
		{
			if(d.totRatings.total == 0 || d.totRatings.total == null)
			{
				if(d.totRatings.paid > 0)
				{
					$('.count').html(d.totRatings.modtotal);
					$('.rtext').html('Ratings');
				}
				else
				{
					$('.count').html();
					$('.rtext').html('');
				}
			}
			else if(d.totRatings.total == 1)
			{
				$('.count').html(d.totRatings.modtotal);
				if(d.totRatings.total == 1 && d.totRatings.paid < 1)
					$('.rtext').html('Rating');
				else
					$('.rtext').html('Ratings');
			}
			else
			{
				$('.count').html(d.totRatings.modtotal);
				if(d.totRatings.total == 1)
					$('.rtext').html('Rating');
				else
					$('.rtext').html('Ratings');
			}
		}

	}
	return html;
}

function getMenu(docid,index,cnt)
{
	if(!index) index=1;

	$('#mp').attr('onclick','').unbind('click');	
	$('#mnxt').attr('onclick','').unbind('click');
	if(index == 1)
{
		document.getElementById('mp').style.display = 'none';
	}
	else
	{
		document.getElementById('mp').style.display = 'inline-block';
		$('#mp').click(function() { getMenu(docid,(index-1),cnt);});
	}

	if(index == cnt)
	{
		document.getElementById('mnxt').style.display = 'none';
	}
	else
	{
		document.getElementById('mnxt').style.display = 'inline-block';
		$('#mnxt').click(function() { getMenu(docid,(index+1),cnt);});
	}
	
	$.get(WEBROOT+"functions/getmenu.php", {cid: docid,id: index}, function(data) {
		
		if(type == 'prod_img')
		{
			obj = eval('('+data+')');
			resize_img(obj.src,'pi'+index,'fillproditem');
			$("#fillmenuitem").html(obj.image);
		}	
		else	
		$("#fillmenuitem").html(data);
		
		for(var i=1;i<=cnt;i++)
		{
			if(i==index)
				document.getElementById('selectedid'+index).className = 'selected';
			else
				document.getElementById('selectedid'+i).className = 'unselected';
		}
	});
}

function menuover(id,cls)
{
//	$('#'+id).className = cls;

	document.getElementById(id).className = cls;
}

// Bestdeal Popup
function open_bestdeal() 
{	
	var showflg	=	true;
	var curr_company = getCookie("curr_comp");
	
	if($('#gtnf').is(':visible') || $('#jul').is(':visible') || $('#jfp').is(':visible') || $('#smssuccess1').is(':visible') || $('#hui').is(':visible') || $('#alsp').is(':visible') || $('#jvrp').is(':visible') || $('#map').is(':visible') || $('#ownl').is(':visible') || $('#ownp').is(':visible') || $('#jra').is(':visible') || $('#jmen').is(':visible') || $('#sbep').is(':visible') || $('#enlarge_map_div').is(':visible') || $('#best_deal_detail_div').is(':visible') || $('#best_deal_div').is(':visible') || $('#swf').is(':visible') || $('#swfthank').is(':visible') || $('#jcuo').is(':visible') || shwbd == 0 || $('#downloadWinPopup').hasClass('show'))
	{
		showflg	= false;
	}	
		
	if(showflg == true)
	{	
		if(filterCat > 1)
			var bdlq = "low_quote_fltr";
		else
			var bdlq = "lowquote_detail";
		
		openDiv('best_deal_div','bestdeal',bdlq);
		trackEvent('category','Autopopup','Best_Category');
	}
	
	bestdealform = false;
}

function redirect_mktg(baseencode_str,page,city) 
{
	window.open(WEBROOT+"webmain/redirect.php?str="+baseencode_str+'&page='+page+'&city='+city,'_blank');
}

function open_rp() 
{	
	var showflg	=	true;
	
	if($('#gtnf').is(':visible') || $('#jul').is(':visible') || $('#jfp').is(':visible') || $('#smssuccess1').is(':visible') || $('#hui').is(':visible') || $('#alsp').is(':visible') || $('#jvrp').is(':visible') || $('#map').is(':visible') || $('#ownl').is(':visible') || $('#ownp').is(':visible') || $('#jra').is(':visible') || $('#jmen').is(':visible') || $('#sbep').is(':visible') || $('#enlarge_map_div').is(':visible') || $('#best_deal_detail_div').is(':visible') || $('#best_deal_div').is(':visible') || $('#swf').is(':visible') || $('#shrSms').is(':visible') || $('#shrEmail').is(':visible') || $('#swfthank').is(':visible') || $('#edsb').is(':visible') || $('#hui').is(':visible') || $('#elv').is(':visible') || $('#upload').is(':visible') || $('#ownl').is(':visible') || $('#sauto').is(':visible') || $('#bat').is(':visible') || $('#batvc').is(':visible') || $('#bats').is(':visible') || $('#batte').is(':visible') || $('#batmlr').is(':visible') || $('#baterr').is(':visible') || $('#batapierr').is(':visible') || $('#batbcdate').is(':visible'))
	{
		showflg	= false;
	}		
	if(showflg == true)
	{	
		openDiv('rp');
		setCookiebest('showrtp',1);
		_ct('rtp','dtpg');	
		var docidarray = getCookie('docidarray');
		var ftdarr = eval('(' + docidarray + ')');
		var ftdjsstring = document.getElementById('ftdjsstring').value;	
		var ftdjsarr    = ftdjsstring.split('#');
		for(i=0; i<ftdjsarr.length; i++)
		{
			delete(ftdarr[ftdjsarr[i]]);
		}	
		var ftdarr1 = array2json(ftdarr);
		setCookiebest('docidarray',ftdarr1);
	}
	
}

/* Food Order Rel -- start */

function exampleList(id, event_name)
{
	var val = document.getElementById(id).value;
	if(event_name == 'focus')
	{
		document.getElementById(id).style.color = "#424242";
		if(document.getElementById(id).value == "e.g. Vipul Shah")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. 7812207587")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. john@aol.com")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. Sandeep Residency")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. Silver Park")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. Opp HDFC Atm")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. Malad West")
		{
			
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. 400064")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. 022")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value == "e.g. 28888888")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
		else if(document.getElementById(id).value  == "e.g. A - Wing 208, Royal Apartment, M. G Road Near BSNL")
		{
			document.getElementById(id).style.color = "#424242";
			document.getElementById(id).value = "";
		}
	}
	else if(event_name == 'blur')
	{
		if(document.getElementById(id).value == "" && id == 'txtName')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Vipul Shah";
		}
		else if(document.getElementById(id).value == "" && id == 'txtMobile')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. 7812207587";
		}
		else if(document.getElementById(id).value == "" && id == 'txtEmail')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. john@aol.com";
		}
		else if(document.getElementById(id).value == "" && id == 'txtbldg')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Sandeep Residency";
		}
		else if(document.getElementById(id).value == "" && id == 'txtLocation')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Silver Park";
		}
		else if(document.getElementById(id).value == "" && id == 'txtLandmark')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Opp HDFC Atm";
		}
		else if((document.getElementById(id).value == "" || document.getElementById(id).value == 'e.g. Malad West') && id == 'txtArea')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Malad West";
		}
		else if((document.getElementById(id).value == "" || document.getElementById(id).value == 'e.g. Malad West') && id == 'chkoutArea')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. Malad West";
		}
		else if(document.getElementById(id).value == "" && id == 'txtPin')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. 400064";
		}
		else if(document.getElementById(id).value == "" && id == 'txtLandstd')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. 022";
		}
		else if(document.getElementById(id).value == "" && id == 'txtLandnum')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. 28888888";
		}
		else if(document.getElementById(id).value == "" && id == 'txtAddress')
		{
			document.getElementById(id).style.color = "#a4a4a4";
			document.getElementById(id).value = "e.g. A - Wing 208, Royal Apartment, M. G Road Near BSNL";
		}
	}
	
}

function updtDlTime(){
    
    var orderId = getCookie('orderId_'+MDOCIDJ);
    $.ajax({
        url: WEBROOT + "functions/updtDlTime.php",
        dataType: "json",
        type: "post",
        data: {
            'orderId':orderId,
            'dlTime': $("#dlTime").val(),
            'docId':$("#docid").val()
        },
        success: function(res) {

            if(res == 1){
                resetDlTm();
                $("#minTm").text($("#dlTime").val());
                closeDiv('rdtm')
            }
        }
       });
}

function startOrder(){
    
   var clid = getCookie('clid');
         $('#errspn').text('');
         $("#clid").val('');
         document.cookie = 
        'clid=0'+ 
        '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
        '; path=/' +
        '; domain='+cookieondomain;
    
        $("#callerCont").hide();
        $("#prev_ordr_sec").hide();        
        if((onloadFn == "detailsPage" || onloadFn == "menuPage") && ($("#isreg").val() == 5 || $("#isreg").val() == 1)){

             openDiv('rsign_up');
        }
    
}

function setClID(event){
    
    if (event != '13' && event.which != 13) 
		return false;
    
    var clid = $.trim($("#clid").val());
   
     if((! /^[7-9][0-9]+$/.test(clid)) || clid.length != 10){
         //$('#errspn').text('Please enter the valid mobile number');
         
         //return false;
     }
    if(clid){
        
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        document.cookie = 
            'clid=' + escape(clid) + 
            '; expires=' + now.toGMTString() + 
            '; path=/' +
            '; domain='+cookieondomain;
        
        
       

        //document.cookie = 'clid='+escape(clid)+'; path=/; domain=' + cookieondomain;
       
        closeDiv('rsign_up');  
        
        $.ajax({
        url: WEBROOT + "functions/ajxUserDet.php",
        dataType: "json",
        type: "post",
        data: {
            'clid': clid
        },
        success: function(res) {
                
                var nm = $.trim(res.name);
                if(nm){
                    $("#usrName").text(nm);
                }
                else{
                    $("#usrName").text('User');
                }
                
                $("#clNm").html("<b>"+$("#usrName").text()+"</b>");
                if($.trim(res.mob) != ''){
                    $("#clNum").text(res.mob);
                }
                else{
                    $("#clNum").text(clid);
                }
                
                $("#callerCont").show();
                
                
                document.cookie = 
                'rflg=1' +
                '; expires=' + now.toGMTString() + 
                '; path=/' +
                '; domain='+cookieondomain;
                openDiv('rarea')
            
        }
       });
        
        
    }
}

function usrArea(){

    closeDiv('rarea');
    //openArea('');
    location.reload(true);
}

function bktodet(){
	if(tabVal == 2 && blackflag == 1)
	{
		closeDiv('blacklist');
		blackflag =0;
	}
	else if(onloadFn == 'my_account'){
		closeDiv('blacklist');            
        }else{
		window.location.href = baseurl;
	}
}

function proceed(){
    
     //if( $("#agechk").is(":checked") && $("#agechk1").is(":checked") ){
     if($("#termuse").hasClass("wrap_checked") && $("#certify").hasClass("wrap_checked") ){
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time); 
        document.cookie = 
        'vflg=1' +
        '; expires=' + now.toGMTString() + 
        '; path=/' +
        '; domain='+cookieondomain;
       $("#custoverly").hide(); 
       closeDiv('verage'); 
       var func = getCookie('func');
        eval(func);
         document.cookie = 
        'func=0'+ 
        '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
        '; path=/' +
        '; domain='+cookieondomain;
       
    }
    

}

function orderHist(){
   var part = '';
   var frm = $("#fromDt").val();
   var to = $("#toDt").val();
   var callerFlg = $("#callerFlg").val();
   if(callerFlg == 1){
       part = "&c=1";
   }
   if ($("#hist1").is(":checked")) {
       frm = '';
       to = '';
   }

   window.location.href = WEBROOT+'order-history?frm='+frm+'&to='+to+part;
    
    
}
function toHome(url){
    if(url){
        window.location.href = url;
    }
    else{
    window.location.href = WEBROOT;
    }
    
}
function clrDt(opt){
    if(opt == 1)
    {
        $("#dtspan").hide();
        orderHist();
        //$("#fromDt").val('');
        //$("#toDt").val('');
    }
    else{
        $("#dtspan").show();
    }
    
}

function reorder(orderId,url,docId,mob,caller,type,client,dominos,dom_repeat){
    $.ajax({
        url:WEBROOT+"functions/ajxblacklisted.php",
        dataType:"json", 
        type: "post",
        async: false,
        data :{
            mob:mob
        }, 
        success:function(result)
        {
            if(result == "true"){
                blackflag = 1;
            }
        }
    });     
    if(blackflag == 1){
        openDiv('blacklist');
        return false;
    }

     if(caller == '2'){
         mob = '';
     }
	if(caller != '')
			_ct('crord','ordhis',lnk_vid);
		else
	        _ct('vrord','ordhis',lnk_vid);
    		
     if(type == '3' && client != '1'){
           
        $.ajax({
        url:WEBROOT+"functions/getstatus.php",
        type: "post",
        datatype : 'json',
        async: false,
        data :{
                orderId:orderId
        }, 
        success:function(result){
            
               if(result.results.modify == true){ 
                   $.ajax({
                        url:WEBROOT+"functions/ajxReorder.php",
                        type: "post",
                        datatype : 'json',
                        data :{
                                orderId:orderId,
                                docId:docId,
                                flag: 1
                        }, 
                        success:function(res){
                            /*var mdocid = docId;
                            mdocid = mdocid.replace(/\./g,'_');
                            var now = new Date();
                            var time = now.getTime();
                            time += 3600 * 1000;
                            now.setTime(time);

                            document.cookie = 
                                'orderId_'+mdocid+'=' + escape(orderId) + 
                                '; expires=' + now.toGMTString() + 
                                '; path=/' +
                                '; domain='+cookieondomain;
                            result=eval('(' + res + ')');
                            document.cookie = 
                                     'mdfy_'+escape(result.results.orderId)+'= 1'  +  
                                    '; expires=' + now.toGMTString() + 
                                    '; path=/' +
                                    '; domain='+cookieondomain;*/                
                             var HREF = url;
                             window.location.href = HREF;
                            
                        }
                    });                
            }
            else{
                
                $("#rptOrdrLnk_"+orderId).show();
                $("#edtOrdrLnk_"+orderId).show();
                $("#mdfyOrdrLnk_"+orderId).hide(); 
                $("#cnclOrdrLnk_"+orderId).hide(); 
                $("#elpsTxt").html("<b>Time has elapsed to Modify this order. A Fresh Order will be placed by Editing this.</b>");
                openDiv('elpse');
                //alert("Time has elapsed to Modify this order. A Fresh Order will be placed by Editing this");
                
            }
                
        }
        });
         
         
     }
     else{
         
     $.post(WEBROOT+"functions/ajxReorder.php",{
                
                docId:docId,
                orderId:orderId,
                mob:mob,
                dominos:dominos,
                dom_repeat:dom_repeat
                
            },function(res){
				
				var HREF = url;
				window.location.href = HREF;
			});
    
     }
     
    
    
}

function resendSMSEmail(orderId,emailId,mobile){
    
    
    $.post(WEBROOT+"functions/ajxResend.php",{
                
                orderId:orderId
                
            },function(res){
				$("#emlspn").text(emailId);
				$("#mblspn").text(mobile);
                                openDiv('rsndsmseml');
                                
				//var HREF = url;
                                //window.location.href = HREF;
				
			});
    
}

function viewAllItms(){
    
    var orderId = getCookie('orderId_'+MDOCIDJ);
    
    
      $.ajax({
                url:WEBROOT+"functions/ajxAllItms.php", 
                type: "post",
                data :{
                     docid:$("#docid").val(),
                     allItmsFlg : 1,
                     orderId:orderId,
                     timeStamp: new Date().getTime()
                },
                async:false, 
                success:function(result){
                                tempArr = result.split("|~$~|");



                     itmContent = tempArr[1];
                     priceContent = tempArr[3];
                     mnmContent = tempArr[5];




                     $("#itms2").empty().html(itmContent);

                     if(tab == 'tblchkout'){

                         $("#chkoutBtn2").val('Pre Order');
                         $(".addmfy input").val('Pre Order');
                         $(".mredtdel a").hide();
                     }


                      var ckflg = 0;
                     $('.scls2').each(function(i)
                     {

                        if($(this).val() == 0 || $.trim($(this).val()) == ''){

                                ckflg = 1;
                                return false;
                        }

                     })

                     if(ckflg == 1){

                             $("#chkoutBtn2").addClass('addsbl');
                             $("#chkoutBtn2").show();
                             $('#chkoutBtn2').attr('onclick','').unbind('click');
                     }



                         //if(!$("#mrOrder").is(':visible')){
                             openDiv('mrOrder');
                         //}

                }
            });
    
    
    
   /* $.post(WEBROOT+"functions/ajxAllItms.php",{
                        docid:$("#docid").val(),
                        allItmsFlg : 1,
                        orderId:orderId,
                        timeStamp: new Date().getTime()
                    }, function(result){
					
                        
                        tempArr = result.split("|~$~|");
                        
                        
					
                        itmContent = tempArr[1];
                        priceContent = tempArr[3];
                        mnmContent = tempArr[5];
                        
                        
                        
					
                        $("#itms2").empty().html(itmContent);
                        
                        if(tab == 'tblchkout'){
                           
                            $("#chkoutBtn2").val('Pre Order');
                            $(".addmfy input").val('Pre Order');
                            $(".mredtdel a").hide();
                        }
                        
                        
                         var ckflg = 0;
                        $('.scls2').each(function(i)
                        {

                           if($(this).val() == 0 || $.trim($(this).val()) == ''){

                                   ckflg = 1;
                                   return false;
                           }

                        })

                        if(ckflg == 1){
                              
                                $("#chkoutBtn2").addClass('addsbl');
                                $("#chkoutBtn2").show();
                                $('#chkoutBtn2').attr('onclick','').unbind('click');
                        }
                        
                        
                          
                            //if(!$("#mrOrder").is(':visible')){
                                openDiv('mrOrder');
                            //}
                         
                                   
									
                    });*/
    
    
    
}



function addonDetail(orderDetailId,delFlg,page,itemId)
{
		var domid = $("#itemid").val();

       if (domid.slice(0,3) == 'DOM')
		{
			addonDomDetail(orderDetailId,delFlg,page,itemId);
			return false;
		}
       var mod = ($("#isreg").val() == 5) ? '2' : '1' ;
      
	if($.trim(getCookie('orderId_'+MDOCIDJ)) == '')
	{
		_ct('prcdorder','dlvdt','1');
		var dtVal = $('#dldt :selected').val();
		var tmVal = $('#dltm :selected').val();
		if(typeof tmVal == 'undefined'){
			$("#dlTxt").empty().html("Restaurant is closed at this hour.");
			openDiv('dlVld');
			return false;
		}
                var tmArr = tmVal.split(' ');
		tmVal = tmArr[1];
		//var dlpk = $('[name=dlpk]:checked').val();
		var dlpk = "HD";
		var dlarea = $("#areaMenu").val();
		
		
        $.post(WEBROOT+"functions/ajxGenOrderId.php",{
            delivery_pickup:dlpk,
            docId:$("#docid").val(),
            delivery_date:dtVal,
            delivery_time:tmVal,
            delivery_area:dlarea,
            docId:$("#docid").val(),
            vertical:mod,
            timeStamp: new Date().getTime()
        },function(res){
                        var tmpAr = res.split("|~|");
						var now = new Date();
                        var time = now.getTime();
                        time += 3600 * 1000;
                        now.setTime(time);
                        document.cookie = 
                            'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                            '; expires=' + now.toGMTString() + 
                            '; path=/' +
                            '; domain='+cookieondomain;
                        document.cookie = 
                            'inittm=' + escape(tmpAr[1]) + 
                            '; expires=' + now.toGMTString() + 
                            '; path=/' +
                            '; domain='+cookieondomain;
			
			if($.trim($("#itemid").val()) != ''){
                $.post(WEBROOT+"functions/ajxAddonDetail.php",{
                    itemid:$("#itemid").val(),
                    docid:$("#docid").val(),
                    orderDetailId:orderDetailId,
                    delFlg:delFlg,
                    page:page
                }, function(result){
                                    
                    //--------------------------------------------------
                    if(result == 'none'  && $.trim(orderDetailId) == '' ){
                        //closeDiv('fda');  
                        $("#fda").is(':visible') ? closeDiv('fda') : '';
                        var orderId = tmpAr[0];
			var qty = 1;
                        var qtFlg = 0;
                        var unit = '';
                        qty = $("#quty_"+$("#itemid").val()).val();
                        if($.trim(qty) == ''){
                            qty = 1;
                        }
                        qtFlg = $("#qtFlg_"+$("#itemid").val()).val();
                        unit = $("#unt_"+$("#itemid").val()).val();
                        $.post(WEBROOT+"functions/ajxAddOrderDetail.php",{
                            docid:$("#docid").val(),
                            itemid:$("#itemid").val(),
                            addonId:'',
                            naddonId:'',
                            Instruction:'',
                            qtFlg:qtFlg,
                            qty:qty,
                            unit:unit,
                            orderDetailId:'',
                            delFlg:'',
                            orderId:orderId,
                            timeStamp: new Date().getTime()
                        }, function(result){
					
                            if(typeof page != 'undefined' && page == 'checkout'){
                                location.reload();
                            }
                            tempArr = result.split("|~$~|");
					
                            itmContent = tempArr[1];
                            priceContent = tempArr[3];
                            mnmContent = tempArr[5];
                            
                            if($.trim(mnmContent) == '1')
                            {
                                $("#chkoutBtn").removeClass('addsbl');
                                $("#chkoutBtn").show();
                                 // $('#chkoutBtn').attr('onclick',redirectToSmry());
                                  $('#chkoutBtn').click(redirectToSmry);
                            }
                            else if($.trim(mnmContent) == '0'){
                                if($('#min_order_flag').val() == 1){
                                
                                    $("#chkoutBtn").addClass('addsbl');
                                    $("#chkoutBtn").show();
                                    $('#chkoutBtn').attr('onclick','').unbind('click');

                                }
                                else{
                                    $("#chkoutBtn").removeClass('addsbl');
                                    $("#chkoutBtn").show();
                                    $('#chkoutBtn').click(redirectToSmry);

                                }
                            }
                            else{
                                 $("#chkoutBtn").hide();
                            }
					
                            closePopUp('ordSummry');
					
                            $("#itms").empty().html(itmContent);
                                        
                            $("#mnDlvChrg").text($("#mnDlv").val());
					
                            //$("#priceCont").empty().html(priceContent);
                            //$("#priceCont").show();
                            //$("#mnm").empty().html(mnmContent);
                                       
                            //$("#mnm").show();
                            if(typeof priceContent == 'undefined'){
						
                                $("#priceCont").hide();
                                $("#itmCont").addClass('idtlb');
                            }
                            $(".edtdlvry").show();
                            $(".cnlprod").show();
                            $("#itmCont").removeClass('idtlb');
                                        
                            if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){
                                $("#chkoutBtn").removeClass('addsbl');
                                $("#chkoutBtn").show();
                                $('#chkoutBtn').click(redirectToSmry);
                                $('span.ordr').hide();	
                                 if(tab == 'tblchkout'){
                                    $(".addmfy input").removeClass('addsbl');
                                    $('.addmfy input').click(redirectToSmry);
                                    if(typeof mnmContent == 'undefined'){

                                            $("#chkoutBtn").hide();
                                    }
                                    
                                }
                            }
                            else {
                                //$('span.ordr').show();
                                if($('#min_order_flag').val() == 1){
                                 $('span.ordr').show();   
                                }
                                else{
                                    
                                    $('span.ordr').hide();
                                }
                                	
                            }
                                      
                            if(tab == 'tblchkout'){
                                    $("#edtdla").hide();
                                    $("#chkoutBtn").val('Pre Order');
                                    $(".addmfy input").val('Pre Order');
                                }
					
					
									
                        });
                                        
                                        
                                        

                    }else{ 
                                        
                                        
                                        
                                        
                                        
                                        
                        //--------------------------------------------------
                                    
                                    
					$('#addon_popup').html(result);
                                      
					
					//$('#addon_popup').bPopup();
					//closeDiv('fda');
                                        $("#fda").is(':visible') ? closeDiv('fda') : '';
					if($.trim(orderDetailId) != ''){
						$("#addBtn").val("Update My Order");
					}
					openDiv('addon_popup');
					round_popup();
                                        
                                       
                                        
					if($.trim($("#grybox_total_price").text()) == "-"){
						$("#addon_radio_0").attr('checked','checked');
						$("#addon_radio_0").click();
                                                 $("#addon_checkbox_0").attr('checked','checked').triggerHandler('click');
						
					}
                                        
                                         if($('#qtFlg_'+$("#itemid").val()).val() == '2'){
                            
                                            chngPrice($('#selItmId_'+$("#itemid").val()).val());
                                            toggleQt($("#itemid").val());

                                        }
                                        
                                        if($('#qtFlg_'+$("#itemid").val()).val() == '1'){
                            
                                            $("#item_qty").val($("#quty_"+$("#itemid").val()).val());
                                            calculate_checked_price();

                                        }
					

                    }   



				});
			}
			else
			{
                                
				//closeDiv('fda');
                                $("#fda").is(':visible') ? closeDiv('fda') : '';
                                 var rflg = getCookie('rflg');
                                if(rflg == 1){
                                    document.cookie = 
                                    'rflg=0'+ 
                                    '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
                                    '; path=/' +
                                    '; domain='+cookieondomain;
                                    location.reload();
                                    
                                }
                               
			}
		
		
		});
		
	}
	else
	{
		
		if($.trim($("#itemid").val()) != ''){
            $.post(WEBROOT+"functions/ajxAddonDetail.php",{
                itemid:$("#itemid").val(),
                docid:$("#docid").val(),
                orderDetailId:orderDetailId,
                delFlg:delFlg,
                page:page
            }, function(result){
                    
                if(result == 'none' && $.trim(orderDetailId) == '' || page == 'cart'){
                    if($(".edtdlvry").is(':visible')){ 
                        $('#displayOrder').css('position', 'relative'); 
                        $("#displayOrder_mask").height($("#displayOrder").height());
                        $("#displayOrder_mask").show();
                        var target = document.getElementById('displayOrder_mask');

                        var opts = {
                            lines: 5, // The number of lines to draw
                            length: 0, // The length of each line
                            width: 15, // The line thickness
                            radius: 15, // The radius of the inner circle
                            corners: 1, // Corner roundness (0..1)
                            rotate: 75, // The rotation offset
                            direction: 1, // 1: clockwise, -1: counterclockwise
                            color: '#fff', // #rgb or #rrggbb or array of colors
                            speed: 1, // Rounds per second
                            trail: 60, // Afterglow percentage
                            shadow: false, // Whether to render a shadow
                            hwaccel: false, // Whether to use hardware acceleration
                            className: 'spinner', // The CSS class to assign to the spinner
                            zIndex: 2e9, // The z-index (defaults to 2000000000)
                            top: '50%', // Top position relative to parent
                            left: '50%' // Left position relative to parent
                          };

                        var spinner = new Spinner(opts).spin(target);
                    }
                    var qty = 1;
                    var qtFlg = 0;
                    var unit = '';
                    qty = $("#quty_"+$("#itemid").val()).val();
                    if($.trim(qty) == ''){
                        qty = 1;
                    }
                    qtFlg = $("#qtFlg_"+$("#itemid").val()).val();
                    unit = $("#unt_"+$("#itemid").val()).val();
                    //closeDiv('fda');
                    var orderId = getCookie('orderId_'+MDOCIDJ);
                    
                    
                    
                    var orderDtlId = '';
                    var addonIds = '';
                    var nestedIds = '';
                    var inst = "";
                    if(page == 'cart'){
                                            
                        var tmp = result.split("|^|");
                                           
                        var tmp2 = tmp[1].split("|~|");
                                            
                        addonIds = tmp2[0];
                        nestedIds = tmp2[1];
                        inst = tmp2[2];
                        
                         if($.trim(inst) == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
                        {
                            inst = '';

                        }
                        
                                         
                        qty = $("#selQty_"+orderDetailId).val();
                        unit = $("#selUnit_"+orderDetailId).val();
                        qtFlg = $("#qtFlg_"+orderDetailId).val();
                        if($("#mrOrder").is(':visible'))
                        {
                             qty = $("#selQty2_"+orderDetailId).val();
                             unit = $("#selUnit2_"+orderDetailId).val();
                             qtFlg = $("#qtFlg2_"+orderDetailId).val();
                        }   
                        orderDtlId = orderDetailId;
                        
                    }
				
                    $.post(WEBROOT+"functions/ajxAddOrderDetail.php",{
                        docid:$("#docid").val(),
                        itemid:$("#itemid").val(),
                        addonId:addonIds,
                        naddonId:nestedIds,
                        Instruction:inst,
                        qty:qty,
                        unit:unit,
                        qtFlg:qtFlg,
                        orderDetailId:orderDtlId,
                        delFlg:'',
                        orderId:orderId,
                        timeStamp: new Date().getTime()
                    }, function(result){
					
                        if(typeof page != 'undefined' && page == 'checkout'){
                            location.reload();
                        }
                        tempArr = result.split("|~$~|");
                        
                        
					
                        itmContent = tempArr[1];
                        priceContent = tempArr[3];
                        mnmContent = tempArr[5];
                        
                        if($.trim(mnmContent) == '1')
                        {
                            $("#chkoutBtn").removeClass('addsbl');
                            $("#chkoutBtn").show();
                             //$('#chkoutBtn').attr('onclick',redirectToSmry());
                              $('#chkoutBtn').click(redirectToSmry);
                        }
                        else if($.trim(mnmContent) == '0'){
                           
                            if($('#min_order_flag').val() == 1){
                                
                                $("#chkoutBtn").addClass('addsbl');
                                $("#chkoutBtn").show();
                                $('#chkoutBtn').attr('onclick','').unbind('click');

                            }
                            else{
                                $("#chkoutBtn").removeClass('addsbl');
                                $("#chkoutBtn").show();
                                $('#chkoutBtn').click(redirectToSmry);
                                
                            }
                             
                        }
                        else{
                             $("#chkoutBtn").hide();
                        }
					
                        //closePopUp('ordSummry');
					
                        $("#itms").empty().html(itmContent);
                                        
                        $("#mnDlvChrg").text($("#mnDlv").val());
					
                        //$("#priceCont").empty().html(priceContent);
                        //$("#priceCont").show();
                        //$("#mnm").empty().html(mnmContent);
                                       
                        //$("#mnm").show();
                        if(typeof priceContent == 'undefined'){
						
                            $("#priceCont").hide();
                            $("#itmCont").addClass('idtlb');
                        }
                        $(".edtdlvry").show();
                        $(".cnlprod").show();
                        $("#itmCont").removeClass('idtlb');
                        
                        if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){
                            $("#chkoutBtn").removeClass('addsbl');
                            $("#chkoutBtn").show();
                            $('#chkoutBtn').click(redirectToSmry);
                            $('span.ordr').hide();
                            
                            if(tab == 'tblchkout'){
                                $(".addmfy input").removeClass('addsbl');
                                $('.addmfy input').click(redirectToSmry);
                                if(typeof mnmContent == 'undefined'){
                                        $("#chkoutBtn").hide();
                                }
                            }
                        }            
                        else{
                            //$('span.ordr').show();
                             if($('#min_order_flag').val() == 1){
                                $('span.ordr').show();   
                               }
                               else{

                                   $('span.ordr').hide();
                               }
                            
                        }
                        
                        if($("#mrOrder").is(':visible')){
                         
                          viewAllItms();
                           if(qtFlg != 2){  
                                
                                extractNumber('#selQty2_'+orderDetailId,$('#selQty2_'+orderDetailId).val(),0,false);
                               
                                var input =  $("#selQty2_"+orderDetailId);
                                var len = input.val().length; 
                                input.val(input.val());
                                setCaretPosition('selQty2_'+orderDetailId, len);
                            }
                            
                            
                        }
                                        
                         if(tab == 'tblchkout'){
                            $("#edtdla").hide();
                            $("#chkoutBtn").val('Pre Order');
                            $(".addmfy input").val('Pre Order');
                        }  
                        
                        
                        var ckflg = 0;
						$('.scls').each(function(i)
						{
						   
						   if($(this).val() == 0 || $.trim($(this).val()) == ''){
							   
							   ckflg = 1;
							   return false;
						   }

						})
					   
						if(ckflg == 1){
							 $("#chkoutBtn").addClass('addsbl');
							$("#chkoutBtn").show();
							$('#chkoutBtn').attr('onclick','').unbind('click');
							
						}
                       
                        if(page == 'cart'){
                            if(qtFlg != 2){  
                                 if(!$("#mrOrder").is(':visible')){
                                    extractNumber('#selQty_'+orderDetailId,$('#selQty_'+orderDetailId).val(),0,false);

                                    var input =  $("#selQty_"+orderDetailId);
                                    var len = input.val().length; 
                                    input.val(input.val());
                                    setCaretPosition('selQty_'+orderDetailId, len);
                                }
                            }
                            
                        }
                        
                        
                        //closeDiv('fda');
                        $("#fda").is(':visible') ? closeDiv('fda') : '';
                        if($("#displayOrder_mask").is(':visible')){ 
                            $("#displayOrder_mask").hide();
                            spinner.stop();
                        }
				
                        
                    });
                                        
                                        
                                        
                }else{
			$('#addon_popup').html(result);
                       
                        
			
			//$('#addon_popup').bPopup();
			//closeDiv('fda');
                        $("#fda").is(':visible') ? closeDiv('fda') : '';
			if($.trim(orderDetailId) != ''){
				$("#addBtn").val("Update My Order");
			}
			openDiv('addon_popup');
			round_popup();
                        
                        
			if($.trim($("#grybox_total_price").text()) == "-"){
				$("#addon_radio_0").attr('checked','checked');
				$("#addon_radio_0").click();
                        $("#addon_checkbox_0").attr('checked','checked').triggerHandler('click');;
				
                                
                               
			}
                        
                        if($.trim(orderDetailId) != ''){
                            
                            if($('#qtFlg_'+orderDetailId).val() == '2'){
                           
                                chngPrice($('#selItmId_'+$("#itemid").val()).val(),orderDetailId);
                                toggleQt($("#itemid").val());

                            }

                            if($('#qtFlg_'+orderDetailId).val() == '1'){

                                $("#item_qty").val($("#selQty_"+orderDetailId).val());
                                calculate_checked_price();

                            }
                            
                        }
                        else{
                            
                            if($('#qtFlg_'+$("#itemid").val()).val() == '2'){
                           
                                chngPrice($('#selItmId_'+$("#itemid").val()).val());
                                toggleQt($("#itemid").val());

                            }

                            if($('#qtFlg_'+$("#itemid").val()).val() == '1'){

                                $("#item_qty").val($("#quty_"+$("#itemid").val()).val());
                                calculate_checked_price();

                            }
                            
                        }
                        
                        
                        
                      
                        
                        
                        if(tab == 'tblchkout'){
                            $("#edtdla").hide();
                            $("#chkoutBtn").val('Pre Order');
                            $(".addmfy input").val('Pre Order');
                        }
			
                }

			});
		}
		else
		{
			var dtVal = $('#dldt :selected').val();
			var tmVal = $('#dltm :selected').val();
			if(typeof tmVal == 'undefined'){
			$("#dlTxt").empty().html("Restaurant is closed at this hour.");
				openDiv('dlVld');
				return false;
			}
                       
                        var tmArr = tmVal.split(' ');
                        
                        tmVal = tmArr[1];
                        
			
			//var dlpk = $('[name=dlpk]:checked').val();
			var dlpk = "HD";
			var dlarea = $("#areaMenu").val();
			
			var orderId = getCookie('orderId_'+MDOCIDJ);
			
            $.post(WEBROOT+"functions/ajxUpdtOrderDet.php",{
                pickup_delivery:dlpk,
                docId:$("#docid").val(),
                date:dtVal,
                time:tmVal,
                orderId:orderId,
                delivery_area:dlarea
            },function(res){
				if(tab == 'tblchkout'){
                                    $("#edtdla").hide();
                                    $("#chkoutBtn").val('Pre Order');
                                    $(".addmfy input").val('Pre Order');
                                }
				//console.log(res);
				
			});
			
			//closeDiv('fda');
                        $("#fda").is(':visible') ? closeDiv('fda') : '';
                        var rflg = getCookie('rflg');
                        if(rflg == 1){
                            document.cookie = 
                            'rflg=0'+ 
                            '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
                            '; path=/' +
                            '; domain='+cookieondomain;
                            location.reload();
                        }
                        
                        if(divFlg)
                        {

                            viewAllItms();
                            divFlg = 0;
                        }
                       
                       
		}
		
	}
        
       
	
	
}



function deletepopup(delFlg,itemId,orderDetailId,page,itemname)
{
	//document.getElementById("delpop").onclick = editAddonDet(delFlg,itemId,orderDetailId);

        
     gl_delFlg =  delFlg ; 
     gl_itemId =  itemId ; 
     gl_orderDetailId =  orderDetailId ; 
     gl_page =  page ; 
   /* $('#delpop').click(function() {
            
        editAddonDet(delFlg,itemId,orderDetailId,page);
        closeDiv('delpopup');
            
            
    
    });*/
    document.getElementById("del_item").innerHTML = itemname;
    openDiv('delpopup');
        
}

function delItem()
{
     if(gl_orderDetailId != ''){
        
        editAddonDet(gl_delFlg,gl_itemId,gl_orderDetailId,gl_page);
     }
     gl_delFlg =  '' ; 
     gl_itemId =  '' ; 
     gl_orderDetailId =  '' ; 
     gl_page =  '' ; 
         var orderid  = getCookie('orderId_'+MDOCIDJ);
         if($('#coupcode').val() != '' && $('#coupcode').val() != 'undefined' && $('#coupcode').val() != null)
         {
        $.ajax({
        url:WEBROOT+"functions/redeemResCoupons.php", 
        type:"get",
        datatype: "json",
        data:{
            'orderid': orderid,
            'action' : 'remove_coupon'
        },
        success:function(response){
                response = jQuery.parseJSON(response);	
                $('#discount_price').text(0);
                $('#rmv_spn').removeClass('dt').addClass('dn');
                $('#coupon_smry').removeClass('dn').addClass('dt');
                $('#actv-smry-redm-btn').removeClass('actv-smry-redm-btn_dsbld').addClass('actv-smry-redm-btn');
                
            }
        });
    }
     closeDiv('delpopup');
}
function editAddonDet(delFlg,itemId,orderDetailId,page,evt)
{
        if(page == 'allItms')
        {
            divFlg = 1;
            closeDiv('mrOrder');
        }
	$("#itemid").val(itemId);
	$("#orderDetailId").val(orderDetailId);
        
	$("#delFlg").val(delFlg);
        var toshw = true;
        if(page == 'cart' && evt){
            
            if($("#mrOrder").is(':visible')){
                if($('#selQty2_'+orderDetailId).val() < 1 || $('#selQty2_'+orderDetailId).val() == ''){
                    toshw = false;
                }
            }else{
                if($('#selQty_'+orderDetailId).val() < 1 || $('#selQty_'+orderDetailId).val() == ''){
                    toshw = false;
                }
            }
            
            var charCode = (evt.which) ? evt.which : event.keyCode;
            
            if (charCode != 8 && (charCode < 48 || charCode > 57) && (charCode< 96 || charCode > 105)){
               
                if($("#mrOrder").is(':visible')){
                    extractNumber('#selQty2_'+orderDetailId,$('#selQty2_'+orderDetailId).val(),0,false);
                }
                else{
                    extractNumber('#selQty_'+orderDetailId,$('#selQty_'+orderDetailId).val(),0,false);
                }
               
                return false;
            }
            
            
        }
        
	if(delFlg)
	{
           
		addOrderDetail(orderDetailId,delFlg,page);
		
	}
	else
	{
            if(toshw){
		addonDetail(orderDetailId,delFlg,page);                
            }

	}
	
}

function getloc(lat,lon){ 
	$.get(WEBROOT + "webmain/getlocation.php",{act:'geo',xlat:lat,xlon:lon,deladd:'1'}, function(data) {
		
            var d = data.split('|');
            var city=d[0];
            var area=d[1];
            var pin=d[4];
            var restaurant_city= $('#city').val();//'Bangalore'; //
		
            var now = new Date();
            var time = now.getTime();
            time += 3600 * 1000;
            now.setTime(time);
            if(city == ''){
                document.cookie = 
                'LocDetErrflg=' + 1 + 
                '; expires=' + now.toGMTString() + 
                '; path=/' +
                '; domain='+cookieondomain;
            }else{
                document.cookie = 
               'LocDetCty=' + d[0] + 
               '; expires=' + now.toGMTString() + 
               '; path=/' +
               '; domain='+cookieondomain;
            }    
            if(restaurant_city == city){    
                $.ajax({
                    url:WEBROOT+"functions/deliveryDetByGeoLoc.php",
                    dataType:"json", 
                    type: "post", 
                    data :{
                        'docId': $("#docid").val(),
                        'geo_pin': pin,
                        'geo_area': area       
                        }, 
                    success:function(res){
                        if(res.result.match_flg == 1){
                               $("#txtPin").val(res.result.match_pin);
                            /*var orderId = getCookie('orderId_'+MDOCIDJ);
                            if(orderId != ''){
                                $.ajax({
                                    url:WEBROOT+"functions/deliveryDet.php",
                                    dataType:"json", 
                                    type: "post",
                                    data :{
                                        'orderId' : orderId,
                                        'docId':$("#docid").val()
                                    }, 
                                    success:function(resp){
                                          var order_area = resp.results.delivery_area;
                                          var areafrmprvordr = $("#areafrmordr").val();
                                          if (order_area == areafrmprvordr && areafrmprvordr != '' && order_area!='' &&  $("#areafrmordrflg").val() == '1'  ) {
                                            var dlpk = "HD";
                                            var dlarea = res.result.match_area;
                                            var dtVal = $('#dldt :selected').val();
                                            var tmVal = $('#dltm :selected').val();
                                            var tmArr = tmVal.split(' ');
                                            tmVal = tmArr[1];

                                            $.post(WEBROOT+"functions/ajxUpdtOrderDet.php",{
                                                pickup_delivery:dlpk,
                                                docId:$("#docid").val(),
                                                date:dtVal,
                                                time:tmVal,
                                                orderId:orderId,
                                                delivery_area:dlarea
                                            },function(res){
                                                });
                                          }
                                    }
                                });
                            }else{
                                $("#areaMenu").val(res.result.match_area);
                                $("#error").hide();
                                $("#areaDisp").html("<b>"+$("#areaMenu").val()+"</b>");
                                var tmVal = $('#dltm :selected').val();
                                if(typeof tmVal != 'undefined'){
                                    $("#dlVldt").hide();	
                                    $("#proceedBtn").show();  
                                    $("#closeBtn").hide();
                                        
                                        var mod = ($("#isreg").val() == 5) ? '2' : '1' ;
                                        _ct('prcdorder','dlvdt','1');
                                        var dtVal = $('#dldt :selected').val();
                                        var tmArr = tmVal.split(' ');
                                        tmVal = tmArr[1];
                                        //var dlpk = $('[name=dlpk]:checked').val();
                                        var dlpk = "HD";
                                        var dlarea = $("#areaMenu").val();


                                        $.post(WEBROOT+"functions/ajxGenOrderId.php",{
                                            delivery_pickup:dlpk,
                                            docId:$("#docid").val(),
                                            delivery_date:dtVal,
                                            delivery_time:tmVal,
                                            delivery_area:dlarea,
                                            vertical:mod,
                                            timeStamp: new Date().getTime()
                                        },function(res){
                                                        var tmpAr = res.split("|~|");
                                                        var now = new Date();
                                                         var time = now.getTime();
                                                         time += 3600 * 1000;
                                                         now.setTime(time);
                                                         document.cookie = 
                                                             'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                                                             '; expires=' + now.toGMTString() + 
                                                             '; path=/' +
                                                             '; domain='+cookieondomain;

                                        });

                                }
                            } */
                        }    
                    }
                });
            }     
        });
}
function showloc(){
	if(geo_position_js.init()){
           geo_position_js.getCurrentPosition(getLatLon,function(error){getLatLon();},{timeout:2000});
            }else{
           getloc();
            }

}
function getLatLon(position){
	if(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
	}
	getloc(lat,lon);
        
}


function openArea(itemId,page)
{
	if($.trim($('#domId').val()) != ''){
		$('#itemid').val(itemId);
		addonDetail('','');
		return false;
	}

    if(tab == 'tblchkout'){
           $("#edtdla").hide();
           $("#chkoutBtn").val('Pre Order');
           $(".addmfy input").val('Pre Order');
            if($.trim(getCookie('orderId_'+MDOCIDJ)) == ''){
                var ordrdttm = $("#ordrdttm").val();
                var ordrdttmAr = ordrdttm.split(" "); 
                
                 $.ajax({
                   url:WEBROOT+"functions/ajxGenOrderId.php", 
                   type: "post",
                   data :{
                      delivery_pickup:'HD',
                     docId:$("#docid").val(),
                     delivery_date:ordrdttmAr[0],
                     delivery_time:ordrdttmAr[0],
                     delivery_area:'preorder',
                     vertical:1,
                     timeStamp: new Date().getTime()
                   },
                   async:false, 
                   success:function(res){
                                    var tmpAr = res.split("|~|");
                                 var now = new Date();
                                 var time = now.getTime();
                                 time += 3600 * 1000;
                                 now.setTime(time);
                                 document.cookie = 
                                     'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                                     '; expires=' + now.toGMTString() + 
                                     '; path=/' +
                                     '; domain='+cookieondomain;

                   }
               });
			
                
            }
		}
                
        if ($.trim($('#domId').val()) != ''){
                    var dtVal = $('#dldt :selected').val();
                    var tmVal = $('#dltm :selected').val();
                    if(typeof tmVal != 'undefined'){
                        var tmArr = tmVal.split(' ');
                        tmVal = tmArr[1];
                        /*
                        if($('#areafrmordr').val() != '' && $.trim(getCookie('orderId_'+MDOCIDJ)) == ''){   // if user is logged in & order id is NULL
                              $("#areafrmordrflg").val(1); 
                               $.ajax({
                               url:WEBROOT+"functions/ajxGenOrderId.php", 
                               type: "post",
                               data :{
                                 delivery_pickup:'HD',
                                 docId:$("#docid").val(),
                                 delivery_date:dtVal,
                                 delivery_time:tmVal,
                                 delivery_area:$('#areafrmordr').val(),
                                 vertical:1,
                                 timeStamp: new Date().getTime()
                               },
                               async:false, 
                               success:function(res){
                                             var tmpAr = res.split("|~|");
                                             var now = new Date();
                                             var time = now.getTime();
                                             time += 3600 * 1000;
                                             now.setTime(time);
                                             document.cookie = 
                                                 'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                                                 '; expires=' + now.toGMTString() + 
                                                 '; path=/' +
                                                 '; domain='+cookieondomain;
                                        $("#areaMenu").val($('#areafrmordr').val());
                                        $("#error").hide();
                                        $("#areaDisp").html("<b>"+$("#areaMenu").val()+"</b>");
                                        $("#dlVldt").hide();	
                                        $("#proceedBtn").show();  
                                        $("#closeBtn").hide();

                               }
                           });

                        }
                        */
       
      
       $.ajax({
        url: WEBROOT + "functions/ajxAvailableItem.php",
        dataType: "json",
        type: "post",
        data: {
            'itemId': itemId,
            'docId': $("#docid").val()
        },
        success: function(res) {

            if (res.results.isAvailable == 0) {
               openDiv('itmntavl');
                return false;
            }
            else {

                if(page == 'allItms')
                {
                    divFlg = 1;
                    closeDiv('mrOrder');
                }
                if(itemId == '')
                {
                        var orderId = getCookie('orderId_'+MDOCIDJ);


                $.ajax({
                    url:WEBROOT+"functions/deliveryDet.php",
                    dataType:"json", 
                    type: "post",
                    data :{
                        'orderId' : orderId,
                        'docId':$("#docid").val()
                        }, 
                    success:function(res){

                                $("#dldt").val(res.results.delivery_date);

                                $("#dltm").val($.trim(res.results.delivery_date)+" "+$.trim(res.results.delivery_time));
                                $("#areaMenu").val(res.results.delivery_area);

                                $("#itemid").val('');
                                if(tab != 'tblchkout'){
								if ($.trim($('#domId').val()) != ''){
								$("#dldt").prop("disabled", true);
								$("#dltm").prop("disabled", true);
								if($("#areaMenu").val() == ''){
								$("#closeBtn").show();
								$("#proceedBtn").hide();
								}
								openDiv('fda');
								}else{
								//$("#dldt").prop("disabled", false);
								//$("#dltm").prop("disabled", false);
								//openDiv('fda');
								}
                                    //openDiv('fda');
                                }

                    }
                });


                }
                else{
                        $("#itemid").val(itemId);
                        var orderId = getCookie('orderId_'+MDOCIDJ);

                $.ajax({
                    url:WEBROOT+"functions/deliveryDet.php",
                    dataType:"json", 
                    type: "post",
                    data :{
                        'orderId' : orderId,
                        'docId':$("#docid").val()
                    }, 
                    success:function(res){
                                var c_area = res.results.delivery_area;
                                if($.trim(c_area) != ''){

                                        addonDetail('','');
                                }
                                else
                                { 
                                    if(tab != 'tblchkout'){
                                            if ($.trim($('#domId').val()) != ''){
										$("#dldt").prop("disabled", true);
										$("#dltm").prop("disabled", true);
										if($("#areaMenu").val() == ''){
											$("#closeBtn").show();
											$("#proceedBtn").hide();
										}
										openDiv('fda');
										}
										else{
											//$("#dldt").prop("disabled", false);
											//$("#dltm").prop("disabled", false);
											//openDiv('fda');
										}
                                        }
                                   
                            }

                    }
                });	


                }
               
            }
        }
    });
       
    }else{
        openDiv('fda');
    }
        }else{
            if( page == 'not_to_minimize_prvdiv'){
                if($("#mst_ord_div").is(":visible")){
                    toggleMstOrder('mst_ord_div');
                }
            }else if(page == 'not_to_minimize_mst'){
                if($("#prev_tabs").is(":visible")){
                    togglePrevOrder('main')
                }
            }else{
                if($("#mst_ord_div").is(":visible")){
                    toggleMstOrder('mst_ord_div');
                }
                if($("#prev_tabs").is(":visible")){
                    togglePrevOrder('main')
                }
            }
        if($.trim(getCookie('orderId_'+MDOCIDJ)) == ''){   // if user is logged in & order id is NULL
              $.ajax({
                   url:WEBROOT+"functions/ajxGenOrderId.php", 
                   type: "post",
                   data :{
                     delivery_pickup:'HD',
                     docId:$("#docid").val(),
                     delivery_date:'',
                     delivery_time:'',
                     delivery_area:'',
                     vertical:1,
                     timeStamp: new Date().getTime()
                   },
                   async:false, 
                   success:function(res){
                     var tmpAr = res.split("|~|");
                     var now = new Date();
                     var time = now.getTime();
                     time += 3600 * 1000;
                     now.setTime(time);
                     document.cookie = 
                         'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                         '; expires=' + now.toGMTString() + 
                         '; path=/' +
                         '; domain='+cookieondomain;
                   }
               });
        }
        
                $.ajax({
                    url: WEBROOT + "functions/ajxAvailableItem.php",
                    dataType: "json",
                    type: "post",
                    data: {
                        'itemId': itemId,
                        'docId': $("#docid").val()
                    },
                    success: function(res) {
                        if (res.results.isAvailable == 0) {
                           openDiv('itmntavl');
                            return false;
                        }
                        else {
                            if(page == 'allItms'){
                                divFlg = 1;
                                closeDiv('mrOrder');
                            }
                            if(itemId == ''){

                            }else{
                                $("#itemid").val(itemId);
                                addonDetail('','');
                            }
                        }
                    }
                });
        }	
}

function selectTopping(addonId)
{
	$("#size"+addonId).css("display","block");
}

function calculate_checked_price(addonId,type,checkedFlg)
{
    var price_addon = 0;
    var addon_cbox_id_price = 0;
    var addon_cbox_id_pirce = 0;
    
    if($('#item_qflg').val() != '2'){
        
        extractNumber('#item_qty',$('#item_qty').val(),0,false);
    
    }
   
    if(addonId)
    {
        if(type == 'radio')
        {       
            $('.dispS').each(function(){
				$(this).hide();

            });

            $("#addonId_"+addonId).show();
            price_addon = 0;

            $('.naddon').find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);   
                }
            })	

            $('.naddon').find(':radio').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);
                }
            })
        }
        else if(type == 'checkbox')
        {
            if(!checkedFlg)
            {       
                $("#addonId_"+addonId).find(':checkbox').each(function(i)
                { 
                    if( $(this).is(":checked") )
                    {
                        $(this).prop('checked', false);   
                    }
                })	

                $("#addonId_"+addonId).find(':radio').each(function(i)
                {
                    if( $(this).is(":checked") )
                    {
                        $(this).prop('checked', false);
                    }
                })
                
                 $("#addonId_"+addonId).hide();
            }
            else
            {
                $("#addonId_"+addonId).show();
            }
        }
        
    }
    
    $('.iout').find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_price);
        }
    }
    )	
   
    $('.iout').find(':radio').each(function(i)
    {    
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_pirce);
        }
    }
    )
        
    $('.naddon').find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_price);
        }
    })	
    
    $('.naddon').find(':radio').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_pirce);
        } 
    })
    
    var totprice = parseFloat($('#totitemPrice_id').val()) + parseFloat(price_addon);
    //console.log(totprice+" -- "+$('#item_qty').val());
    if($('#qtFlg').val() == '2'){
        $('#grybox_total_price').empty().html((totprice).toFixed(2));
    }
    else if($('#qtFlg').val() == '1'){
        var calprice = (parseFloat($('#totitemPrice_id').val()) * $('#item_qty').val()) +  parseFloat(price_addon);
        $('#grybox_total_price').empty().html(calprice);
    }
    else{
        $('#grybox_total_price').empty().html((totprice * $('#item_qty').val() ).toFixed(2));
    }
    
    $("#img").css("display","inline-block");
	$("#itemName").removeClass("title1");
	$("#itemName").addClass("title");
		
}
function calculatePrice(addonId,orderDtlId,type,checkedFlg)
{
    var price_addon = 0;
    var addon_cbox_id_price = 0;
    var addon_cbox_id_pirce = 0;
    var innerHTML = '';

    var priceArr = [];
    
    var orderid  = getCookie('orderId_'+MDOCIDJ);
    var coupcode = $('#coupcode').val();

    if($('#item_qty_'+orderDtlId).val() > 1)
    {
       if($('#qtFlg_'+orderDtlId).val() != '1' && $('#qtFlg_'+orderDtlId).val() != '2'){
            $('#customLmk_'+orderDtlId).show();
            $('#cust_'+orderDtlId).hide();
        }
    }
    else{
        $('#customLmk_'+orderDtlId).hide();
        $('#cust_'+orderDtlId).hide();
    }
    
    if($('#qtFlg_'+orderDtlId).val() != '2'){
        
        extractNumber('#item_qty_'+orderDtlId,$('#item_qty_'+orderDtlId).val(),0,false);
    
        if($('#item_qty_'+orderDtlId).val() < 1 || $('#item_qty_'+orderDtlId).val() > 10000){
            return false;
        }
    }
    
    
    
   
    if(addonId)
    {
        
       
        if(type == 'radio')
        {       
            $('.dispS_'+orderDtlId).each(function(){
                $(this).hide();

            });

            $("#addonId_"+addonId+"_"+orderDtlId).show();
            price_addon = 0;

            $('.naddon_'+orderDtlId).find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);   
                }
            })	

            $('.naddon_'+orderDtlId).find(':radio').each(function(i,val)
            {
               
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);
                }
            })
        }
        else if(type == 'checkbox')
        {
            if(!checkedFlg)
            {       
                $("#addonId_"+addonId+"_"+orderDtlId).find(':checkbox').each(function(i)
                { 
                    if( $(this).is(":checked") )
                    {
                        $(this).prop('checked', false);   
                    }
                })	

                $("#addonId_"+addonId+"_"+orderDtlId).find(':radio').each(function(i)
                {
                    if( $(this).is(":checked") )
                    {
                        $(this).prop('checked', false);
                    }
                })
                
                $("#addonId_"+addonId+"_"+orderDtlId).hide();
            }
            else
            {
                $("#addonId_"+addonId+"_"+orderDtlId).show();
            }
        }
        
    }
    
    $('.iout'+"_"+orderDtlId).find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            var tmp  = addon_cbox_id.split("_");
            addon_cbox_id = tmp[0]+"_"+tmp[1]+"_"+tmp[2];
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price_"+orderDtlId).val();
            
            priceArr.push( parseFloat(addon_cbox_id_price) );
            
            price_addon += parseFloat(addon_cbox_id_price);
        }
    }
    )	
   
    $('.iout'+"_"+orderDtlId).find(':radio').each(function(i)
    {    
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            var tmp  = addon_cbox_id.split("_");
            addon_cbox_id = tmp[0]+"_"+tmp[1]+"_"+tmp[2];
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price_"+orderDtlId).val();
            priceArr.push( parseFloat(addon_cbox_id_pirce) );
            price_addon += parseFloat(addon_cbox_id_pirce);
        }
    }
    )
        
    $('.naddon'+"_"+orderDtlId).find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            var tmp  = addon_cbox_id.split("_");
            addon_cbox_id = tmp[0]+"_"+tmp[1]+"_"+tmp[2]+"_"+tmp[3];
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price_"+orderDtlId).val();
            priceArr.push( parseFloat(addon_cbox_id_price) );
            price_addon += parseFloat(addon_cbox_id_price);
        }
    })	
    
    $('.naddon'+"_"+orderDtlId).find(':radio').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            
            var tmp  = addon_cbox_id.split("_");
            addon_cbox_id = tmp[0]+"_"+tmp[1]+"_"+tmp[2]+"_"+tmp[3];
           
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price_"+orderDtlId).val();
            priceArr.push( parseFloat(addon_cbox_id_pirce) );
            price_addon += parseFloat(addon_cbox_id_pirce);
            
        } 
    })
   
    var totprice = parseFloat($('#totitemPrice_id_'+orderDtlId).val()) + parseFloat(price_addon);
    if($('#qtFlg_'+orderDtlId).val() == '2'){
        
        $('#grybox_total_price').empty().html((totprice).toFixed(2));
    }
    else if($('#qtFlg_'+orderDtlId).val() == '1'){
        var calcprice = (parseFloat($('#totitemPrice_id_'+orderDtlId).val()) * $('#item_qty_'+orderDtlId).val()) +  parseFloat(price_addon);
        $('#grybox_total_price').empty().html((calcprice).toFixed(2));
    }
    else{
        $('#grybox_total_price').empty().html((totprice * $('#item_qty_'+orderDtlId).val() ).toFixed(2));
    }
    
    if(parseFloat($('#totitemPrice_id_'+orderDtlId).val()) > 0){
        var itmPrice = parseFloat($('#totitemPrice_id_'+orderDtlId).val());
        //itmPrice = itmPrice.toFixed(2);
        if($('#qtFlg_'+orderDtlId).val() == '2'){
            
            var itmTot = parseFloat($('#totitemPrice_id_'+orderDtlId).val());
        }
        else{
            var itmTot = parseFloat($('#totitemPrice_id_'+orderDtlId).val()) * $('#item_qty_'+orderDtlId).val();
        }
        
        itmTot = itmTot.toFixed(2);
        if($('#qtFlg_'+orderDtlId).val() == '2'){ 
            innerHTML += '<div class="oraddns"><span class="rs"></span>'+itmPrice+' x 1 = <span class="rs"></span>'+itmTot+'</div>';
        }
        else{
            innerHTML += '<div class="oraddns"><span class="rs"></span>'+itmPrice+' x '+($('#qtFlg_'+orderDtlId).val() == '2' ? 1 : $('#item_qty_'+orderDtlId).val())+' = <span class="rs"></span>'+itmTot+'</div>';
        }
        //innerHTML += '<div>= <span class="rs"></span>'+itmTot+'</div>';
     
    }
     
    var priceArrLen = priceArr.length;
    for(var j=0;j < priceArrLen;j++)
    {
        if($('#qtFlg_'+orderDtlId).val() == '2' || $('#qtFlg_'+orderDtlId).val() == '1'){ 
            var addonP = parseFloat(priceArr[j]);
        }
        else{
            var addonP = parseFloat(priceArr[j] * $('#item_qty_'+orderDtlId).val());
        }
        addonP = addonP.toFixed(2);
        if(addonP > 0){
        innerHTML += '<div> <b>+</b> <span class="rs"></span>'+addonP+'</div>';
        }
    }
    if($('#qtFlg_'+orderDtlId).val() == '2'){  
        var subTot = parseFloat((totprice));
    }
    else if($('#qtFlg_'+orderDtlId).val() == '1'){  
        var subTot = parseFloat((calcprice));
    }
    else{
        var subTot = parseFloat((totprice * $('#item_qty_'+orderDtlId).val() ));
    }
    subTot = subTot.toFixed(2);
     
    //innerHTML += '<div class="ttlorad"><span class="rs"></span><span class="itmTotal">'+subTot+'</span></div>';
    
    if($("#priceCont_"+orderDtlId).hasClass('APS')){
        subTot = 'APS**';
    }
     
    if($("#priceCont_"+orderDtlId).hasClass('itmNA')){
        subTot = 'N / A*';
    }
    
    if($("#priceCont_"+orderDtlId).hasClass('APS') || $("#priceCont_"+orderDtlId).hasClass('itmNA'))
       innerHTML += '<div class="oraddns">';     
    else
        innerHTML += '<div class="ttlorad">';
     
    //if(!$("#priceCont_"+orderDtlId).hasClass('APS')){
    if(!$("#priceCont_"+orderDtlId).hasClass('APS') && !$("#priceCont_"+orderDtlId).hasClass('itmNA')){
        innerHTML += '<span class="rs"></span>';
    }
    innerHTML += '<span class="itmTotal">'+subTot+'</span></div>';
    
    
    
     
    $("#priceCont_"+orderDtlId).empty().html(innerHTML);
     
    var subTotal = 0;
    var apsNaStr = ''; 
     
    $('.itmTotal').each(function(i)
    {    
        var txt = $.trim($(this).text());
        if(txt == 'APS**'){
            subTotal += 0;
            apsNaStr += ' + ' + txt + '';
        }
        else if(txt == 'N / A*'){
            subTotal += 0;
            apsNaStr = '<span style="display:inline-block"> + ' + txt + '</span>';
        }
        else{ 
            //subTotal += parseFloat($(this).text());
            subTotal += parseFloat(txt);
        }
    });
        
    subTotal = parseFloat(subTotal);
    subTotal = subTotal.toFixed(2);
     
    var total = 0;
     
     
    var dlchrg =  (isNaN(parseFloat($("#dlchrg").text()))) ? 0 : parseFloat($("#dlchrg").text()); 
    var pckindelflg = (isNaN(parseFloat($("#pckindelflg").val()))) ? 0 : parseFloat($("#pckindelflg").val());
    var pckinFlg = (isNaN(parseFloat($("#pckinFlg").val()))) ? 0 : parseFloat($("#pckinFlg").val());
    var pckinTaxPerc = (isNaN(parseFloat($("#pckinPerc").val()))) ? 0 : parseFloat($("#pckinPerc").val());
    var servTaxPerc = (isNaN(parseFloat($("#taxPerc").val()))) ? 0 : parseFloat($("#taxPerc").val());
    var vatPerc = (isNaN(parseFloat($("#vatPerc").val()))) ? 0 : parseFloat($("#vatPerc").val());
    //var servTax = (isNaN(parseFloat($("#servTax").text()))) ? 0 : parseFloat($("#servTax").text());
    
    if(pckinFlg == 1 && pckinTaxPerc >0){
            var packaging_charge= (pckinTaxPerc / 100) * subTotal;
                $("#pckgchrg").html(Math.round(packaging_charge));
    }else{
            var packaging_charge= 0;
    }
      
    $("#sbttl").html(Math.round(subTotal));
    
    switch (pckindelflg){
        case 1:
            if(pckinFlg == 1){
                subTotal= parseFloat(subTotal) + parseFloat(packaging_charge);
            }
                break;
        case 2:
            subTotal= parseFloat(subTotal) + parseFloat(dlchrg);
                break;
        case 3:
            subTotal= parseFloat(subTotal) + parseFloat(dlchrg) + parseFloat(packaging_charge);
                break;
    }
			
    var servTax =  (servTaxPerc / 100) * subTotal; 
     
    
    //var vat = (isNaN(parseFloat($("#vat").text()))) ? 0 : parseFloat($("#vat").text());
    var vat =  (vatPerc / 100) * subTotal;
    
    $("#servTax").text(Math.round(servTax));
    $("#vat").text(Math.round(vat));
    
    if(pckindelflg == '1'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat) + parseFloat(dlchrg);         
    }else if(pckindelflg == '2'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat) + parseFloat(packaging_charge);         
    }else if(pckindelflg == '3'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat); 
    }else{
        total = parseFloat(subTotal) + parseFloat(dlchrg) + parseFloat(servTax) + parseFloat(vat) + parseFloat(packaging_charge); 
    }
    
    
    
    total = Math.round(total);
    //total = total.toFixed(2);
     
    subTotal = "<b>" + subTotal + apsNaStr + "</b>";
     
     
    $("#tot").text(total);
    $("#totSmry").text(total);
   
         if(coupcode != "not applied" && coupcode != '' && coupcode != 'undefined' && coupcode != null )
    {
        $.ajax({
        url:WEBROOT+"functions/redeemResCoupons.php", 
        type:"get",
        datatype: "json",
        data:{
            'orderid': orderid,
            'action' : 'remove_coupon'
        },
        success:function(response){
                response = jQuery.parseJSON(response);	
                $('#discount_price').text(0);
                $('#rmv_spn').removeClass('dt').addClass('dn');
                $('#coupon_smry').removeClass('dn').addClass('dt');
                $('#actv-smry-redm-btn').removeClass('actv-smry-redm-btn_dsbld').addClass('actv-smry-redm-btn').attr('disabled',false);
                $('#coupcode').val('not applied');
                
            }
        });
    }
		
}



function customizeOrder(orderDtlId,flg){
    //flg==1 for coupons
//    if($('#min_del_flag').val() == '1')
//{
//    var total1=$('#tot').text();
//    var minamt=$('#min_amt').val();
//    var naddonflg=$('#isNAFlag').val();
//    var apscnt=$('#apscnt').val();
//    if((parseFloat(total1)  <  parseFloat(minamt)) && naddonflg != '1' && apscnt < '1')
//    {
//        var HREF = baseurl+'/menu-order';
//        window.location.href = HREF;
//    }
//}
    
    var itemIdArr = {};
    var qtyFlg = true;

    _ct('submit','ordsum',lnk_vid);
    
    if(orderDtlId)
    {
        var addonid = '';
        var naddonid = '';
        $('.iout'+"_"+orderDtlId).find(':radio').each(function(i)
        {    
            if( $(this).is(":checked") )
            {
                addonid += $("#"+$(this).attr('id')).val()+',';
            }
        }
        )
        $('.iout'+"_"+orderDtlId).find(':checkbox').each(function(i)
        {
            if( $(this).is(":checked") )
            {
                addonid += $("#"+$(this).attr('id')).val()+',';
            }
        }
        )
        addonid = addonid.slice(0, -1);
		
        $('.naddon'+"_"+orderDtlId).find(':checkbox').each(function(i)
        {
            if( $(this).is(":checked") )
            {
                naddonid += $("#"+$(this).attr('id')).val()+',';
            }
        })	
		
        $('.naddon'+"_"+orderDtlId).find(':radio').each(function(i)
        {
            if( $(this).is(":checked") )
            {
                naddonid += $("#"+$(this).attr('id')).val()+',';
            } 
        })
        naddonid = naddonid.slice(0, -1);
                
        itemIdArr[0] = {};
        itemIdArr[0]['orderDtlId'] = orderDtlId;
        itemIdArr[0]['itmId'] = $("#itmId_"+orderDtlId).val();
        itemIdArr[0]['addonIds'] = addonid;
        itemIdArr[0]['nestedIds'] = naddonid;
        itemIdArr[0]['qty'] = 1;
       
       if($.trim($("#instruction_"+orderDtlId).val()) == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
        {
            $("#instruction_"+orderDtlId).val('');
            
        }
        itemIdArr[0]['instruction'] = $("#instruction_"+orderDtlId).val();
                
        var quantity = $("#item_qty_"+orderDtlId).val();
                
                
        for(var k=1;k < parseInt(quantity);k++)
        {
            itemIdArr[k] = {};
            itemIdArr[k]['orderDtlId'] = '';
            itemIdArr[k]['itmId'] = $("#itmId_"+orderDtlId).val();
            itemIdArr[k]['addonIds'] = addonid;
            itemIdArr[k]['nestedIds'] = naddonid;
            itemIdArr[k]['qty'] = 1;
            itemIdArr[k]['instruction'] = $("#instruction_"+orderDtlId).val();
        }
                
                
        }
    else{
        var orderDtlLen = orderDtl.length;
       
        for(var i=0; i < orderDtlLen; i++)
        {
            var addonid = '';
            var naddonid = '';

            $('.iout'+"_"+orderDtl[i]).find(':radio').each(function(i)
            {    
                if( $(this).is(":checked") )
                {
                    addonid += $("#"+$(this).attr('id')).val()+',';
                }
            }
            )
            $('.iout'+"_"+orderDtl[i]).find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    addonid += $("#"+$(this).attr('id')).val()+',';
                }
            }
            )
            addonid = addonid.slice(0, -1);

            $('.naddon'+"_"+orderDtl[i]).find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    naddonid += $("#"+$(this).attr('id')).val()+',';
                }
            })	

            $('.naddon'+"_"+orderDtl[i]).find(':radio').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    naddonid += $("#"+$(this).attr('id')).val()+',';
                } 
            })
            naddonid = naddonid.slice(0, -1);

            //console.log("id-->"+$("#itmId_"+orderDtl[i]).val());
            //console.log("item_qty_"+orderDtl[i]);
            //console.log($("#instruction_"+orderDtl[i]).text());

            //console.log(addonid +"<>"+ naddonid);

            //console.log($("#itmId_"+orderDtl[i]).val());
            //itemIdArr[orderDtl[i]]['itmId'] =  $("#itmId_"+orderDtl[i]).val();

            itemIdArr[i] = {};
            itemIdArr[i]['orderDtlId'] = orderDtl[i];
            itemIdArr[i]['itmId'] = $("#itmId_"+orderDtl[i]).val();
            itemIdArr[i]['addonIds'] = addonid;
            itemIdArr[i]['nestedIds'] = naddonid;
            itemIdArr[i]['qty'] = $("#item_qty_"+orderDtl[i]).val();
            itemIdArr[i]['unit'] = $("#item_unit_"+orderDtl[i]).val();
            itemIdArr[i]['qtFlg'] = $("#qtFlg_"+orderDtl[i]).val();
            
            if(parseFloat($("#item_qty_"+orderDtl[i]).val()) <= 0.0 || $.trim($("#item_qty_"+orderDtl[i]).val()) == '' )
            {
                
               
               $("#item_qty_"+orderDtl[i]).focus();
               
               focusId = "item_qty_"+orderDtl[i];
                qtyFlg = false;
               
                 break;
                
            }
            
             if($.trim($("#instruction_"+orderDtl[i]).val()) == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
            {
                $("#instruction_"+orderDtl[i]).val('');

            }
            
            itemIdArr[i]['instruction'] = $("#instruction_"+orderDtl[i]).val();

        //                itemIdArr.push({ 'orderDtlId': orderDtl[i]} );
        //                itemIdArr.push({ 'itmId': $("#itmId_"+orderDtl[i]).val()} );
        //                itemIdArr.push({ 'addonIds': addonid} );
        //                itemIdArr.push({ 'nestedIds': naddonid} );
        //                itemIdArr.push({ 'qty':  $("#item_qty_"+orderDtl[i]).val()} );
        //                itemIdArr.push({ 'instruction':  $("#instruction_"+orderDtl[i]).text()} );
               
                
                
        
        }
        
        if(!qtyFlg)
        {
            openDiv('qtyVld');
           
            return false;
        }
    
    }
    
    var totAmt = $("#tot").text();
    // Min order Constraint 
    /*if(parseInt(totAmt) < parseInt(minOrdr) && !($('.APS').length > 0) && !($('.itmNA').length > 0) && tab != 'tblchkout')
    {
        $("#vldTxt").empty().html("<b>Minimum order amount is : <span class='rs'></span>"+parseInt(minOrdr)+"</b>");
        openDiv('qtyVld');
        return false;
    }*/
    

   
    $.post(WEBROOT+"functions/CustomizeOrder.php",{
        docid:$("#docid").val(),
        dataToSend:itemIdArr
    }, function(result){
        
        if(flg == 1)
        {
            redeemResCoupons();
            return false;
        }
        
        if(result){
            if(orderDtlId)
            {
				
                window.location.reload();
            }
            else{
				
		
                var lnCookie=getCookie('ln');
                var HREF = baseurl+'/checkoutorder?t=2';
                
                if ($.trim(lnCookie) != '')
                {
                    HREF = baseurl+'/checkoutorder?t=2';
                        
                }
                
                //document.cookie = 'smry_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;
                if(tab == 'tblchkout'){
                   
                    HREF = baseurl+'/tblchkout/4';
                    
                }
            
                window.location.href = HREF;
                
                
            }
            
            
            
        }
        
        
    });
    
    
    
    
    
    
    
}

function clsQty(){

    
    $("#"+focusId).focus();
    focusId = '';

}

function addOrderDetail(orderDetailId,delFlg,page){
	var addonid = '';
	var naddonid = '';
        
	var compulsory_cnt = $('#compulsory_cntr').val();
        
        if($("#addon_popup").is(":visible") && $.trim($('#item_qty').val()) == ''){
            alert("Please select the quantity");
            return false;
        }
    _ct('addtomyord',lnk_loc, lnk_vid);  
    for(i=0; i < compulsory_cnt; i++)
    {
        var Stype    = $('#compulsory_addon_Stype_'+i).val();
        var addoName = $('#compulsory_addon_name_'+i).val();
        
        
        var range    = $('#compulsory_counter_'+i).val().split("-");
        var start_range = range['0'];
        var end_range = range['1'];
        
        //alert(start_range+" and "+end_range);
        var cflag = false;
		
        for(var j= parseInt(start_range); j < parseInt(end_range) ; j++ )
        {
            
           
            if( Stype == 'S' )
            {
                if( $('#addon_radio_'+j).is(':checked') )
                {
                    cflag = true;
                    break;
                }
            }
            else if( Stype == 'M' )
            {
                if( $('#addon_checkbox_'+j).is(':checked') )
                {
                    cflag = true;
                    break;
                }				
            }
        }

        if(!cflag && delFlg != 1)
        {
            alert("Please select alteast one  addon from "+ addoName +" ");
            return false;
        }
    }
	
	if($('#grybox_total_price').text() || delFlg!='')
	{
		$('.iout').find(':radio').each(function(i)
		{    
			if( $(this).is(":checked") )
			{
				addonid += $("#"+$(this).attr('id')).val()+',';
			}
		}
		)
		$('.iout').find(':checkbox').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				addonid += $("#"+$(this).attr('id')).val()+',';
			}
		}
		)
		addonid = addonid.slice(0, -1);
		
		$('.naddon').find(':checkbox').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				naddonid += $("#"+$(this).attr('id')).val()+',';
			}
		})	
		
		$('.naddon').find(':radio').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				naddonid += $("#"+$(this).attr('id')).val()+',';
			} 
		})
		naddonid = naddonid.slice(0, -1);
		
	   var orderId  = '';
	   
	    if($.trim($("#instruction").val()) == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
            {
                $("#instruction").val('');

            }
	   
	   if($.trim(getCookie('orderId_'+MDOCIDJ)) == ''){
	   
			$.post(WEBROOT+"functions/ajxGenOrderId.php",function(res){
				
				if(res)
				{
		    var tmpAr = res.split("|~|");			
                    orderId = tmpAr[0];
                    var now = new Date();
                    var time = now.getTime();
                    time += 3600 * 1000;
                    now.setTime(time);
                    document.cookie = 
                        'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                        '; expires=' + now.toGMTString() + 
                        '; path=/' +
                        '; domain='+cookieondomain;
                    document.cookie = 
                        'inittm=' + escape(tmpAr[1]) + 
                        '; expires=' + now.toGMTString() + 
                        '; path=/' +
                        '; domain='+cookieondomain;
					
                    
                   
                    
                    $.post(WEBROOT+"functions/ajxAddOrderDetail.php",{
                        docid:$("#docid").val(),
                        itemid:$("#itemid").val(),
                        addonId:addonid,
                        naddonId:naddonid,
                        Instruction:$("#instruction").val(),
                        qty:$('#item_qty').val(),
                        orderDetailId:orderDetailId,
                        delFlg:delFlg,
                        orderId:orderId,
                        qtFlg:$('#item_qflg').val(),
                        unit:$('#item_unit').val(),
                        timeStamp: new Date().getTime()
                    }, function(result){
						if(typeof page != 'undefined' && page == 'checkout'){
												location.reload();
											}
						
						tempArr = result.split("|~$~|");
                                                
                                                
						itmContent = tempArr[1];
						priceContent = tempArr[3];
						mnmContent = tempArr[5];
                                                
                                                if($.trim(mnmContent) == '1')
                                                {
                                                    $("#chkoutBtn").removeClass('addsbl');
                                                    $("#chkoutBtn").show();
                                                    //$('#chkoutBtn').attr('onclick',redirectToSmry());
                                                     $('#chkoutBtn').click(redirectToSmry);
                                                    
                                                }
                                                else if($.trim(mnmContent) == '0'){
                                                     if($('#min_order_flag').val() == 1){
                                
                                                            $("#chkoutBtn").addClass('addsbl');
                                                            $("#chkoutBtn").show();
                                                            $('#chkoutBtn').attr('onclick','').unbind('click');

                                                        }
                                                        else{
                                                            $("#chkoutBtn").removeClass('addsbl');
                                                            $("#chkoutBtn").show();
                                                            $('#chkoutBtn').click(redirectToSmry);

                                                        }
                                                }
                                                else{
                                                        $("#chkoutBtn").hide();
                                                }
						
						
						
						closePopUp('ordSummry');
						
						$("#itms").empty().html(itmContent);
                                               
						
                                                 $("#mnDlvChrg").text($("#mnDlv").val());
						
						
                        //$("#priceCont").empty().html(priceContent);
						$(".edtdlvry").show();
                        //$("#priceCont").show();
                        //$("#mnm").empty().html(mnmContent);
                                               
                        //$("#mnm").show();
						if(typeof priceContent == 'undefined'){
							
							$("#priceCont").hide();
							$("#itmCont").addClass('idtlb');
						}
                                                
                                                 $("#itmCont").removeClass('idtlb');
                                                 if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){
                                                 
                                                    $("#chkoutBtn").removeClass('addsbl');
                                                    $("#chkoutBtn").show();
                                                    $('#chkoutBtn').click(redirectToSmry);
                                                    $('span.ordr').hide();
                                                     if(tab == 'tblchkout'){
                                                        $(".addmfy input").removeClass('addsbl');
                                                        $('.addmfy input').click(redirectToSmry);
                                                        if(typeof mnmContent == 'undefined'){
						                $("#chkoutBtn").hide();
                                                        }
                                                    }
                                                }
                                                else {
                                                     if($('#min_order_flag').val() == 1){
                                                        $('span.ordr').show();   
                                                       }
                                                       else{

                                                           $('span.ordr').hide();
                                                       }
                                                }
						
						/*if($("#itms").height() <= 320){
							
							$(".idtls").height($("#itms").height());
						}
						else
						{
							$(".idtls").height(320);
						}
						
						var divMenu = document.getElementById('itmCont');
						divMenu.fleXcroll.updateScrollBars();
						divMenu.fleXcroll.setScrollPos(false,0);*/
						
						if(tab == 'tblchkout'){
                                                    $("#edtdla").hide();
                                                    $("#chkoutBtn").val('Pre Order');
                                                    $(".addmfy input").val('Pre Order');
                                                }
											
					});
					
				}
					
			});

		}
		else
		{
                    if($(".edtdlvry").is(':visible')){ 
                        $('#displayOrder').css('position', 'relative'); 
                        $("#displayOrder_mask").height($("#displayOrder").height());
                        $("#displayOrder_mask").show();
                        var target = document.getElementById('displayOrder_mask');

                        var opts = {
                            lines: 5, // The number of lines to draw
                            length: 0, // The length of each line
                            width: 15, // The line thickness
                            radius: 15, // The radius of the inner circle
                            corners: 1, // Corner roundness (0..1)
                            rotate: 75, // The rotation offset
                            direction: 1, // 1: clockwise, -1: counterclockwise
                            color: '#fff', // #rgb or #rrggbb or array of colors
                            speed: 1, // Rounds per second
                            trail: 60, // Afterglow percentage
                            shadow: false, // Whether to render a shadow
                            hwaccel: false, // Whether to use hardware acceleration
                            className: 'spinner', // The CSS class to assign to the spinner
                            zIndex: 2e9, // The z-index (defaults to 2000000000)
                            top: '50%', // Top position relative to parent
                            left: '50%' // Left position relative to parent
                          };

                        var spinner = new Spinner(opts).spin(target);
                    }
				orderId = getCookie('orderId_'+MDOCIDJ);
				
            $.post(WEBROOT+"functions/ajxAddOrderDetail.php",{
                docid:$("#docid").val(),
                itemid:$("#itemid").val(),
                addonId:addonid,
                naddonId:naddonid,
                Instruction:$("#instruction").val(),
                qty:$('#item_qty').val(),
                orderDetailId:orderDetailId,
                delFlg:delFlg,
                orderId:orderId,
                qtFlg:$('#item_qflg').val(),
                unit:$('#item_unit').val(),
                timeStamp: new Date().getTime()
            }, function(result){
					
					if(typeof page != 'undefined' && page == 'checkout'){
										location.reload();
					}
					tempArr = result.split("|~$~|");
                                        
                                       
					
					itmContent = tempArr[1];
					priceContent = tempArr[3];
					mnmContent = tempArr[5];
                                        
                                        
                                        if($.trim(mnmContent) == '1')
                                        {
                                            $("#chkoutBtn").show();
                                            $("#chkoutBtn").removeClass('addsbl');
                                            // $('#chkoutBtn').attr('onclick',redirectToSmry());
                                             $('#chkoutBtn').click(redirectToSmry);
                                        }
                                        else if($.trim(mnmContent) == '0'){
                                             if($('#min_order_flag').val() == 1){
                                
                                                $("#chkoutBtn").addClass('addsbl');
                                                $("#chkoutBtn").show();
                                                $('#chkoutBtn').attr('onclick','').unbind('click');

                                            }
                                            else{
                                                $("#chkoutBtn").removeClass('addsbl');
                                                $("#chkoutBtn").show();
                                                $('#chkoutBtn').click(redirectToSmry);

                                            }
                                        }
                                        else{
                                            
                                                   $("#chkoutBtn").hide();
                                                   
                                           }
					
					closePopUp('ordSummry');
					
					$("#itms").empty().html(itmContent);
                                        
					 $("#mnDlvChrg").text($("#mnDlv").val());
					
                //$("#priceCont").empty().html(priceContent);
                //$("#priceCont").show();
                //$("#mnm").empty().html(mnmContent);
                                       
                //$("#mnm").show();
					if(typeof priceContent == 'undefined'){
						
						$("#priceCont").hide();
						$("#itmCont").addClass('idtlb');
					}
					$(".edtdlvry").show();
					$(".cnlprod").show();
                                        $("#itmCont").removeClass('idtlb');
                                        
                                        if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){
                                        
                                            $("#chkoutBtn").removeClass('addsbl');
                                            $("#chkoutBtn").show();
                                            $('#chkoutBtn').click(redirectToSmry);
                                            $('span.ordr').hide();
                                             if(tab == 'tblchkout'){
                                                $(".addmfy input").removeClass('addsbl');
                                                $('.addmfy input').click(redirectToSmry);
                                                if(typeof mnmContent == 'undefined'){
						
                                                        $("#chkoutBtn").hide();
                                                }
                                            }
                                        }
                                        else {
                                             if($('#min_order_flag').val() == 1){
                                                $('span.ordr').show();   
                                               }
                                               else{

                                                   $('span.ordr').hide();
                                               }
                                        }
                                        
                                         if($("#mrOrder").is(':visible')){
                            
                                          viewAllItms();

                                        }       
					
					/*if($("#itms").height() <= 320){
						
						$(".idtls").height($("#itms").height());
					}
					else{
						$(".idtls").height(320);
					}
					
					var divMenu = document.getElementById('itmCont');
					divMenu.fleXcroll.updateScrollBars();
					divMenu.fleXcroll.setScrollPos(false,0);*/
					
					 var ckflg = 0;
					$('.scls').each(function(i)
					{
					   
					   if($(this).val() == 0 || $.trim($(this).val()) == ''){
						   
						   ckflg = 1;
						   return false;
					   }

					})
				   
					if(ckflg == 1){
						 $("#chkoutBtn").addClass('addsbl');
						$("#chkoutBtn").show();
						$('#chkoutBtn').attr('onclick','').unbind('click');
                                              
					}
					
					
					if(tab == 'tblchkout'){
                                            $("#edtdla").hide();
                                            $("#chkoutBtn").val('Pre Order');
                                            $(".addmfy input").val('Pre Order');
                                        }
                                        if($("#displayOrder_mask").is(':visible')){ 
                                            $("#displayOrder_mask").hide();
                                            spinner.stop();
                                        }
                         	});		
		}
		
		
		if(!delFlg){
		//$('#addon_popup').bPopup().close();
		closeDiv('addon_popup');
		}
    }
	else
	{
		alert("Please select atleast one option");
	}
        
        if(page == 'allItms')
        {
            viewAllItms();
            divFlg = 0;
        }
        
}

	function validateEdtAddr()
	{
		var address = '';
        var stdcode = '';
        var landline = '';
        var bldg = '';
		var location = '';
		var landmark = '';
		var name = $.trim($('#ptxtName').val());
		var pincode = $.trim($('#ptxtPin').val());
		var email = $.trim($('#ptxtEmail').val());
		var mobile = $.trim($('#ptxtMobile').val());
		var arFlg = $.trim($('#pflgArea').val());
		var pattern_name = /^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/
		var isValid = true;
		
		if($('#ptxtAddress').length)
			 address = $.trim($('#ptxtAddress').val());
			
		if($('#ptxtLocation').length)
		{	 
			var stdcode = $.trim($('#ptxtLandstd').val());
			var landline = $.trim($('#ptxtLandnum').val());
			var bldg = $.trim($('#ptxtbldg').val());
			var location = $.trim($('#ptxtLocation').val());
			var landmark = $.trim($('#ptxtLandmark').val());
		}
		
		if($('#ptxtLandstd').length && $('#ptxtLandnum').length){
		    var stdcode = $.trim($('#ptxtLandstd').val());
		    var landline = $.trim($('#ptxtLandnum').val());
		}
		
    
		if(arFlg == '0' && $('#pchkoutArea').length)
		{
			$('#pchkoutArea').next().show();
			
			var part = ($("#isreg").val() == 5) ? "retailer" : 'restaurant' ;
			
			$('#pchkoutArea').next().text('Sorry, this '+part+ ' does not deliver here. Please try some other area or select another '+part+ ' .');
			isValid = false;
		}
		if(name == '' || name == 'e.g. Vipul Shah')
		{
			$('#ptxtName').next().show();
			$('#ptxtName').next().text('Please enter a name');
			isValid = false;
		}
		else if(!pattern_name.test(name))
		{
			$('#ptxtName').next().show();
			$('#ptxtName').next().text('Please enter a valid name');
			isValid = false;
		}
		else
		{
			$('#ptxtName').next().text('');
		}
		if($('#ptxtAddress').length)
		{
			if(address == '' ||  address == 'e.g. A - Wing 208, Royal Apartment, M. G Road Near BSNL')
			{
				$('#ptxtAddress').next().show();
				$('#ptxtAddress').next().text('Please enter a address');
				isValid = false;
			}
			else
			{
				$('#ptxtAddress').next().text('');
			}
		}
		
		/*if(location == '' || location == 'e.g. Silver Park')
		{
			$('#ptxtLocation').next().show();
			$('#ptxtLocation').next().text('Please enter a location');
			isValid = false;
		}
		else
		{
			$('#ptxtLocation').next().text('');
		}*/
		if(typeof(domId) != 'undefined' && domId != '' && pincode == '')
		{
			$('#txtPin').val('');
		}
		else if(pincode == '' || pincode =='e.g. 400064' || parseInt(pincode)==0)
		{
			$('#ptxtPin').next().show();
			$('#ptxtPin').next().text('Please enter a pincode');
			isValid = false;
		}
		else if(pincode != '')
		{   
			if(pincode.length != 6  || pincode == '000000')
			{
				$('#ptxtPin').next().show();
				$('#ptxtPin').next().text('Please enter a valid pincode');
				isValid = false;
			}
			else
			{
				$('#ptxtPin').next().text('');
			}
		}
		else
		{
			$('#ptxtPin').next().text('');
		}
		if(email == '' || email == 'e.g. john@aol.com')
		{
			$('#txtEmail').val('');
		}
		else if(email != '')
		{
			var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if( !pattern.test(email))
			{
				$('#ptxtEmail').next().show();
				$('#ptxtEmail').next().text('Please enter a valid email address');
				isValid = false;
			} 
			else
			{
				$('#ptxtEmail').next().text('');
			}
		}
		else
		{
			$('ptxtEmail').next().text('');
		}
		if(mobile == '' || mobile == 'e.g. 7812207587')
		{
			 $('#ptxtMobile').next().show();
			$('#ptxtMobile').next().text('Please enter a mobile number');
			isValid = false;
		}
		if(!validateMobile(mobile))
		{
				$('#ptxtMobile').next().show();
				$('#ptxtMobile').next().text('Please enter a valid mobile number');
				isValid = false;
		}  
		else 
		{
			$('#ptxtMobile').next().text('');
		} 
                
		if(parseInt(stdcode.length) > 0 && parseInt(landline.length) > 0)
		{
			if(stdcode  == "e.g. 022" || landline == "e.g. 2888888888")
			{
			   $(".plandline").find(".error").hide();
			   $(".plandline").find(".error").text("");
			}
			else
			{
			   if(isNaN(stdcode) || parseInt(stdcode) == 0)
			   {
					   $(".plandline").find(".error").show();
					   $(".plandline").find(".error").text('Please enter a valid std code');
					   isValid = false;
			   }
			   if(isNaN(landline) || parseInt(landline) == 0)
			   {
					   $(".plandline").find(".error").show();
					   $(".plandline").find(".error").text('Please enter a valid landline number');
					   isValid = false;
			   }
			   var alphaExp = /^[0-9]+$/;
			   if(!stdcode.match(alphaExp))
			   {
					  $(".plandline").find(".error").show();
					   $(".plandline").find(".error").text('Please enter a valid std code');
					  isValid = false;
			   }
			   if(!landline.match(alphaExp))
			   {
					  $(".plandline").find(".error").show();
					  $(".plandline").find(".error").text('Please enter a valid landline number');
					  isValid = false;
			   }
			}
		}
                if($.trim($('#tgad_otr_val_edt').val()) != ''){
                    
                    var addrTag = $.trim($('#tgad_otr_val_edt').val());                                    
                    if( !addrTag.match(/^[a-zA-Z ]*$/) ) {
                        $('#tgad_otr_val_edt_err').show();
                        $('#tgad_otr_val_edt_err').text('Please enter valid tag');
                        isValid = false;
                    }else{
                        $('#tgad_otr_val_edt_err').text('');
                    }
                }else{
                    $('#tgad_otr_val_edt_err').text('');
                }
		
		if(isValid)
		{
			
			if(landmark == 'e.g. Opp HDFC Atm')
			{
				$('#ptxtLandmark').val('');
			}          
			if(stdcode  == "e.g. 022" || landline == "e.g. 2888888888")
			{
				$('#ptxtLandstd').val('');
				$('#ptxtLandnum').val('');
			}
			if(bldg == 'e.g. Sandeep Residency')
			{
				$('#ptxtbldg').val('');
			}
			if(location == 'e.g. Silver Park')
			{
				$('#ptxtLocation').val('');
			}	            
		}

		return isValid;
	}

function validateAddress()
{
    var name = $.trim($('#txtName').val());
    name = name.replace(/ +(?= )/g,'');
    $('#txtName').val(name);
	var bldg = $.trim($('#txtbldg').val());
    var location = $.trim($('#txtLocation').val());
    var pincode = $.trim($('#txtPin').val());
    var landmark = $.trim($('#txtLandmark').val());
    var email = $.trim($('#txtEmail').val());
    var mobile = $.trim($('#txtMobile').val());
    var passwd = $.trim($('#passwd').val());
    var arFlg = $.trim($('#flgArea').val());
    var Area = $.trim($('#txtArea').val());
    var stdcode = $.trim($('#txtLandstd').val());
    var landline = $.trim($('#txtLandnum').val());
	var domId = $.trim($('#domId').val());
	var addresspattern1 = /^[\w\s\-_\/,()' ]+$/g;
	var addresspattern2 = /^[\w\s\-_\/,()' ]+$/g;
    
    var pattern_name = /^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/
    var isValid = true;
    if($.trim($('#type_flag').val()) != 64 && $.trim($('#type_flag').val()) != '64' && $.trim($('#type_flag').val()) != 4096 && $.trim($('#type_flag').val()) != '4096' && $.trim($('#type_flag').val()) != 16384 && $.trim($('#type_flag').val()) != '16384' && $.trim($('#type_flag').val())!='' && $.trim($('#type_flag').val())!=undefined && $('#type_flag').val()!="131072" && $('#type_flag').val()!="512" && $('#type_flag').val()!="8192" && $('#type_flag').val()!="33554432" && $('#type_flag').val()!="1073741824")
	{

	if ($.trim($('#domId').val()) != '')
	{
		var strg = $('#chkoutArea').val().trim();
		strg = strg.replace(/[[\]{}()*+?.,\\^$|#]+/g,'');
		strg = strg.replace(/\-/g,' ');
		strg = strg.replace(/\'/g,'');
		strg = strg.replace(/[\s+]+/g,' ');
	}
    var arpass = 0;
    var arpass2 = 0;
    var arpassflg = false;
    $.ajax({
            url:WEBROOT+"webmain/ajxmain.php", 
            dataType:"json",
            async : false,
            data :{
                    cases : 'dlarea',
                    search : '',
                    type : 'all',
                    city : ''+ $('#city').val()+'',
                    docId : $("#docid").val(),
					domId : $('#domId').val(),
                    active : 1,
                    domareasearch : ''+strg+''
            },
            async:false, 
            success:function(result){
                $('#chkoutArea').next().text(''); 
   
                $(result.results).each( function(i,val)
               {
                  var needle = val.value;
                  needle = needle.replace(/^At /,'');
                  needle = needle.toLowerCase();

                  var haystacka = $("#txtbldg").val().toLowerCase();
                  var haystackb = $("#txtLocation").val().toLowerCase();
					if(domId != ''){
						var haystackc = $("#txtLandmark").val('');
					} else {
						var haystackc = $("#txtLandmark").val().toLowerCase();
					}
                  var haystackd = $("#chkoutArea").val().replace(/^At /,'');
                  haystackd = haystackd.toLowerCase();
   
                  if(strstr(haystacka, needle) !=  false || strstr(haystackb, needle) !=  false || strstr(haystackc, needle) !=  false){
                      arpass++;
                  }
                  
                  if($.trim(haystackd) == $.trim(needle)){
                      
                       arpass2++;
                  }
                  
                  

               })
            }
    });

    if(arpass > 0 || arpass2 > 0){
        arpassflg = true;
        arFlg = 1;
    }
    
    if(arFlg == '0' || !arpassflg)
    {
        $('#chkoutArea').next().show();
        
        var part = ($("#isreg").val() == 5) ? "retailer" : 'restaurant' ;
        
        $('#chkoutArea').next().text('Sorry, this '+part+ ' does not deliver here. Please try some other area or select another '+part+ ' .');
        isValid = false;
    }
    }
    if(name == '' || name == 'e.g. Vipul Shah')
    {
        $('#txtName').next().show();
        $('#txtName').next().text('Please enter a name');
        isValid = false;
	}
	else if(!pattern_name.test(name))
    {
        $('#txtName').next().show();
        $('#txtName').next().text('Please enter a valid name');
        isValid = false;
    }
    else
    {
        
        $('#txtName').next().text('');

    }

	if((bldg != '' && domId != '' && bldg != 'e.g. Sandeep Residency' && domId != '') && (!addresspattern1.test(bldg)))
    {
		$('#txtbldg').next().show();
		$('#txtbldg').next().text('Please enter valid Flat No/Bldg No');
		isValid = false;
	}
	else
	{
		$('#txtbldg').next(".error").hide();
	}

	if((location != '' && domId != '' && location != 'e.g. Silver Park' && domId != '') && (!addresspattern2.test(location)))
	{
		$('#txtLocation').next().show();
		$('#txtLocation').next().text('Please enter valid Bldg Name/Society Name');
		isValid = false;
	}
	else
	{
		$('#txtLocation').next(".error").hide();
	}
	//~ if(bldg != '' && domId != '' || bldg == '' && domId != '' || bldg == 'e.g. Sandeep Residency' && domId != '')
	//~ {
		//~ if (bldg == '' || bldg == 'e.g. Sandeep Residency'){
			//~ $('#txtbldg').next().show();
			//~ $('#txtbldg').next().text('Please enter your Flat/House No');
			//~ isValid = false;
		//~ } else if (bldg != ''){
			//~ var myLength = $("#txtbldg").val().length;
			//~ if (myLength > 10){
				//~ $('#txtbldg').next().show();
				//~ $('#txtbldg').next().text('Bldg/Apartment can contain 10 characters');
				//~ isValid = false;
			//~ } else {
			//~ $('#txtbldg').next(".error").hide();
			//~ }
		//~ }
		//~ else
		//~ {
			//~ $('#txtbldg').next().text('');
		//~ }
	//~ }
	/*else if(bldg == '' || bldg == 'e.g. Sandeep Residency')
    {
        $('#txtbldg').next().show();
        $('#txtbldg').next().text('Please enter your Building/Apartment');
        isValid = false;
    }
    else
    {
        $('#txtbldg').next().text('');
    }*/

	//~ if(location != '' && domId != '' || location == 'e.g. Silver Park' && domId != '' || domId != '' && location == '')
	//~ {
		//~ if (location == 'e.g. Silver Park' || location == ''){
			//~ $('#txtLocation').next().show();
			//~ $('#txtLocation').next().text('Please enter your Street/Society Name');
			//~ isValid = false;
		//~ } else if (location != ''){
			//~ var myLengthLoc = $("#txtLocation").val().length;
			//~ if (myLengthLoc > 50){
				//~ $('#txtLocation').next().show();
				//~ $('#txtLocation').next().text('Street/Location can contain 50 characters');
				//~ isValid = false;
				//~ } else {
				//~ $('#txtLocation').next(".error").hide();
			//~ }
		//~ }
		//~ else
		//~ {
			//~ $('#txtLocation').next().text('');
		//~ }
	//~ }
    if($.trim($('#type_flag').val()) == '64' || $('#type_flag').val() == "512" || $('#type_flag').val()=="131072" || $('#type_flag').val()=="33554432" ||  $('#type_flag').val()=="8192" || $.trim($('#type_flag').val()) == '16384' || $.trim($('#type_flag').val()) == '4096')
    {
		if(location == '' || location == 'e.g. A - Wing 208, Royal Apartment, M. G Road Near BSNL')
		{
			$('#txtLocation').next().show();
			$('#txtLocation').next().text('Please enter address');
			isValid = false;
		}		
		else
		{
			$('#txtLocation').next().text('');
		}
	}
	if(domId != '' && pincode == '')
	{
		$('#txtPin').val('');
	}
    else if(pincode == '' || pincode =='e.g. 400064' || parseInt(pincode)==0)
    {       
        $('#txtPin').next().show();
        $('#txtPin').next().text('Please enter a pincode');
        isValid = false;
    }
    else if(pincode != '')
    {
		   if(pincode.length != 6  || pincode == '000000')
		{
                     $('#txtPin').next().show();
				$('#txtPin').next().text('Please enter a valid pincode');
				isValid = false;
		}
		 else if($.trim($('#type_flag').val()) == '64' || $('#type_flag').val() == "512" || $('#type_flag').val()=="131072" || $('#type_flag').val()=="33554432" || $('#type_flag').val()=="8192" || $.trim($('#type_flag').val()) == '16384' || $.trim($('#type_flag').val()) == '4096')
		{
			if($('#txtCity').val()=='')
			{
			//$('#txtPin').next().text('Sorry, '+$("#cn").val()+' does not service in '+$.trim($("#txtPin").val())+'. Please try some other pincode.');
			$('#txtPin').next().text('Please try some other pincode.');
			$('#txtPin').next().show();
			isValid = false;
			}
		}
			else
		{
				$('#txtPin').next().text('');
		}
   	}
    else
    {
        $('#txtPin').next().text('');
    }

	if(email == '' && domId != '' || email != '' && domId != '' || domId != '' && email == 'e.g. john@aol.com')
    {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if( !pattern.test(email))
        {
            $('#txtEmail').next().show();
            $('#txtEmail').next().text('Please enter a valid email address');
            isValid = false;
        }
        else
        {
            $('#txtEmail').next().text('');
        }
    }
    else if(email == '' || email == 'e.g. john@aol.com')
    {
        $('#txtEmail').val('');
        /*$('#txtEmail').next().show();
        $('#txtEmail').next().text('Please enter an email address');   
        isValid = false;*/
    }
    else if(email != '')
    {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if( !pattern.test(email))
        {
            $('#txtEmail').next().show();
            $('#txtEmail').next().text('Please enter a valid email address');
            isValid = false;
        } 
        else
        {
            $('#txtEmail').next().text('');
        }
    }
    else
    {
        $('txtEmail').next().text('');
    }
    
    if(mobile == '' || mobile == 'e.g. 7812207587')
    {
         $('#txtMobile').next().show();
        $('#txtMobile').next().text('Please enter a mobile number');
        isValid = false;
    }
    if(!validateMobile(mobile))
	{
            $('#txtMobile').next().show();
            $('#txtMobile').next().text('Please enter a valid mobile number');
            isValid = false;
	}
       
    else {
        $('#txtMobile').next().text('');
    } 
    
    if(typeof($('#passwd').val()) != 'undefined'){
		if(passwd == '')
		{
                        $('#passwd').next().show();
			$('#passwd').next().text('Please enter password');
			isValid = false;
			
			
		}
		else
		{
            $.ajax({
                url:WEBROOT+"functions/ajxUserSignUp.php", 
                type: "post",
                data :{
                    'mobile' : mobile,
                    'case' : '1'
                },
                async:false, 
                success:function(res){
			
				
				if(res == 'REGISTERED' || res == 'EXISTS')
				{
					
					isValid = false;
                                        $('#passwd').next().show();
					$('#passwd').next().text('User already exists');
					
					
				}
				
				
                }
            });
			
			
		
			
		}    
	}
        
	if($('#type_flag').val()=="1073741824")
	//if($.trim($('#type_flag').val()) == '64' || $('#type_flag').val() == "512" || $('#type_flag').val() == "8192" || $('#type_flag').val() == "4096" || $('#type_flag').val() == "16384" || $('#type_flag').val()=="131072" || $('#type_flag').val()=="33554432" || $('#type_flag').val()=="1073741824")
	{
		if(Area == '' || Area == 'e.g. Malad West')
		{
			$('#txtArea').next().show();
			$('#txtArea').next().text('Please enter your Area');
			isValid = false;
		}
		else if(arFlg=='0')
		{
			isValid = false;
		}
		else
		{
			$('#txtArea').next().text('');
		}
	}
        
       if(parseInt(stdcode.length) > 0 && parseInt(landline.length) > 0){
           
       
            if(stdcode  == "e.g. 022" && landline == "e.g. 28888888"){
                 $(".landline").find(".error").hide();
                 $(".landline").find(".error").text("");


            }
            else{

                if(isNaN(stdcode) || parseInt(stdcode) == 0)
                {
                        $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid std code');
                        isValid = false;
                }
                if(isNaN(landline) || parseInt(landline) == 0)
                {
                        $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid landline number');
                        isValid = false;
                }
                var alphaExp = /^[0-9]+$/;
                if(!stdcode.match(alphaExp))
                {
                       $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid std code');
                       isValid = false;
                }
                if(!landline.match(alphaExp))
                {
                       $(".landline").find(".error").show();
                       $(".landline").find(".error").text('Please enter a valid landline number');

                       isValid = false;
                }


            }
        
        }
        
        if(isValid)
        {
            if(landmark == 'e.g. Opp HDFC Atm')
            {
                $('#txtLandmark').val('');
            }
            
             if(stdcode  == "e.g. 022" && landline == "e.g. 28888888"){
               
                $('#txtLandstd').val('');
                $('#txtLandnum').val('');
            
            }
            if(bldg == 'e.g. Sandeep Residency')
			{
				$('#txtbldg').val('');
			}
			if(location == 'e.g. Silver Park')
			{
				$('#txtLocation').val('');
				
			} 
            
        }
       
       if(isValid == false && ($.trim($('#type_flag').val()) == '64' || $('#type_flag').val() == "512" || $('#type_flag').val()=="131072" || $('#type_flag').val()=="33554432" || $('#type_flag').val()=="8192" || $.trim($('#type_flag').val()) == '16384' || $.trim($('#type_flag').val()) == '4096')){
		if($('#popsubmit').length > 0){
			$('#popsubmit').removeClass('loader_blue_vertical');
			$('#popsubmit').val('Submit');
		}
		else{	
			$('#btSubmit').removeClass('loader_blue_vertical');
			$('#btSubmit').val('Submit');
		}	
	   }	
       
	return isValid;
		
	   
    
    
}

function validateAddress_food()
{
    var name = $.trim($('#txtName').val());
    name = name.replace(/ +(?= )/g,'');
    $('#txtName').val(name);
    var location = $.trim($('textarea#txtLocation').val());
    var pincode = $.trim($('#txtPin').val());
    var email = $.trim($('#txtEmail').val());
    var mobile = $.trim($('#txtMobile').val());
    var passwd = $.trim($('#passwd').val());
     var arFlg = $.trim($('#flgArea').val());
     	var bldg = $.trim($('#txtbldg').val());
    var landmark = $.trim($('#txtLandmark').val());
    var stdcode = $.trim($('#txtLandstd').val());
    var landline = $.trim($('#txtLandnum').val());
    

    var pattern_name = /^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/
    var isValid = true;
    
    if(name == '' || name == 'e.g. Vipul Shah')
    {
        $('#txtName').next().show();
        $('#txtName').next().text('Please enter a name');
        isValid = false;
	}
	else if(!pattern_name.test(name))
    {
        $('#txtName').next().show();
        $('#txtName').next().text('Please enter a valid name');
        isValid = false;
    }
    else
    {
        
        $('#txtName').next().text('');

    }
	
	

	
		if (location == 'e.g. Silver Park' || location == ''){
			$('#txtLocation').next().show();
			$('#txtLocation').next().text('Please enter your Address');
			isValid = false;
		} else if (location != ''){
                    			$('#txtLocation').next().text('');
			/*
                        var myLengthLoc = $("textarea#txtLocation").val().length;
			if (myLengthLoc > 50){
				$('textarea#txtLocation').next().show();
				$('textarea#txtLocation').next().text('Street/Location can contain 50 characters');
				isValid = false;
				} else {
				$('textarea#txtLocation').next(".error").hide();
			} */
		}
		else
		{
			$('#txtLocation').next().text('');
		}
	
   
	if(pincode == '' || pincode =='e.g. 400064' || parseInt(pincode)==0)
    {       
        $('#pinCont').next().show();
        $('#pinCont').next().text('Please enter a pincode');
        isValid = false;
    }
    else if(pincode != '')
    {  
	if(pincode.length != 6  || pincode == '000000'){
                $('#pinCont').next().show();
                $('#pinCont').next().text('Please enter a valid pincode');
                isValid = false;
        }else{
            var not_in_pins=1;
            for(var j=0; j < allPins.length; j++){
                if(pincode == allPins[j]){
                    not_in_pins=0;     
                }
            }
            $('#pflag').val(not_in_pins);
            $('#pinCont').next().text('');
            /*
            if(not_in_pins == 1){
                $('#pinCont').next().show();
                $('#pinCont').next().text('The Restaurant does not deliver in this pincode');
                isValid = false;
            }else{
        	$('#pinCont').next().text('');
            }*/
        }
    }else{
        $('#pinCont').next().text('');
    }
    

    if(email == '' || email == 'e.g. john@aol.com')
    {
        $('#txtEmail').val('');
        $('#txtEmail').next().hide();
        /*$('#txtEmail').next().text('Please enter an email address');   
        isValid = false;*/
    }
    else if(email != '')
    {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if( !pattern.test(email))
        {
            $('#txtEmail').next().show();
            $('#txtEmail').next().text('Please enter a valid email address');
            isValid = false;
        } 
        else
        {
            $('#txtEmail').next().text('');
        }
    }
    else
    {
        $('txtEmail').next().text('');
    }
    
    if(mobile == '' || mobile == 'e.g. 7812207587')
    {
         $('#txtMobile').next().show();
        $('#txtMobile').next().text('Please enter a mobile number');
        isValid = false;
    }
    if(!validateMobile(mobile))
	{
            $('#txtMobile').next().show();
            $('#txtMobile').next().text('Please enter a valid mobile number');
            isValid = false;
	}
       
    else {
        $('#txtMobile').next().text('');
    } 
    
    if(typeof($('#passwd').val()) != 'undefined'){
		if(passwd == '')
		{
                        $('#passwd').next().show();
			$('#passwd').next().text('Please enter password');
			isValid = false;
			
			
		}
		else
		{
            $.ajax({
                url:WEBROOT+"functions/ajxUserSignUp.php", 
                type: "post",
                data :{
                    'mobile' : mobile,
                    'case' : '1'
                },
                async:false, 
                success:function(res){
			
				
				if(res == 'REGISTERED' || res == 'EXISTS')
				{
					
					isValid = false;
                                        $('#passwd').next().show();
					$('#passwd').next().text('User already exists');
					
					
				}
				
				
                }
            });
			
			
		
			
		}    
	}
        
        
       if(parseInt(stdcode.length) > 0 && parseInt(landline.length) > 0){
           
       
            if(stdcode  == "e.g. 022" && landline == "e.g. 28888888"){
                 $(".landline").find(".error").hide();
                 $(".landline").find(".error").text("");


            }
            else{

                if(isNaN(stdcode) || parseInt(stdcode) == 0)
                {
                        $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid std code');
                        isValid = false;
                }
                if(isNaN(landline) || parseInt(landline) == 0)
                {
                        $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid landline number');
                        isValid = false;
                }
                var alphaExp = /^[0-9]+$/;
                if(!stdcode.match(alphaExp))
                {
                       $(".landline").find(".error").show();
                        $(".landline").find(".error").text('Please enter a valid std code');
                       isValid = false;
                }
                if(!landline.match(alphaExp))
                {
                       $(".landline").find(".error").show();
                       $(".landline").find(".error").text('Please enter a valid landline number');

                       isValid = false;
                }


            }
        
        }
        if($.trim($('#tgad_otr_val').val()) != ''){
            var addrTag = $.trim($('#tgad_otr_val').val());                                    
            if( !addrTag.match(/^[a-zA-Z ]*$/) ) {
                $('#tgad_otr_val_err').show();
                $('#tgad_otr_val_err').text('Please enter valid tag');
                isValid = false;
            }else{
                $('#tgad_otr_val_err').text('');
            }
        }else{
                $('#tgad_otr_val_err').text('');
        }
        if(isValid)
        {
            if(bldg == 'e.g. Sandeep Residency')
            {
                $('#txtbldg').val('');
            }
            if(landmark == 'e.g. Opp HDFC Atm')
            {
                $('#txtLandmark').val('');
            }
            if(stdcode  == "e.g. 022" && landline == "e.g. 28888888"){
                $('#txtLandstd').val('');
                $('#txtLandnum').val('');
            }
            if(location == 'e.g. Silver Park')
            {
                    $('textarea#txtLocation').val('');

            } 
            
        }
       
	return isValid;    
}

function enterAddress(vcode,newUserFlg,usethis,objId)
{
    var address_type = '';
    var addrTag = '';
    var jduid = '';
    
	if ($.trim($('#domId').val()) != '')
	{
		var domcookieid = $.trim($('#domId').val());
		var dominos = 'dominos';
		var verify = '';
		closeDiv('vercode');
		openDiv('dom_loader');
		var sub_type_flag = 4194304;
		var data_city = $.trim($('#domDataCity').val());
	}
	if(usethis == 1)
	{
		var keyArr = objId.split('_');
		var key = keyArr[1];
		if(typeof existAddresses[key] != 'undefined') 
		{
			var add = existAddresses[key];
			var name = $.trim(add['name']);
			var email = $.trim(add['email']);
			var mobile = $.trim(add['phone']);
			var bldg = $.trim(add['bldg']);
			var location = $.trim(add['street']);
			var pincode = $.trim(add['pincode']);
			var landmark = $.trim(add['landmark']);
			var area = add['area'];
			var stdcode = $.trim(add['stdcode']);
			var landline = $.trim(add['landline']);
			//var addrId = add['addressId'];
                        var address_type = $.trim(add['address_type']);
                        var addrTag = $.trim(add['addrTag']);
                        
		}
                $.ajax({
                    url:WEBROOT+"functions/ajxblacklisted.php",
                    dataType:"json", 
                    type: "post",
                    async: false,
                    data :{
                        mob:mobile
                    }, 
                    success:function(result)
                    {
                        if(result == "true"){
                            blackflag = 1;
                        }
                    }
                });     
                if(blackflag == 1){
                    openDiv('blacklist');
                    return false;
                }
	}
	else
	{
		var cas = '2';
		var name = $.trim($('#txtName').val());
		var bldg = $.trim($('#txtbldg').val());
		//var location = $.trim($('#txtLocation').val());
		   
		if($("#txtLocation").is('input')){
			var location = $.trim($('#txtLocation').val());
		}else{ 
			var location = $.trim($('textarea#txtLocation').val());
		}    
			
		if($("#txtPin").is('input')){
			var pincode = $.trim($('#txtPin').val());
		}
		else{
			var pincode = $('#txtPin :selected').val();
		}
		var landmark = $.trim($('#txtLandmark').val());
		var area = $.trim($('#chkoutArea').val());
		var email = $.trim($('#txtEmail').val());
		var mobile = $.trim($('#txtMobile').val());
		var stdcode = $.trim($('#txtLandstd').val());
		var landline = $.trim($('#txtLandnum').val());
		var addrId = $.trim($('#hdnAddrId').val());
	}
	var addflag = (onloadFn == 'prodcheckout') ? 1 : 0;
	var pflag = 0;
	var altphone = (onloadFn == 'prodcheckout') ? $.trim($('#altphone').val()) : 0;
        var iFlg = '';
        var typeflag = '';
	if(onloadFn == 'prodcheckout'){										//address_type=3 by default.
		if($.trim($('#addressTags').val()) == 'Home')
			address_type = 1;
		else if ($.trim($('#addressTags').val()) == 'Office')
			address_type = 2; 
		else if ($.trim($('#addressTags').val()) == 'Select' || $.trim($('#addressTags').val()) == 'Other')
			address_type = 3;
	}
	if(address_type == 3 && onloadFn == 'prodcheckout'){
		if($.trim($('#addressTags').val()) == 'Other')
				addrTag = $.trim($('#txtOthersTag').val());
			else
				addrTag = '';	
	}

	iFlg = (onloadFn == 'prodcheckout') ? ((getCookie('inLogMobile') == mobile) ? 0 : 1) : '';		//if altphone doesnot match entered mobile no., identifier flg is 1 else 0
	jduid = (onloadFn == 'prodcheckout') ? getCookie('inLogJdUID') : '';
	typeflag = (onloadFn == 'prodcheckout') ? $.trim($('#typeflag').val()) : '';
	
	if(($("#isreg").val() == 5 || $("#isreg").val() == 1) || $.trim($('#domId').val()) != ''){
		addflag = 1;
                jduid = getCookie('inLogJdUID');
                if(address_type == ''){
                    address_type = $.trim($('#address_type').val());
                }
                if($.trim($('#tgad_otr_val').val()) != '' && addrTag == ''){
                    addrTag = $.trim($('#tgad_otr_val').val());                    
                }
                
                typeflag = 8;
		pflag = $.trim($('#pflag').val());
	}
	
	// var landlineno = $.trim(stdcode)+$.trim(landline);
    

	var addDocid = (vertical=='shopfront')? $('#docid').val() : MDOCIDJ;
	var addrciti = (vertical=='shopfront')? $.trim($('#txtCity').val()) :$.trim($('#addrciti').val());
    
	$.ajax({
		url: WEBROOT + "functions/address.php",
		type: "POST",
		dataType:"json",
		data : {
			'name' : name, 
			'bldg' : bldg, 
			'location' : location, 
			'pincode' : pincode , 
			'landmark' : landmark,
			'area' : area , 
			'email' : email, 
			'mobile' : mobile,
			'addrId' : addrId, 
			'docid' : addDocid,
			'vertical' : vertical,
			'landline' : landline,
			'stdcode' : stdcode,
			'city' : addrciti,
			'timeStamp': new Date().getTime(),
			'dominos' : dominos,
			'verify' : verify,
			'domdocId' : $('#docid').val(),
			'domcity' : $('#city').val(),
			'flag' : addflag,
			'pflag': pflag,
            'altphone' : altphone,
            'address_type' : address_type,
            'jduid' : jduid,
            'addrTag' : addrTag,
            'identifier_flag' : iFlg,
            'type_flag' : typeflag,
            'sub_type_flag' : sub_type_flag,
            'data_city' : data_city
		},
		success : function(response)
		{	   
			//console.log(response);  
			//console.log(typeof response['results']['errorCode']);
			//console.log(response['results']['errorCode'] === '0');
			if(response['results']['errorCode'] == 5)
			{
				document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;
				window.location.href = baseurl+'/checkoutorder?t=4';
			}

			if(response['results']['errorCode'] == '4')
			{
				HREF = baseurl+'/checkoutorder?t=9';
				window.location.href = HREF;
				return false;
			}

            if(response['results']['errorCode'] == '3')
            {
				address_error  = response['results']['address_error'];
				if(address_error == "Store is not exist for this address"){
				  $("#error_msg").text('');
				  $("#address_error").text("Store is not exist for this address");
				}
				closeDiv('dom_loader');
				openDiv('add_error');
				$('#btnSubmit').removeAttr("disabled");
				return false;
			}

			if(response['results']['errorCode'] == '2')
			{
			  ver_msg  = response['results']['ver_msg'];
			  closeDiv('dom_ivr');
			  $("#verMobDom").html("<b>"+$.trim($('#txtMobile').val())+"</b>");
			  openDiv('dominos_vercode');
			  temp_domvar = 'open';
			  $('#btnSubmit').removeAttr("disabled");
			  return false;
			}

			if(response['results']['errorCode'] == '1')
			{
				HREF = baseurl+'/checkoutorder?t=8';
				window.location.href = HREF;
				return false;
			}

			if(response['results']['errorCode'] == '0')
			{
                $('#btnSubmit').removeAttr("disabled");    
                
                //var islogin = 0;
                //var isvendor = 0;
                var ismodified = 0;
                var orderId = getCookie('orderId_'+MDOCIDJ);
                var can_mdfy = 1;
                var has_cod = $("#has_cod").val();
                /*if($.trim(getCookie('ln')) != '' && $.trim(getCookie('attn_user')) != 'logout'){
                    islogin = 1;
                }
                if($.trim(getCookie('clid')) != ''){
                    isvendor = 1;
                }*/
                if($.trim(getCookie('mdfy_'+orderId)) != ''){
                    ismodified = 1;
                    can_mdfy = 0;
                    $.ajax({
                        url:WEBROOT+"functions/getstatus.php",
                        type: "post",
                        datatype : 'json',
                        async: false,
                        data :{
                            orderId:orderId,
                            flg:1
                        }, 
                        success:function(result){
                            if(result.results.modify == true){ 
                                can_mdfy = 1;
                            }
                        }
                    });
                }
                if(can_mdfy == 1){
                if(typeof($('#passwd').val()) != 'undefined' || newUserFlg == 1 || newUserFlg == 2)
                {
                    if(newUserFlg == 2){
                        cas = '3'
                    }
                    var passwd = '';
					if(typeof($('#passwd').val()) != 'undefined'){
                        passwd = $.trim($('#passwd').val());		  
                    }
                    $.ajax({
                        url:WEBROOT+"functions/ajxUserSignUp.php", 
                        type: "post",
                        data :{
                            'name':name,
                            'mobile' : mobile,
                            'email':email,
                            'pswd':passwd,
                            'vcode':vcode,
                            'case' : cas
                        }, 
                        success:function(res)
                        {
                        	var loginverified =1;
                        	if((onloadFn == "product_dt" || onloadFn == "Result" || onloadFn == "detailsPage") && vertical=='shopfront')
                        	{
                        		bestPrice(loginverified);
                        	}		
                        	else if(onloadFn == 'prodcheckout')
                        	{
                        		sbmt_deliAdd(loginverified);
                        	}
                        	else
                        	{
								document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;
								if($("#isreg").val() == 5 || $('#isNAFlag').val() || $.trim($('#clinum').val()) != '' || $('#apscnt').val() > 0){
									window.location.href = baseurl+'/checkoutorder?t=4';
								}
								else
								{
									if($("#paymentMode_delivery").val() == 1)
									{	
										//var orderId = getCookie('orderId_'+MDOCIDJ);

                                                                                    $.ajax({
                                                                                        url: WEBROOT + "functions/rest_pg.php",
                                                                                        type: "POST",
                                                                                        dataType:"json",
                                                                                        data : {
                                                                                            'orderId' : orderId,
                                                                                            'has_cod' : has_cod,
                                                                                            'baseurl':baseurl
                                                                                        },
                                                                                        success : function(resp_rest_pg)
                                                                                        {
                                                                                            if(resp_rest_pg.error_code == '0' && resp_rest_pg.error_msg == 'SUCCESS'){
                                                                                                $().redirect(PGDOMAIN, {'id': orderId });                 
                                                                                            }
                                                                                        }
                                                                                    });	
									}
									else
									{   
										window.location.href = baseurl+'/checkoutorder?t=4';
									}
								}
                        	}	
			
                        }
                    });	
				}
				else
				{
					
					var loginverified =1;
					if((onloadFn == "product_dt" || onloadFn == "Result" || onloadFn == "detailsPage") && vertical=='shopfront')
					{
						bestPrice(loginverified);
					}		
					else if(onloadFn == 'prodcheckout')
					{
						sbmt_deliAdd(loginverified);
					}
					else
					{
				        document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;                
				        //window.location.href = baseurl+'/checkoutorder?t=4';
				        
				       
				        if($("#isreg").val() == 5 || $('#isNAFlag').val() || $.trim($('#clinum').val()) != '' || $('#apscnt').val() > 0){
							window.location.href = baseurl+'/checkoutorder?t=4';
						}
						else
						{
							if($("#paymentMode_delivery").val() == 1 )
							{
                                                                                    $.ajax({
                                                                                        url: WEBROOT + "functions/rest_pg.php",
                                                                                        type: "POST",
                                                                                        dataType:"json",
                                                                                        data : {
                                                                                            'orderId' : orderId,
                                                                                            'has_cod' :has_cod,
                                                                                            'baseurl':baseurl
                                                                                        },
                                                                                        success : function(resp_rest_pg)
                                                                                        {
                                                                                            if(resp_rest_pg.error_code == '0' && resp_rest_pg.error_msg == 'SUCCESS'){                                              
                                                                                                $().redirect(PGDOMAIN, {'id': orderId });                 
                                                                                            }    
                                                                                        }
                                                                                    });	
							}
							else
							{
								window.location.href = baseurl+'/checkoutorder?t=4';
							}
						}
					}	
				}
                            }else{
                                
                                document.cookie = 
                                    'mdfy_'+orderId+'= ' + 
                                    '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
                                    '; path=/' +
                                    '; domain='+cookieondomain;
                                document.cookie = 
                                    'orderId_'+MDOCIDJ+'= ' + 
                                    '; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
                                    '; path=/' +
                                    '; domain='+cookieondomain;

                                $("#elpsTxt").html("<b>Time has elapsed to Modify this order. A Fresh Order will be placed by Editing this.</b>");
                                openDiv('elpse');
                                window.location.reload();
                            }    
			}
		}
	});
	
}
function validateVCode()
{
	var orderId = getCookie('orderId_'+MDOCIDJ);
	//var vcode = $.trim($('#smsvcode').val());
	var vcode = $.trim($('#smsvcode').val()+"-"+$('#smsvcode2').val());
	
    $.post(WEBROOT+"functions/verification.php",{
        'vcode':vcode,
        'orderId':orderId,
        'mobile':$.trim($('#txtMobile').val())
    }, function(res){
		if(res == '1')
		{
			$('#ibse_send').attr("disabled", true);
			var newUserFlg = 0;
			if($.trim(getCookie('ln')) == '' /*|| ($.trim(getCookie('inLogMobile')) != $.trim($('#txtMobile').val()))*/)
			{
				$.ajax({
					url:WEBROOT+"functions/ajxUserSignUp.php", 
					type: "post",
					data :{
						'mobile' : $.trim($('#txtMobile').val()),
						'emailId' : $.trim($('#txtEmail').val()),
						'case' : '1'
					},
					success:function(res){
						if(res == 'REGISTERED')
						{
							$.ajax({
								url:WEBROOT+"functions/login_log.php", 
								type: "post",
								dataType:"json",
								data :{
									'login' : $.trim($('#txtMobile').val()),
									'rest' : 1
								},
								async:false, 
								success:function(res2){
									if(res2.results[0].status == 'LOGINSUCCESS')
									{
										$.ajax({
											url:WEBROOT+"functions/VerifiedUser.php",
											dataType:"json", 
											type: "post",
											data :{
												mob:$.trim($('#txtMobile').val()),
												mode:'ins',
												timeStamp: new Date().getTime()
											}, 
											success:function(res){
												enterAddress(vcode,newUserFlg,'','');

											}
										});
									}
								}
							});
						}
						else
						{
							newUserFlg = 1;
							$.ajax({
								url:WEBROOT+"functions/VerifiedUser.php",
								dataType:"json", 
								type: "post",
								data :{
									mob:$.trim($('#txtMobile').val()),
									mode:'ins',
									timeStamp: new Date().getTime()
								}, 
								success:function(res){
									enterAddress(vcode,newUserFlg,'','');
								}
							});
						}
					}
				});
		
			}
			else
			{
				$.ajax({
					url:WEBROOT+"functions/VerifiedUser.php",
					dataType:"json", 
					type: "post",
					data :{
						mob:$.trim(getCookie('inLogMobile')),
						mode:'ins',
						timeStamp: new Date().getTime()
					}, 
					success:function(res){
						enterAddress(vcode);	
					}
				}); 
			}					
        }
		else
		{
			$('#ibse_send').removeAttr("disabled");
			document.getElementById("verror").style.display = 'block';
		}
					              
    });
}

function pvalidateVCode()
{
	var orderId = getCookie('orderId_'+MDOCIDJ);
    var vcode = $.trim($('#psmsvcode').val()+"-"+$('#psmsvcode2').val());
    $.post(WEBROOT+"functions/verification.php",{
        'vcode':vcode,
        'orderId':orderId,
        'mobile':$.trim($('#ptxtMobile').val())
    }, function(res){
		if(res == '1')
		{
			$('#ibse_send').attr("disabled", true);
			var newUserFlg = 0;
			if($.trim(getCookie('ln')) == '' || ($.trim(getCookie('inLogMobile')) != $.trim($('#ptxtMobile').val())))
			{
				$.ajax({
					url:WEBROOT+"functions/ajxUserSignUp.php", 
					type: "post",
					data :{
						'mobile' : $.trim($('#ptxtMobile').val()),
						'emailId' : $.trim($('#ptxtEmail').val()),
						'case' : '1'
					},
					success:function(res){
						if(res == 'REGISTERED')
						{
							$.ajax({
								url:WEBROOT+"functions/login_log.php", 
								type: "post",
								dataType:"json",
								data :{
									'login' : $.trim($('#ptxtMobile').val()),
									'rest' : 1
								},
								async:false, 
								success:function(res2){
									if(res2.results[0].status == 'LOGINSUCCESS')
									{
										$.ajax({
											url:WEBROOT+"functions/VerifiedUser.php",
											dataType:"json", 
											type: "post",
											data :{
												mob:$.trim($('#ptxtMobile').val()),
												mode:'ins',
												timeStamp: new Date().getTime()
											}, 
											success:function(res){
												submtEdtAddr(vcode,newUserFlg);

											}
										});
									}
								}
							});
						}
						else
						{
							newUserFlg = 1;
							$.ajax({
								url:WEBROOT+"functions/VerifiedUser.php",
								dataType:"json", 
								type: "post",
								data :{
									mob:$.trim($('#ptxtMobile').val()),
									mode:'ins',
									timeStamp: new Date().getTime()
								}, 
								success:function(res){
									submtEdtAddr(vcode,newUserFlg);
								}
							});
						}
					}
				});
		
			}
			else
			{
				submtEdtAddr(vcode);	
			}					
        }
		else
		{
			$('#ibse_send').removeAttr("disabled");
			document.getElementById("pverror").style.display = 'block';
		}
					              
    });
}

function useExistAddress()
{
    $('.use_add').click(function(){
       var id = $(this).attr('id');
       var keyArr = id.split('_');
       var key = keyArr[1];
       if(typeof existAddresses[key] != 'undefined') {
            var add = existAddresses[key];
            $('#txtName').val(add['name']);
            $('#txtName').css('color', '');
            $('#txtbldg').val(add['bldg']);
            $('#txtbldg').css('color', '');
            $('#txtLocation').val(add['street']);
            $('#txtLocation').css('color', '');
            $('#txtPin').val(add['pincode']);
            if (add['pincode']!= ''){
				$('#txtPin').css('color', '');
			}
            $('#txtLandmark').val(add['landmark']);
            $('#txtLandmark').css('color', '');
            $('#chkoutArea').val(add['area']);
            $('#txtEmail').val(add['emailId']);
             $('#txtEmail').css('color', '');
            $('#txtMobile').val(add['phone']);
            $('#txtMobile').css('color', '');
            if(parseInt(add['stdcode']) > 0 && parseInt(add['landline']) > 0){
                $('#txtLandstd').val("0"+add['stdcode']);
            $('#txtLandstd').css('color', '');
            $('#txtLandnum').val(add['landline']);
                $('#txtLandnum').css('color', '');
            }
          
            //$('#hdnAddrId').val(add['addressId']);
            $('#hdnAddrId').val('');
            if(typeof $('#txtArea') != 'undefined') {
				$('#txtArea').val(add['area']);
       }
			if (add['area'] != '') {
				$('#flgArea').val(1);
					$('#txtArea').css('color', '');
				}
       }
    });
}


function changeTabo()
{

    if(tab == 'checkoutorder') { 
		if(tabVal == 1)
		{
                  
            $("#li_"+tabVal).addClass('act');
            $("#li_3").next('li').removeClass('deact_nxt');
            $("#li_2").next('li').addClass('deact_nxt');
                        
		}
		else
		{
			$("#li_"+tabVal).addClass('act');
		}
        $("#li_"+tabVal).next('li').addClass('act_nxt');

        
        if(tabVal == 2){
            
            $("#li_3").next('li').removeClass('deact_nxt');
        }
        else if(tabVal == 3){
            $("#li_3").addClass('first')
            $("#li_1,#li_2").next('li').addClass('deact_nxt');
    }
        else if(tabVal == 4){
            $("#li_1,#li_2").next('li').removeClass('deact_nxt');
            $("#li_3,#li_1").next('li').addClass('deact_nxt');
}
    }
}
function evalTab()
{
    
    if(tab == 'bookatable') {
            $("#li_1").addClass('act');
            $("#li_1").addClass('first');
            $("#li_1").next('li').addClass('act_nxt');
            $("#li_2").next('li').addClass('deact_nxt');
            $("#li_3").next('li').addClass('deact_nxt');
            $("#li_4").next('li').addClass('deact_nxt');
            $("#li_5").next('li').addClass('deact_nxt');
		
    }
    else if(tab == 'tblchkout' && dept == 1) {
            $("#li_2").addClass('act');
            $("#li_2").next('li').addClass('act_nxt');
            $("#li_3").next('li').addClass('deact_nxt');
            $("#li_4").next('li').addClass('deact_nxt');
            $("#li_5").next('li').addClass('deact_nxt');
		
    }
    else if(tab == 'tblchkout' && dept == 2) {
            $("#li_1").next('li').addClass('deact_nxt');
            $("#li_3").addClass('act');
            $("#li_3").next('li').addClass('act_nxt');
            $("#li_4").next('li').addClass('deact_nxt');
            $("#li_5").next('li').addClass('deact_nxt');
		
    }
    else if(tab == 'tblchkout' && dept == 3) {
            $("#li_1").next('li').addClass('deact_nxt');
            $("#li_2").next('li').addClass('deact_nxt');
            $("#li_4").addClass('act');
            $("#li_4").next('li').addClass('act_nxt');
            $("#li_4").next('li').addClass('deact_nxt');
            $("#li_5").next('li').addClass('deact_nxt');
		
    }
    else if(tab == 'tblchkout' && dept == 4) {
            $("#li_1").next('li').addClass('deact_nxt');
            $("#li_2").next('li').addClass('deact_nxt');
            $("#li_3").next('li').addClass('deact_nxt');
            $("#li_5").addClass('act');
            $("#li_5").next('li').addClass('act_nxt');
            
		
    }
}

function cancelOrder()
{
    var orderId = $("#hdnCnclOrdrId").val();
    var cnclby = '';
    if(getCookie('inClienUID') != ''){
        cnclby = 'vendor';
    }
    
    $.ajax({
        url:WEBROOT+"functions/cancelOrder.php",
        type: "post",
        data :{
            orderId: orderId,
            cnclby: cnclby,
            timeStamp: new Date().getTime()
        }, 
        success:function(res){


           $("#hdnCnclOrdrId").val('');
           closeDiv('cnclordr');
            window.location.reload();
        }
    });
    
}

function openCncl(orderId,client){
    
    if(client != '1'){
        
         $.ajax({
        url:WEBROOT+"functions/getstatus.php",
        type: "post",
        datatype : 'json',
        data :{
                orderId:orderId
        }, 
        success:function(result){
            
               if(result.results.cancel == true){
                   
                  $("#hdnCnclOrdrId").val(orderId);
                  openDiv('cnclordr');
                   
               
            }
            else{
                $("#rptOrdrLnk_"+orderId).show();
                $("#edtOrdrLnk_"+orderId).show();
                $("#mdfyOrdrLnk_"+orderId).hide(); 
                $("#cnclOrdrLnk_"+orderId).hide();
                $("#elpsTxt").html("<b>Your cancel time has been elasped.</b>");
                openDiv('elpse');
            }
                
        }
        });
        
    }
    else{
        
        
        $("#hdnCnclOrdrId").val(orderId);
         openDiv('cnclordr');
        
    }
   
    
   
}


function isNumberKey(evt)
{
    var e = evt || window.event; //window.event is safer, thanks @ThiefMaster
    var charCode = e.which || e.keyCode;                        
    if (charCode > 31 && (charCode <= 47 || charCode > 57))
    return false;
    if (e.shiftKey) return false;
    return true;    
}
function proceedToOrder(){
	window.location.href = baseurl+'/checkoutorder?t=1';
}

function cookieDelete()
{
	    
        
        var orderId = getCookie('orderId_'+MDOCIDJ);
		$.post(WEBROOT+"functions/cartcancellation.php",{
			'orderid': orderId,
			'vertical': 'food',
			}, function(res){
			
			if(res == 1)
			{
				deleteCookie('orderId_'+MDOCIDJ,'',-1);
				deleteCookie('dom_'+domcookieid, '', -1);
				//deleteCookie('deliveryArea_'+MDOCIDJ,'',-1);
				$("#cancelOrder").css("display","block");
				$("#displayOrder").css("display","none");
                                var HREF = baseurl+'/menu-order';
                                if(tab == 'tblchkout'){

                                    HREF = baseurl+'/tblchkout/2';

                                }
				window.location.href = HREF;
				
			}
		
				  
		});
        
    
	
	

}

function showMenuItem(tabName){
	if(tabName == "veg"){
		$("#"+tabName).addClass('active');
		$("#nonveg").removeClass('active');
	}else if(tabName == "nonveg"){
		$("#"+tabName).addClass('active');
		$("#veg").removeClass('active');
	}
	else if(tabName == "all"){
		
		$("#veg").removeClass('active');
		$("#nonveg").removeClass('active');
     
    }
	
	$('#menuSections li').each(function(j,val){
		
		if(j == 0)
		{
			
			$(this).find('a').addClass('actm');
		}
		if(tabName == "all")
		{
			$(this).show();
			
		}
		else{		
			if($(this).hasClass(tabName)){
				$(this).show();
				
			}else{
				$(this).hide();
			}
		}
		
    });
    
    $('#tblMenuList tr').each(function(){
		
		if(tabName == "all"){
			$(this).show();  
		}
		else{
			if($(this).hasClass(tabName)){
				$(this).show();  
			}else{
				$(this).hide();
			}
		}
	});
	
	
	
	 $('#tblMenuList tr').each(function(){
		 if($(this).is(':visible'))
		 {
			 $this = $(this);
			
			 var id = $(this).attr('id');
			 $('.allopt a').addClass('actm');
			 $('li.menuSection a').not($this.find('a')).removeClass('actm');
			 
			//$('li.menuSection a').not($this.find('a')).removeClass('actm');
			 fleXenv.scrollTo(id);

			$('#menuTbl_mcontentwrapper').animate({
				scrollTop : $('#'+ id).offset().top - $('#menuTbl_mcontentwrapper').offset().top + $('#menuTbl_mcontentwrapper').scrollTop()
			});
			
			return false;
		 }

	});
	
	var divMenu = document.getElementById('menuCats');
	divMenu.fleXcroll.updateScrollBars();
    divMenu.fleXcroll.setScrollPos(false,0);
	var divMenu1 = document.getElementById('menuTbl');
	divMenu1.fleXcroll.updateScrollBars();
    divMenu1.fleXcroll.setScrollPos(false,0);
   // secMenu.fleXcroll.setScrollPos(false,0);
}

function filterMinItems(){
    
    var menuCatLen = menuCat.length;
    if($.trim($("#filterBoxMin").val()) == ''){
          //$('#menuSec .sel').hide(); 
          //return false;
      }
      
     if($.trim($("#filterBoxMin").val()) != ''){
        $.ajax({
           url:WEBROOT+"functions/filteritems.php",
           dataType:"json", 
           type: "post",
           data :{
               term:$.trim($("#filterBoxMin").val().toLowerCase()),
               docId:$("#docid").val(),
               timeStamp: new Date().getTime()
           }, 
           success:function(res){

               $('#menuSec .sel').hide(); 
               $(res.results.menuCat).each( function(i,val)
               {
                   $('#'+val).show(); 

                   $('.'+val).show(); 

                   $('.'+val+' ul li').show(); 
                   
                   $("#"+val).find("p a").removeClass('addicondis');
                   $("#"+val).find("p a").addClass('addicon');
                  

               })
               $(res.results.itemIds).each( function(i,val)
               {

                   $("#"+val).parents('.mnuitm').show();
                   $("#"+val).parents('.mnulst').show();
                   $('#'+val).show(); 

                   $("#"+val).parents('.mnuitm').find("p a").addClass('addicon');
                   $("#"+val).parents('.mnuitm').find("p a").removeClass('addicondis');


               })



           }
       });
     }
    
    if($.trim($("#filterBoxMin").val()) == ''){
       var k = 0;
       for(var j=0; j < menuCatLen; j++)
        {
            
            $("#"+menuCat[j]).show();
            
             $("."+menuCat[j]).show();
             $("."+menuCat[j]+" ul li").show();
              k++;
             if(k > 10){
                  $("#"+menuCat[j]).hide();
              }
              
             
              $("."+menuCat[j]+" ul li").each( function(i,val)
               {
                    k++;
                    
                      if(k > 10){
            
                        $("."+menuCat[j]).hide();
                        $("."+menuCat[j]+" ul li").hide();


                   }
                

               })
             
            
            
             $("#"+menuCat[j]).find("p a").addClass('addicon');
             $("#"+menuCat[j]).find("p a").removeClass('addicondis');
             
           
            
        }
    }
    
    
}

function filterItems()
{
	if ($.trim($('#domId').val()) != ''){
		var value = $.trim($("#filterBox").val());
		value = value.replace(/\s+/g, "").toLowerCase();
		value = value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,"");
	
	$(".mnuitm").hide();
	$(".mnuitm li").each(function () {
		if ($(this).prop('id').indexOf(value) > -1) {
			$(this).parent().parent().parent().show();
			$(this).show();
		} else {
			$(this).hide();
			}
		});
		return false;
	}else{
		$(".prev_ord_divs").hide();
		$("#prev_ord_divs p a").addClass('addicondis');
		$("#prev_ord_divs p a").removeClass('addicon');	
	}
	var menuCatLen = menuCat.length;
    if($.trim($("#filterBox").val()) == ''){
          //$('#menuSec .sel').hide(); 
          //return false;
      }
      
     if($.trim($("#filterBox").val()) != ''){
        $.ajax({
           url:WEBROOT+"functions/filteritems.php",
           dataType:"json", 
           type: "post",
           data :{
               term:$.trim($("#filterBox").val().toLowerCase()),
               docId:$("#docid").val(),
               timeStamp: new Date().getTime()
           }, 
           success:function(res){

               $('#menuSec .sel').hide(); 
               $(res.results.menuCat).each( function(i,val)
               {
                   $('#'+val).show(); 

                   $('.'+val).show(); 

                   $('.'+val+' ul li').show(); 
                   
                   $("#"+val).find("p a").removeClass('addicondis');
                   $("#"+val).find("p a").addClass('addicon');
                  

               })
               $(res.results.itemIds).each( function(i,val)
               {

                   $("#"+val).parents('.mnuitm').show();
                   $("#"+val).parents('.mnulst').show();
                   $('#'+val).show(); 

                   $("#"+val).parents('.mnuitm').find("p a").addClass('addicon');
                   $("#"+val).parents('.mnuitm').find("p a").removeClass('addicondis');


               })



           }
       });
     }
    
    if($.trim($("#filterBox").val()) == ''){
       for(var j=0; j < menuCatLen; j++)
        {
            
            //var arr2 = menuCat[j].split('_');
            
            $("#"+menuCat[j]).show();
            
             $("."+menuCat[j]).show();
             $("."+menuCat[j]+" ul li").show();
            
             $("#"+menuCat[j]).find("p a").addClass('addicon');
             $("#"+menuCat[j]).find("p a").removeClass('addicondis');
             
            
        }
    }
    
    
    return false;
     
     $('#menuSec .sel').show(); 
     
    var menuCatLen = menuCat.length;
    
    
    var outercnt = 0;
    
    var  query	= $.trim($("#filterBox").val().toLowerCase()); //trim white space
    var qry = query.replace( /[\W]+/g, ''); //add OR for regex
    query = query.replace( /[\W]+/g, '|'); //add OR for regex
    
    
    if($.inArray("s_"+qry, menuCat) > -1){
      
        if($('#menuSec .sel').not($("#s_"+qry)).length > 0){
            $('#menuSec .sel').not($("#s_"+qry)).hide();
            $("#s_"+qry  + ' .sel').not($(".s_"+qry)).show();
        }


        else {
            $("#s_"+qry  + ' .sel').not($(".s_"+qry)).hide();
        }
       

        return false;
    }
    
    
    if($("#s_"+qry).length > 0){
        $('#menuSec .sel').hide();
         $("#s_"+qry).parents('.mnuitm').show();
          $("#s_"+qry).show();
         return false;
      
    }
   
    var pat = new RegExp(query, "i");
    
    
    
    for(i=0; i < menuCatLen; i++)
    {
        
        if(!pat.test(menuCat[i].replace('s_','')) )
        {
            
            
           var cnt = 0;
            $("#"+menuCat[i]+" li").each( function(i,val)
            {
		
                (pat.test($(this).attr("id").replace('s_',''))) ? cnt++ : $(this).hide();
              
            })
           
           
            if(cnt == 0)
            {
                
                $('#'+menuCat[i]).hide();  
            }
            else{
                
                $('.'+menuCat[i]).show();  
                $("#"+menuCat[i]+' p a').addClass('addicon');
		$("#"+menuCat[i]+' p a').removeClass('addicondis');
            }
            
      
        }
        else{
            
           $('.'+menuCat[i]).show();  
           $("#"+menuCat[i]+' p a').addClass('addicon');
           $("#"+menuCat[i]+' p a').removeClass('addicondis');
            
            
        }
    
        
    }
    

}



function getTimeList(docId,obj)
{
	var dlvAr = $("#areaMenu").val();
	var selMenu = document.getElementById(obj.id);
	var selOption = selMenu.options[selMenu.selectedIndex].value;
	var  innerHTML = '';
	
	$.ajax({
        url: WEBROOT + "functions/ajxTimeList.php",
        type: "POST",
        dataType:"json",
        data : {
            'docId' : docId, 
            'dt' : selOption,
            'area': dlvAr
               },
        success : function(response)
        {
           
            $.each(response.results.timeList,function(i,val){
		
				innerHTML += '<option value="'+i+'" >'+val+'</option>';
			
			});
			
			if(response.results.isDelivery == 1){
			   $("#error").hide();
			   if($.trim(innerHTML) != ''){
					$("#dlVldt").hide();	
					$("#proceedBtn").show();  
					$("#closeBtn").hide();
			   }
			   else{
					$("#dlVldt").show();	
					$("#proceedBtn").hide();  
					$("#closeBtn").show();
			   }
			}
			else{
				
				if($.trim(innerHTML) != ''){
					if(response.results.isDelivery == 0){
						if($.trim($("#areaMenu").val()) != ''){
							$("#error").show();
						}
						else{
							$("#error").hide();
						}
						
						$("#dlVldt").hide();	
						 $("#proceedBtn").hide();  
						 $("#closeBtn").show();
					}
					else{
						$("#error").hide();
						$("#dlVldt").hide();	
						$("#proceedBtn").show();  
						$("#closeBtn").hide();
						
					}
					
				}
				else{
							$("#error").hide();
							 $("#dlVldt").show();	
							 $("#proceedBtn").hide();  
							 $("#closeBtn").show();
				}
		}
			
			$("#dltm").empty().html(innerHTML);
       
        }
    });
    
    
    
	
	
}


function chngDt(){
    
    var dtVal = $('#dldt :selected').val();
    var tmVal = $('#dltm :selected').val();
    var tmp = tmVal.split(' ');
    //console.log(tmVal);
    
    //console.log(tmp[0]+" -- "+tmp[1]);
    $('#dldt').val($.trim(tmp[0]));
    $('#dltm').val(tmVal);
   
    
}

function areaVis(flg){
	
	if(flg){
		
		$("#areaMenu").removeAttr("disabled");
		$('#lbl1').text('Delivery Date');
		$('#lbl2').text('Delivery Time');
		$("#proceedBtn").hide();
		$("#closeBtn").show();
		
	
	}
	else{
		
		$("#areaMenu").attr("disabled",true);
		$('#lbl1').text('Pickup Date');
		$('#lbl2').text('Pickup Time');
		$("#proceedBtn").show();
		$("#closeBtn").hide();
		
	}
	
}


function catVis(divid,visibility){
	document.getElementById(divid).style.display=visibility;
}

function scrollToDiv(id){
    
   $("#slcat").hide(); 
   
   if($.trim($("#filterBox").val())){
        $("#filterBox").val("");
        filterItems();
   }
   
   if($("#"+id).offset() != null){
		$('html,body').animate({
			scrollTop: $("#"+id).offset().top
		},'slow');
	}    
   $('.'+id).show(); 

   $('.'+id+' ul li').show();
   
   $("#"+id).find("p a").removeClass('addicondis');
   $("#"+id).find("p a").addClass('addicon');
    
    
}
    
    
 function itemsVis(clsnm)
{
	
	if($("#"+clsnm+" p a").hasClass("addicon"))
	{
		$("."+clsnm).hide();
                
		$("#"+clsnm+' p a').addClass('addicondis');
		$("#"+clsnm+' p a').removeClass('addicon');
		
			
	}
	else
	{
		$("."+clsnm).show();
		$("."+clsnm+" ul li").show();
		
		$("#"+clsnm+' p a').addClass('addicon');
		$("#"+clsnm+' p a').removeClass('addicondis');
		
		

	}
	
}

function toggleHist(){
    
    var histHeader = "Click here to view your previous order(s)";
    
    if($("#hstico").hasClass("addicon"))
	{
		$(".preordtbl").toggle();
		$("#hstico").addClass('addicondis');
		$("#hstico").removeClass('addicon');
                $("#hstSpn").removeClass('yurprv');
                $("#hstA").text(histHeader);
                $("#hstVw").hide();
                	
	}
	else
	{
		$(".preordtbl").toggle();
		$("#hstico").addClass('addicon');
		$("#hstico").removeClass('addicondis');
                $("#hstSpn").addClass('yurprv');
                var histTot = $("#histot").val();
                histHeader = "Your previous orders ("+histTot+")";
                $("#hstA").text(histHeader);
                $("#hstVw").show();
		
		
	}
    
    
    
    
}

function moreless(flg){
    
    var tmp = flg.split("_")
    
    if(tmp[0] == 'more'){
        
        $("#moreless_"+tmp[1]).show();
        $("#more_"+tmp[1]).hide();
        $("#less_"+tmp[1]).show();
        $("#itmSpn_"+tmp[1]).hide();
        $("#hdnItmSpn_"+tmp[1]).show();
    }
    else if(tmp[0] == 'less'){
        
        $("#moreless_"+tmp[1]).hide();
        $("#more_"+tmp[1]).show();
        $("#less_"+tmp[1]).hide();
        $("#itmSpn_"+tmp[1]).show();
        $("#hdnItmSpn_"+tmp[1]).hide();
    }
    
    
}
function itmDet( divID )
{
    
    var tempArr = divID.split("_");
    
    var itmId =  tempArr[1];
    
   if(jsonStr != null)
    {
       
       var itmNm = jsonStr[itmId].itemName;
       var spiceLvl = jsonStr[itmId].spiceLevel;
       var itmPrice = jsonStr[itmId].itemPrice;
       var itmDesc = jsonStr[itmId].itemDescription;
       var tags = jsonStr[itmId].tags;
       var tagsArr = tags.split(",");
       
       
       
       var innerHTML = "";
	   var cls = 'ptop';
	   if($.trim(itmDesc) == ''){
		   cls = 'ptoprund';
	   }
       
       innerHTML += '<section class="jpbg">';
       innerHTML += '<section class="'+cls+'">';
       innerHTML += '<span><span class="nm">'+itmNm+'</span>';
       
       
       for(var k=0;k < tagsArr.length;k++){
          
          if($.trim(tagsArr[k].toLowerCase()) == 'veg' ){
              innerHTML += '<span class="tabs" class="vg"></span>';
          }
          
          if($.trim(tagsArr[k].toLowerCase()) == 'non veg' ){
              
              innerHTML += '<span class="tabs" class="nvg"></span>';
              
          }
          
      }
       
      
       
       innerHTML += '</span>';
       
       innerHTML += '<section>';
       
       
       if(spiceLvl > 0){
           innerHTML += '<span class="sl">Spice Level</span>';
       }
       
      
       for(var j=0;j < spiceLvl;j++){
           
           innerHTML += '<span class="spyctb"></span>';
           
       }
       
       if(spiceLvl > 0){
           innerHTML += ' | ';
       }
       
       innerHTML += '<span class="pou">';
       innerHTML += '<span class="sl"> Price</span> <span class="rs"></span>'+itmPrice+'</span>';
       
      // innerHTML += ' | <span>10<span class="like"></span></span>';
       
       innerHTML += '</section>';
       
       innerHTML += '</section>';
       
       if($.trim(itmDesc) != ''){
           
            innerHTML += '<section class="dt_photo"><span class="txt">'+itmDesc+'</span><span class=""></span></section>';
       }
       innerHTML += '<section class="fmr">Ganesh, Ankit, and <a href="#">8 more friends</a> like this</section></section>';
       
       
       $('#itmDesc').empty().html(innerHTML);
       
	
    }
    var version = $.browser.version || "0";
    var splitVersion = version.split('.');
    //alert(splitVersion[0]);
    //var t = $('#'+divID).position();
	var t = $('#'+divID).offset();
   //alert($.browser.opera)
    //round_popup();
   
    if($.browser.opera == true && splitVersion[0] == 9){
        
        $('#itmDesc').addClass('jpbghvr');
    }
    if(typeof $.browser.opera == 'undefined' || ($.browser.opera == true && splitVersion[0] > 9))
    {
       round_popup();
    }
	
	$('#'+divID).after($('#itmDesc'));
   
    $('#itmDesc').show();
	/*
    $('#itmDesc').offset( {
        top: t.top+20 , 
        left: (t.left)
    } );
   */
   
    

	
}


function itmDetOut(){
    
        $('#itmDesc').hide();

    
}

function closeAddon()
{
    //console.log(divFlg);
    if(divFlg)
    {
        
        closeDiv('addon_popup');
        viewAllItms();
    }
    else
    {
        closeDiv('addon_popup');
    }
    divFlg = 0;
}

function fillBx(txt){
    
    $("#hdnslAr").val(txt);
    closeDiv('subar');
    $("#error").hide();
    $("#areaDisp").html("<b>"+$("#areaMenu").val()+"</b>");
    var tmVal = $('#dltm :selected').val();
    if(typeof tmVal != 'undefined'){
             $("#dlVldt").hide();	
             $("#proceedBtn").show();  
             $("#closeBtn").hide();
    }
}

function callbk(){
    
    $("#hdnslAr").val($("#areaMenu").val());
   
}
function fillDlAr(txt)
{
       $("#areaMenu").val($("#hdnslAr").val());
       if(!$('#fda').is(':visible')){
        openDiv('fda');
       }
   
}

function closeDlArea()
{
    
    if(divFlg)
    {
        
        closeDiv('fda');
        viewAllItms();
    }
    else
    {
        closeDiv('fda');
    }
    divFlg = 0;
    
}

function redirectToSmry()
{
    var flg = 0;
    $('.scls').each(function(i)
    {
       
       if($(this).val() == 0 || $.trim($(this).val()) == ''){
           
           $(this).focus();
           flg = 1;
           return false;
       }

    })
   
    if(flg == 1){
        return false;
    }

    if ($.trim($('#domId').val()) != ''){
		window.location.href = baseurl+'/checkoutorder?t=7';
		return false;
	}
    var HREF = baseurl+'/checkoutorder?t=3';
    _ct('chkout','menu',lnk_vid);
	
   //document.cookie = 'mnu_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;
    if(tab == 'tblchkout'){

        HREF = baseurl+'/tblchkout/3';
        window.location.href = HREF;
    }else{
            //if ($.trim($('#domId').val()) != ''){
                //window.location.href = HREF;
            //}else{
                var dtVal = $('#dldt :selected').val();
                var tmVal = $('#dltm :selected').val();
                if(typeof tmVal == 'undefined'){
                    $("#dlTxt").empty().html("Restaurant is closed at this hour.");
                    openDiv('dlVld');
                    return false;
                }
                var tmArr = tmVal.split(' ');
                tmVal = tmArr[1];

                var dlpk = "HD";
                var dlarea = '';

                var orderId = getCookie('orderId_'+MDOCIDJ);
                      $.post(WEBROOT+"functions/ajxUpdtOrderDet.php",{
                        pickup_delivery:dlpk,
                        docId:$("#docid").val(),
                        date:dtVal,
                        time:tmVal,
                        orderId:orderId,
                        delivery_area:dlarea
                    },function(res){
                        if(res == 0){
                                window.location.href = HREF;
                        }
                });  
            //}
    }
    //window.location.href = HREF;
    
}

function backToPrev(num){
    
    //document.cookie = 'bk_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;

    if ($.trim($('#domId').val()) != ''){
		window.location.href = baseurl+'/checkoutorder?t=7';
		return false;
	}
    switch(num)
    {
        case 0 :
             if(tab == 'bookatable' || tab == 'tblchkout'){
                  window.location.href = baseurl;
             }
             else{
                   window.location.href = baseurl+'/menu-order';
            }
            break;
        case 1 :
             if(tab == 'tblchkout'){
                  //window.location.href = baseurl+'/bookatable';
                  window.location.href = baseurl;
             }
            break;
        case 2 :
             if(tab == 'tblchkout'){
                  //window.location.href = baseurl+'/tblchkout/1';
                  window.location.href = baseurl;
             }
            
            break;
        case 3 :
             if(tab == 'tblchkout'){
                 window.location.href = baseurl+'/tblchkout/2';
             } 
             else{
                window.location.href = baseurl+'/checkoutorder?t=3';
            }
            break;
         default :
             if(tab == 'tblchkout'){
                 window.location.href = baseurl+'/tblchkout/2';
             }
                else{
                 window.location.href = baseurl+'/menu-order';
            }
        
    }
    
    
}

function extractNumber(obj,objVal, decimalPlaces, allowNegative)
{
    var temp =objVal.toString();
    
    if(parseInt(temp) == 0)
    {
        $(obj).val('');
        return true;
    }
	
    // avoid changing things if already formatted correctly
    var reg0Str = '[0-9]*';
    if (decimalPlaces > 0) {
        reg0Str += '\\.?[0-9]{0,' + decimalPlaces + '}';
    } else if (decimalPlaces < 0) {
        reg0Str += '\\.?[0-9]*';
    }
    reg0Str = allowNegative ? '^-?' + reg0Str : '^' + reg0Str;
    reg0Str = reg0Str + '$';
    var reg0 = new RegExp(reg0Str);
    if (reg0.test(temp)) return true;

    // first replace all non numbers
    var reg1Str = '[^0-9' + (decimalPlaces != 0 ? '.' : '') + (allowNegative ? '-' : '') + ']';
    var reg1 = new RegExp(reg1Str, 'g');
    temp = temp.replace(reg1, '');


    if (allowNegative) {

        // replace extra negative
        var hasNegative = temp.length > 0 && temp.charAt(0) == '-';
        var reg2 = /-/g;
        temp = temp.replace(reg2, '');
        if (hasNegative) temp = '-' + temp;
    }
	
    if (decimalPlaces != 0) {
        var reg3 = /\./g;
        var reg3Array = reg3.exec(temp);
        if (reg3Array != null) {
            // keep only first occurrence of .
            //  and the number of places specified by decimalPlaces or the entire string if decimalPlaces < 0
            var reg3Right = temp.substring(reg3Array.index + reg3Array[0].length);
            reg3Right = reg3Right.replace(reg3, '');
            reg3Right = decimalPlaces > 0 ? reg3Right.substring(0, decimalPlaces) : reg3Right;
            temp = temp.substring(0,reg3Array.index) + '.' + reg3Right;
        }
    }
    
    $(obj).val(temp);
}


function toggleCont(id){
    
    var tempArr = id.split("_");
    
    if($.trim(tempArr[0]) == 'instruction')
    {
        
        if($("#instruction").val() == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
        {
            $("#instruction").css("color","#bdbdbd");
        }
        if($("#instruction_"+$.trim(tempArr[1])).val() == "Any instructions you would want to give regarding the preparation of the dish/cuisine will come here")
        {
            $("#instruction_"+$.trim(tempArr[1])).css("color","#bdbdbd");
        }
     
       
    }
    else{
        
        var tmp = id.split("_");
        if($.trim(tmp[0]) == 'itm'){
            
            
            if($("#ico_"+tmp[1]).hasClass("addicon"))
            {
                   
                $("#ico_"+tmp[1]).addClass('addicondis');
                $("#ico_"+tmp[1]).removeClass('addicon');

            }
            else
            {
                $("#ico_"+tmp[1]).addClass('addicon');
                $("#ico_"+tmp[1]).removeClass('addicondis');

            }
          
        }
    }
    
    $("#"+id).toggle();
    
    
}


function touchScroll(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPos=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPos=this.scrollTop+event.touches[0].pageY;
			//event.preventDefault();
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			this.scrollTop=scrollStartPos-event.touches[0].pageY;
			//event.preventDefault();
		},false);
	}
}

function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}

function resetDlTm(){
    
    var orderId = getCookie('orderId_'+MDOCIDJ);
    
    if(orderId){
        $.ajax({
            url:WEBROOT+"functions/timetikr.php",
            type: "post",
            data :{
                orderId: orderId,
                timeStamp: new Date().getTime()
            }, 
            success:function(res){

               $("#tikr").text(res);

            }
        });
    }
    
    
}
/* Food Order Rel -- end*/

function topBarMovieTrailer(d)
{
	var html = '';
	
	var ratxt = (d.totRatings.total == 1) ? 'Rating' : 'Ratings';
	
	html = d.totRatings.total + ' ' + ratxt + ' |';

	html += '<a title="Review " class="mvouter" onclick="_ct(\'ratethis_m\',\'dtpg\');"  href="' + window.location + '/writereview_movie">';
	html += '<span class="jdrm"></span><span>Rate This Movie</span></a>';

	html += ' | <a class="wsouter" href="#rvw"><span class="jdrr"></span><span>Read Reviews</span></a>';

	return html;
}

function GetXmlHttpObject()
{
  if(window.XMLHttpRequest)
  {
    return new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
  }
  else if(window.ActiveXObject)
  {
    return new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
  }
  return null;
}

function movie_details(d)
{
	var mvdethtml = '';
	var mvfrndhtml = '';
	var nb_class = '';
	var poster_html = '';
	
	$.each(d['movie_details'],function(index, value) { 
	
	nb_class = (index == 'Run Time') ? 'class = "nborder"' : '';
	
	if(d.poster)
	{
		poster_html = '<img border="0" src="'+d.poster+'" class="Clogo">';
	}	
	
	if((index == 'Synopsis' && $('#showPromo').length ==0) || index == 'Cast & Crew' || index == 'Writer')
	{
		if(!d.trailer_id)
		{
			if(index == 'Synopsis' && value.length > 695)
			{
				if(!d.poster)
				{
					$(".sy_mdetail").addClass('wide');
				}
				else
				{
					//$(".sy_mlogo .src").attr('src',d.poster);
					$('#mvmoreinfo .sy_mlogo').html(poster_html);
					$(".sy_mlogo").show();
				}
				
				popupcontent = value;
			
				$('#mvmoreinfo .syhead').html('Synopsis for<strong>'+d.movie_name+'</strong>');
				$('#mvmoreinfo .sy_mdetail').html(popupcontent);
				
				value = value.substr(0,695) + ' ... <a href="javascript:;" onclick="return openDiv(\'mvmoreinfo\');">more</a>';
			}
			
			if(index == 'Cast & Crew' && value.length > 300)
			{
				if(!d.poster)
				{
					$(".sy_mdetail").addClass('wide');
				}
				else
				{
					//$(".sy_mlogo .src").attr('src',d.poster);
					$('#castinfo .sy_mlogo').html(poster_html);
					$(".sy_mlogo").show();
				}
				
				popupcontent = value;
			
				$('#castinfo .syhead').html('Cast & Crew of<strong>'+d.movie_name+'</strong>');
				$('#castinfo .sy_mdetail').html(popupcontent);
				
				value = value.substr(0,300) + ' ... <a href="javascript:;" onclick="return openDiv(\'castinfo\');">more</a>';
			}
		}
		else
		{
			if(index == 'Synopsis' && value.length > 110)
			{
				if(!d.poster)
				{
					$(".sy_mdetail").addClass('wide');
				}
				else
				{
					//$(".sy_mlogo .src").attr('src',d.poster);
					$('#mvmoreinfo .sy_mlogo').html(poster_html);
					$(".sy_mlogo").show();
				}
				
				popupcontent = value;
			
				$('#mvmoreinfo .syhead').html('Synopsis for<strong>'+d.movie_name+'</strong>');
				$('#mvmoreinfo .sy_mdetail').html(popupcontent);
				
				value = value.substr(0,110) + ' ... <a href="javascript:;" onclick="return openDiv(\'mvmoreinfo\');">more</a>';
			}
			
			if(index == 'Cast & Crew' && value.length > 50)
			{
				if(!d.poster)
				{
					$(".sy_mdetail").addClass('wide');
				}
				else
				{
					//$(".sy_mlogo .src").attr('src',d.poster);
					$('#castinfo .sy_mlogo').html(poster_html);
					$(".sy_mlogo").show();
				}
				
				popupcontent = value;
			
				$('#castinfo .syhead').html('Cast & Crew of<strong>'+d.movie_name+'</strong>');
				$('#castinfo .sy_mdetail').html(popupcontent);
				
				value = value.substr(0,50) + ' ... <a href="javascript:;" onclick="return openDiv(\'castinfo\');">more</a>';
			}
			
			if (index == 'Writer' && value.length > 50)
			{
				if(!d.poster)
				{
					$(".sy_mdetail").addClass('wide');
				}
				else
				{
					//$(".sy_mlogo .src").attr('src',d.poster);
					$('#mvwriterinfo .sy_mlogo').html(poster_html);
					$(".sy_mlogo").show();
				}
				
				popupcontent = value;
			
				$('#mvwriterinfo .syhead').html('Writer of<strong>'+d.movie_name+'</strong>');
				$('#mvwriterinfo .sy_mdetail').html(popupcontent);
				
				value = value.substr(0,50) + ' ... <a href="javascript:;" onclick="return openDiv(\'mvwriterinfo\');">more</a>';
			}
			
		}
	}
	
	
	mvdethtml += '<li '+nb_class+'>' + 
					'<span class="mlt">'+index+':</span>' + 
					'<span class="mrt">'+value+'</span>'  + 
				 '</li>';
 
	});

	$('#mvdet').html(mvdethtml);
	$('.mdetail').show();
}

function movie_frnd_bar_html(d)
{	
	var html = '';
	
		html +=  
			'<span class="frev_htm">Your friends rated this movie: </span>' +
				'<a href="#rvw" onclick="change_tab(\'fratings\');">' +
					'<span class="flt">' +
						'<span class="frev_text">' + d.fratings[0].reviewer_name + '</span>' +
						'<span class="sel">' +
							'<span class="stars_m">';
								var p;
								var len = d.fratings[0].star.length;
								for(p=0; p<len; p++)
								{
									html += '<span class="mw'+d.fratings[0].star[p]+'"></span>';
								}
					
		html +=				'</span>'	
						'</span>';
					
	if(/*d.totfriendreviews.total > 1*/0)
	{
					
		html +=	
					',<span class="frev_text">'+ d.fratings[1].reviewer_name +'</span>' +
						'<span class="sel">' +
						'<span class="stars_m">';
							var p;
							var len = d.fratings[1].star.length;
							for(p=0; p<len; p++)
							{
								html += '<span class="mw'+d.fratings[1].star[p]+'"></span>';
							}
		html +=			'</span>'+
					'</span>';
					
	}
					
	if(d.totfriendreviews.total > 1) 
	{
		html += '&nbsp; and ' + (d.totfriendreviews.total-1) + ' more friends';
	}
					
	html +=	 		'</a>' +
				'</span>';
			
	return html;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function updatedelimage(id)
{
	var phtcnt = ed('phtcnt').value;
	phtcnt = phtcnt - 1;
	ed('phtcnt').value = phtcnt;
	//document.getElementById(id).value = "";
	ed('img'+id).innerHTML = "";
}

function sndphtvc()
{
	mobile = $('#newownmb').val();
	if(!validateMobile(mobile))
	{
		$("#ownmberr").html('Please Enter Valid Mobile number');
		$("#ownmberr").show();
		$("#newownmb").focus();
		return false;
	}
	$.post(WEBROOT+"functions/verification.php",{
                            mob:mobile , phtmob:1
                        }, function(res){
							
							if(res){
								closeDiv('ownrf2');
								$("#mbtosnd").html(mobile);
								document.getElementById('newvcmb').value = mobile;
								openDiv('ownrfvc');
							}
									  
						});
}

function chkphtvc(dcid,catlogurl,chksum)
{

	var vcodelft = $('#vcodelft4').val();
	var vcodert = $('#vcodert4').val();
	var vcode = vcodelft+'-'+vcodert;
	if(vcode == '-')
	{
		$('#ownvcerr').show();
		$('#ownvcerr').html('Please Enter Verification Code');
		$('#vcodelft4').focus();
		return false;
	}
	else
	{
		$.post(WEBROOT+"functions/verification.php",{
					'vcode':vcode , 'mul_review':1 
                        }, function(res){
							
							if(res == 1){
								closeDiv('ownrfvc');
								closeDiv('hui');
								openDiv('vfdown');
								$.post(WEBROOT+"functions/ajxuserlogin.php", {'docid' : $('#docid').val(), 'mobile':$('#newvcmb').val() , 'uppht' : 1}, function(data)
								{
									var checkvc_mb = '';
									$.get(WEBROOT+"functions/detailapi.php", {'docid': dcid, 'casepv': 'checkvc_mb'}, function(data1) {
									checkvc_mb = data1;
									mb_present = strstr(checkvc_mb , $('#newvcmb').val());
									if(!mb_present)
									{
										document.getElementById('vdhref').href = 'javascript:;';
										$('#vdhref').click(function() { closeDiv('vfdown');openDiv('upload');});
									}
									else
									{
										if (typeof swfobject != "undefined")
										{
											var playerVersion = swfobject.getFlashPlayerVersion();
											if(playerVersion.release == 0 || playerVersion.release == '')
											{
												catlogurl = catlogurl.replace('mcatalog','catalog');
											}
										}
										if(navigator.userAgent.match(/MSIE/i))
										{
											catlogurl += '&listedon=1';
										}
										
										//document.getElementById('vdhref').href = catlogurl;
										//document.getElementById('vdhref').target = '_blank';
										
										$('#vdhref').click(function() { uploadVLC(catlogurl,data);closeDiv('vfdown');location.reload(true);});
									}
									//location.reload(true);
									});
								});
							}
							else
							{
								$('#ownvcerr').show();
								$('#ownvcerr').html('Please Enter correct Verification Code');
								$('#vcodelft4').val('');
								$('#vcodert4').val('');
								$('#vcodelft4').focus();
								return false;
							}
									  
						});
	}
}

function strstr (haystack, needle, bool) {
    var pos = 0; 
    haystack += '';
    pos = haystack.indexOf(needle);
    if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

function mvshowmore(i,tab)
{
	$("#mrev_"+tab+"_"+i).show();
	$("#mvmore_"+tab+"_"+i).hide();
}
/*
function getDate(day)
{
    var date = new Date();
    date.setDate(date.getDate() + day);
    var months = new Array(12);
    months[0] = "Jan";
    months[1] = "Feb";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "Aug";
    months[8] = "Sep";
    months[9] = "Oct";
    months[10] = "Nov";
    months[11] = "Dec";
    var nexttonextday = '';
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday', 'Saturday'];

    if(day == 0) {
        nexttonextday = ', Today';
    } else if(day == 1) {
        nexttonextday = ', Tomorrow';
    } else if(day == 2) {
        nexttonextday = ', '+weekday[date.getDay()];
}

    var dateMsg = date.getDate()+' '+months[date.getMonth()]+nexttonextday; //date.getFullYear()
    return dateMsg;
        
}
*/		
/*
function getMovieDate(day)
		{
    var date = new Date();
    date.setDate(date.getDate() + day);
    var months = new Array(12);
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
    var nexttonextday = '';
    var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday', 'Saturday'];
    
    if(day == 0) {
        nexttonextday = ', Today';
    } else if(day == 1) {
        nexttonextday = ', Tomorrow';
    } else if(day == 2) {
        nexttonextday = ', '+weekday[date.getDay()];
    } 
    
    var dateMsg = date.getDate()+' '+months[date.getMonth()]+nexttonextday; //date.getFullYear()
    return dateMsg;

}
*/
function get_movie_info(docid, cdateval, city, area, sdateid,e)
{
    $('#mvDtArr').hide();
    var mcurdate = new Date();
    var date_today = mcurdate.getDay();    
    var mvhtml = '';
    var html = '';
    cdateArr = cdateval.split(',');
    cdate = cdateArr[0];
    var mvfilertext = ($('#mvflter').length>0)?$('#mvflter').val():'';
    var chkhideunvail = ($('#chkhideunvail').length>0)?$('#chkhideunvail').is(":checked"):false;
    
    if(typeof(e) != 'undefined' && typeof(e) != 'object') {
		e.preventDefault();
	}
    $.ajax({url:WEBROOT+"functions/ajxMovieInfo.php?getimg=0&docid="+docid+"&result_type=1&date="+cdate+"&city="+city+"&area="+area ,async:true, success:function(result){
                mvhtml = get_movie_html(result, docid, cdate, city, area, sdateid);
                
                if ($.trim(mvhtml) !='') { //details found           
             //html += '<h1 class="vhd"><b>BOOK MOVIE TICKETS</b>';
			htmldd = '<span class="mvdd">';				
			htmldd += '<a class="drarw" id="mvDtArw" href="javascript:void(0);" onclick="toggleDropDown(\'mvDtArr\', \'mvDtArw\', \'drarw\', \'drarw\');"></a>';
			htmldd += '<span class="show_dt dn" id="mvDtArr"><ul>';
                            var day0 = getMovieDate(0,'');
                            var day00 = getDate(0);
                            var day0Arr = day0.split(',');
                            var day1 = getMovieDate(1,'');
                            var day11 = getDate(1,'');
                            var day1Arr = day1.split(',');
                            var day2 = getMovieDate(2,'');
                            var day22 = getDate(2);
                            var day2Arr = day2.split(',');
                            var nodays = 7;
							for (var cnt=0;cnt<nodays;cnt++){
								var day0 = getMovieDate(cnt,'');
								var day00 = getDate(cnt);
								var disdate = getMovieShortDate(cnt, '');								 
								if (day0.indexOf(cdate)!='-1'){
									cdateval = 	disdate;
								}
								else {
									htmldd += '<li onclick="get_movie_info(\''+docid+'\', \''+day0+'\', \''+city+'\', \''+area+'\', \''+sdateid+'\', event);">'+disdate+'</li>';
								}
							}
							
                        htmldd += '</ul></span>';
                    htmldd += '<input type="text" id="mvDate_'+docid+'" value="'+cdateval+'" class="ddt" readonly onclick="toggleDropDown(\'mvDtArr\', \'mvDtArw\', \'drarw\', \'drarw\');">';
                     //html += htmldd;
					 htmldd += '</span>';
					  //htmldd += '<select><option>5 April</option><option>6 April</option><option>7 April</option></select>';
				//html += '</h1>';
				html += '<div class="bmto_txt"> Book Movie Ticket Online </div>';
				html += '<div class="movie-filter"><span class="movie-filter-box"><input id="mvflter" type="text" value="Type a movie name to filter" onfocus="checkmvflter(\'focus\');" onblur="checkmvflter(\'blur\');"  onkeyup="filterMovieList(this.value);" > <a class="fltbx_clsi dn" onclick="checkmvflter(\'clrfltr\');"> <img src="../../tools/img/inreset.gif"> </a></span><span class="movie-filter-time">'+htmldd+'</span><span class="movie-filter-hide" id="spnfltrhd"><input type="checkbox" value="y" id="chkhideunvail" onclick="javascript:hideUnavailTime(this);"> Hide Unavailable Shows</span></div>';
                html += '<section id="mvti" class="mvti">';
               
            
                   
                html += mvhtml;
                html += '</section>';
                $("#movieTiming").html(html);
                if (mvfilertext != '') {	
					$('#mvflter').val(mvfilertext);			
					filterMovieList(mvfilertext);
				}
				if (chkhideunvail){
					$('#chkhideunvail').attr('checked', true);
					hideallUnavailTime();	
				}
                get_movie_images(result, docid, cdate, city, area, sdateid);               
			}
			 if ($('.jfbt_in').html()=='' && $("#mvti .blue-time").length==0){
					$('#spnfltrhd').hide();
				}
	}});	
}

function get_movie_images(result, docid, cdate, city, area, sdateid)
{
	var d = eval('(' + result + ')');
	var mid_arr = d[0]['id_arr'];
	var jdids = d[0]['jdid_arr'];
	var jdncats = d[0]['jdncat_arr'];
	if (jdids ==''){
	 return true;
	}
	$.ajax({url:WEBROOT+"functions/ajxMovieInfo.php?jdids="+jdids+"&jdncats="+jdncats+"&docid="+docid+"&result_type=5&date="+cdate+"&city="+city+"&area="+area ,async:true, 
	success:function(result){
		var d = eval('(' + result + ')');
		var mvid_arr = jdids.split(",");
		var movieImgArr = d['movieResizeImg'];
			jQuery.each(mvid_arr, function(cnt,jdId) {	
					
				
				mhtml = '';
				mvName = $('#mvDImgName_'+jdId).val();
				if (movieImgArr != null && typeof(movieImgArr[jdId]) != 'undefined') {
					var mImg = movieImgArr[jdId];	
					mhtml +=  '<a href="javascript:void(0)" class="pop_pstbg" onclick="openMovieTrailer(\''+mvName+'\',\''+mImg['ytid']+'\',\'\',\'0\')">';
					mhtml += '<img src="'+mImg['url']+'"  style="width: '+mImg['width']+'px; height: '+mImg['height']+'px; margin-top: '+mImg['margintop']+'px; margin-left: '+mImg['marginleft']+'px; top: 50%; left: 50%; position:absolute;"/>';
					if (mImg['ref']=='ytimg'){						
						mhtml += '<span class="marow"></span>';
					}
					mhtml += '</a>';
				}
				else {
					var	mImg ='http://img.jdmagicbox.com/icontent/no-poster.gif';
					mhtml += '<img src="'+mImg+'"  width="215px" height="121px"/>';
				}
				$('#mvDImgId_'+jdId).html(mhtml);
			});
		}
	});
	
	
}

function get_movie_html(result, docid, cdate, city, area, sdateid)
{	
	var mid = getCookie('moviecid');
	var mhtml = '';
	var d = eval('(' + result + ')');
	var mid_arr = d[0]['id_arr'];
	var movieImgArr = d['movieResizeImg'];
	mid_arr = mid_arr.replace(/\'+/g, '');
	var n = mid_arr.split(",");
      
	if(mid_arr!='' && n.length > 0)
	{
	for(j=0;j<n.length;j++)
	{
		
		if(typeof(d[0][n[j]]) != 'undefined' && d[0][n[j]]['jd_movieid']==mid)
		{
			var temp=n[j];
		}	
	}
	for(j=0;j<n.length;j++)
	{
		if(n[j]==temp)
		{
			var tmp=n[0];
			n[0]=temp;
			n[j]=tmp;
		}
	}
		for(j=0;j<n.length;j++)
		{
			if(typeof(d[0][n[j]]) != 'undefined')
			{
				var movieid = n[j];		
				var jdmovieid = d[0][n[j]]['jd_movieid'];
				var docname = $('#what').val();	
				var srcMovieName = d[0][n[j]]['movie_name'].replace(/[\W]/g, '');
				srcMovieName = $.trim(srcMovieName).toLowerCase();
				
				mhtml += '<aside class="movie" name="'+srcMovieName+'">';
				mhtml += '<input type="hidden" id="mvDImgName_'+d[0][n[j]]['jd_movieid']+'" value="'+d[0][n[j]]['movie_name']+'"/>';
				mhtml += '<span class="mvdtimg" id="mvDImgId_'+d[0][n[j]]['jd_movieid']+'">';				
				
				var	mImg = 'http://img.jdmagicbox.com/icontent/trans.gif';
				mhtml += '<img src="'+mImg+'"/>';				
				mhtml += '</span>';
					mhtml += '<div class="mvrt">';
						mhtml += '<a title="'+d[0][n[j]]['movie_name']+' in '+area+'" href="'+ WEBROOT+d[0][n[j]]['movie_url'] +'" class="movie_name"><strong>'+d[0][n[j]]['movie_name']+'</strong></a>';
						mhtml += '<span class="mvrtng">';
					
					var str=d[0][n[j]]['movie_name'];
						if(str.indexOf('(U/A)') != -1)
						{
							str=str.replace("/","-");
							//str=str.replace(" ","-");
						}
						
						//str=str.replace(" ","-");
						str=$.trim(str).replace(/\s+/g, '-');
					
					var url = WEBROOT+'Movies'+'/'+str+'/'+d[0][n[j]]['jd_movienid'];
					
					
					
					var jd_star = d[0][n[j]]['jd_rating'];
                  	if(jd_star != null)
                    {
					if(jd_star != '' && jd_star[0] != 0)
					{
						mhtml += '<span class="cr_ur"><span  class="flt">Critics Ratings</span>';
						mhtml += '<a class="sel" href="'+url+'">';

						mhtml += '<span class="stars_m">';
						for(k=0;k<=5;k++)
						{
							mhtml += '<span class="rs'+ jd_star[k] +'">';
							mhtml += '</span>';
						}
						mhtml += '</span>';

						mhtml += '</a>';
						mhtml += '</span>';
						
                                            }
					}
					
					var user_star = d[0][n[j]]['user_rating'];
                                        if(user_star != null) {
					if(user_star != 0 && user_star[0] != 0)
					{
						mhtml += '<span class="cr_ur"><span  class="flt">JD User Ratings</span>';
						mhtml += '<a class="sel" href="'+url+'">';

						mhtml += '<span class="stars_m">';
						
						for(k=0;k<=5;k++)
						{
							mhtml += '<span class="rs'+ user_star[k] +'">';
							mhtml += '</span>';
						}
						mhtml += '</span>';
                                                
                                                if(d[0][n[j]]['num_rating']) {
                                                    mhtml += '<span>('+d[0][n[j]]['num_rating']+' Ratings)</span>';
                                                }
						mhtml += '</a>';
						mhtml += '</span>';//cr_ur
					} }
					mhtml += '</span><!-- mvrtng -->';
                                        var size = Object.size(d[0][n[j]]);
										/*if(d[0][n[j]]['movie_name'].length<45 && (size-7 > 10) ) { var btm = 'btm'; } else { var btm = ''; }*/
										var btm = '';
					mhtml +='<div class="rmt_outer '+btm+'">';
					var moviett = d[0][n[j]]['movie_name'].split('(');
					if(d[0][n[j]]['num_rating'] > 0) {
						mhtml += '<a title="'+$.trim(moviett[0])+' Reviews & Ratings" class="mvouter" href="'+url+'"><span class="jdrr"></span>Read Review</a>';
					}
					
					if(d[0][n[j]]['specification_details']){
						mhtml += '<a title="Watch '+d[0][n[j]]['movie_name']+' Trailer " class="mvouter" onclick="_ct(\'movideo\',\'dtpg\');" href="'+url+'"><span class="wt"></span>Watch Trailer</a>';
					}
					
					if(d[0][n[j]]['movie_name'].indexOf('Forthcoming') == -1 || d[0]['isCritic']) {
						mhtml += '<a title="Write a review for '+d[0][n[j]]['movie_name']+'" class="mvouter" href="'+url+'/writereview_movie"><span class="jdrm"></span>Rate This Movie</a>';
					}
					
					mhtml += '<input type="hidden" id="btMovieName_'+tmpDoc+'" value="'+d[0][n[j]]['movie_name']+'"/>';
					var tmpDoc = d[0][n[j]]['jd_movieid'];
					mhtml += '</div>';//rmt_outer
				
					mhtml += '</div"><!-- mvrt-->';
					mhtml += '</div>';
					//if(d[0][n[j]]['movie_name'].indexOf('Forthcoming') == -1) {
						
						if (size<=7){							
							mhtml += '<div class="tm_btfcom"><span>Forthcoming Movie</span></div>';
							}
							else {
					mhtml += '<div class="tm_bt">';
					
					var mvtimehtml ='';
					var bookavailcnt = 0;
                    for(i=7;i<size;i++)
					{
						
						if (typeof(d[0][n[j]][i])=='undefined' || typeof(d[0][n[j]][i]['showtime'])== 'undefined'){
						continue;	
						}
						var currentTime = new Date();						
						 var chkMovieTime = currentTime.getTime() + (45 * 60 * 1000);
						 
						 var nTime = new Date(chkMovieTime);
						 if (currentTime.getDate() != nTime.getDate()){
								var current_time = '23:59';
							}
							else {
								var current_time = nTime.getHours()+':'+nTime.getMinutes();
							}						
						var current_date = getMovieDate(0,'');
						var current_dateArr = current_date.split(',');
						var mtime = d[0][n[j]][i]['showtime'];
						var murl = d[0][n[j]][i]['cinema_url'];
						var landingurl = (d[0][n[j]][i]['landing_url']);//escape
						var movieScheduleid = d[0][n[j]][i]['movieScheduleid'];						
						
						if (d[0]['srcdata']=='TP'){							
							if (current_dateArr[0] == cdate && (d[0][n[j]][i]['msTime'] < current_time)) {
								mvtimehtml += '<span class="mvtm"><span class="gray-time">'+mtime+'</span></span>';
							}
							else {
								bookavailcnt++;
								d[0]['moviebookingSrc'] = d[0]['moviebookingSrc'].toUpperCase();
								if (d[0]['moviebookingSrc']=='FC'){
									mvtimehtml += '<span class="mvtm"><span class="blue-time"><a rel="nofollow" target="_blank"  onclick="bookMovieSite(\'' + landingurl + '\',\''+city+'\',\''+tmpDoc+'\',\''+d[0][n[j]]['movie_name']+'\',\''+docid+'\',\''+docname+'\',\''+mtime+'\',\''+movieid+'\',\''+d[0][n[j]][i]['theatreid']+'\',\''+movieScheduleid+'\',\''+d[0]['moviebookingSrc']+'\');" href="'+landingurl+'" onclick="_ct(\'BCBT\',\'dtpg\');"><span>'+mtime+'</span></a></span></span>';
								}
								else if (d[0]['moviebookingSrc']=='PVR' || d[0]['moviebookingSrc']=='CINEMAX'){
									mvtimehtml += '<span class="mvtm"><span class="blue-time"><a rel="nofollow" href="javascript:void(0);"  onclick="bookSSO(\'' + movieScheduleid + '\',\'' + d[0][n[j]][i]['theatreid'] + '\',\''+movieid+'\',\''+d[0]['moviebookingSrc']+'\');"><span>'+mtime+'</span></a></span></span>';
								}
								else {
									mvtimehtml += '<span class="mvtm"><span class="blue-time"><a rel="nofollow" href="javascript:void(0);" onclick="_ct(\'BCBT\',\'dtpg\');bookMovieTicket(\'cinema\',\''+tmpDoc+'\',\''+movieScheduleid+'\');"><span>'+mtime+'</span></a></span></span>';
								}
							}
						}						
						else if(current_dateArr[0] != cdate && murl != '')
						{
							bookavailcnt++;
							mvtimehtml += '<span class="mvtm"><span class="blue-time">';
							mvtimehtml += '<a href="'+murl+'" target="_blank" rel="nofollow" onclick="_ct(\'BCBT\',\'dtpg\');">';
									mvtimehtml += '<span>'+mtime+'</span>';
							mvtimehtml += '</a>';
							mvtimehtml += '</span></span>';
						}
						else if(d[0][n[j]][i]['msTime'] >= current_time && murl != '')
						{
							bookavailcnt++;
							mvtimehtml += '<span class="mvtm"><span class="blue-time">';
							mvtimehtml += '<a href="'+murl+'" target="_blank" rel="nofollow" onclick="_ct(\'BCBT\',\'dtpg\');">';
								mvtimehtml += '<span>'+mtime+'</span>';
							mvtimehtml += '</a>';
							mvtimehtml += '</span></span>';
						}
						else if (murl != ''){							
							mvtimehtml += '<span class="mvtm"><span class="gray-time semidark">';
							mvtimehtml += '<a href="'+murl+'" target="_blank" rel="nofollow" onclick="_ct(\'BCBT\',\'dtpg\');">';
								mvtimehtml += '<span>'+mtime+'</span>';
							mvtimehtml += '</a>';
							mvtimehtml += '</span></span>';
						}
						else
						{
							mvtimehtml += '<span class="mvtm"><span class="gray-time">'+mtime+'</span></span>';
						}
					}
					if (bookavailcnt>0){
						mhtml += '<span class="mvtm"><span class="book-ticket"><span class="book-now"><a href="javascript:void(0);" title="Book Movie Tickets" onclick="javascript:_ct(\'orngbookmovie\',\'dtpg\',\'16777216\');bookMovieList(\''+docid+'\',\''+jdmovieid+'\');">Book</a></span></span></span>';
					}
				
					mhtml += mvtimehtml+'</div>';
				}//movie times
						
				mhtml += '</aside>';
				if (d[0]['srcdata']=='TP'){		
					var bkTkHtml = '<a title="Book Movie Tickets" class="grnbtn" href="javascript:void(0);" onclick="_ct(\'bookmovie\',\'dtpg\',\'16777216\');scrollToDiv(\'movieTiming\')">Book Tickets</a>';
					$('.jfbt_in').html(bkTkHtml);
				}
				else {
					$('.jfbt_in').html('');
				}
			}
		}
		
		mhtml += '<aside class="dn" id="mvNoRes" style="text-align:center"><b>No Results Found</b></aside>';
			
	}
	if(mhtml != '')
	{           
           return mhtml;
	}
}

function tab_clicked(docid,casepv,datacity,dftab)
{
	if($('#'+casepv).hasClass("current"))
	{
		if((casepv == 'mnutab' ||  casepv == 'reviews_ratings' || casepv == 'shoponline' || casepv == 'book_appt') && dftab == '')
		{
			scrollToDiv('tabnavid');
		}
		return false;
	}
	if((!$('#bizinfo').hasClass("dn") || !$('#mst_srchs').hasClass("dn")) && casepv != 'moreinfo' && casepv != 'map')
	{
		$('#bizinfo').addClass('dn');
		$('#mst_srchs').addClass('dn');
	}
	

	$("#tglsct").append('<section id="ocustoverly" class="overly dn"><span class="dtload"><img src="http://img.jdmagicbox.com/webstatic/preloader.gif" /></span></section>');
	$("#ocustoverly").show();
	
	$('.current a ').attr('style', 'cursor:pointer');
	$('.current').removeClass('current');
        
        if(casepv != 'mnutab'){
            $("#verage").hide();
            $("#custoverly").hide();
            $('#vrtical').hide();
            $('#tglsct').show();
            $('#vrtical').hide();
            $("#custoverly").hide();
			$("#laundryId").hide();
			$("#courierId").hide();
        }
        
	if(casepv == 'map')
	{
		$('#moreinfo').addClass('current');
		$('.current a ').attr('style', 'cursor:default');
	}
	else if(casepv == 'mnutab'){
          if(dftab != 1){ 
			$('html,body').animate({
				scrollTop : $('.tabnav').offset().top
			},'slow');
          }
            
            $(".tabnav").lavaLamp({ fx: "backout", speed: 700 });
            $('#ordSummry').attr("style","top:0px");
            
            $('#mnutab').addClass('current');
			$('.current a ').attr('style', 'cursor:default');
            $('#tglsct').html('');
            $('#tglsct').hide();
            $('#vrtical').show();
            var vflg = getCookie('vflg');
            if($("#isreg").val() == 5 && (onloadFn == "detailsPage" || onloadFn == "menuPage") && vflg != 1){
                
                $("#custoverly").show(); 
                $("#verage").show(); 
                openDiv('verage');
           
            } 
            
            return false;
	}
   /* else if(casepv == 'tcare'){
      $('#mnutab').addClass('current');
	  $('.current a ').attr('style', 'cursor:default');
          $('#thyOrdSmry').attr("style","top:0px");
	  $('#tglsct').html('').hide();
	  $('#vrtical').show();
      }*/
      

	else
	{
		if(casepv == 'video')
		{
			$('#photo_video').addClass('current');
			$('.current a ').attr('style', 'cursor:default');
		}
		else
		{
			$('#'+casepv).addClass('current');
			$('.current a ').attr('style', 'cursor:default');
		}
	}
	
	if(casepv == 'photo_video' || casepv == 'video') {
		$("head").append('<script type="text/javascript" src="'+WEBROOT +'/tools1/js/jquery.galleriffic.js"></script>');
		$("head").append('<script type="text/javascript" src="'+WEBROOT +'/tools1/js/jquery.opacityrollover.js"></script>');
	}
	
	if(casepv == 'book_ticket')
	{
		var wht = $('#what').val();
		//if(wht.indexOf('Big Cinema') != -1)
		//{
				var currentDate = new Date();
				currentDate = $.datepicker.formatDate('d MM', currentDate); //yy	
				var movieCity = (typeof(autoValue)!='undefined' && autoValue!='')?autoValue: $('#city').val();			
				get_movie_info(MDOCIDJ,currentDate+', Today',movieCity, $('#where').val(), 'a1');	
		//}
		$('#tglsct').removeClass('dn');
		if(dftab != 1)
		{
			scrollToDiv('tabnavid');
		}
	}
	else if(casepv == 'reviews_ratings')
	{
		loadreviewsdata();
		if(dftab != 1)
		{
			setTimeout('scrollToDiv(\'tabnavid\')',600);
		}
	}
	else if(casepv == 'book_appt')
	{
		/*var typflag = $("#type_flag").val();
		var stypflag = $("#sub_type_flag").val();
		getDoctorInfo(docid, typflag, stypflag);*/
		if(dftab != 1)
		{
			setTimeout('scrollToDiv(\'doctmain\')',600);
		}
	}
	/*else if(casepv == 'grocerytab' && tab != "grocery" && tab != 'grocerycheckout' && tab != 'grocerysearch')
	{
		bid = 128;
		getGroceryData(docid,128);
	}
	else if(casepv == 'pharmacytab' && tab != "pharmacy" && tab != 'pharmacycheckout' && tab != 'pharmacysearch')
	{
		bid = 32768;
		getGroceryData(docid,32768);
	}*/
	else if(casepv == 'courier')
	{		
		if ($('#tglsct').length){
		document.getElementById('tglsct').innerHTML = '';
		$("#tglsct").hide();
		$("#courierId").show();		
		if(dftab != 1)
		{
		scrollToDiv('tabnavid');		
		}
	  }		
	}
	else if (casepv == 'shoponline')
	{
		$('.current').removeClass('current');
		$('#shoponline').addClass('current');
		
		 $.get(WEBROOT+"functions/detailapi.php", {'docid': docid, 'casepv': casepv, 'datacity': escape(datacity), 'prid' : escape(ed('prid').value) ,'mrp' : escape(ed('pmrp').value) , 'qqcatid' : escape(ed('pcatid').value), 'urlid' : escape(ed('urlid').value)}, function(data) {
			toggleCssShop();
			ed("tglsct").innerHTML = data;
			/*$('.active').find('.sfltr').each(function(){
				setSlider($(this));
			});*/
		 });

		if(dftab != 1)
		{
			setTimeout('scrollToDiv(\'tabnavid\')',1500);
		}
		
	}
	
	else 
	{
	    $.getJSON(WEBROOT+"functions/detailapi.php", {'docid': docid, 'casepv': casepv, 'datacity': escape(datacity), 'area' : escape(ed('areaval').value) , 'ali_area' : escape(ed('ali_area').value), 'urlid' : escape(ed('urlid').value), 'city' : escape(ed('city').value)}, function(data) {
			if(ed("tglsct"))
                ed("tglsct").innerHTML = getpv_html(docid,data,casepv,datacity);
			if(dftab != 1)
			{
                            if(scrvto == 1)
				{
                                scrollToDiv('serdiv');
                                scrvto=0;
				}
				else
				{
			scrollToDiv('tabnavid');
		}
			}
		if(casepv == 'photo_video' || casepv == 'video') {
				if(data.catalog.showcase){
			galleriffic();
				}
			if(data.video.showvideo == 1)
			{
					if(navigator.userAgent.indexOf("iPad") == -1 && navigator.userAgent.toLowerCase().indexOf("android") == -1)
				{
					$(".vidwrp").append('<div id="mediaspaces" style="margin-bottom:10px;"></div><script type="text/javascript" src="'+WEBROOT +'/tools/js/swfobject.js"></script><script type="text/javascript" src="'+WEBROOT +'/tools/js/jwplayer.js"></script>');
					$(".vidwrp").append(jwplayer("mediaspaces").setup({
						flashplayer: WEBROOT+'player.swf',
						autostart: true,
						fullscreen: true,
						file: data.video.video,
							height: 239,
							width: 280,
						image: data.video.videothumb
							   
					}) );
				}
				else
				{
						var videohtml = '<video id="my_video_1" class="video-js vjs-default-skin" width="282" height="220" poster="'+data.video.videothumb+'" controls preload >';
					videohtml += 		'<source src="'+data.video.videoarr.tgp+'" type="video/3gp" /><source src="'+data.video.videoarr.mp4+'" type="video/mp4" /><source src="'+data.video.videoarr.wmv+'" type="video/wmv" /><source src="'+data.video.videoarr.ogg+'" type="video/ogg" /><source src="'+data.video.videoarr.flv+'" type="video/flv" /></video>';
					
					$(".vidwrp").append(videohtml);

					
				}
				if(casepv == 'video')
				{
					show_pv('vidwrp','content');
				}
			}
		}
		/*else if(casepv == 'map')
		{
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "http://maps.google.com/maps/api/js?key=AIzaSyA5hRIhL7wc4soChK1d7OC4ihufiKIxmHk&sensor=false&callback=initialize";
			document.body.appendChild(script);
		}*/
	 });
	}
    $(".tabnav").lavaLamp({ fx: "backout", speed: 700 });
}

function getDoctorInfo(doctid, tflag, stflag)
{
    var dtid = doctid;
    if(tflag == 2)
    {
        $.ajax({
            url: WEBROOT + 'webmain/doc.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'getInfo',
                bdocid: dtid,
                type_flag: tflag,
                sub_type_flag: stflag,
                base_url: baseurl
            },
            success: function(docinfo){
                var docinfocon = (typeof docinfo != 'undefined' && docinfo != '' && docinfo != null) ? true : false;
                if(docinfocon)
                {
                    var shwcl = (typeof docinfo.results.showCal != 'undefined' && docinfo.results.showCal != null && docinfo.results.showCal != '');
                    shwcl = (shwcl) ? docinfo.results.showCal : 0;
                    if(shwcl == 1)
                    {
                        $("#doct_from_where").val('cal');
                        dtid = docinfo.results.doctid;

                        $.ajax({
                            url: WEBROOT+"webmain/doc.php",
                            async: false,
                            type: 'POST',
                            data: {
                                action: 'startCalendarDet',
                                month: 0,
                                year: 0,
                                bdocid: dtid,
                                base_url: baseurl,
                                showCal: shwcl
                            },
                            success: function(calinfo){

								var dataev = eval('(' + calinfo + ')');
								calinfo = dataev.cal_data;
							
                                if(calinfo.indexOf('|@|') != -1)
                                {	
                                    spltcaldt = calinfo.split('|@|');
                                    if(spltcaldt[1] == 'ACTION')
                                    {
                                            $('#docerrmsg').html('Please enter action');
                                    }									
                                    else if(spltcaldt[1] == 'DEFAULT')
                                    {
                                            $('#docerrmsg').html('No matching action found');
                                    }
                                    else
                                    {
                                            $('#docerrmsg').html(spltcaldt[1]);
                                    }
                                    openDiv('docerr');
                                    document.getElementById('tglsct').innerHTML = '';
                                    //document.getElementById('calendarInternal').innerHTML = '';
                                }
                                else
                                {
                                    showCalender(docinfo, calinfo);
                                    //document.getElementById('calendarInternal').innerHTML = data;
                                }
                            }
                        });
                    }
                    else if(shwcl == 2)
                    {
                            $("#doct_from_where").val('loc');
                            showDocLocation(docinfo);
                    }
                    else if(shwcl == 3)
                    {
                            $("#doct_from_where").val('hosp');
                            showDeptList(docinfo);
                    }
                    else
                    {
                            document.getElementById('tglsct').innerHTML = '';
                    }
                }
                else
                {
                    document.getElementById('tglsct').innerHTML = '';
                }
            }
        });
    }
}

function showCalender(docinfo, calinfo)
{
    var html = '';

    if(typeof docinfo.results.head_details != 'undefined' && docinfo.results.head_details != null && docinfo.results.head_details != '')
    {
        html += "<aside class='doc_dtl'>";
            if(typeof docinfo.results.head_details.qual_special != 'undefined' && docinfo.results.head_details.qual_special != null && docinfo.results.head_details.qual_special != '')
            {
                html += docinfo.results.head_details.qual_special;
                html += "<br/>";
            }

            if(docinfo.results.head_details.avail_days != undefined && docinfo.results.head_details.avail_days != '' && docinfo.results.head_details.avail_days != null)
            {
                html += "<b>Available on:</b> ";
                for(var i in docinfo.results.head_details.avail_days)
                {
                    var avl_ds = docinfo.results.head_details.avail_days[i];
                    if(typeof avl_ds[0] != 'undefined' && typeof avl_ds[1] != 'undefined' && avl_ds[0] != '' && avl_ds[1] != '' && avl_ds[0] != null && avl_ds[1] != null)
                    {
                        if(i == 0)
                            html += avl_ds[0] + " | " + avl_ds[1];
                        else
                            html += ', ' + avl_ds[0] + " | " + avl_ds[1];
                    }
                }
            }

        html += "</aside>";

        if(typeof docinfo.results.head_details.ent_name != 'undefined' && docinfo.results.head_details.ent_name != null && docinfo.results.head_details.ent_name != '')
        {
            html += "<aside class='chead'>";
                html += "Select a date from the calendar to book an appointment with <em>" + docinfo.results.head_details.ent_name + "</em>";
            html += "</aside>";
        }

        if(typeof calinfo != 'undefined' && calinfo != null && calinfo != '')
        {
            html += "<section class='book_appointment'>";
                //html += "<section class='calendarBox' style='height:420px;'>";
                html += "<section class='calendarBox'>";
                    html += "<aside class='calendarBox_lt'>";
                        html += "<ul>";
                            html += "<li><span class='na_block'></span><span class='na_block_txt'>Not Available</span></li>";
                            html += "<li><span class='a_block'></span><span class='a_block_txt'>Available</span></li>";
                            html += "<li><span class='f_block'></span><span class='f_block_txt'>Fully Booked</span></li>";
                        html += "</ul>";
                    html += "</aside>";
                    html += "<aside id='calendarInternal' class='calendarBox_rt'>";
                        html += calinfo;
                    html += "</aside>";
                    html += "<br clear='all' />";
                html += "</section>";
            html += "</section>";
        }
    }

    document.getElementById('tglsct').innerHTML = html;
}

function showDocLocation(docinfo)
{
    var html = '';

    if(typeof docinfo.results.head_details != 'undefined' && docinfo.results.head_details != null && docinfo.results.head_details != '')
    {
        html += "<aside class='doc_dtl'>";
            if(typeof docinfo.results.head_details.qual_special != 'undefined' && docinfo.results.head_details.qual_special != null && docinfo.results.head_details.qual_special != '')
            {
                html += docinfo.results.head_details.qual_special;
            }
        html += "</aside>";

        html += "<section class='fltc'>";
            html += "<span class='chead'>" + docinfo.results.head_details.ent_name + " is available at the following locations</span>";
            html += "<section class='fltc_outer'>";
                html += "<ul class='multi_loc'>";
                    for(var i = 0; i<docinfo.results.location_info.length; i++)
                    {
                        html += "<li>";
                            html += "<a title='" + docinfo.results.head_details.ent_name + ", " + docinfo.results.location_info[i].doc_area + "' href='#' onclick='selDocLocationDet(\"" + docinfo.results.location_info[i].doctid + "\", \"" + docinfo.results.location_info[i].next_url + "\",\""+docinfo.results.location_info[i].dept+"\"); return false;'>"
                                html += "<strong>" + docinfo.results.location_info[i].doc_area + "</strong>";
                                html += "<em class='hosp_add'>";
                                    html += docinfo.results.location_info[i].work_place + "<br/>";
                                    for(var j in docinfo.results.location_info[i].hours_of_operation)
                                    {
                                        var avl_info = docinfo.results.location_info[i].hours_of_operation[j];
                                        if(typeof avl_info[0] != 'undefined' && typeof avl_info[1] != 'undefined' && avl_info[0] != '' && avl_info[1] != '' && avl_info[0] != null && avl_info[1] != null)
                                        {
                                            if(j == 0)
                                                html += docinfo.results.location_info[i].hours_of_operation[j][0] + " | " + docinfo.results.location_info[i].hours_of_operation[j][1];
                                            else
                                                html += ', ' + docinfo.results.location_info[i].hours_of_operation[j][0] + " | " + docinfo.results.location_info[i].hours_of_operation[j][1];
                                        }
                                    }
                                html += "</em>";
                            html += "</a>";
                        html += "</li>";
                    }
                    html += "</ul>";
            html += "</section>";
        html += "</section>";
    }

    document.getElementById('tglsct').innerHTML = html;
}

function showDeptList(docinfo)
{
    var html = '';
    var deptLen = docinfo.results.dept_list.length;
    var docLen = docinfo.results.doc_list.length;

    html += "<section class='fltc'>";
        html += "<aside class='topNav'>";
            html += "<a title='Select By Department' href='javascript:;' onclick='selectFilterType(\"deptlist\", \"selbydept\");' class='sel' id='selbydept'>Select by Department</a>";
            html += "<a title='Select By Doctor' href='javascript:;' onclick='selectFilterType(\"doclist\", \"selbydoc\");' id='selbydoc'>Select by Doctor</a>";
        html += "</aside>";

        html += "<span id='deptlist'>";
            html += "<section class='fltc_outer'>";

                html += "<ul>";
                for(var i=0; i<deptLen; i++)
                {
                    var atitle = docinfo.results.dept_list[i].dept;
                    var nxturl = docinfo.results.dept_list[i].next_url;
                    if(typeof atitle != 'undefined' && atitle != '' && atitle != null)
                    {
                        html += "<li>";
                            html += "<a title='"+atitle+"' href='"+nxturl+"'>" + atitle + "</a>";
                        html += "</li>";
                    }
                }
                html += "</ul>";

            html += "</section>";

            html += "<h3 class='fhead'><strong>Select by Doctor</strong></h3>";
            html += "<section class='fltc_outer'>";

                html += "<ul>";
                for(var i=0; i<docLen; i++)
                {
                    var atitle = '';
                    var spcl = docinfo.results.doc_list[i].doc_special;
                    var spltspcl;
                    if(spcl.indexOf('|~|') != -1)
                    {
                        spltspcl = spcl.split('|~|');
                    }
                    else if(spcl.indexOf('|@|') != -1)
                    {
                        spltspcl = spcl.split('|@|');
                    }
                    else
                    {
                        spltspcl = spcl.split(',');
                    }

                    var qulspl = '';

                    if(spltspcl.length >= 1)
                    {
                        for(var k=0;k<=spltspcl.length;k++)
                        {
                            if(typeof spltspcl[k] != 'undefined' && spltspcl[k] != '' && spltspcl[k] != null)
                            {
                                if(k == 0)
                                    qulspl += spltspcl[k];
                                else
                                    qulspl += ', ' + spltspcl[k];
                            }
                        }
                    }

                    var showtxt = '';
                    if(typeof spcl != 'undefined' && spcl != '' && spcl != null)
                    {
                        atitle = docinfo.results.doc_list[i].doc_name + ", " + qulspl;
                        showtxt = docinfo.results.doc_list[i].doc_name + ", <em>" + qulspl + "</em>";
                    }
                    else
                    {
                        atitle = docinfo.results.doc_list[i].doc_name;
                        showtxt = docinfo.results.doc_list[i].doc_name;
                    }
                    var nxturl = docinfo.results.doc_list[i].next_url;
                    var seldid = docinfo.results.doc_list[i].doctid;
                    var enm = docinfo.results.doc_list[i].doc_name;
                    html += "<li>";
                        html += "<a title='"+atitle+"' href='javascript:;' onclick='return selectDocDet(\""+seldid+"\", \""+enm+"\", \""+nxturl+"\");'>" + showtxt + "</a>";
                    html += "</li>";
                }
                html += "</ul>";

            html += "</section>";

        html += "</span>";

        html += "<span id='doclist' style='display:none;'>";
            html += "<aside class='serach_f'>";
                html += "<input class='input_f' placeholder='Search for a doctor by name' type='text' value='' name='txt_doctor' id='txt_doctor' onkeyup='filterDocs(\"txt_doctor\");' />"
                html += "<input class='search_btn' type='button' id='srchDoct' onclick='filterDocs(\"txt_doctor\");' value='' />";
            html += "</aside>";

            html += "<section class='fltc_outer' id='docli'>";

                html += "<ul>";
                for(var i=0; i<docLen; i++)
                {
                    var atitle = '';
                    var spcl = docinfo.results.doc_list[i].doc_special;

                    var spltspcl;
                    if(spcl.indexOf('|~|') != -1)
                    {
                        spltspcl = spcl.split('|~|');
                    }
                    else if(spcl.indexOf('|@|') != -1)
                    {
                        spltspcl = spcl.split('|@|');
                    }
                    else
                    {
                        spltspcl = spcl.split(',');
                    }

                    var qulspl = '';

                    if(spltspcl.length >= 1)
                    {
                        for(var k=0;k<=spltspcl.length;k++)
                        {
                            if(typeof spltspcl[k] != 'undefined' && spltspcl[k] != '' && spltspcl[k] != null)
                            {
                                if(k == 0)
                                    qulspl += spltspcl[k];
                                else
                                    qulspl += ', ' + spltspcl[k];
                            }
                        }
                    }

                    var showtxt = '';
                    if(typeof spcl != 'undefined' && spcl != '' && spcl != null)
                    {
                        atitle = docinfo.results.doc_list[i].doc_name + ", " + qulspl;
                        showtxt = docinfo.results.doc_list[i].doc_name + ", <em>" + qulspl + "</em>";
                    }
                    else
                    {
                        atitle = docinfo.results.doc_list[i].doc_name;
                        showtxt = docinfo.results.doc_list[i].doc_name;
                    }
                    var nxturl = docinfo.results.doc_list[i].next_url;
                    var seldid = docinfo.results.doc_list[i].doctid;
                    var enm = docinfo.results.doc_list[i].doc_name;
                    html += "<li id='doc_"+i+"'>";
                        html += "<a title='"+atitle+"' href='javascript:;' onclick='return selectDocDet(\""+seldid+"\", \""+enm+"\", \""+nxturl+"\");'>" + showtxt + "</a></li>";
                    html += "</li>";
                }
                html += "</ul>";

            html += "</section>";
		
            html += "<h3 class='fhead'><strong>Select by Department</strong></h3>";
            html += "<section class='fltc_outer'  id='deptli'>";


                html += "<ul>";
                for(var i=0; i<deptLen; i++)
                {
                    var atitle = docinfo.results.dept_list[i].dept;
                    var nxturl = docinfo.results.dept_list[i].next_url;
                    if(typeof atitle != 'undefined' && atitle != '' && atitle != null)
                    {
                        html += "<li id='dept_"+i+"'>";
                            html += "<a title='"+atitle+"' href='"+nxturl+"'>" + atitle + "</a>";
                        html += "</li>";
                    }
                }
                html += "</ul>";

            html += "</section>";
	html += "</span>";

    html += "</section>";

    document.getElementById('tglsct').innerHTML = html;
}

function getpv_html(docid,data,casepv,datacity)
{
	var html = '';
	$('#tglsct').removeClass('dn');
	if(casepv == 'photo_video' || casepv == 'video')
	{
		if(data.catalog.showcase)
		{
			html += '<div id="photosalbum"><ul class="phtLnks">';
							if(data.albums && data.catalog.showcase)
							{
								for(var key in data.albums)
								{
									if (data.albums[key] != "User uploaded photos") {
										var selectedlink = (key == data.first.aid) ? 'class="slct"' : '';
			html +=						'<li><a id="'+key+'" href="javascript:void(0);" onclick="changephotoalbum(\''+docid+'\',this.id,\''+data.albids+'\',\''+datacity+'\');" '+selectedlink+'>'+data.albums[key]+'</a></li>';
									}
								}
							}
			if(data.video.showvideo == 1)
			{
				html += 	'<li><a id="vid_link" href="javascript:void(0);" onclick="show_pv(\'vidwrp\',\'content\');" >Video</a></li>';
			}
			html +=		'</ul></div>';

			html +=		'<div id="photosdiv">';
			html +=			'<div class="content">';
			html +=						'<div class="slideshow-container">';
											if(data.catalog.showcase[data.firstalbm].length > 1) { 
			html += 								'<div id="controls" class="controls"></div>';
											}
			html += 						'<div id="loading" class="loader"></div><div id="slideshow" class="slideshow"></div>';
			html +=						'</div>';
			html +=						'<div id="caption" class="caption-container"></div>';
			html +=						'<div id="thumbs" class="navigation" style="padding:3px 4px 0 57px;">';
			html +=							'<div class="photo-index"></div><ul class="thumbs noscript">';
												for(var key1 in data.catalog.showcase[data.firstalbm])
												{	
													var isIE6 = navigator.userAgent.indexOf("MSIE 6");
													var isIE7 = navigator.userAgent.indexOf("MSIE 7");
													if((data.catalog.showcase[data.firstalbm][key1].image_name == "" || data.catalog.showcase[data.firstalbm][key1].image_desc == "") && (isIE6 == -1) || (isIE7 == -1))
													{
														var margin = "margin-top: -12px;";
													}									
													if(isIE6 != -1 || isIE7 != -1)
													{
														var margin = "margin-top: 2px;";
													}
			html +=									'<li>';
			html +=	(data.catalog.showcase[data.firstalbm][key1].image_thumb) ? '<a class="thumb" name="leaf" href="'+data.catalog.showcase[data.firstalbm][key1].image_org+'" title="'+document.getElementById('cn').value+'"><img src="'+data.catalog.showcase[data.firstalbm][key1].image_thumb+'" width="75" height="65"/></a>' : '';
			html +=										'<div class="caption">';
															if(data.catalog.showcase[data.firstalbm][key1].upload_by && data.catalog.username && data.catalog.username[data.catalog.showcase[data.firstalbm][key1].upload_by]) {
			html +=												'<div class="image-desc image-uname" class="">Photo uploaded by <span style="color:#1274c0;">'+ucwords(data.catalog.username[data.catalog.showcase[data.firstalbm][key1].upload_by])+'</span></div>';
															}
			html +=	(data.catalog.showcase[data.firstalbm][key1].image_name) ? '<div class="image-title">'+data.catalog.showcase[data.firstalbm][key1].image_name+'</div>' : '';
			html +=	(data.catalog.showcase[data.firstalbm][key1].image_desc) ? '<div class="image-desc">'+data.catalog.showcase[data.firstalbm][key1].image_desc+'</div>' : '';
			html +=										'</div></li>';
												}
			html +=							'</ul>';
			html +=						'</div>';					
			html +=					'</div>';
			if(data.video.showvideo == 1)
			{
				html += '<div class="vidwrp dn"></div>'
			}
			html +=	'</div>';
		}
		else if(data.video.showvideo == 1)
		{
			html += '<div id="photosalbum"><ul class="phtLnks">';
			html += 	'<li><a id="vid_link" href="javascript:void(0);" onclick="show_pv(\'vidwrp\',\'content\');" >Video</a></li>';
			html +=		'</ul></div>';
			html += '<div id="photosdiv"><div class="vidwrp"></div></div>';
		}
		
		return html;
	}
	else if(casepv == 'moreinfo' || casepv == 'map')
	{
		$('#bizinfo').removeClass('dn');
		$('#mst_srchs').removeClass('dn');
		html += '<section class="moreinfo">';
		if(casepv == 'map')
		{
			html += '<section class="mapo">';
			html +=		'<section id="map" class ="map"></section>';
			html +=			'<div class="Location">';
			html +=				'<div class="correctL jgre dn"><a href="javascript:void(0);" onclick="openmap(\'enlarge_map_div\',\'drgmp\');">Edit Location</a><span class="ctl"></span></div>';
			if(ed('mpfl').value)
			{
				html +=				'<div class="noBorder" style="display:none;"><input class="ltxt" type="text" id="get_my_directions" value="Get Directions From?" onblur="getvalueBack(\'blur\');" onfocus="getvalueBack(\'focus\');" onkeypress="routeKeyPress(event);" /><input class="button" type="button" id="routebuttn" onclick="javascript:getdirections(\'directions_div\');" value="Route" /></div>';
			}
			html +=			'</div></section>';
		}
		html += '<h3 class="ghd"><span>More</span> Information</h3>';
		html += '<section class="fcont">';
		html += '<aside class="continfo">';
		if(data.add)
		{
			html += '<p><span class="jadd"></span>'+data.add+'</p>';
		}
		if(data.mo_str != '')
		{
			html += '<p><span class="jmob"></span>'+data.mo_str+'</p>';
		}
		if(data.phvn != '' || data.ocnn != '')
		{
			html += '<p><span class="jtel"></span>'+data.phvn+data.ocnn+'</p>';
		}
		if(data.fx)
		{
			html += '<p><span class="jfax"></span>'+data.fx+'</p>';
		}
		if(data.tf_t != '')
		{
			html += '<p><span class="jtel"></span>'+data.tf_t+'</p>';
		}
		if(data.ws_arr != '')
		{
			html += '<p class="wsurl"><span class="jwb"></span>';
			html += 	'<span>'
						for(var i=0;i < data.ws_arr.length;i++)
						{
							var wsb = data.ws_arr[i];
							if(wsb.indexOf('http://') == -1)
							{
								wsb = 'http://'+data.ws_arr[i];
							}
							if (i > 0 )
								html += "<span class='divd'>|</span>";

							html += '<a href="'+wsb+'" onclick="_ct(\'weblink\', \'dtpg\');" rel="nofollow" target="_BLANK">'+data.ws_arr[i]+'</a>';
						}
			html += 	'</span></p>';
		}
		html += '</aside></section>';
		if(data.restaurants_info != '')
		{
			if(data.restaurants_info.cuisines != '')
			{
				html += '<section class="fcont">';
				html += '<h3 class="mhd">Cuisine</h3>';
				html += data.restaurants_info.cuisines;
				html += '</section>';
			}

			if(data.restaurants_info.price_range != '' && data.restaurants_info.price_range > 0)
			{
				html += '<section class="fcont">';
					html += '<span class="mhd">Cost</span>';
						html += data.restaurants_info.price_range_text;
						html += '<span class="rupee">';
							for(var rp in data.restaurants_info.price_range_stars)
							{
								html += '<span class="'+data.restaurants_info.price_range_stars[rp]+'">';
								html += '</span>';
							}
						html += '</span>';
				html += '</section>';
			}
		}

		if(data.ali.length > 0)
		{
			html += '<section class="fcont"><h3 class="mhd">Also Listed In</h3><table width="100%" class="tblrw">';
			for(var i=0;i < data.max;i++)
			{
				var ascatname = data.ali[i].cd.split('(');
				var ali_where = '';
				if(ed('whr').value.substr(0,4) !='e.g' && ed('whr').value != '')
				{
					ali_where = ' in '+ed('whr').value;
				}
				/*if(i == 0 || i%2 == 0)
				{
					var lasttr = (data.max - i < 3 && data.more != 1) ? 'class="reset"' : '';
					html += '<tr '+lasttr+'>';
				}*/
				html += '<td><a href="'+data.ali[i].alilnk.replace(' ','-')+'" title="'+trim(ascatname[0])+ali_where+'">'+data.ali[i].cd+'</a>';
				
				if(data.ali[i].moviereview) {
					html += '<br/><span class="rtng">';
					var urlcity = (data.city.replace(' ','-')).replace('.','-');
					var al_cd = ((trim(data.ali[i].cd)).toLowerCase()).replace(' ','-');
					if(data.ali[i].moviereview.movie_jd_rating) 
					{
						html += '<span class="flft">Critics Rating:</span>';
						html += '<a class="sel" href="'+WEBROOT+urlcity+'/'+al_cd+'_reviews/'+data.ali[i].id+'_'+data.xmluniqueid+'">'+data.ali[i].moviereview.movie_jd_rating+'</a>';		 
					}
					if(data.ali[i].moviereview.movie_user_rating)
					{
						html += '<span class="flft">JD User Rating:</span>';
						html += '<a class="sel" href="'+WEBROOT+urlcity+'/'+al_cd+'_reviews/'+data.ali[i].id+'_'+data.xmluniqueid+'">'+data.ali[i].moviereview.movie_user_rating+'</a>';		 
					}
					html += '</span>';
				}
				html += '</td>';
				if(i%2 == 1)
				{
					html += '</tr>';
				}
				else
				{
					html += '<td class="spc"></td>';
				}
			}
			if(data.more > 0)
			{
				html += '<tr class="reset"><td></td><td class="spc"></td><td align="right"><a href="javascript:void(0);" onclick="openDiv(\'alsp\');">more</a></td></tr>';
			}
			html += '</table></section>';
		}

		if(data.wt.length > 0)
		{
			html += '<section class="fcont"><table width="100%" class="tblrw"><tr><td>';
			html += '<h3 class="mhd">Hours of Operation</h3><div class="hrsop">';
			html += '<b>Monday:</b> '+data.wt[0];
			html += '<span class="sep">|</span>';
			html += '<b>Tuesday:</b> '+data.wt[1];
			html += '<span class="sep">|</span>';
			html += '<b>Wednesday:</b> '+data.wt[2];
			html += '<span class="sep">|</span>';
			html += '<b>Thursday:</b> '+data.wt[3];
			html += '<span class="sep">|</span>';
			html += '<b>Friday:</b> '+data.wt[4];
			html += '<span class="sep">|</span>';
			html += '<b>Saturday:</b> '+data.wt[5];
			html += '<span class="sep">|</span>';
			html += '<b>Sunday:</b> '+data.wt[6];
			html += '</td><td></td></tr></table></div>';
			html += '</section>';
		}
		if(data.attrs != '')
		{
			html += '<section class="fcont" id="serdiv"><h3 class="mhd">Services</h3>';
			for (var data_array in data.attrs)
			{
				if(data.attrs[data_array].length > 0)
				{
					html += '<strong class="srihd">'+ucwords(data_array)+'</strong><aside class="sri"><table width="100%">';
					for(var i=0; i<data.attrs[data_array].length; i++)
					{
						if(i == 0 || i%3 == 0)
						{
							var lasttr = (data.attrs[data_array].length - i <= 3) ? 'class="reset"' : '';
							html += '<tr '+lasttr+'>';
						}
						html += '<td><img class="srimg" src="'+data.attrs[data_array][i].img+'" width="20" height="20" /><span class="sritxt">'+data.attrs[data_array][i].val;
						if(data.attrs[data_array][i].att)
						{
							html += '- <span class="sridt">'+data.attrs[data_array][i].att+'</span>';
						}
						html += '</span></td>';
						if(i == 2 || (i+1)%3 == 0)
						{
							html += '</tr>';
						}
						else
						{
							html += '<td class="spc"></td>';
						}
					}
					html += '</table></aside>';
				}
			}
			html += '</section>';
		}
		if(data.mop != '')
		{
			html += '<section><section class="fcont"><h3 class="mhd">Payment Modes</h3><table class="tblrw" width="100%">';
			for(var i=0;i<data.mop.length;i++)
			{
				html += 	'<tr><td>'+data.mop[i]+'</td></tr>';
			}
			html += '</table></section></section>';
		}
		if(data.other_location.length > 0)
		{
			var otherloc_count = (data.other_location.length > 5) ? 5 : data.other_location.length;
			html += '<section class="fcont"><h3 class="mhd">Other Location</h3>';
			html += '<section id="otherLoca"><table width="100%" class="tblrw">';
			for(var i=0;i< data.other_location.length; i++)
			{
				if(i == 0 || i%2 == 0)
				{
					var dnclass = (i > 9 && data.other_location.length > 10) ? 'class= "tblolc dn"' : '';
					var lasttr = (data.other_location.length - i <= 3) ? 'class="reset"' : '';
					html += '<tr '+lasttr+'>';
				}
				var title_val = data.other_location[i].compName+" in "+trim(data.other_location[i].loc_name.replace('Near',''));
				html += '<td>';
				if(i == 9 && data.other_location.length > 10)
				{
					html += '<a class="olcmore" href="javascript:;" onclick="moreLoc(\'olc\');">More...<span>';
					html += '<a class="dn" id="olcdisp" href="'+data.other_location[i].url+'" title="'+title_val+'">'+data.other_location[i].loc_name;
					html += (data.other_location[i].areaName) ? ' , <i>'+data.other_location[i].areaName+'</i>' : '';
					html == '</a>';
				}
				else
				{
					html += '<a href="'+data.other_location[i].url+'" title="'+title_val+'">'+data.other_location[i].loc_name;
					html += (data.other_location[i].areaName) ? ' , <i>'+data.other_location[i].areaName+'</i>' : '';
					html == '</a>';
				}
				html += '</td>';
				if(i%2 == 1)
				{
					html += '<tr>';
				}
				else
				{
					html += '<td class="spc"></td>';
				}
			}
			html += '</table></section>';
			html += '</section>';
		}
		if(data.yetd != '')
		{
			html += '<section class="fcont"><h3 class="mhd">Year Established</h3>';
			html += data.yetd;
			html += '</section>';
		}
		if(data.addinfo != '')
		{
			html += '<section class="fcont"><h3 class="mhd">Additional Information</h3>';
			html += data.addinfo;
			html += '</section>';
		}

		html += '</section>';
		return html;
	}
}

function show_pv(disp,dispn)
		{
	$('a.slct').removeClass('slct');
	$('#vid_link').addClass('slct');
	$('.'+disp).removeClass('dn');
	$('.'+dispn).attr("style","display:none");
		}

/*function view_map(docid,casepv,datacity, reloadFlag)
{
	//if(!$('.mapo') || ($('.mapo') && !$('.mapo').is(':visible')))
	if($('.mapo'))
	{
		$('#printMapBtn').addClass('btn-disabled');	
		$('#printMapBtn').attr('onClick', "return false;");	
		$('.dtlmap').removeClass("dn")
		if($('.mapo') && $('.mapo').hasClass("dn"))
		{
			$('.mapo').removeClass("dn")
		}
		else
		{
			if(navigator.userAgent.toLowerCase().indexOf("bot") == -1)
			{
				if(WEBROOT)
				{
					html = '<section class="mapo">';		
					html +=		'<section id="map" class ="map"></section>';
					html +=			'<div class="Location">';
					html +=				'<div class="correctL jgre dn"><a href="javascript:void(0);" onclick="openmap(\'enlarge_map_div\',\'drgmp\');">Edit Location</a><span class="ctl"></span></div>';
					if(ed('mpfl').value)
					{
						html +=				'<div class="noBorder" style="display:none;"><input class="ltxt" type="text" id="get_my_directions" value="Get Directions From?" onblur="getvalueBack(\'blur\');" onfocus="getvalueBack(\'focus\');" onkeypress="routeKeyPress(event);" /><input class="button" type="button" id="routebuttn" onclick="javascript:getdirections(\'directions_div\');" value="Route" /></div>';
					}
					html += '</div>';
					html += '<a class="jcl" href="javascript:;" onclick="mapclass();" >X</a>';
					html += '</section>';
					//html += '<section class="fcont" id="userDirections"></section>';
					$(".maprght").html(html);					
					jdmapsload();
				}
			}
		}
	}
	if(ratethisvar != 1)
	{
		setTimeout("goToByScrolldetail(\'mrtab\');",500);
	}
}

function showDirPanel()
{
	$('#getdrctns').removeClass('dn');
	var where_a_val = $('#where_a').val();
	var where_b_val = $('#where_b').val();
	if(($('#where_a').val() != '' && $('#where_a').val() != 'e.g. Malad East') && ($('#where_b').val() != '' && $('#where_b').val() != 'e.g. Malad West'))
	{
		getUserDirection('userDirections', 1);
	}
}

function hideDirPanel()
{
	$('#getdrctns').addClass('dn');
}

function mapclass()
{
	$('.dtlmap').addClass('dn');
	$('.mapo').addClass('dn');
	$('#userDirections').addClass('dn');
}

var map = '';
function jdmapsload()
{
	var lat = document.getElementById('lt').value;
	var lng = document.getElementById('ln').value;
	var mpfl = document.getElementById('mpfl').value;
	try {
		if(mpfl == '1') {
			map = Jdmap.init('map',[lat,lng],11);
		} else {
			$('.maplft').addClass('dn');
			$('.maprght').addClass('flwidth');
			map = Jdmap.init('map',[lat,lng],15);
		}		
		var stars = document.getElementById('star').value.split(',');
		var starstr = '<div class="Star0" style="padding:4px 0 0 0;float:left; width:95px">';
		for (var i=0;i<stars.length ;i++ )
		{
			starstr += '<span class="s'+stars[i]+'"></span>';
		}
		starstr += '</div>';

		if($.trim(getCookie('slat')) != '' && $.trim(getCookie('slon')) != '') {
			var getLocationLink = '<p style="color:black;float:left; margin:0; padding:0 0 10px 0;"><a href="javascript:void(0);" onclick="getUserDirection(\'userDirections\');">Get Direction</a></p>';
		} else {
			var getLocationLink = '';
		}

		var contentString = '<div id="content">'+
		'<div style="float:left; width:100%"><h1 style="color:black;float:left;padding:0 5px 0 0;font-size:18px;margin:0;"><b>'+document.getElementById('cn').value+'</b></h1>'+starstr+
		'</div><div id="bodyContent">'+
		'<p style="color:black;float:left; margin:0; padding:10px 0;">'+document.getElementById('add').value+'</p>'+getLocationLink+'</div>'+
		'</div>';
		
		if(mpfl == '1') {
			Jdmap.addMarker(map,[lat,lng],null,contentString);		
			showMyLocation();
			setTimeout("showDirPanel()",50);
		} else {
			Jdmap.addCircle(map,[lat,lng],500);		
		}
		//Jdmap.setCenter(map,[lat,lng]);	
	} catch(e) {
		//console.log(e);
	}
}

function getUserDirection(divID, flag)
{
	$('#'+divID).removeClass('dn');	
	$('#printMapBtn').removeClass('btn-disabled');	
	$('#printMapBtn').attr('onClick', "printSelection('dtlMapInfo');return false;");	
	if(flag == 1) { 
		if($('#where_a').val() == '') {
			alert('Please select your location');
			$('#where_a').focus();
			return false;
		} else if($('#where_a').val() == 'e.g. Malad East') {
			alert('Please select your location');
			$('#where_a').focus();
			return false;
		} else if($('#where_b').val() == '') {
			alert('Please select your location');
			$('#where_b').focus();
			return false;
		} else if($('#where_b').val() == 'e.g. Malad West') {
			alert('Please select your location');
			$('#where_b').focus();
			return false;
		}
		if(parseFloat($('#lat_a').val()).toFixed(2) == parseFloat($('#lat_b').val()).toFixed(2) && parseFloat($('#lng_a').val()).toFixed(2) == parseFloat($('#lng_b').val()).toFixed(2)) {
			alert('No route possible.');
			return false;
		}
		var to_lat = parseFloat($('#lat_a').val());
		var to_lng = parseFloat($('#lng_a').val());
		var from_lat = parseFloat($('#lat_b').val());
		var from_lng = parseFloat($('#lng_b').val());
	} else {
		var to_lat = parseFloat(document.getElementById('lt').value);
		var to_lng = parseFloat(document.getElementById('ln').value);
		var from_lat = parseFloat($.trim(getCookie('slat')));
		var from_lng = parseFloat($.trim(getCookie('slon')));
	}
	//Jdmap.setZoom(map, 11);	
	Jdmap.getDirection(to_lat,to_lng,from_lat,from_lng,map,divID);	
	if(touchy != true)
	{
		setTimeout("setSlider($('#userDirections'));",500);
	}
}

function showMyLocation()
{
	var my_area = $.trim(getCookie('sarea'));
	if(my_area != '') {
		var my_lat = parseFloat($.trim(getCookie('slat')));
		var my_lng = parseFloat($.trim(getCookie('slon')));	
		$('#where_a').val(my_area);
		$('#lat_a').val(my_lat);
		$('#lng_a').val(my_lng);
		currentLocation(my_lat, my_lng);
	} else {
		getLocation();
	}		
}

function currentLocation(my_lat, my_lng)
{
	//var contentString = 'Current Location';
	//Jdmap.addMarker(map,[my_lat,my_lng],null,contentString);	
	//Jdmap.setCenter(map,[my_lat,my_lng]);	
	setTimeout("showDirPanel()",50);	
}

function printSelection(node) 
{
	_ct("map-print","dtpg");
	Jdmap.setZoom(map, 11);
	var content = document.getElementById(node).innerHTML;
	var pwin=window.open('','print_content');
	pwin.document.open();
	pwin.document.write('<html><head><link rel="stylesheet" href="'+WEBROOT+'tools/css/common.css" /></head><link rel="stylesheet" href="'+WEBROOT+'tools/css/dtnw.css" /><link rel="stylesheet" href="'+WEBROOT+'tools/css/printmap.css" /><link rel="stylesheet" href="http://maps.justdis.com/css/jdapi.min.css" /><script type="text/javascript" src="http://maps.justdis.com/js/jdapi.min.js"></script><body onload="window.print()">'+content+'</body></html>');
	pwin.document.close();
	setTimeout(function(){pwin.close();},1000);
}
*/
function show_services(docid, casepv, datacity)
{
	if(!$('#moreinfo').hasClass("current"))
	{
		$('.current').removeClass('current');
		$('#moreinfo').addClass('current');
	}
	
	scrollToDiv('serdiv');
}

function ucwords (str) {
  return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
			}

function uploadVLC(url,chk)
		{
	$('<form action="'+url+'" method="POST" target="photo_module">' + 
		'<input type="hidden" name="checksum" value="' + chk + '">' +
		'</form>').appendTo($(document.body)).submit();
			}

function report_bus_shut(paid_status,city,comp_name,docid)
		{
	closeDiv('hui');
	$.post(WEBROOT+"functions/business_shutdown.php", {"city":city,"compname":comp_name,"docid":docid,"paid_status":paid_status}, function(data) 
			{
		if(data == "1")
			{
			$("#er_txt").html('<h3>Thank you for your inputs.</h3><aside>We shall verify and update the same.</aside>');
			setTimeout("openDiv('tfi');",300);
				}
		else if(data == "2")
				{
			$('#er_txt').html('<aside>You have already submitted the request to report this business as shutdown.</aside><form>	<button class="jbtn jcl btn_ok" type="button">OK</button></form>');
			setTimeout("openDiv('tfi');",300);
			}
		else if(data == "3")
			{
			$('#er_txt').html('<aside>You have reached your daily limit of reporting companies to shutdown.</aside><form>	<button class="jbtn jcl btn_ok" type="button">OK</button></form>');
			setTimeout("openDiv('tfi');",300);
				}
	});
				}

function chkunchk(obj){
    
    if( $("#"+obj).hasClass("wrap_checked") )
				{
        $("#"+obj).removeClass('wrap_checked');
        
				}
    else{
        $("#"+obj).addClass('wrap_checked');
        
	}
}


function servicePickUpFocusout(ref){
	$("#areaAuto").hide();	
	$("#bsAreaId").val('');
		$.ajax({
			url:WEBROOT+"webmain/ajxmain.php",
			type: "get",
			dataType:"json",
			data :{cases:  'servicepickuparea',type_flag:''+ $("#type_flag").val()+'',docId:$("#mpdocid").val(),area:$("#txtArea").val()},
			async:false, 
			success:function(result){				
				var isValid = false;
				if (result!=null && result.results!= null && result!='' && result.results.length>0){
					if(result.results[0].exact_match==1){	
						var pincodeStr = result.results[0].pin;	
						$("#bsAreaId").val(result.results[0].area_id);
						setServiceAreaPincode(pincodeStr);
						isValid = true;						 
	}
	else if (ref!='fo')
	{
					  if(result.results.length){
							var inrHTML = '';
							inrHTML += '<table width="100%" class="tblrw">';

							for(var k=0;k < result.results.length;k=k+3)
		{
								var sub1 = '';
								var sub2 = '';
								var sub3 = '';
								var cls = '';
								var pin1 = '';
								var pin2 = '';
								var pin3 = '';
								if(typeof result.results[k] !='undefined'){
									sub1 = result.results[k].text;
									pin1 = result.results[k].pin;
								}
								if(typeof result.results[k+1] !='undefined'){
									sub2 = result.results[k+1].text;
									pin2 = result.results[k+1].pin;
		}
								if(typeof result.results[k+2] !='undefined'){
									sub3 = result.results[k+2].text;
									pin3 = result.results[k+2].pin;
		}
								inrHTML += '<tr>';
								if(sub1 == ''){
									cls = 'sublast';
	}
								inrHTML += "<td class='"+cls+"'><a href='javascript:void(0);' onclick='fillServiceArea(\""+sub1+"\",\""+pin1+"\")'>"+sub1+"</a></td>";
								inrHTML += '<td class="spc"></td>';
								if(sub2 == ''){
									cls = 'sublast';
	}
								inrHTML += "<td class='"+cls+"'><a href='javascript:void(0);' onclick='fillServiceArea(\""+sub2+"\",\""+pin2+"\")'>"+sub2+"</a></td>";
								inrHTML += '<td class="spc"></td>';
								if(sub3 == ''){
									cls = 'sublast';
}
								inrHTML += "<td class='"+cls+"'><a href='javascript:void(0);' onclick='fillServiceArea(\""+sub3+"\",\""+pin3+"\")'>"+sub3+"</a></td>";

								inrHTML += '<td class="spc"></td>';
								inrHTML += '</tr>';                                            
    }


						   inrHTML += '</table>'; 
						   
						if ($("#txtArea").val() !=''){  
						$('#servsubarea').html(inrHTML);                           
					   	openDiv('picksubar');
						}   
					   
						if($('#servsubarea').length)
    {
								 setSlider($('#servsubarea'));
								  if(touchy) { touchScroll('servsubarea');}
            }

						 if($('#servsubarea div.sct').height() <= 300){
								 $("#servsubarea").height($('#servsubarea div.sct').height());
   						 }
						 else{
								 $("#servsubarea").height(300);
						}

						
					}	
				 }
				}
									
				if (!isValid){	
								
					if ($.trim($("#txtArea").val())==""){
						$('#txtArea').next().text('Please enter area');
					}
					else {
					$('#txtArea').next().text('Sorry, '+$("#cn").val()+' does not service in '+$.trim($("#txtArea").val())+'. Please try some other area.');
					}	
					$('#txtArea').next().show();
					$('#flgArea').val('0');	
					setServiceAreaPincode('');			
				}
				else {
					$('#txtArea').next().hide();
					$('#flgArea').val('1');
				}					
			}
		 });
		
	}
var filter_id='';
var filter_val='';
var catid_prev='';

function loadreviewsdata_product(prid,tabval)
{	
	var ct			=	$("#mpctr").val();
	//var prid		=	$("#prid").val();
	var cn			=	$("#cn").val();
	var jd_rating	=	$("#jd_rating").val();
	
	$('#graphs_div_prod').html('');
	$('#jdrat').html('');
	$('#usrrat').html('');
	$('#rvw_prod').html('');
	$('.frnd_rate').html('');
	
	$.get(WEBROOT+"functions/product_reviews_initial.php", {ct: ct,prid: prid,tab: tabval, city: ct, cn:cn, jd_rating:jd_rating}, function(data) {
		var d = eval('(' + data + ')');
		var prdet_len = 0;
		var poster_html = '';
		
		$('#jdrat').html(jdhtml(d.jd_rating));
		$('#usrrat').html(userhtml(d.user_rating));
		
		if(d.product_details)
		{
			prdet_len = Object.size(d.product_details);
		}
		
		if(prdet_len > 0)
		{
			product_details(d);
		}
		
		if(d.totfriendreviews.total > 0)
		{	
			prfrndhtml = movie_frnd_bar_html(d);
			$('.frnd_rate').html(prfrndhtml);
			$('.frnd_rate').show();
		}
		
		if(d.totRatings.total > 0)
		{
			$('.jcrv').css('width','');
			$('#graphs_div_prod').html(graphHtml(d,'shopfront'));
			$('#graphs_div_prod').show();
		}
		else
		{
				$('.shopdtin .jco').css('width','100%');
				$('.shopdtin .jcrv').css('width','100%');
				$('.shopdtin #tabratings_prod').css('width','100%');
		}
		var rrhtml = '';
		if(d.onlyrat.length > 0)
		{
			rrhtml += '<a href="'+baseurl+'/writereview_product" class="jrvw" id="usrRev">Write a Review</a> ';
			rrhtml += only_rat(d.onlyrat);
		}
		else
		{
			//rrhtml += '<a href="'+baseurl+'/writereview_product" class="jrvw jrvwnt" id="usrRev"><span class="wrrvw"></span>Write a Review</a>';
			rrhtml += '<a href="'+baseurl+'/writereview_product" class="jrvw jrvwnt" id="usrRev">Write a Review</a>';
		}
		
		$('#rvw_prod').html(reviewHtml(d,'shopfront',prid));
		$('#jdrc_prod').html(rrhtml);
		
		//friend_graph_div_prod
		
		round_popup();
		$('.jcrv li').corner("top 5px");
		$('.jcrv aside a').corner("top 5px");
		$('.mdetail .show_time').corner("5px");
		$('.mdetail .frnd_rate').corner("5px");
		$('#allratings .jpbg').corner("15px");
		$('#allfratings .jpbg').corner("15px");
		$('#allmratings .jpbg').corner("15px");
		$('#bftr .jpbg').corner("15px");
		
		
	});
}
function chkunchk(obj){
    
    if( $("#"+obj).hasClass("wrap_checked") )
    {
        $("#"+obj).removeClass('wrap_checked');
        
    }
    else{
        
        $("#"+obj).addClass('wrap_checked');
        
    }
    
}

function setServiceAreaPincode(pincodeStr){
						
	var pincodes = pincodeStr.split(',');
	$('#txtPin').next().hide();		  
	 if(pincodes.length > 1){							
		 var inrHTML = '';
		 inrHTML += '<ul>';			 
		 for(var p=0;p<pincodes.length;p++)
		 {				 
			 inrHTML += '<li><a href="javascript:void(0);" onclick="$(\'#txtPin\').val(\''+pincodes[p]+'\'); $(\'#pinAuto\').hide();">'+pincodes[p]+'</a></li>';
		 }							 
		 inrHTML += '</ul>';							 
		 $('#pinAuto').html(inrHTML);							 
		 $("#txtPin").val(pincodes[0]);	
		 $('#txtPin').parent('.selwrp').removeClass('auto');	
		 $('#txtPin').addClass('rdonly');
		 $('#txtPin').css("color","#424242");	 			 
	 }
	 else{
		 if (pincodeStr==''){
			 pincodeStr='e.g. 400064';
			 $('#txtPin').css("color","#a4a4a4");
		 }
		 else{
			 $('#txtPin').css("color","#424242");
		}
			 
		 $("#txtPin").val(pincodeStr);			 
		 $('#pinAuto').html('');
		 $('#txtPin').parent('.selwrp').addClass('auto');	
		 $('#txtPin').removeClass('rdonly');			 						 
	 }
	 	
}

function fillServiceArea(valsel,pincode)
{
	closeDiv('picksubar');
	$('#txtArea').val(valsel);
	$('#txtArea').css("color","#424242");
	$('#txtArea').next().hide();
	$('#flgArea').val('1');
	setServiceAreaPincode(pincode);	
	if($("#areaAuto").is(':visible'))
	{
		$("#areaAuto").hide();
	}
}


function toggleCssShop(){
	$("link[href*='"+gcycss+"']").attr('disabled','disabled');
	$("link[href*='"+mnucss+"']").attr('disabled','disabled');
}
function toggleCssGcy(){
  if($("link[href*='"+gcycss+"']").attr('disabled') || $("link[href*='"+mnucss+"']").attr('disabled')) {
	  $("link[href*='"+gcycss+"']").removeAttr("disabled");
	  $("link[href*='"+mnucss+"']").removeAttr("disabled");
  }
  var addmenucss = '<link rel="stylesheet" href="'+mnucss+'" />';
  $('head').prepend(addmenucss);
}
	
	
	function edtAddr(objId,addrId,type_flag)
	{
		var innerHTML = '';
		var keyArr = objId.split('_');
		var key = keyArr[1];

		if(typeof existAddresses[key] != 'undefined') 
		{
			$(".error").hide();
			var add = existAddresses[key];
			openDiv('edtAddr');
			$('#ptxtName').val(add['name']);
			$('#ptxtName').next().text('');
			$('#ptxtPin').val(add['pincode']);
			$('#ptxtPin').next().text('');
			$('#ptxtEmail').val(add['emailId']);
			$('#ptxtEmail').next().text('');
			$('#ptxtMobile').val(add['phone']);
			$('#ptxtMobile').next().text('');
                        if(add['addrTag'] != ''){
                            $('#tgad_otr_val_edt').val(add['addrTag']);                            
                            if(add['address_type'] == 3){
                                $('#tgad_val_edt').val('Other');
                                $('#tgad_otr_bx_edt').show();
                                $('#tgad_otr_txt_edt').hide();
                            }else{
                                $('#tgad_val_edt').val(add['addrTag']);    
                                $('#tgad_otr_bx_edt').hide();
                                $('#tgad_otr_txt_edt').show();
                            }
                        }else{
                            $('#tgad_otr_val_edt').val('');
                            $('#tgad_val_edt').val('Select');
                            $('#tgad_otr_bx_edt').hide();
                            $('#tgad_otr_txt_edt').show();
                        }

			if($('#ptxtLocation').length)
			{
				$('#ptxtbldg').val(add['bldg']);
				$('#ptxtbldg').next().text('');
				$('#ptxtLocation').val(add['street']);
				$('#ptxtLocation').next().text('');
				$('#ptxtLandmark').val(add['landmark']);
				$('#ptxtLandmark').next().text('');
				$('#pchkoutArea').val(add['area']);
				$('#pchkoutArea').next().text('');
				if(parseInt(add['stdcode']) > 0){
					$('#ptxtLandstd').val("0"+add['stdcode']);
				}            
				
				$('#ptxtLandnum').val(add['landline']);
			}
			if($('#ptxtAddress').length)
			{
				var addrs = '';
				/*
				if(add['bldg'] != '')
					 addrs += add['bldg']+" ";
				if(add['landmark'] != '')	 
					addrs += add['landmark']+" ";
				*/	
				if(add['street'] != '')	 
					addrs += add['street']+" ";
					
				//if(add['area'] != '')	 	
					//addrs += add['area'];
				$('#ptxtAddress').val(addrs);
				$('#ptxtAddress').next().text('');
				$('#ptxtCity').val(add['city']);
				$('#ptxtCity').next().text('');
				
				if($('#ptxtLandstd').length && parseInt(add['stdcode']) > 0 && $('#ptxtLandnum').length ){
				    $('#ptxtLandstd').val(add['stdcode']);
				    $('#ptxtLandnum').val(add['landline']);
				}
				
			}
			$("#hdnAddrId").val(addrId);
			$('#ptypeflag').val(type_flag);
			
		}   
	}

	function submtEdtAddr(vcode,newUserFlg)
	{
		var cas = '2';
		if(!validateEdtAddr()) 
			 return false;
		 
		var vertical = '';
		var type = 'edit';
		var name = $.trim($('#ptxtName').val());
		if($("#ptxtPin").is('input'))
		{
			var pincode = $.trim($('#ptxtPin').val());
		}
		else
		{
			var pincode = $('#ptxtPin :selected').val();
		}
		
		var email = $.trim($('#ptxtEmail').val());
		var mobile = $.trim($('#ptxtMobile').val());
		var addrId = $.trim($('#hdnAddrId').val());
		var typeflag = $.trim($('#ptypeflag').val());
		var city = $.trim($('#city').val());
		var addDocid = MDOCIDJ;
	
        var stdcode = '';
        var landline = '';
        var bldg = '';
		var location = '';
		var landmark = '';
		var area = '';
		var flag = '';
		if($('#ptxtLocation').length)
		{
			var stdcode = $.trim($('#ptxtLandstd').val());
			var landline = $.trim($('#ptxtLandnum').val());
			var bldg = $.trim($('#ptxtbldg').val());
			var location = $.trim($('#ptxtLocation').val());
			var landmark = $.trim($('#ptxtLandmark').val());
			var area = $.trim($('#pchkoutArea').val());
        }
        if($('#ptxtAddress').length)
		{  
			location = $.trim($('#ptxtAddress').val());
			flag = $.trim($('#ptxtFlag').val());
			city = $.trim($('#ptxtCity').val());   
			
			if($('#ptxtLandstd').length && $('#ptxtLandnum').length ){
			    stdcode = $.trim($('#ptxtLandstd').val());
			    landline = $.trim($('#ptxtLandnum').val());
			}
			
			
		}
        var address_type = '';
        var addrTag = '';
        var jduid = '';
        if(($("#isreg").val() == 5 || $("#isreg").val() == 1) && $.trim($('#domId').val()) == ''){
	        jduid = getCookie('inLogJdUID');
                typeflag = 8;
                address_type = $.trim($('#address_type_edt').val());
                if($.trim($('#tgad_otr_val_edt').val()) != ''){
                    addrTag = $.trim($('#tgad_otr_val_edt').val());                    
                }
	}
		if(newUserFlg == 1 || newUserFlg == 2)
		{
			$.ajax
			({
				url: WEBROOT + "functions/address.php",
				type: "POST",
				dataType:"json",
				data : {
						'name' : name, 
						'bldg' : bldg, 
						'location' : location, 
						'pincode' : pincode , 
						'landmark' : landmark,
						'area' : area , 
						'email' : email, 
						'mobile' : mobile,
						'addrId' : addrId, 
						'docid' : addDocid,
						'vertical' : vertical,
						'type' : type,
						'type_flag' : typeflag,
                        'landline' : landline,
                        'stdcode' : stdcode,
						'city' : city,
						'flag' : flag,
						'timeStamp': new Date().getTime(),
                                                'address_type' : address_type,
                                                'jduid' : jduid,
                                                'addrTag' : addrTag
					},
				success : function(response)
				{	   
					if(response['results']['errorCode'] == '0')
					{
						$('#btnSubmit').removeAttr("disabled");    

						if(newUserFlg == 1 || newUserFlg == 2)
						{
							if(newUserFlg == 2)
							{
								cas = '3'
							}
							var passwd = '';
							if(typeof($('#passwd').val()) != 'undefined')
							{
								passwd = $.trim($('#passwd').val());		  
							}
							$.ajax({
								url:WEBROOT+"functions/ajxUserSignUp.php", 
								type: "post",
								data :{
									'name':name,
									'mobile' : mobile,
									'email':email,
									'pswd':passwd,
									'vcode':vcode,
									'case' : cas
								}, 
								success:function(res){
									document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;
									if(typeflag == 128 || typeflag == 34359738368)
									{
										window.location.href = baseurl+'/grocerycheckout?dept=1&city='+GCYCITY;
									}
									else if(typeflag == 32768)
									{    
										window.location.href = baseurl+'/pharmacycheckout?dept=2&city='+GCYCITY;
									}
									else if(typeflag == 65536) {
									     window.location.href = baseurl+'/tcareaddress';
									}
									else if(typeflag == 67108864) { 
									    window.location.href = baseurl+'/booklab-address';
									}
									else
									{
										window.location.href = baseurl+'/checkoutorder?t=2';
									}
								}
							});
						}
						else
						{
							document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain; 
							if(typeflag == 128 || typeflag == 34359738368)
							{
								window.location.href = baseurl+'/grocerycheckout?dept=1&city='+GCYCITY;
							}
							else if(typeflag == 32768)
							{
								window.location.href = baseurl+'/pharmacycheckout?dept=2&city='+GCYCITY;
							}
							else if(typeflag == 65536) {
							     window.location.href = baseurl+'/tcareaddress';
							}
							else if(typeflag == 67108864) { 
							    window.location.href = baseurl+'/booklab-address';
							}
							else
							{
								window.location.href = baseurl+'/checkoutorder?t=2';
							}              
							
						}
					}
				}
			});	
		}
		else if($.trim(getCookie('ln')) != '' && $.trim(getCookie('inLogMobile')) != $.trim($('#ptxtMobile').val()))
		{
			$.ajax({
				url:WEBROOT+"functions/ajxblacklisted.php",
				dataType:"json", 
				type: "post",
				data :{
						mob:$.trim($('#ptxtMobile').val())
				}, 
				success:function(result)
				{
					if(result == "true")
					{
						blackflag = 1;
						openDiv('blacklist');
						$('#pbtnSubmit').removeAttr("disabled"); 
					}
					else
					{
						$.post(WEBROOT+"functions/verification.php",{
								mob:$.trim($('#ptxtMobile').val())
						}, function(res){
							if(res)
							{
								$("#pverMob").html("<b>"+$.trim($('#ptxtMobile').val())+"</b>");
								$('#pbtnSubmit').removeAttr("disabled"); 
								openDiv('pvercode');
							}		  
						});   
					}
				}
			});                  
		}
		else
		{
			$.ajax({
				url: WEBROOT + "functions/address.php",
				type: "POST",
				dataType:"json",
				data : {
					'name' : name, 
					'bldg' : bldg, 
					'location' : location, 
					'pincode' : pincode , 
					'landmark' : landmark,
					'area' : area , 
					'email' : email, 
					'mobile' : mobile,
					'addrId' : addrId, 
					'docid' : addDocid,
					'vertical' : vertical,
					'type' : type,
					'type_flag' : typeflag,
                    'landline' : landline,
                    'stdcode' : stdcode,
					'city' : city,
					'flag' : flag,
					'timeStamp': new Date().getTime(),
                                        'address_type' : address_type,
                                        'jduid' : jduid,
                                        'addrTag' : addrTag
						},
				success : function(response)
				{	   
					if(response['results']['errorCode'] == '0')
					{
						$('#pbtnSubmit').removeAttr("disabled");    
						if(typeflag == '128' || typeflag == '34359738368')
						{
							window.location.href = baseurl+'/grocerycheckout?dept=1&city='+GCYCITY;
						}
						else if(typeflag == '32768')
						{
							window.location.href = baseurl+'/pharmacycheckout?dept=2&city='+GCYCITY;
						}
						else if(typeflag == 65536) {
						     window.location.href = baseurl+'/tcareaddress';
						}
						else if(typeflag == 67108864) { 
						    window.location.href = baseurl+'/booklab-address';
						}
						else
						{
							window.location.href = baseurl+'/checkoutorder?t=2';
						}
					}
				}
			});
		}
	}
	

	function openDelAddr(objId,addrId)
	{
		var innerHTML = '';
		var keyArr = objId.split('_');
		var key = keyArr[1];
		if(typeof existAddresses[key] != 'undefined') 
		{
			var add = existAddresses[key];
			innerHTML += '<b>'+add['name']+'</b>, ';
			if($.trim(add['bldg']) != '')
			{
				innerHTML += add['bldg']+', ';
			}	
			if($.trim(add['street']) != '')
			{
				innerHTML += add['street']+', ';
			}
			if($.trim(add['landmark']) != '')
			{
				innerHTML += add['landmark']+', ';
			}
			if($.trim(add['area']) != '')
			{
				innerHTML += add['area']+', ';
			}
			
			innerHTML += add['city']+' - ';
			innerHTML += add['pincode'];
			$("#dlAddrPop").html(innerHTML);
		}
		$("#hdnAddrId").val(addrId);
		openDiv('deldlPop');
	}


	function delDlAddr()
	{
		var addrid = $("#hdnAddrId").val();
		var jduid = '';
                if (getCookie('inLogJdUID') != ''){
                    jduid = getCookie('inLogJdUID');
                }
		$.ajax({
			url:WEBROOT+"functions/deldladdr.php",
			type: "post",
			data :{
				addrId:addrid,
                                jduid: jduid,
				bid:$('#type_flag').val()
			}, 
			success:function(result)
			{
				$("#hdnAddrId").val('');
				if(result == 1)
				{
					location.reload();
				}	
			}
		});
	}

function moreDesc(itmId){
    
    $("#desc_"+itmId).hide();
    $("#descCont_"+itmId).show();
    
}

function redirToInnerPg(func){
    
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
    document.cookie = 
        'func=' + escape(func) + 
        '; expires=' + now.toGMTString() + 
        '; path=/' +
        '; domain='+cookieondomain;
     
     var HREF = baseurl+'/menu-order';
     window.location.href = HREF;

}
function edtBkTbl(){
    
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
     document.cookie = 
    'bkmode=1' +
    '; expires=' + now.toGMTString() + 
    '; path=/' +
    '; domain='+cookieondomain;
     var HREF = baseurl+'/bookatable';
     window.location.href = HREF;

}

function chngSmryPrice(id,page){
    
    var tmp = id.split("_");
    
    if($("#mrOrder").is(':visible'))
    {
        var tmp2 = $("#sqtPrice2_"+id).text().split("_");
        
        $("#squty2_"+tmp[0]+"_"+tmp[1]).text(tmp2[1]+" "+tmp2[2].ucwords());
       
        $("#selQty2_"+tmp[1]).val(tmp2[1]);
        $("#selUnit2_"+tmp[1]).val(tmp2[2]);
    }
    else{
        
        var tmp2 = $("#sqtPrice_"+id).text().split("_");
       
        $("#squty_"+tmp[0]+"_"+tmp[1]).text(tmp2[1]+" "+tmp2[2].ucwords());
        
        $("#selQty_"+tmp[1]).val(tmp2[1]);
        $("#selUnit_"+tmp[1]).val(tmp2[2]);
        
    }
    
    
    
    
    editAddonDet(0,tmp[0],tmp[1],'cart','');
    
    
}
function chngChkoutPrice(id){
    
    
        var tmp = id.split("_");
        var tmp2 = $("#sqtPrice_"+id).text().split("_");
       
        $('#totitemPrice_id_'+tmp[1]).val(tmp2[0]);
        $("#squty_"+tmp[0]+"_"+tmp[1]).text(tmp2[1]+" "+tmp2[2]);
        $("#sqtdrp_"+tmp[0]+"_"+tmp[1]).toggle();
        $("#item_qty_"+tmp[1]).val(tmp2[1]);
        $("#item_unit_"+tmp[1]).val(tmp2[2]);
       
        var strJSON = $("#adninf_"+tmp[1]).val();
       
        var objJSON = eval("(function(){return " + strJSON + ";})()");
        
      
        $('.iout_'+tmp[1]).find(':checkbox').each(function(i)
        {
           
               var addon_cbox_id = $(this).attr('id');
               
                var adninf = objJSON[$("#"+addon_cbox_id).val()];
               
                var adnqtStr = adninf['adnqtStr'];
                var adnpriceStr = adninf['adnpriceStr'];
                var adnunitStr = adninf['adnunitStr'];
                
                var arr1 = adnqtStr.split(",");
                var arr2 = adnpriceStr.split(",");
                var arr3 = adnunitStr.split(",");
                $("#"+addon_cbox_id+"_price_"+tmp[1]).val(0);
                $("#"+addon_cbox_id).next().find(".rpspn").html(''); 
                for(var k=0;k<arr1.length;k++){
                    
                    if(tmp2[1] == arr1[k] && $.trim(tmp2[2]) == $.trim(arr3[k])){
                       
                        $("#"+addon_cbox_id+"_price_"+tmp[1]).val(arr2[k]);
                       
                         $("#"+addon_cbox_id).next().find(".rpspn").html('(<span class="rs"></span>'+arr2[k]+" )");
                       
                      
                    }
                    
                }
           
        }
        )	

        $('.iout_'+tmp[1]).find(':radio').each(function(i)
        {    
            
                var addon_cbox_id = $(this).attr('id');
               
                var adninf = objJSON[$("#"+addon_cbox_id).val()];
                var adnqtStr = adninf['adnqtStr'];
                var adnpriceStr = adninf['adnpriceStr'];
                var adnunitStr = adninf['adnunitStr'];
                
                var arr1 = adnqtStr.split(",");
                var arr2 = adnpriceStr.split(",");
                var arr3 = adnunitStr.split(",");
                
                var tmparr =  addon_cbox_id.split("_");
                $("#"+tmparr[0]+"_"+tmparr[1]+"_"+tmparr[2]+"_price_"+tmp[1]).val(0);
                $("#"+addon_cbox_id).next().find(".rpspn").html('');
                for(var k=0;k<arr1.length;k++){
                     
                    if(tmp2[1] == arr1[k] && $.trim(tmp2[2]) == $.trim(arr3[k])){
                
                        $("#"+tmparr[0]+"_"+tmparr[1]+"_"+tmparr[2]+"_price_"+tmp[1]).val(arr2[k]);
                       
                        $("#"+addon_cbox_id).next().find(".rpspn").html('(<span class="rs"></span>'+arr2[k]+" )");
                       
                    
                    }
                    
                }
             
        }
        )
        
        
        calculatePrice(0,tmp[1]);
      
    
}


function chngFixPrice(id,vl){
   
    var cur = 0;
    var tmp = id.split("_");
    var price = parseFloat($("#prc_"+tmp[1]).val());
    var qty = parseFloat($("#qnt_"+tmp[1]).val());
    
    cur = (vl * price) / qty;
    $("#rs_"+tmp[1]).text(cur.toFixed(2));
    extractNumber(id,vl,0,false);
    
}

function chngPrice(id,orderdtlId){
    
    
    
    if($("#addon_popup").is(":visible")){ 
        
        var tmp = id.split("_");
        
        var tmp2 = $("#aqtPrice_"+id).text().split("_");
        $("#grybox_total_price").text(tmp2[0]);
        $("#totitemPrice_id").val(tmp2[0]);
        
        if($.trim(orderdtlId) != ''){
            $("#aquty_"+tmp[0]).text($("#selQty_"+orderdtlId).val()+" "+$("#selUnit_"+orderdtlId).val().ucwords());
            $("#item_unit").val($("#selUnit_"+orderdtlId).val());
            $("#item_qty").val($("#selQty_"+orderdtlId).val());
        }
        else{
            $("#aquty_"+tmp[0]).text(tmp2[1]+" "+tmp2[2].ucwords());
            $("#item_unit").val(tmp2[2]);
            $("#item_qty").val(tmp2[1]);
        }
        
        $("#aqtdrp_"+tmp[0]).toggle();
       
        var strJSON = $("#adninf").val();
        var objJSON = eval("(function(){return " + strJSON + ";})()");
        
      
        
        $('.iout').find(':checkbox').each(function(i)
        {
           
               var addon_cbox_id = $(this).attr('id');
              
                var adninf = objJSON[$("#"+addon_cbox_id).val()];
                var adnqtStr = adninf['adnqtStr'];
                var adnpriceStr = adninf['adnpriceStr'];
                var adnunitStr = adninf['adnunitStr'];
                
                var arr1 = adnqtStr.split(",");
                var arr2 = adnpriceStr.split(",");
                var arr3 = adnunitStr.split(",");
                $("#"+addon_cbox_id+"_price").val(0);
                $("#"+addon_cbox_id).next().find(".rpspn").html(''); 
                for(var k=0;k<arr1.length;k++){
                    
                    if(tmp2[1] == arr1[k] && $.trim(tmp2[2]) == $.trim(arr3[k])){
                       
                        $("#"+addon_cbox_id+"_price").val(arr2[k]);
                        //var adnTxt  = $("#"+addon_cbox_id).next().text();
                         $("#"+addon_cbox_id).next().find(".rpspn").html('(<span class="rs"></span>'+arr2[k]+" )");
                      
                      
                    }
                    
                }
           
        }
        )	

        $('.iout').find(':radio').each(function(i)
        {    
            
                var addon_cbox_id = $(this).attr('id');
               
                var adninf = objJSON[$("#"+addon_cbox_id).val()];
                var adnqtStr = adninf['adnqtStr'];
                var adnpriceStr = adninf['adnpriceStr'];
                var adnunitStr = adninf['adnunitStr'];
                
                var arr1 = adnqtStr.split(",");
                var arr2 = adnpriceStr.split(",");
                var arr3 = adnunitStr.split(",");
               $("#"+addon_cbox_id+"_price").val(0);
                    $("#"+addon_cbox_id).next().find(".rpspn").html('');
                for(var k=0;k<arr1.length;k++){
                    
                    if(tmp2[1] == arr1[k] && $.trim(tmp2[2]) == $.trim(arr3[k])){
                        
                        $("#"+addon_cbox_id+"_price").val(arr2[k]);
                       
                        $("#"+addon_cbox_id).next().find(".rpspn").html('(<span class="rs"></span>'+arr2[k]+" )");
                  
                    }
                    
                }
                
             
        }
        )
        
        calculate_checked_price();
       
    }
    else{
        
        var tmp = id.split("_");
       
        var tmp2 = $("#qtPrice_"+id).text().split("_");
        $("#rs_"+tmp[0]).text(tmp2[0]);
        
        $("#qnty_"+tmp[0]).text(tmp2[1]+" "+tmp2[2].ucwords());
        
        $("#selItmId_"+tmp[0]).val(id);
        $("#quty_"+tmp[0]).val(tmp2[1]);
        $("#unt_"+tmp[0]).val(tmp2[2]);
       
        
        
    }
    
    
}

function toggleQt(id){
    
    if($("#addon_popup").is(":visible")){
        $("#aqtdrp_"+id).toggle();
    }
    else{
        $('.slcbx').each(function(){
            $this = $(this);
            var qtid = $(this).attr('id');
            if('qtdrp_'+id != qtid){
                $('#'+ qtid).hide();
		$("#"+qtid).parent('.qunselct').css({'z-index':'0'});
            }
           
         });
        if($("#qtdrp_"+id).is(":visible")){
            $("#qtdrp_"+id).hide();
	    $("#qtdrp_"+id).parent('.qunselct').css({'z-index':'0'});
        }
        else{
            $("#qtdrp_"+id).show();
            $("#qtdrp_"+id).parent('.qunselct').css({'z-index':'999'});
						
						
        }
        
    }
    
    
}


function toggleQtSmry(id){
    if($("#mrOrder").is(':visible'))
    {
         $('.slctdrop2').each(function(){
            $this = $(this);
            var qtid = $(this).attr('id');
            if('sqtdrp2_'+id != qtid){
                $('#'+ qtid).hide();
								$('#'+ qtid).parent('.qunselct').css({'z-index':'0'});
            }
           
         });
        
         if($("#sqtdrp2_"+id).is(":visible")){
            $("#sqtdrp2_"+id).hide();
						$("#sqtdrp2_"+id).parent('.qunselct').css({'z-index':'0'});
        }
        else{
            $("#sqtdrp2_"+id).show();
						$("#sqtdrp2_"+id).parent('.qunselct').css({'z-index':'999'});
        }
        
      
    }
    else{
        
        $('.slctdrop').each(function(){
            $this = $(this);
            var qtid = $(this).attr('id');
            if('sqtdrp_'+id != qtid){
                $('#'+ qtid).hide();
								$('#'+ qtid).parent('.qunselct').css({'z-index':'0'});
            }
           
         });
        
         if($("#sqtdrp_"+id).is(":visible")){
            $("#sqtdrp_"+id).hide();
						$("#sqtdrp_"+id).parent('.qunselct').css({'z-index':'0'});
        }
        else{
            $("#sqtdrp_"+id).show();
						$("#sqtdrp_"+id).parent('.qunselct').css({'z-index':'999'});
        }
        
    }
    
}

 function setCaretPosition(elemId, caretPos) {
        var el = document.getElementById(elemId);
    
        if (el !== null) {
            
            if (el.createTextRange) {
                var range = el.createTextRange();
                range.move('character', caretPos);
                range.select();
                return true;
            }
            
            else {
                if (el.selectionStart || el.selectionStart === 0) {
                    el.focus();
                    el.setSelectionRange(caretPos, caretPos);
                    return true;
                }
                
                else  { // fail city, fortunately this never happens (as far as I've tested) :)
                    el.focus();
                    return false;
                }
            }
        }
    }
    
    
 function toggleBx(id){
     
     
     var tmp = id.split("_");
     if($.trim(tmp[0]) == "commentbx"){
         if($("#cmntlnk_"+tmp[1]).is(':visible')){
             $("#cmntdsblnk_"+tmp[1]).show();
             $("#cmntlnk_"+tmp[1]).hide();
         }
         else{
             
            $("#cmntdsblnk_"+tmp[1]).hide();
            $("#cmntlnk_"+tmp[1]).show();  
         }
         
         if($("#"+id).is(':visible')){
              $("#"+id).hide();
         }
         else{
             $("#"+id).show();
             $("#cmntinput_"+tmp[1]).focus();
            
         }
        
         
     }
     
     if($.trim(tmp[0]) == "cmntcnt"){
         
         if($("#allcmntlnk_"+tmp[1]).is(':visible')){
             $("#allcmntdsblnk_"+tmp[1]).show();
             //$("#allcmnthidlnk_"+tmp[1]).show();
             $("#allcmntlnk_"+tmp[1]).hide();
         }
         else{
             
            $("#allcmntdsblnk_"+tmp[1]).hide();
            //$("#allcmnthidlnk_"+tmp[1]).hide();
            $("#allcmntlnk_"+tmp[1]).show();  
         }
         
          if($("#"+id).is(':visible')){
              $("#"+id).hide();
         }
         else{
             $("#"+id).show();
         }
         
     }
     
     if($.trim(tmp[0]) == "allcmntbx"){
         
        openDiv(id);
         
       setSlider($('#cmntul_'+tmp[1]));
         
       if($('#cmntul_'+tmp[1]+' div.sct').height() <= 535 && $('#cmntul_'+tmp[1]+' div.sct').height() != null){ 
                $("#cmntul_"+tmp[1]).height($('#cmntul_'+tmp[1]+' div.sct').height());
                $("#cmntlst_"+tmp[1]).height($('#cmntul_'+tmp[1]+' div.sct').height());
                 $("#cmntlst_"+tmp[1]).css('min-height', $('#cmntul_'+tmp[1]+' div.sct').height());
        } else{ 
                $("#cmntul_"+tmp[1]).height(535);
                $("#cmntlst_"+tmp[1]).height(535);
                $("#cmntlst_"+tmp[1]).css('min-height', 535);
        }
         
         
         
         
     }
     if($.trim(tmp[0]) == "alllkbx"){
         
        openDiv(id);
         
       setSlider($('#lkul_'+tmp[1]));
         
       if($('#lkul_'+tmp[1]+' div.sct').height() <= 278 && $('#lkul_'+tmp[1]+' div.sct').height() != null){ 
                $("#lkul_"+tmp[1]).height($('#lkul_'+tmp[1]+' div.sct').height());
                $("#lklst_"+tmp[1]).height($('#lkul_'+tmp[1]+' div.sct').height());
                 $("#lklst_"+tmp[1]).css('min-height', $('#lkul_'+tmp[1]+' div.sct').height());
        } else{ 
                $("#lkul_"+tmp[1]).height(278);
                $("#lklst_"+tmp[1]).height(278);
                $("#lklst_"+tmp[1]).css('min-height', 278);
        }
         
         
         
         
     }
     
 }
 
 
 function like_comment_post(mobile, email, docid, city, like, item, flag) {
    //  For posting likes and comments with flag value 0 for like and 1 for commenting

    //checking if it is like or a comment
    if (flag == '0') {
        var comment = '';
    } else {
        var cmnt_box = "cmntinput_" + item;
        //var comment = document.getElementById(cmnt_box).value;
        var comment = document.getElementById(cmnt_box).value.replace(/(<([^>]+)>)/ig,"");
        comment = $.trim(comment);
        
        //var comment = $($("#"+cmnt_box).val()).text();
        $("#"+cmnt_box).removeClass('errinpt');
        if($.trim(comment) == '' || comment.length > 2000){
            $(".baderr").hide();
            if($.trim(comment) == ''){
                $("#"+cmnt_box).addClass('errinpt');
            }
            
           if(comment.length > 2000){
               $(".baderr").text("The comment is too big, please trim your comment");
               $(".baderr").show();
           }

            
            return false;
        }
        //document.getElementById(cmnt_box).value = "";
    }
    // Making an Ajax call to the file that makes a CURL call to the insert data API
    $.ajax({
        url: WEBROOT+"webmain/likecomment.php",
        dataType: "json",
        type: "post",
        data: {
            mobile: mobile,
            email: email,
            docid: docid,
            city: city,
            like: like,
            comment: comment,
            itemcode: item,
            condition: 1,// Condition 1 will trigger the CURL call for insert API  
            source: 10
        },
        success: function(res) {
                     $(".baderr").hide();
                                //console.log(res['errorcode']);
                    if(res['errorcode'] == 0){
                        if(like == 1){
                            if($('#prv_div_itm').find('.prv_ord_itm_'+item).length == 0){
                                if(!$("#prvord_fav_sec").is(':visible')){
                                    $("#prvord_fav_sec").show();
                                }
                                var itm_div = $("<div>" + $('#rs_'+item).parent().html() + "</div>");
                                itm_div.find('#likecnt_'+item).remove();
                                itm_div.find('.mnuspn .listdsc').remove();
                                itm_div.find('.mnuspn .unavlb').remove();
                                itm_div.find('#allcmntbx_'+item).remove();
                                itm_div.find('#alllkbx_'+item).remove();
                                itm_div = "<ul><li class='prv_ord_itm_"+item+"'>"+itm_div.html()+"</ul></li>";
                                $("#prv_div_itm").append(itm_div);                       
                                var prv_lke_cnt = parseFloat($(".fpoitm_cnt").text());
                                prv_lke_cnt = prv_lke_cnt + 1;
                                $(".fpoitm_cnt").text(prv_lke_cnt);
                            }
                        }else{
                            var in_prvitms =false;
                            for (var index = 0; index < previtms.results.length; ++index) {
                                if(previtms['results'][index] == item){
                                    in_prvitms = true;
                                    break;
                                }
                            }
                            if(in_prvitms != true){
                                $('#prv_div_itm').find('.prv_ord_itm_'+item).remove();                                                           
                                var prv_lke_cnt = parseFloat($(".fpoitm_cnt").text());
                                prv_lke_cnt = prv_lke_cnt - 1;
                                $(".fpoitm_cnt").text(prv_lke_cnt);
                                if(prv_lke_cnt == 0){
                                    $("#prvord_fav_sec").hide();
                                }
                            }
                        }
                        
                //fetching all the itemcodes and making changes with respect to their itemcodes                 
                    jQuery.each(res['results']['itemcodes'], function(i, val)
                    {
                        var itemcode=i; //itemcodes
                        var area ="#review_box_"+itemcode; //the whole container box for likes and comments
                        var all_comment_box="#comments_"+itemcode; //section to show all the comments
                        var all_like_box="#likes_"+itemcode; //section to show all the likes on a particular item
                        var result_html=''; //to store the corresponding HTML to review_box or area variable
                        var comment_html=''; 
                        var like_html=''; 
                        var all_comments_html=''; //to store the corresponding HTML to comments div or all_comment_box variable
                        var all_likes_html=''; //to store the corresponding HTML to likes_box or all_like_box variable
                        var ppl_count="#cmnt_ppl_count_"+itemcode; //to store the corresponding number of people who liked on the item.
                        
                        //getting all the comments, time and user names on the particular itemcode
                        var comments=res['results']['itemcodes'][itemcode]['all_comment'].split("^");
                        var times=res['results']['itemcodes'][itemcode]['comments_time'].split(",");
                        var user_name=res['results']['itemcodes'][itemcode]['user_arr'].split(",");
                        var other_name=res['results']['itemcodes'][itemcode]['other_like_name'].split(",");
                        var total_comment_cnt =res['results']['itemcodes'][itemcode]['total_comment'];
                        var people_comment_cnt =res['results']['itemcodes'][itemcode]['count_cmntd_user'];
                        
                        //If you liked the item set the text and functions accordingly
                        if (res['results']['itemcodes'][i]['you_like'] == '1') {
                            var like_text="Unlike";    
                            var like_function="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','0','" + itemcode + "','0');return false;";
                            var like_functiono="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','0','" + itemcode + "','0');closeDiv('alllkbx_" + itemcode + "');return false;";
                            var comment_function="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','1','" + itemcode + "','1');return false;";        
                        }else{
                            var like_text="Like";
                            var like_function="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','1','" + itemcode + "','0');return false;";
                            var like_functiono="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','1','" + itemcode + "','0');closeDiv('alllkbx_" + itemcode + "');return false;";
                            var comment_function="like_comment_post('" + mobile + "','" + email + "','" + docid + "','" + city + "','0','" + itemcode + "','1');return false;";        
                              }
                              
                        
                        
                        
            result_html += "<span class=\"lkcmnt\">";
            result_html += "<a onclick=\""+like_function+"\" href=\"#\">"+like_text+"</a>";
            result_html += "<span style=\"display:none;\" class=\"dotlkcmnt\">&nbsp;.&nbsp;</span>"; 
            result_html += "<a style=\"display:none;\" onclick=\"toggleBx('commentbx_"+itemcode+"');return false;\" id=\"cmntlnk_"+itemcode+"\" href=\"#\">Comment</a>";
            result_html += "<span class=\"cmntdsbl\" id=\"cmntdsblnk_"+itemcode+"\" style=\"display:none;\">Comment</span>";
            result_html += "<span style=\"display:none;\" id=\"commentbx_"+itemcode+"\" class=\"cmntbar\">";
            result_html += "<span class=\"baderr\" style=\"display:none;\">Please remove the bad words from your comment</span> ";
            
            result_html +=  "<span class=\"cmntinput\">";
           
            result_html +=  "<input type=\"text\" placeholder=\"write a comment\" id=\"cmntinput_"+itemcode+"\" onkeydown=\"rmClass(this);\">";
            result_html +=  "<span onclick=\"toggleBx('commentbx_"+itemcode+"');\" class=\"crosgry\"></span>";
            result_html +=  "</span>";
            result_html +=  "<a onclick=\""+comment_function+"\" class=\"cmntsubmt\" href=\"#\">Submit</a>";
            result_html +=  "</span>";
            result_html +=  "</span>"; 
            
            if(total_comment_cnt > 0 || $.trim(res['results']['itemcodes'][itemcode]['like_box_text']) != ''){
                result_html +=  "<span class=\"lkcmntdscr\">";
                if($.trim(res['results']['itemcodes'][itemcode]['like_box_text']) != ''){
                    result_html +=  "<span class=\"rslike\"></span>";
                }
                result_html +=  "<span class=\"lkdescrp\">";
                result_html +=  res['results']['itemcodes'][itemcode]['like_box_text']; 
                var lkitmnm = $("#lkitmnm_"+itemcode).text();
                 if(other_name.length){

                    result_html +=  "<span class=\"othrppl\" id=\"lkbx_"+itemcode+"\" style=\"display:none;\" >" ;
                    result_html +=  "<span class=\"othrhvr\">";
                    result_html +=  "<span class=\"hvrarw\"></span>";

                    //result_html +=  "<span class=\"othrhdng\">people who liked <span id=\"lkitmnm_"+itemcode+"\">"+lkitmnm+"</span></span>";
                    result_html +=  "<span class=\"othrhdng\">people who liked this</span>";
                    result_html +=  "<span class=\"hoverouter\" id=\"hvr_"+itemcode+"\">";
                    //result_html +=  "<span id=\"lkbxitm_"+itemcode+"\" class=\"scroll-pane\" style=\"height:100px;\">";
                    result_html +=  "<span id=\"lkbxitm_"+itemcode+"\">";
                    var c = 0;
                    $.each(other_name, function(i, val)
                    {  
                        if ($.trim(val)!='') {
                             result_html +=  "<span>"+val+"</span>"; 
                               if(c == 4){
                                    return false;
                               }
                             c++;
                        }
                    });               

                    var more = other_name.length - 5;
                    result_html +=  "</span>";
                    if(other_name.length > 5){
                    result_html +=  "<span><a href=\"#\" onclick=\"toggleBx('alllkbx_"+itemcode+"');return false;\">&amp; "+more+" More...</a></span>";
                    }
                    result_html +=  "</span>";
                    result_html +=  "</span>";
                    result_html +=  "</span>";

                 }
                if(total_comment_cnt > 0 && $.trim(res['results']['itemcodes'][itemcode]['like_box_text']) != '' && false){

                    result_html +=  " | ";
                }                
                if(total_comment_cnt > 0 && false){
                    
                     
                     var cmntlnk = "style='display:inline;'";            
                     var cmntlnk2 = "style='display:none;'";            
                    if(item == itemcode && flag == '1'){
                        cmntlnk = "style='display:none;'";
                        cmntlnk2 = "style='display:inline;'";
                    }
                    
                    var cmntstr = (total_comment_cnt == 1) ? " comment" : " comments";
                    var cmntstr2 = (total_comment_cnt == 1) ? "Comment" : "Comments";
                    
                    result_html +=  "<a onclick=\"toggleBx('cmntcnt_"+itemcode+"');return false;\" id=\"allcmntlnk_"+itemcode+"\" href=\"#\" "+cmntlnk+">"+total_comment_cnt + cmntstr+"</a>";

                    result_html +=  "<span  class=\"allcmntdsbl\" id=\"allcmntdsblnk_"+itemcode+"\" "+cmntlnk2+">";
                    result_html +=  total_comment_cnt + cmntstr+" ";
                    result_html +=  "<a onclick=\"toggleBx('cmntcnt_"+itemcode+"');return false;\" id=\"allcmnthidlnk_"+itemcode+"\" href=\"#\">(Hide "+cmntstr2+")</a></span>";
                  }
                    result_html +=  "</span>";

                    var cls = "style='display:none;float:left;width:510px;'";
                    if(item == itemcode && flag == '1'){

                        cls = "style='display:block;float:left;width:510px;'";
                    }

                    result_html +=  "<span id=\"cmntcnt_"+itemcode+"\" "+cls+">";

                    //var cmntcls = "style='display:none;'";            
                    if(item == itemcode && flag == '1'){
                        //cmntcls = "style='display:block;'";
                    }



                    var f = 0;

                    $.each(comments, function(i, val)
                    { 

                        if ( val!='') {
                             if(f < 4){

                                result_html+= "<span class=\"cmntdscp\"><span>";
                                if (user_name[i]!=='') {
                                    result_html+="<b>" + user_name[i] + "</b>";
                                }
                                result_html+= " - " +comments[i] + "</span>";
                                result_html+="<span class=\"cmnthrs\">"+times[i]+"</span></span>";
                            }
                            f++;
                        }
                    });               

                   if(total_comment_cnt > 4){
                        result_html +=  "<a href=\"#\" onclick=\"toggleBx('allcmntbx_"+itemcode+"');return false\">View all Comments</a>";
                    }

                    result_html +=  "</span>";
               

                result_html +=  "</span>";
            }
            //result_html +=  "</span>";
            
            
            
            
             comment_html += "<section class=\"jpbg\">";
             comment_html += "<span class=\"jcl\" >X</span>";
             comment_html += "<section class=\"allcomment\">";
             comment_html += "<p class=\"cmntopttl\">";
             comment_html += "<span>"+people_comment_cnt+" people commented on</span>";
              comment_html += "<b>"+lkitmnm+"</b>";
            comment_html += "</p>";
            comment_html += "<section class=\"allcmntlst\" id=\"cmntlst_"+itemcode+"\">"  
            comment_html += "<ul class=\"scroll-pane\" id=\"cmntul_"+itemcode+"\" style=\"height:535px;\">";

            $.each(comments, function(k, val)
             {  
                 if ( val!='') {
                     comment_html+= "<li class=\"cmntdscp\"><span>";
                     if (user_name[k]!=='') {
                         comment_html+="<b>" + user_name[k] + "</b>";
                     }
                     comment_html+= " - " +comments[k] + "</span>";
                     comment_html+="<span class=\"cmnthrs\">"+times[k]+"</span></li>";
                 }
             });          
                       
                         
           comment_html += "</ul>";
           comment_html += "</section>";
           comment_html += "</section>";
           comment_html += "</section>";
           
           if(other_name.length){
                var lkitmnam = $("#lkitmnm_"+itemcode).text();

                like_html += "<section class=\"jpbg\">";
                like_html += "<span class=\"jcl\" >X</span>";

                like_html += "<section class=\"moreppls\">";
                like_html += "<p><b>People who Liked</b></p>";
                like_html += "<p class=\"orng\"><span id=\"lkitmnm_"+itemcode+"\">"+lkitmnam+"</span></p>";
                like_html += "<section class=\"likeallpop\">"; 
                like_html += "<section id=\"lklst_"+itemcode+"\" class=\"likelst\">";  
                like_html += "<ul style=\"height:278px;\" id=\"lkul_"+itemcode+"\" class=\"scroll-pane\">";
                
                $.each(other_name, function(i, val)
                {  
                    if ($.trim(val)!='') {
                         like_html +=  "<li>"+val+"</li>";  
                         
                    }
                });         


                like_html += "</ul>";
                like_html += "</section>";
                like_html += "</section>";
                like_html += "<p><button onclick=\""+like_functiono+"\" type=\"button\" class=\"jbtn\">"+like_text+"</button><button style=\"margin-left:10px;\" onclick=\"closeDiv('alllkbx_"+itemcode+"');\" type=\"button\" class=\"jbtn\">Close</button></p>";
                like_html += "</section>";
                like_html += "</section>";
                $("#alllkbx_"+itemcode).html(like_html);
            }
    
           
           
           if($("#mslkdesc_"+itemcode)){
               
                var msitmnm = $("#msitmnm_"+itemcode).text();
                var mst_html = '';
                var mst_html1 = '';
                if(other_name.length){

                   mst_html +=  "<span class=\"othrppl\" id=\"msbx_"+itemcode+"\" style=\"display:none;\" >" ;
                   mst_html +=  "<span class=\"othrhvr\">";
                   mst_html +=  "<span class=\"hvrarw\"></span>";

                   //mst_html +=  "<span class=\"othrhdng\">people who liked <span id=\"msitmnm_"+itemcode+"\">"+msitmnm+"</span></span>";
                   mst_html +=  "<span class=\"othrhdng\">people who liked this</span>";
                   mst_html +=  "<span class=\"hoverouter\" id=\"hvrm_"+itemcode+"\">";
                   //mst_html +=  "<span id=\"msbxitm_"+itemcode+"\" class=\"scroll-pane\" style=\"height:100px;\">";
                   mst_html +=  "<span id=\"msbxitm_"+itemcode+"\">";
                   var d = 0;
                   $.each(other_name, function(i, val)
                   {  
                       if ($.trim(val)!='') {
                            mst_html +=  "<span>"+val+"</span>"; 
                            if(d == 4){
                                return false;
                           }
                            d++;
                       }
                   });               
                  
                   mst_html +=  "</span>";
                   var mmore = other_name.length - 5;
                   if(other_name.length > 5){
                    mst_html +=  "<span><a href=\"#\" onclick=\"toggleBx('alllkbx_"+itemcode+"');return false;\">&amp; "+mmore+" More...</a></span>";
                   }
                   mst_html +=  "</span>";
                   mst_html +=  "</span>";
                   mst_html +=  "</span>";
                   
                   mst_html1 +=  "<span class=\"othrppl\" id=\"msbx1_"+itemcode+"\" style=\"display:none;\" >" ;
                   mst_html1 +=  "<span class=\"othrhvr\">";
                   mst_html1 +=  "<span class=\"hvrarw\"></span>";

                   //mst_html +=  "<span class=\"othrhdng\">people who liked <span id=\"msitmnm_"+itemcode+"\">"+msitmnm+"</span></span>";
                   mst_html1 +=  "<span class=\"othrhdng\">people who liked this</span>";
                   mst_html1 +=  "<span class=\"hoverouter\" id=\"hvrm_"+itemcode+"\">";
                   //mst_html +=  "<span id=\"msbxitm_"+itemcode+"\" class=\"scroll-pane\" style=\"height:100px;\">";
                   mst_html1 +=  "<span id=\"msbx1itm_"+itemcode+"\">";
                   var e = 0;
                   $.each(other_name, function(i, val)
                   {  
                       if ($.trim(val)!='') {
                            mst_html1 +=  "<span>"+val+"</span>"; 
                            if(e == 4){
                                return false;
                           }
                            e++;
                       }
                   });               
                  
                   mst_html1 +=  "</span>";
                   var mmore1 = other_name.length - 5;
                   if(other_name.length > 5){
                    mst_html1 +=  "<span><a href=\"#\" onclick=\"toggleBx('alllkbx_"+itemcode+"');return false;\">&amp; "+mmore1+" More...</a></span>";
                   }
                   mst_html1 +=  "</span>";
                   mst_html1 +=  "</span>";
                   mst_html1 +=  "</span>";

                }
                
               
                $("#mslkdesc_"+itemcode).html(mst_html);
                $("#mslkdesc1_"+itemcode).html(mst_html1);
                
           }
           if($("#mstlktxt_"+itemcode)){
                    
                var mstxt = res['results']['itemcodes'][itemcode]['like_box_text'];

                mstxt = mstxt.replace('aothr','msaothr');
                mstxt = mstxt.replace('lkbx','msbx');
                mstxt = mstxt.replace('lkbx','msbx');
               
                $("#mstlktxt_"+itemcode).html(mstxt);
                
                var mstxt1 = res['results']['itemcodes'][itemcode]['like_box_text'];

                mstxt1 = mstxt1.replace('aothr','msaothr1');
                mstxt1 = mstxt1.replace('lkbx','msbx1');
                mstxt1 = mstxt1.replace('lkbx','msbx1');
               
                $("#mstlktxt1_"+itemcode).html(mstxt1);
                
           }
           
          
            $("#allcmntbx_"+itemcode).html(comment_html);
            
            $("#likecnt_"+itemcode).html(result_html);
                        
                    
                       
                    });
                }
                else{
                    $(".baderr").text("Please remove the bad words from your comment");
                    $(".baderr").show();
                    
                    
                    
                }
                
           
        },
        error: function(res) {
        }
     });
 }
 
 function lkBx(id,flg,type){
  
    if(flg == 0){
        $("#"+type+"_"+id).hide();
        $("#"+type+"itm_"+id).hide();
         $("#"+type+"_"+id).attr("style","display:none");
         $("#"+type+"itm_"+id).attr("style","display:none");
         if(touchy == false){
         
            $("#msaothr_"+id).parent().parent().css({'position':'static','z-index':'inherit'});
            $("#msaothr1_"+id).parent().parent().css({'position':'static','z-index':'inherit'});
            $("#aothr_"+id).parent().css({'position':'static','z-index':'inherit'});
        }
        
        //setSlider($("#"+type+"_"+id));
    }
    else{
        if(type == 'msbx'){
           if(touchy == true || (($.browser.version.substr(0, 2) > 9) && (navigator.userAgent).indexOf("Tablet PC") != -1)){
               
                $("#"+type+"_"+id).parent().parent().css({'position':'relative'});
            }
            else{
               $("#"+type+"_"+id).parent().parent().css({'position':'relative','z-index':'999'});
            }
            var pos = $("#msaothr_"+id).position();
        }
        else if(type == 'msbx1'){
            if(touchy == true || (($.browser.version.substr(0, 2) > 9) && (navigator.userAgent).indexOf("Tablet PC") != -1)){
                
                 $("#"+type+"_"+id).parent().parent().css({'position':'relative'});
            }
            else{
               
                $("#"+type+"_"+id).parent().parent().css({'position':'relative','z-index':'999'});
            }
            var pos = $("#msaothr1_"+id).position();
        }
        else{
           if(touchy == true || (($.browser.version.substr(0, 2) > 9) && (navigator.userAgent).indexOf("Tablet PC") != -1)){	
               
                 $("#"+type+"_"+id).parent().css({'position':'relative'});
            }
            else{
                
                 $("#"+type+"_"+id).parent().css({'position':'relative','z-index':'999'});
               
            }
            var pos = $("#aothr_"+id).position();
        }
        
       
        var topVl  = 1;
        var leftVl  = (pos.left)-40;

        //$("#lkbx_"+id).offset({ top: pos.top, left: pos.left});
        //alert(type+"--"+id);    
        if(type == 'msbx'){
            var hvrid = "hvrm_"+id;
			//$("#"+type+"_"+id).parent().css({'position':'relative','z-index':'999'});
             $("#"+type+"_"+id).attr("style","display:block;left:"+leftVl+"px;top:"+topVl+"px;");
            
        }
        else if(type == 'msbx1'){
           
            var hvrid = "hvrm1_"+id;
             $("#"+type+"_"+id).attr("style","display:block;left:"+leftVl+"px;top:"+topVl+"px;");
             
            
        }
        else{
            var hvrid = "hvr_"+id;
            $("#"+type+"_"+id).attr("style","display:block;left:"+leftVl+"px;");
        }
        
      //  $("#lkbx_"+id).attr("style","top:10px"+topVl+"px;left:"+leftVl+"px;");

       $("#"+type+"_"+id).css({
        "z-index": "9999"
       });
       $("#"+type+"_"+id).show();
       $("#"+type+"itm_"+id).show();
       
       //setSlider($("#"+type+"itm_"+id)); scroller implementation
       
         
       /*if($("#"+type+"itm_"+id+' div.sct').height() <= 100 && $("#"+type+"itm_"+id+' div.sct').height() != null){ 
                $("#"+type+"itm_"+id).height($("#"+type+"itm_"+id+' div.sct').height());
                $("#"+hvrid).height($("#"+type+"itm_"+id+' div.sct').height());
                
        } else{ 
                $("#"+type+"itm_"+id).height(100);
                
        }*/
       
       
        
    }
    
    
     
 }
 
 function rmClass(obj){
     
     var cmnt_box = obj.id;
     $("#"+cmnt_box).removeClass('errinpt');
     
 }

/************************ DOMINOS JAVASCRIPT FUNCTIONS STARTS ******************************/
function viewAllDomItms(){

	var orderId = getCookie('orderId_'+MDOCIDJ);
    $.post(WEBROOT+"functions/ajxAllDomItms.php",{
		docid:$("#docid").val(),
		allItmsFlg : 1,
		orderId:orderId,
		timeStamp: new Date().getTime()
	}, function(result){
		tempArr = result.split("|~$~|");

		itmContent = tempArr[1];
		priceContent = tempArr[3];
		mnmContent = tempArr[5];

		$("#itms2").empty().html(itmContent);
		openDiv('mrOrder');
		});
	}

function addonDomDetail(orderDetailId,delFlg,page,itemId,citem_id){

	var mod = '3' ;
	var domid = $("#itemid").val();
	if(typeof itemId != 'undefined'){
		domid = itemId;
	}

	var sideItemName = $('#itmss_'+domid).val();
	if(typeof sideItemName != 'undefined'){
		sideItemName = $('#itmss_'+domid).val();
	} else {
		sideItemName = $.trim($('#itm_'+domid).text());
	}

	var sideItemPrice = $('#itmssprice_'+domid).val();
	if(typeof sideItemPrice != 'undefined'){
		sideItemPrice = $('#itmssprice_'+domid).val();
	} else {
		sideItemPrice = $.trim($('#rs_'+domid).text());
	}

	if($.trim(getCookie('orderId_'+MDOCIDJ)) == '')
	{
		if(openDet == 1)
		{
			return;
		}
		_ct('domprcdorder','domdlvdt','4194304');
		var dtVal = $('#dldtt :selected').val();
		var tmVal = $('#dltmm :selected').val();
		if(typeof tmVal == 'undefined'){
			$("#dlTxt").empty().html("Restaurant is closed at this hour.");
			openDiv('dlVld');
			return false;
		}
		var tmArr = tmVal.split(' ');
		tmVal = tmArr[1];
		var dlpk = "HD";
		var dlarea = $("#areaMenu").val();

		openDet = 1;

        $.post(WEBROOT+"functions/ajxGenOrderId.php",{
            delivery_pickup:dlpk,
            docId:$("#docid").val(),
            delivery_date:dtVal,
            delivery_time:tmVal,
            delivery_area:dlarea,
            docId:$("#docid").val(),
            vertical:mod,
            timeStamp: new Date().getTime()
        },function(res){
                        var tmpAr = res.split("|~|");
						var now = new Date();
                        var time = now.getTime();
                        time += 3600 * 1000;
                        now.setTime(time);
                        document.cookie = 
                            'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                            '; expires=' + now.toGMTString() + 
                            '; path=/' +
                            '; domain='+cookieondomain;
                        document.cookie = 
                            'inittm=' + escape(tmpAr[1]) + 
                            '; expires=' + now.toGMTString() + 
                            '; path=/' +
                            '; domain='+cookieondomain;

			if($.trim($("#itemid").val()) != ''){
					var ajxdet = WEBROOT+"functions/ajxDomAddonDetail.php";
					if (domid.slice(0,3) == 'DOM')
					{
						domid = domid.slice(3);
					}

                $.post(ajxdet,{
                    itemid:domid,
                    docid:$("#docid").val(),
                    orderDetailId:orderDetailId,
                    delFlg:delFlg,
                    page:page
                },function(result){
					if(result == 'none'  && $.trim(orderDetailId) == '' ){
						openDet = 0;
                        closeDiv('fda');
                        var qty = 1;
                        $.post(WEBROOT+"functions/ajxDomAddOrderDetail.php",{
							item_type: 'sides',
							product_id: domid,
							docid:$("#docid").val(),
							quantity: qty,
							item_name:sideItemName,
							item_price:sideItemPrice,
							delFlg:delFlg
						},function(result){
							if(typeof page != 'undefined' && page == 'checkout'){
						location.reload();
						}

						tempArr = result.split("|~$~|");

						itmContent = tempArr[1];
						priceContent = tempArr[3];
						mnmContent = tempArr[5];

						if($.trim(mnmContent) == '1')
						{
							$("#chkoutBtn").removeClass('addsbl');
							$("#chkoutBtn").show();
							$('#chkoutBtn').click(redirectToDomSmry);
						} else if($.trim(mnmContent) == '0'){
							 $("#chkoutBtn").addClass('addsbl');
							 $("#chkoutBtn").show();
							 $('#chkoutBtn').attr('onclick','').unbind('click');
						} else {
								$("#chkoutBtn").hide();
							}
						closePopUp('ordSummry');

						$("#itms").empty().html(itmContent);
                        $("#mnDlvChrg").text($("#mnDlv").val());
						$(".edtdlvry").show();

						if(typeof priceContent == 'undefined'){
							$("#priceCont").hide();
							$("#itmCont").addClass('idtlb');
						}
						$(".edtdlvry").show();
						$(".cnlprod").show();
						$("#itmCont").removeClass('idtlb');

						 $("#itmCont").removeClass('idtlb');
						 if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){

							$("#chkoutBtn").removeClass('addsbl');
							$("#chkoutBtn").show();
							$('#chkoutBtn').click(redirectToDomSmry);
							$('span.ordr').hide();
							 if(tab == 'tblchkout'){
								$(".addmfy input").removeClass('addsbl');
								$('.addmfy input').click(redirectToDomSmry);
								if(typeof mnmContent == 'undefined'){
								$("#chkoutBtn").hide();
								}
							}
						} else {
							$('span.ordr').show();
						}
					});
					} else {
						openDet = 0;
					$('#addon_popup').html(result);
					closeDiv('fda');
					if($.trim(orderDetailId) != ''){
						$("#addBtn").val("Update My Order");
					}
					openDiv('addon_popup');
					round_popup();
					if($.trim($("#grybox_total_price").text()) == "-"){
						$("#addon_radio_0").click();
					}
				}
			});
		} else {
				closeDiv('fda');
				var rflg = getCookie('rflg');
				if(rflg == 1){
				document.cookie = 
				'rflg=0'+ 
				'; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
				'; path=/' +
				'; domain='+cookieondomain;
				location.reload();
				}
			}
		});
		} else {
			if(openDet == 1)
			{
				return;
			}

			openDet = 1;
			_ct('domprcdorder','domdlvdt','4194304');
		if($.trim($("#itemid").val()) != ''){
					var ajxdet = WEBROOT+"functions/ajxDomAddonDetail.php";
					if (domid.slice(0,3) == 'DOM')
					{
						domid = domid.slice(3);
					}

                $.post(ajxdet,{
                    itemid:domid,
                    docid:$("#docid").val(),
                    orderDetailId:orderDetailId,
                    delFlg:delFlg,
                    page:page,
                    citem_id:citem_id
                },function(result){
					openDet = 0;
					if(result == 'none' && $.trim(orderDetailId) == ''){
						var qty = 1;
                        $.post(WEBROOT+"functions/ajxDomAddOrderDetail.php",{
							item_type: 'sides',
							product_id: domid,
							docid:$("#docid").val(),
							quantity: qty,
							item_name:sideItemName,
							item_price:sideItemPrice,
							delFlg:delFlg
						},function(result){
							if(typeof page != 'undefined' && page == 'checkout'){
						location.reload();
					}
					tempArr = result.split("|~$~|");

					itmContent = tempArr[1];
					priceContent = tempArr[3];
					mnmContent = tempArr[5];

					if($.trim(mnmContent) == '1') {
						$("#chkoutBtn").show();
						$("#chkoutBtn").removeClass('addsbl');
						$('#chkoutBtn').click(redirectToDomSmry);
					} else if($.trim(mnmContent) == '0'){
						$("#chkoutBtn").addClass('addsbl');
						$("#chkoutBtn").show();
						$('#chkoutBtn').attr('onclick','').unbind('click');
					} else {
						$("#chkoutBtn").hide();
					}

					closePopUp('ordSummry');
					$("#itms").empty().html(itmContent);
					$("#mnDlvChrg").text($("#mnDlv").val());

					if(typeof priceContent == 'undefined'){
						$("#priceCont").hide();
						$("#itmCont").addClass('idtlb');
					}
					$(".edtdlvry").show();
					$(".cnlprod").show();
					$("#itmCont").removeClass('idtlb');

					if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){

					$("#chkoutBtn").removeClass('addsbl');
					$("#chkoutBtn").show();
					$('#chkoutBtn').click(redirectToDomSmry);
					$('span.ordr').hide();
					if(tab == 'tblchkout'){
						$(".addmfy input").removeClass('addsbl');
						$('.addmfy input').click(redirectToDomSmry);
						if(typeof mnmContent == 'undefined'){
						$("#chkoutBtn").hide();
						}
					}
				} else {
					$('span.ordr').show();
				}
			});
					} else {
						openDet = 0;
					$('#addon_popup').html(result);
					closeDiv('fda');
					if($.trim(orderDetailId) != ''){
						$("#addBtn").val("Update My Order");
					}
					openDiv('addon_popup');
					round_popup();

					if($.trim($("#grybox_total_price").text()) == "0.00" && $('#addon_radio_selected_crust').val() !=''){
						$(':radio[value="' + $('#addon_radio_selected_crust').val() + '"]').attr('checked', 'checked');
						$(':radio[value="' + $('#addon_radio_selected_crust').val() + '"]').click();
					} else if($.trim($("#grybox_total_price").text()) == "-" ){
						$("#addon_radio_0").attr('checked','checked');
						$("#addon_radio_0").click();
					}
				}
				});
			}
			else
			{
				closeDiv('fda');
				var rflg = getCookie('rflg');
				if(rflg == 1){
				document.cookie = 
				'rflg=0'+ 
				'; expires=Thu, 01 Jan 1970 00:00:01 GMT'+ 
				'; path=/' +
				'; domain='+cookieondomain;
				location.reload();
            }
		}
	}
}

function deleteDompopup(delFlg,itemId,orderDetailId,page,itemname,docid)
{
     gl_delFlg =  delFlg ;
     gl_itemId =  itemId ;
     gl_orderDetailId =  orderDetailId ;
     gl_page =  page ;
     gl_itemname =  itemname ;
     gl_docid =  docid ;

    document.getElementById("del_dom_item").innerHTML = gl_itemname;

    openDiv('deldompopup');
}

function delDomItem()
{
	if(gl_itemId != ''){
		editDomAddonDet(gl_delFlg,gl_itemId,gl_orderDetailId,gl_page);
	}

	gl_delFlg =  '' ; 
	gl_itemId =  '' ; 
	gl_orderDetailId =  '' ; 
	gl_page =  '' ; 
	gl_docid =  '' ; 
	closeDiv('deldompopup');
}

function editDomAddonDet(delFlg,itemId,orderDetailId,page)
{
        if(page == 'allItms')
        {
            divFlg = 1;
            closeDiv('mrOrder');
        }
	$("#itemid").val(itemId);
	$("#orderDetailId").val(orderDetailId);

	$("#delFlg").val(delFlg);
	if(delFlg)
	{
		addDomOrderDetail(orderDetailId,delFlg,page,itemId);
	}
	else
	{
		updateDetail(orderDetailId,delFlg,page,itemId);
	}
}

function updateDetail(delFlg,itemId,docId,product_id,page,item_type,evt){
	var selqty = '';
	var selname = '';
	var newPrice = '';
	var selPrice = '';
	gl_itemId = itemId;

	if(page == 'allItms'){
		divFlg = 1;

	selqty = $('#selQtyupd_'+itemId).val();
	selname = '#selQtyupd_'+itemId;
	selPrice = $('#selQtyprice_'+itemId).val();
	} else {
	selqty = $('#selQty_'+itemId).val();
	selname = '#selQty_'+itemId;
	selPrice = $('#price_'+itemId).val();
	}

	var charCode = (evt.which) ? evt.which : event.keyCode;

	if (charCode != 8 && (charCode < 48 || charCode > 57) && (charCode< 96 || charCode > 105)){

               extractNumber(selname,selqty,0,false);
                return false;
            }

		newPrice = selqty * selPrice;

	//if ( !(charCode != 8 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105))) {

	$.ajax({
		url:WEBROOT+"functions/ajxDomAddOrderDetail.php",
		type: "post",
		data :{
			item_id:itemId,
			quantity:selqty,
			docid:docId,
			delFlg:delFlg,
			product_id:product_id,
			item_type:item_type,
			newPrice:newPrice
		},
		success: function (result){
			tempArr = result.split("|~$~|");

			itmContent = tempArr[1];
			priceContent = tempArr[3];
			mnmContent = tempArr[5];

			$("#itms").empty().html(itmContent);
			if(page == 'allItms')
			{
			viewAllDomItms();
			divFlg = 0;
				}
			}
		});
	//}
}
function updatepizzaDetail(delFlg,citem_id,docId,itemId,orderDetailId,page){
	if(page == 'allItms'){
            divFlg = 1;
            closeDiv('mrOrder');
        }

		gl_itemId = itemId;
		//var citem_id = itemId;
		$('#itemid').val(itemId);
		var selqty = $('#selQty_'+itemId).val();

	addonDomDetail(orderDetailId,delFlg,page,itemId,citem_id);
}

function calculate_domcrust(addonId,type,itmId){

	var price_addon = 0;
	var addon_cbox_id_price = 0;
	var addon_cbox_id_pirce = 0;
	var innerHTML = '';

    if(addonId)
    {

	  if(type == 'radio')
	  {
		$('.size_'+itmId).children('.sizes').hide();
		$('.size_'+addonId+'_'+itmId).show();

		$('.iout_'+itmId).find("input:radio:checked").prop('checked',false);

		$('.naddon_'+itmId).find("input:checkbox:checked").prop('checked',false);

		$('input:radio[name="addonsize_radio'+addonId+'_'+itmId+'"]')[0].checked = true;

		$('.topp_'+itmId).hide();
		$('.topp_'+addonId+'_'+itmId).show();

		$('.topp').each(function(){
			if($(this).attr('id').toLowerCase().indexOf("_"+itmId+"_"+addonId+"_") >= 0 ){
				$(this).show();
				return false;
				}
			});
		}
	}
	$('.iout_'+itmId).find(':radio').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				var addon_cbox_id = $(this).attr('id');
				addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
				price_addon += parseFloat(addon_cbox_id_pirce);
			}
		}
		)
	$('.naddon_'+itmId).find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_price);
        }
    })
	var totprice = parseFloat($('#totitemPrice_id').val()) + parseFloat(price_addon);

	if(parseFloat($('#totitemPrice_id_'+itmId).val()) > 0){

		innerHTML = "<b></b><span class='rs'></span>"+price_addon.toFixed(2);

        $("#priceCont_"+itmId).html(innerHTML);
		innerHTML = price_addon.toFixed(2);
        $("#itmTotal_"+itmId).html(innerHTML);

	}

	var totprice = parseFloat(price_addon) * $('#item_qty_'+itmId).val();
    $('#grybox_total_price').empty().html((totprice * $('#item_qty_'+itmId).val() ).toFixed(2));
    $("#img").css("display","inline-block");
	$("#itemName").removeClass("title1");
	$("#itemName").addClass("title");

	innerHTML = "<b></b><span class='rs'></span>"+totprice.toFixed(2);

	$("#priceCont_"+itmId).html(innerHTML);
    $("#itmTotal_"+itmId).html(totprice.toFixed(2));

	var servTax = (isNaN(parseFloat($("#tax").text()))) ? 0 : parseFloat($("#tax").text());

    var total = 0;

    total = parseFloat(totprice) + parseFloat(servTax);
    total = parseFloat(total);
    total = total.toFixed(2);

    var sum=0;
    $('.itmTotal').each(function(i){
    var currentElement = $(this);
    var value = parseFloat(currentElement.text());
    sum = parseFloat(sum) + parseFloat(value);
    sum = sum.toFixed(2);
	});

    $("#sbttl").text(sum);

    var itemIdArr = {};
    var qtyFlg = true;

	var itemDtlLen = itemDtl.length;

	for(var i=0; i < itemDtlLen; i++)
	{
		var addonid = '';
		var naddonid = '';
		var crustid = '';
		var crustname = '';
		var sizename = '';
		var toppingname = '';

		$('.ioutcrust_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					crustid += $("#"+$(this).attr('id')).val()+',';
					crustname += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			crustid = crustid.slice(0, -1);

			$('.iout_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					var values = $("#"+$(this).attr('id')).val();
					value=values.split('_');
					addonid += value[1]+',';
					sizename += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			addonid = addonid.slice(0, -1);

			$('.naddon_'+itemDtl[i]).find(':checkbox').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					naddonid += $("#"+$(this).attr('id')).val()+',';
					toppingname += $("#"+$(this).attr('id')).next('label').text()+',';
				}
			})

			naddonid = naddonid.slice(0, -1);

				itemIdArr[i] = {};
				itemIdArr[i]['item_id'] = itemDtl[i];
				itemIdArr[i]['product_id'] = pizzaid[i];
				itemIdArr[i]['crust_type'] = crustid;
				itemIdArr[i]['crust_size_type'] = addonid;
				itemIdArr[i]['topping'] = naddonid;
				itemIdArr[i]['crust_size'] = sizename;
				itemIdArr[i]['crust_name'] = crustname;
				itemIdArr[i]['topping_name'] = toppingname;
				itemIdArr[i]['quantity'] = $("#item_qty_"+itemDtl[i]).val();
				itemIdArr[i]['price'] = $("#itmTotal_"+itemDtl[i]).text();

            if(parseInt($("#item_qty_"+itemDtl[i]).val()) < 1 || $.trim($("#item_qty_"+itemDtl[i]).val()) == '')
            {
               $("#item_qty_"+itemDtl[i]).focus();
               focusId = "item_qty_"+itemDtl[i];
               qtyFlg = false;
               break;
            }
		}

		if(!qtyFlg){
			openDiv('qtyVld');
			return false;
		}

		$.post(WEBROOT+"functions/taxcalculate.php",{
        docid:$("#docid").val(),
        dataToSend:itemIdArr
    }, function(results){

		taxes = '';
		netPrice = '';
		totalPrice = '';
		discount = '';

		taxes = results.data.tax;
		netPrice = results.data.netPrice;
		totalPrice = results.data.totalPrice;

		$("#tax").text(taxes);
		$("#tot").text(totalPrice);
		$("#totSmry").text(totalPrice);
		$("#sbttl").text(netPrice);

		discount = results.data.coupon.discount;
		$("#discount").text(discount);
	});

	}

function calculate_checked_price_domcrust(addonId,type,delFlg)
{
	var price_addon = 0;
    var addon_cbox_id_price = 0;
    var addon_cbox_id_pirce = 0;
    var selval = '';
    var crustFlg = $('#addon_crust_delFlag').val();

    if(addonId)
    {
	  if(type == 'radio')
	  {
		$('.sizes').each(function(){
			$(this).hide();
		});

		$('.size'+addonId).each(function(){
			$(this).show();
		});

		$('.iout').find("input:radio:checked").prop('checked',false);

		$('.naddon').find("input:checkbox:checked").prop('checked',false);

		if(crustFlg == 3){
			$(':radio[value="' + $('#addon_radio_selected_size').val() + '"]').attr('checked', 'checked');
			$("#addBtn").val("Update My Order");
		} else {
			$('input:radio[name="addonsize_radio'+addonId+'"]')[0].checked = true;
		}

		$('.topp').each(function(){
			$(this).hide();
		});

		if(crustFlg == 3){
			$('.topp').each(function(){
				if($(this).attr('id').toLowerCase().indexOf("_"+$('#addon_radio_selected_size').val()) >= 0 ){
					$(this).show();
					return false;
				}
			});

			} else {
			$('.topp').each(function(){
				if($(this).attr('id').toLowerCase().indexOf("_"+addonId+"_") >= 0 ){
					$(this).show();
					return false;
				}
			});
		}

		if(crustFlg == 3){
			$('.naddon').find(':checkbox').each(function(i)
			{
				if( $('#addon_radio_selected_topp').val().indexOf($(this).val()) >=0 )
				{
					$(this).attr('checked', 'checked');
				}
			})
		}
		if(crustFlg == 3){
			selval = $('#qty_selected').val();
			$("#item_qty").val(selval);
		} else {
			$("#item_qty").val(1);
		}
	}
	$('.iout').find(':radio').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				var addon_cbox_id = $(this).attr('id');
				addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
				price_addon += parseFloat(addon_cbox_id_pirce);
			}
		})

	$('.topp:visible .naddon').find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_price);
        }
    })
	var totprice = parseFloat($('#totitemPrice_id').val()) + parseFloat(price_addon);
    $('#grybox_total_price').empty().html((totprice * $('#item_qty').val() ).toFixed(2));
    $("#img").css("display","inline-block");
	$("#itemName").removeClass("title1");
	$("#itemName").addClass("title");
	}

	if(crustFlg == 3){
		$('#addon_crust_delFlag').val(0);
	}
}

function calculate_price_dom(addonId,type,checkedFlg,itmId,chkboxId){

	var price_addon_crust = 0;
	var price_addon_toppings = 0;
    var addon_cbox_id_price = 0;
    var addon_cbox_id_pirce = 0;
    var innerHTML = '';

    var priceArr = [];

    extractNumber('#item_qty_'+itmId,$('#item_qty_'+itmId).val(),0,false);

    if($('#item_qty_'+itmId).val() < 1 || $('#item_qty_'+itmId).val() > 100){
        return false;
    }

    if(addonId)
    {
		 if(type == 'radio')
        {
            $('.topp_'+itmId).each(function(){
				$(this).hide();
			});

            $("#addonTopp_"+itmId+"_"+addonId).show();
            price_addon = 0;

            $('.naddon_'+itmId).find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);
                }
            })
		}
	}

	$('.iout_'+itmId).find(':radio').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
            price_addon_crust += parseFloat(addon_cbox_id_pirce);
        }
    })

    $('.naddon_'+itmId).find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon_toppings += parseFloat(addon_cbox_id_price);
        }
    })

    var totprice = parseFloat(price_addon_crust) + parseFloat(price_addon_toppings);
    $('#grybox_total_price').empty().html((totprice * $('#item_qty').val()).toFixed(2));
    $("#img").css("display","inline-block");
	$("#itemName").removeClass("title1");
	$("#itemName").addClass("title");

	var totprice = parseFloat($('#totitemPrice_id_'+itmId).val());
    $('#grybox_total_price').empty().html((totprice * $('#item_qty_'+itmId).val()).toFixed(2));

    if(parseFloat($('#totitemPrice_id_'+itmId).val()) > 0){
        var itmPrice = parseFloat(price_addon_crust) + parseFloat(price_addon_toppings);
        var itmTot_crust = parseFloat(price_addon_crust).toFixed(2) * $('#item_qty_'+itmId).val();
        var itmTot_sides = parseFloat($('#priceContsides_'+itmId).val()).toFixed(2) * $('#item_qty_'+itmId).val();
        if(isNaN(itmTot_sides)){
			itmTot_sides = 0;
		}
        innerHTML += itmTot_crust;
        var itmTot_toppings = parseFloat(price_addon_toppings).toFixed(2) * $('#item_qty_'+itmId).val();
        
        innerHTML += itmTot_toppings;
        var itmTot = itmTot_crust + itmTot_toppings + itmTot_sides;
        itmTot = parseFloat(itmTot).toFixed(2);
        var itmTotsd = itmTot_crust + itmTot_sides;
        itmTotsd = parseFloat(itmTotsd).toFixed(2);

        innerHTML = "<b></b><span class='rs'></span>"+itmTotsd;
        if(price_addon_toppings != 0)
        innerHTML += "<br/><b>+</b><span class='rs'></span>"+itmTot_toppings.toFixed(2);

        $("#priceCont_"+itmId).html(innerHTML);
        innerHTML = itmTot;
        $("#itmTotal_"+itmId).html(innerHTML);
    }

	var sum=0;
    $('.itmTotal').each(function(i){
    var currentElement = $(this);
    var value = parseFloat(currentElement.text());
    sum = parseFloat(sum) + parseFloat(value);
    sum = sum.toFixed(2);
	});

    var priceArrLen = priceArr.length;
    for(var j=0;j < priceArrLen;j++)
    {
        var addonP = parseFloat(priceArr[j] * $('#item_qty_'+itmId).val());
        addonP = addonP.toFixed(2);
        if(addonP > 0){
        innerHTML += '<div> <b></b> <span class="rs"></span>'+addonP+'</div>';
        }
    }

    var subTotal = 0;
    var apsNaStr = '';

    var servTax = (isNaN(parseFloat($("#tax").text()))) ? 0 : parseFloat($("#tax").text());
	
    var total = 0;

    total = parseFloat(sum) + parseFloat(servTax); 
    total = parseFloat(total);
    total = total.toFixed(2);

    $("#sbttl").text(sum);

    var itemIdArr = {};
    var qtyFlg = true;

	var itemDtlLen = itemDtl.length;

	for(var i=0; i < itemDtlLen; i++)
	{
		var addonid = '';
		var naddonid = '';
		var crustid = '';
		var crustname = '';
		var sizename = '';
		var toppingname = '';
		var itemtype = '';

		$('.ioutcrust_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					crustid += $("#"+$(this).attr('id')).val()+',';
					crustname += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			crustid = crustid.slice(0, -1);

			$('.iout_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					var values = $("#"+$(this).attr('id')).val();
					value=values.split('_');
					addonid += value[1]+',';
					sizename += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			addonid = addonid.slice(0, -1);

			$('.naddon_'+itemDtl[i]).find(':checkbox').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					naddonid += $("#"+$(this).attr('id')).val()+',';
					toppingname += $("#"+$(this).attr('id')).next('label').text()+',';
				}
			})

			naddonid = naddonid.slice(0, -1);

				itemIdArr[i] = {};
				itemIdArr[i]['item_id'] = itemDtl[i];
				itemIdArr[i]['product_id'] = pizzaid[i];
				itemIdArr[i]['crust_type'] = crustid;
				itemIdArr[i]['crust_size_type'] = addonid;
				itemIdArr[i]['topping'] = naddonid;
				itemIdArr[i]['crust_size'] = sizename;
				itemIdArr[i]['crust_name'] = crustname;
				itemIdArr[i]['topping_name'] = toppingname;
				itemIdArr[i]['quantity'] = $("#item_qty_"+itemDtl[i]).val();
				itemIdArr[i]['price'] = $("#itmTotal_"+itemDtl[i]).text();

            if(parseInt($("#item_qty_"+itemDtl[i]).val()) < 1 || $.trim($("#item_qty_"+itemDtl[i]).val()) == '')
            {
               $("#item_qty_"+itemDtl[i]).focus();
               focusId = "item_qty_"+itemDtl[i];
               qtyFlg = false;
               break;
            }
		}

		if(!qtyFlg){
			openDiv('qtyVld');
			return false;
		}

		$.post(WEBROOT+"functions/taxcalculate.php",{
        docid:$("#docid").val(),
        dataToSend:itemIdArr
    }, function(results){

		taxes = '';
		netPrice = '';
		totalPrice = '';
		discount = '';

		taxes = results.data.tax;
		netPrice = results.data.netPrice;
		totalPrice = results.data.totalPrice;

		$("#tax").text(taxes);
		$("#tot").text(totalPrice);
		$("#totSmry").text(totalPrice);
		$("#sbttl").text(netPrice);

		if($("#item_count").val() == 'SIDES'){
			totalPrice = parseFloat(sum) + parseFloat(taxes);
			$("#sbttl").text(sum);
			$("#tot").text(totalPrice);
			$("#totSmry").text(totalPrice);
			$("#itemtotalsideprice").val(totalPrice);
		}

		if($("#coup_applied").val() == 'applied')
		{
			description = response.data.coupon.details;
			discount = response.data.coupon.discount;
			totalPrice = response.data.totalPrice;
			disDesp = "(-) Coupon Discount:";

			$("#descrip").text(description).addClass("svd-rs");
			$("#coup_discount").text(disDesp);
			$("#removeCoupons").addClass("cncl-btn-rd");
			$("#discount").text(discount).addClass("smry-discnt-rs");
		}
		else
		{
			$("#discount").empty();
			$("#coup_discount").empty();
			$("#descrip").empty();
		}
	});
}

function calculate_checked_price_dom(addonId,type,checkedFlg)
{
	var price_addon = 0;
    var addon_cbox_id_price = 0;
    var addon_cbox_id_pirce = 0;

    if(addonId)
    {
		 if(type == 'radio')
        {
            $('.topp').each(function(){
				$(this).hide();

            });
            $("#addonTopp_"+addonId).show();
            price_addon = 0;

            $('.naddon').find(':checkbox').each(function(i)
            {
                if( $(this).is(":checked") )
                {
                    $(this).prop('checked', false);
                }
            })
		}
	}

	$('.iout').find(':radio').each(function(i)
    {    
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_pirce = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_pirce);
        }
    }
    )

    $('.naddon').find(':checkbox').each(function(i)
    {
        if( $(this).is(":checked") )
        {
            var addon_cbox_id = $(this).attr('id');
            addon_cbox_id_price = $("#"+addon_cbox_id+"_price").val();
            price_addon += parseFloat(addon_cbox_id_price);
        }
    })

    var totprice = parseFloat($('#totitemPrice_id').val()) + parseFloat(price_addon);

    $('#grybox_total_price').empty().html((totprice * $('#item_qty').val() ).toFixed(2));
    $("#img").css("display","inline-block");
	$("#itemName").removeClass("title1");
	$("#itemName").addClass("title");
}

function DomcustomizeOrder(itmId){

	if(checkOutAjx == 1)
	{
		return;
	}

	_ct('domsubmit','domordsum','4194304');

	if($('#itemcheckcount').val() != 'proceed'){
		if($('#itemtotalsideprice').val() < 400){
		openDiv('sides_error');
		return false;
		}
	}

	var itemvalprice = parseInt($('#tot').text());

	if(itemvalprice > 3000){
		alert('For cash on delivery maximum order of Rs. 3000 is allowed');
		return false;
	}

	var itemIdArr = {};
    var qtyFlg = true;

	var itemDtlLen = itemDtl.length;

	for(var i=0; i < itemDtlLen; i++)
	{
		var addonid = '';
		var naddonid = '';
		var crustid = '';
		var crustname = '';
		var sizename = '';
		var toppingname = '';

		$('.ioutcrust_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					crustid += $("#"+$(this).attr('id')).val()+',';
					crustname += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			crustid = crustid.slice(0, -1);

			$('.iout_'+itemDtl[i]).find(':radio').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					var values = $("#"+$(this).attr('id')).val();
					value=values.split('_');
					addonid += value[1]+',';
					sizename += $("#"+$(this).attr('id')).next('label').text();
				}
			})

			addonid = addonid.slice(0, -1);

			$('.naddon_'+itemDtl[i]).find(':checkbox').each(function(i)
			{
				if( $(this).is(":checked") )
				{
					naddonid += $("#"+$(this).attr('id')).val()+',';
					toppingname += $("#"+$(this).attr('id')).next('label').text()+',';
				}
			})

			naddonid = naddonid.slice(0, -1);

				itemIdArr[i] = {};
				itemIdArr[i]['item_id'] = itemDtl[i];
				itemIdArr[i]['product_id'] = pizzaid[i];
				itemIdArr[i]['crust_type'] = crustid;
				itemIdArr[i]['crust_size_type'] = addonid;
				itemIdArr[i]['topping'] = naddonid;
				itemIdArr[i]['crust_size'] = sizename;
				itemIdArr[i]['crust_name'] = crustname;
				itemIdArr[i]['topping_name'] = toppingname;
				itemIdArr[i]['quantity'] = $("#item_qty_"+itemDtl[i]).val();
				itemIdArr[i]['price'] = $("#itmTotal_"+itemDtl[i]).text();
				itemIdArr[i]['sub_total'] = $('#sbttl').text();
				itemIdArr[i]['total'] = $('#tot').text();
				if($("#tax").text() != 'undefined' && $("#tax").text() !='')
				{
					itemIdArr[i]['tax'] = $("#tax").text();
				}
				else
				{
					itemIdArr[i]['tax'] = 0;
				}
				if($("#discount").text() != 'undefined' && $("#discount").text() !='')
				{
					itemIdArr[i]['coup_discount'] = $("#discount").text();
				}
				else
				{
					itemIdArr[i]['coup_discount'] = 0;
				}

            if(parseInt($("#item_qty_"+itemDtl[i]).val()) < 1 || $.trim($("#item_qty_"+itemDtl[i]).val()) == '')
            {
               $("#item_qty_"+itemDtl[i]).focus();
               focusId = "item_qty_"+itemDtl[i];
               qtyFlg = false;
               break;
            }
		}

		if(!qtyFlg){
			openDiv('qtyVld');
			return false;
		}

		checkOutAjx = 1;

		$.post(WEBROOT+"functions/DomCustomizeOrder.php",{
		docid:$("#docid").val(),
		dataToSend:itemIdArr
	}, function(result){
		if(result){
			if(itmId){
				checkOutAjx = 0;
				var HREF = baseurl+'/checkoutorder?t=2';
				window.location.href = HREF;
			} else {
				window.location.reload();
			}
		}
	});
}

function addDomOrderDetail(orderDetailId,delFlg,page,itemId,itemName,citem_id,itemType){

	var addonid = '';
	var naddonid = '';
	var crustid = '';
	var compulsory_cnt = $('#compulsory_cntr').val();
	var itemaddprice = $('#grybox_total_price').html();

	_ct('domaddtomyord',lnk_loc, '4194304');

	for(i=0; i < compulsory_cnt; i++)
    {
        var Stype    = $('#compulsory_addon_Stype_'+i).val();
        var addoName = $('#compulsory_addon_name_'+i).val();
        var range    = $('#compulsory_counter_'+i).val().split("-");
        var start_range = range['0'];
        var end_range = range['1'];
        var cflag = false;

        for(var j= parseInt(start_range); j < parseInt(end_range) ; j++ )
        {
            if( Stype == 'S' )
            {
                if( $('#addon_radio_'+j).is(':checked') )
                {
                    cflag = true;
                    break;
                }
            }
            else if( Stype == 'M' )
            {
                if( $('#addon_checkbox_'+j).is(':checked') )
                {
                    cflag = true;
                    break;
                }
            }
        }

        if( !cflag )
        {
            alert("Please select alteast one  addon from "+ addoName +" ");
            return false;
        }
    }
    if($('#grybox_total_price').text() || delFlg!='')
	{
		$('.ioutcrust').find(':radio').each(function(i)
		{    
			if( $(this).is(":checked") )
			{
				crustid += $("#"+$(this).attr('id')).val()+',';
			}
		})

		crustid = crustid.slice(0, -1);
		
		$('.iout').find(':radio').each(function(i)
		{    
			if( $(this).is(":checked") )
			{
				var values = $("#"+$(this).attr('id')).val();
				value=values.split('_');
				addonid += value[1]+',';
			}
		})

		addonid = addonid.slice(0, -1);

		$('.naddon').find(':checkbox').each(function(i)
		{
			if( $(this).is(":checked") )
			{
				naddonid += $("#"+$(this).attr('id')).val()+',';
			}
		})	

		naddonid = naddonid.slice(0, -1);
		
		var orderId  = '';

		if(addCart == 1)
		{
			return;
		}

		addCart = 1;

		if($.trim(getCookie('orderId_'+MDOCIDJ)) == ''){
	   
			$.post(WEBROOT+"functions/ajxGenOrderId.php",function(res){
				
			if(res)
			{
				var tmpAr = res.split("|~|");
                    orderId = tmpAr[0];
                    var now = new Date();
                    var time = now.getTime();
                    time += 3600 * 1000;
                    now.setTime(time);
                    document.cookie = 
                        'orderId_'+MDOCIDJ+'=' + escape(tmpAr[0]) + 
                        '; expires=' + now.toGMTString() + 
                        '; path=/' +
                        '; domain='+cookieondomain;
                    document.cookie = 
                        'inittm=' + escape(tmpAr[1]) + 
                        '; expires=' + now.toGMTString() + 
                        '; path=/' +
                        '; domain='+cookieondomain;

					$.post(WEBROOT+"functions/ajxDomAddOrderDetail.php",{
                        docid:$("#docid").val(),
                        //itemid:domid,
                        addonId:addonid,
                        naddonId:naddonid,
                        Instruction:$("#instruction").val(),
                        orderDetailId:orderDetailId,
                        delFlg:delFlg,
                        orderId:orderId,
                        item_type:itemType,
                        product_id:itemId,
                        crust_type:crustid,
                        crust_size_type:addonid,
                        topping:naddonid,
                        quantity:$('#item_qty').val(),
                        item_name:itemName,
                        item_id:itemId,
                        itemaddprice:itemaddprice,
                        timeStamp: new Date().getTime()
                    }, function(result){
						addCart = 0;
						if(typeof page != 'undefined' && page == 'checkout'){
						location.reload();
						}

						tempArr = result.split("|~$~|");

						itmContent = tempArr[1];
						priceContent = tempArr[3];
						mnmContent = tempArr[5];
                                                
						if($.trim(mnmContent) == '1')
						{
							$("#chkoutBtn").removeClass('addsbl');
							$("#chkoutBtn").show();
							$('#chkoutBtn').click(redirectToDomSmry);
						} else if($.trim(mnmContent) == '0'){
							 $("#chkoutBtn").addClass('addsbl');
							 $("#chkoutBtn").show();
							 $('#chkoutBtn').attr('onclick','').unbind('click');
						} else {
								$("#chkoutBtn").hide();
							}
						closePopUp('ordSummry');

						$("#itms").empty().html(itmContent);
                        $("#mnDlvChrg").text($("#mnDlv").val());
						$(".edtdlvry").show();

						if(typeof priceContent == 'undefined'){
							$("#priceCont").hide();
							$("#itmCont").addClass('idtlb');
						}

						 $("#itmCont").removeClass('idtlb');
						 if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){

							$("#chkoutBtn").removeClass('addsbl');
							$("#chkoutBtn").show();
							$('#chkoutBtn').click(redirectToDomSmry);
							$('span.ordr').hide();
							 if(tab == 'tblchkout'){
								$(".addmfy input").removeClass('addsbl');
								$('.addmfy input').click(redirectToDomSmry);
								if(typeof mnmContent == 'undefined'){
								$("#chkoutBtn").hide();
								}
							}
						} else {
							$('span.ordr').show();
						}

						if(tab == 'tblchkout'){
						$("#edtdla").hide();
						$("#chkoutBtn").val('Pre Order');
						$(".addmfy input").val('Pre Order');
						}
					});
				}
			});
		}
		else
		{
			orderId = getCookie('orderId_'+MDOCIDJ);
            $.post(WEBROOT+"functions/ajxDomAddOrderDetail.php",{
                        docid:$("#docid").val(),
                        //itemid:domid,
                        addonId:addonid,
                        naddonId:naddonid,
                        Instruction:$("#instruction").val(),
                        orderDetailId:orderDetailId,
                        delFlg:delFlg,
                        orderId:orderId,
                        item_type:itemType,
                        product_id:itemId,
                        crust_type:crustid,
                        crust_size_type:addonid,
                        topping:naddonid,
                        quantity:$('#item_qty').val(),
                        item_name:itemName,
                        item_id:itemId,
                        citem_id:citem_id,
                        itemaddprice:itemaddprice,
                        timeStamp: new Date().getTime()
                    }, function(result){

						addCart = 0;

					if(typeof page != 'undefined' && page == 'checkout'){
						location.reload();
					}
					tempArr = result.split("|~$~|");

					itmContent = tempArr[1];
					priceContent = tempArr[3];
					mnmContent = tempArr[5];

					if($.trim(mnmContent) == '1') {
						$("#chkoutBtn").show();
						$("#chkoutBtn").removeClass('addsbl');
						$('#chkoutBtn').click(redirectToDomSmry);
					} else if($.trim(mnmContent) == '0'){
						$("#chkoutBtn").addClass('addsbl');
						$("#chkoutBtn").show();
						$('#chkoutBtn').attr('onclick','').unbind('click');
					} else {
						$("#chkoutBtn").hide();
					}

					closePopUp('ordSummry');
					$("#itms").empty().html(itmContent);
					$("#mnDlvChrg").text($("#mnDlv").val());

					if(typeof priceContent == 'undefined'){
						$("#priceCont").hide();
						$("#itmCont").addClass('idtlb');
					}
					$(".edtdlvry").show();
					$(".cnlprod").show();
                    $("#itmCont").removeClass('idtlb');

				if( $('.APS').length > 0 || $('.itmNA').length > 0 || tab == 'tblchkout'){

					$("#chkoutBtn").removeClass('addsbl');
					$("#chkoutBtn").show();
					$('#chkoutBtn').click(redirectToDomSmry);
					$('span.ordr').hide();
					if(tab == 'tblchkout'){
						$(".addmfy input").removeClass('addsbl');
						$('.addmfy input').click(redirectToDomSmry);
						if(typeof mnmContent == 'undefined'){
						$("#chkoutBtn").hide();
						}
					}
				} else {
					$('span.ordr').show();
				}

				 if($("#mrOrder").is(':visible')){
				 viewAllDomItms();
				 }

				if(tab == 'tblchkout'){
				$("#edtdla").hide();
				$("#chkoutBtn").val('Pre Order');
				$(".addmfy input").val('Pre Order');
				}
			});
		}

		closeDiv('addon_popup');

		} else {
		alert("Please select atleast one option");
		}
        
        if(page == 'allItms')
        {
            viewAllDomItms();
            divFlg = 0;
        }
	}

function validateDomVCode(){

	if(isNaN($('#smsdomvcode').val()) || $('#smsdomvcode').val() == ''){
		document.getElementById("vdomerror").style.display = 'block';
		return false;
	}
	if(ver_msg != $('#smsdomvcode').val()){
		document.getElementById("vdomerror").style.display = 'block';
		return false;
	}
		var domcookieid = $.trim($('#domId').val());
		var dominos = 'dominos';
		var verify = 'verify';

    var cas = '2';
    var name = $.trim($('#txtName').val());
	var bldg = $.trim($('#txtbldg').val());
    var location = $.trim($('#txtLocation').val());
    if($("#txtPin").is('input')){
		var pincode = $.trim($('#txtPin').val());
	}
	else{
		var pincode = $('#txtPin :selected').val();
	}
    var landmark = $.trim($('#txtLandmark').val());
    var area = $.trim($('#chkoutArea').val());
    var email = $.trim($('#txtEmail').val());
    var mobile = $.trim($('#txtMobile').val());
    var stdcode = $.trim($('#txtLandstd').val());
    var landline = $.trim($('#txtLandnum').val());
    var addrId = $.trim($('#hdnAddrId').val());
    var addDocid = (vertical=='shopfront')? $('#docid').val() : MDOCIDJ;
    var addrciti = $.trim($('#addrciti').val());

    $.ajax({
        url: WEBROOT + "functions/address.php",
        type: "POST",
        dataType:"json",
        data : {
            'name' : name, 
            'bldg' : bldg, 
            'location' : location, 
            'pincode' : pincode , 
            'landmark' : landmark,
            'area' : area , 
            'email' : email, 
            'mobile' : mobile,
            'addrId' : addrId, 
            'docid' : addDocid,
            'vertical' : vertical,
            'landline' : landline,
            'stdcode' : stdcode,
            'city' : addrciti,
            'timeStamp': new Date().getTime(),
			'dominos' : dominos,
            'domdocId' : $('#docid').val(),
            'domcity' : $('#city').val(),
            'verify' : verify,
            'verify_code' : $('#smsdomvcode').val()
                },
        success : function(response)
        {
			if(response['results']['errorCode'] == '1'){
				HREF = baseurl+'/checkoutorder?t=8';
					window.location.href = HREF;
					return false;
			  }

              if(response['results']['errorCode'] == '0')
			  {
				$('#btnSubmit').removeAttr("disabled");
				document.cookie = 'addr_'+MDOCIDJ+'=1;'+date+'; path=/; domain=' + cookieondomain;                
				window.location.href = baseurl+'/checkoutorder?t=4';
			}
		}
	});
}

function filterdommenu(element){

	var value = $.trim($("#filterDomBox").val());
	value = value.replace(/\s+/g, "").toLowerCase();
	value = value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,"");
	
	$(".mnuitm").hide();
    $("li").each(function () {
	if ($(this).prop('id').indexOf(value) > -1) {
		$(this).parent().parent().parent().show();
		$(this).show();
	} else {
		$(this).hide();
		}
	});
}

function redirectToDomSmry(){

	if(checkAjx == 1)
	{
		return;
	}

	var itemvalprice = parseInt($('#itemvalprice').text());
	var itemvalpriceview = parseInt($('#itemvalpriceview').text());
	_ct('domchkout','dommenu','4194304');

	if(itemvalprice > 3000 || itemvalpriceview > 3000){
		alert('For cash on delivery maximum order of Rs. 3000 is allowed');
		return false;
	}
	checkAjx = 1;
	$.ajax({
        url: WEBROOT + "functions/addtoDomCart.php",
        type: "POST",
        dataType:"json",
        data : {
			'docid':$('#docid').val(),
			'domid': $.trim($('#domId').val())
		},
		success : function(response){

		checkAjx = 0;

		var HREF = baseurl+'/checkoutorder?t=7';

		window.location.href = HREF;
		}
	});
}

function toggleDomCont(id){

	var tempArr = id.split("_");

	if($.trim(tempArr[0]) == 'itm'){

            if($("#ico_"+tempArr[1]).hasClass("domaddicon"))
            {
                $("#ico_"+tempArr[1]).addClass('domaddicondis');
                $("#ico_"+tempArr[1]).removeClass('domaddicon');
            }

            else
            {
                $("#ico_"+tempArr[1]).addClass('domaddicon');
                $("#ico_"+tempArr[1]).removeClass('domaddicondis');
            }
        }

        $("#"+id).toggle();
	}

function removeRedeemDomCoupons()
{
	var redeemName = $("#promocodeinp").val();
	var removeCoupons = 'removeCoupons';
	var redDocid = MDOCIDJ;

	$.ajax({
		url: WEBROOT + "functions/redeemDomCoupons.php",
		type: "POST",
		dataType:"json",
		data : {
			'redeemName' : redeemName,
			'docid' : $("#docid").val(),
			'countOfItems': $("#countOfItems").val(),
			'removeCoupons': removeCoupons,
		},
		success:function(response){

			if(response.remove ==1)
			{
				if(response.data.countofNewItems < $("#countOfItems").val()){
					location.reload();
				}

				totalPrice = response.data.totalPrice;
				taxes = response.data.tax;
				netPrice = response.data.netPrice;

				$("#descrip").text('').removeClass("svd-rs");
				$("#coup_discount").text('');
				$("#discount").text('').removeClass("smry-discnt-rs");
				$("#removeCoupons").removeClass("cncl-btn-rd");
				$("#removeCoupons1").removeClass("cncl-btn-rd");
				$("#tot").text(totalPrice);
				$("#sbttl").text(netPrice);
				$("#totSmry").text(totalPrice);
				$("#tax").text(taxes);
				return false;
			}
		}
	});
}

function redeemDomCoupons(){

	_ct('domredeem','domordsum','4194304');

	var redeemName = $("#promocodeinp").val();
	var redDocid = MDOCIDJ;
	if($("#promocodeinp").val() == '' || $("#promocodeinp").val() == 'Enter Promo Code'){
	openDiv('dom_error_popup');
	return false;
	}

	$.ajax({
		url: WEBROOT + "functions/redeemDomCoupons.php",
		type: "POST",
		dataType:"json",
		data : {
			'redeemName' : redeemName,
			'docid' : $("#docid").val(),
			'countOfItems': $("#countOfItems").val()
		},
		success:function(response){

			if(response.data.status == 0){
				openDiv('invalid_popup');
				return false;
			}

			if(response.data.status == 1){
				alert('A coupon can be redeemed only thrice in a particular order');
				return false;
			}

			if(response.data.status == 2){
				openDiv('dom_error_popup');
				return false;
			}

			if(response.data.countofNewItems > $("#countOfItems").val()){
				location.reload();
			}

				openDiv('success_popup');
				taxes = '';
				netPrice = '';
				totalPrice = '';
				discount = '';
				taxes = response.data.tax;
				netPrice = response.data.netPrice;
				description = response.data.coupon.details;
				discount = response.data.coupon.discount;
				totalPrice = response.data.totalPrice;
				disDesp = "(-) Coupon Discount:";

				$("#tax").text(taxes);
				$("#tot").text(totalPrice);
				$("#totSmry").text(totalPrice);
				$("#descrip").text(description).addClass("svd-rs");
				$("#coup_discount").text(disDesp);
				$("#removeCoupons").addClass("cncl-btn-rd");
				$("#discount").text(discount).addClass("smry-discnt-rs");
				$("#coup_applied").val("applied");
		}
	});
}

window.setInterval(function(){
	var bnr_cnt	=	parseInt($("#bancount").val());
	if(bnr_cnt > 1)
	{
		var banactive = parseInt($("#banactive").val());
		$("#banner_"+banactive).hide();

		if(bnr_cnt == banactive)
		{
			$("#banner_"+1).show();
			$("#banactive").val(1);
		}
		else
		{
			$("#banner_"+(banactive+1)).show();
			$("#banactive").val((banactive+1));
		}
	}
}, 30000);


/************************ DOMINOS JAVASCRIPT FUNCTIONS ENDS ********************************/
function map_contract_list()
{
	var a = $('#restinw').offset();
	$('html, body').animate({scrollTop: a.top}, 800);
} 

 function showhidemoreadd(i, url, action, tipty) {
	if(!touchy && (action == 'over' || action == 'out'))
	{
		if(tipty && tipty == 'rphvre')
		{
			if($('#rphvdisp'+i).hasClass('dn') == true) {
				$('#rphvdisp'+i).removeClass('dn');
			} else {
				$('#rphvdisp'+i).addClass('dn');
			}
		}
		else
		{
			if($('#morehvr_add_cont'+i).hasClass('dn') == true) {
				$('#morehvr_add_cont'+i).removeClass('dn');
			} else {
				$('#morehvr_add_cont'+i).addClass('dn');
			}
		}
	}
	
	if(touchy && action == '') {
		if(tipty && tipty == 'rphvre')
		{
			if($('#rphvdisp'+i).hasClass('dn') == true) {
				$('#rphvdisp').addClass('dn');
				$('.rphvr').css('color', '#1274c0');
				$('#rphvdisp'+i).removeClass('dn');
				$('#rphvr'+i).css('color', '#ff6c00');
				$('#rphvdisp'+i).css('color', '#ffffff');
			} else {
				$('#rphvdisp'+i).addClass('dn');
				$('#rphvr'+i).css('color', '#1274c0');
			}
		}
		else
		{
			if($('#morehvr_add_cont'+i).hasClass('dn') == true) {
				$('.mrehover').addClass('dn');
				$('.morehvr').css('color', '#1274c0');
				$('#morehvr_add_cont'+i).removeClass('dn');
				$('#morehvr_add'+i).css('color', '#ff6c00');
				$('#morehvr_add_cont'+i).css('color', '#ffffff');
			} else {
				$('#morehvr_add_cont'+i).addClass('dn');
				$('#morehvr_add'+i).css('color', '#1274c0');
			}
		}
	} else if(action == '') {
		if(window.event) {//IE 6
			window.event.returnValue = false;
			if(!tipty)
				window.location = url;
				
			return false;
		}else if(!tipty) {//firefox
			window.location = url;
		}
	}
}

$(document).on("touchstart", function(e) {
	var target = $(e.target);
	var linkid = /^morehvr_add_cont[0-9]{1,2}$/;
	var linkid2 = /^rphvdisp[0-9]{1,2}$/;
	if(target.context.id == '') {
		if(!linkid.test(target.context.firstElementChild.id)) {
			$('.mrehover').addClass('dn');
			$('.rphvr').css('color', '#1274c0');
		}
		if(!linkid2.test(target.context.firstElementChild.id)) {
			$('.rshover').addClass('dn');
			$('.morehvr').css('color', '#1274c0');
		}
	}
});

/*
var b = $('html');
$('.prevord').hover(function() {
    var s = b.scrollTop();    
    b.css('overflow', 'hidden');
    b.scrollTop(s);
}, function() {
    var s = b.scrollTop();   
    b.css('overflow', 'auto');
    b.scrollTop(s);
});
*/
function Prv_Ordr_toggle(ids)
{
    if(ids == 'divdate')
    {   
	$('#itmbtn').removeClass('seltab');
        $('#dtbtn').addClass('seltab');
        $("#divitm").hide();
        $("#divdate").show();
        //if($('.dte_itms').is(':visible')){
       //var element = $('#divdate').find('.dte_itms');
       //if($('.dte_itms').css('visibility') != 'hidden'){
        //if(element.is(':visible')){
            $('.dte_itms').hide();   
            $("#datelist").show();
            $("#scroll_prev_div").getNiceScroll().remove();
            var oid =  $('#dteid').val();
            $('#dte_itms_lst_'+oid).getNiceScroll().remove();
            var touch_param = false;
            if(touchy){
                touch_param = true;
            }else{
                touch_param = false;
            }
                  $("#scroll_prev_div_2").niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });            
    }else{
        var touch_param = false;
        if(touchy){
            touch_param = true;
        }else{
            touch_param = false;
        }
        $('#dtbtn').removeClass('seltab');
        $('#itmbtn').addClass('seltab');
        $("#divdate").hide();
        $("#divitm").show();
        $("#scroll_prev_div_2").getNiceScroll().remove();
                 $("#scroll_prev_div").niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });        
    }
}
function showprevdetail(oid)
{   
	if($('#itmdate_'+oid).css('display') != 'none'){
		$('#itmdate_'+oid).hide();
		$('#itmdate_icn_'+oid).removeClass('addicon_inner');
		$('#itmdate_icn_'+oid).addClass('addicondis_inner');
		
	}else{
		$('#itmdate_'+oid).show();
		$('#itmdate_icn_'+oid).addClass('addicon_inner');
		$('#itmdate_icn_'+oid).removeClass('addicondis_inner');
	}
    
/*    $('.dte_itms').hide();
    $('#dteid').val(oid);
    $("#datelist").hide();
    $('#itmdate_'+oid).show();
    var touch_param = false;
    if(touchy){
        touch_param = true;
    }else{
        touch_param = false;
    }
    $("#scroll_prev_div_2").getNiceScroll().remove();
      $('#dte_itms_lst_'+oid).niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });    
                */
}
function togglePrevOrder(id)
{  
	if(id == 'itm'){
	    $("#prv_div_itm").show();
  	    $("#prv_div_dte").hide();      	
        $("#prv_tab_itm").addClass('act');
        $("#prv_tab_dte").removeClass('act');  	    
	}else{
        $("#prv_tab_itm").removeClass('act');
        $("#prv_tab_dte").addClass('act');
	    $("#prv_div_itm").hide();
  	    $("#prv_div_dte").show();      
    }      	
	 /*if(id != 'main'){
        if($("#"+id).is(":visible")){
            $("#"+ id +'_arw').addClass('rgtrw');
        }else{
            $("#"+ id + '_arw').removeClass('rgtrw');
        }
        $("#"+id).toggle(150);        
    
    }else{
        if($("#prev_tabs").is(":visible")){
            $("#hstico_plus").show();
            $("#hstico_minus").hide();
            $("#scroll_prev_div").getNiceScroll().remove();
            var oid =  $('#dteid').val();
            $('#dte_itms_lst_'+oid).getNiceScroll().remove();
            $("#scroll_prev_div_2").getNiceScroll().remove();
        }else{
            $("#hstico_plus").hide();
            $("#hstico_minus").show();
        }
        $("#prev_divs").toggle(150);
        $("#prev_tabs").toggle(150);
        if($("#prev_tabs").is(":visible")){
            var delay=150;//1 seconds
            setTimeout(function(){

            //your code to be executed after 1 seconds
            var touch_param = false;
            if(touchy){
                touch_param = true;
            }else{
                touch_param = false;
            }     
            if($("#divitm").is(":visible")){
                $("#scroll_prev_div").niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });                   
            }
            if($("#datelist").is(":visible")){
                $("#scroll_prev_div_2").niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });                   
            }
               var oid =  $('#dteid').val();
            
            if($('#dte_itms_lst_'+oid).is(":visible")){
                $('#dte_itms_lst_'+oid).niceScroll({
                    touchbehavior:touch_param,
                    cursorcolor:"#000",
                    cursoropacitymax:0.7,
                    cursorwidth:6,
                    background:"#ccc",
                    autohidemode:false,
                    nativeparentscrolling:false,
                    horizrailenabled:false
                });                   
            }
            },delay);
        }
   }    */
}
function toggleMstOrder(id)
{       
    if(!$("#mst_ord_div").is(":visible")){
        $("#mst_ord_div_plus").show();
        $("#mst_ord_div_minus").hide();
    }else{
        $("#mst_ord_div_plus").hide();
        $("#mst_ord_div_minus").show();
    }
    $("#"+id).toggle(150);        
}    

function repeat_date_order(order_date)
{   //alert(WEBROOT+"functions/ajxReorder.php");
    var dataArr = [];
    $.ajax({
       url:WEBROOT+"functions/ajxReorder.php", 
       type: "post",
       dataType: "json",
       cache: false,
       data :{
         docId: $("#docid").val(),
         type:'repeat_date',
         mobile: $.trim(getCookie('inLogMobile'))
       },
       async:false, 
       success:function(res){ 
             $.each(res.results, function(i, val) { 
               if(i == order_date){
                $.each(val, function(i2, val2) {
                  var arr = {};
                  arr['orderid'] = val2.oid.toString();
                  arr['itemid'] = val2.id.toString();
                  dataArr.push(arr);
                });
               }
            });
       }
    }); 
    if(typeof dataArr !== 'undefined' && dataArr.length > 0){
        $.ajax({
           url:WEBROOT+"functions/ajxRepeatOrdrDate.php", 
           type: "post",
           dataType: "json",
           cache: false,
           data :{
             source: 'W',
             docId:$("#docid").val(),
             usermob:$.trim(getCookie('inLogMobile')),
             data:dataArr
           },
           async:false, 
           success:function(res){
                if(res.results.errorCode == '0'){  
                     var now = new Date();
                     var time = now.getTime();
                     time += 3600 * 1000;
                     now.setTime(time);
                     document.cookie = 
                         'orderId_'+MDOCIDJ+'=' + escape(res.results.OrderId) + 
                         '; expires=' + now.toGMTString() + 
                         '; path=/' +
                         '; domain='+cookieondomain;
                            var HREF = baseurl+'/checkoutorder?t=3';
                    window.location.href = HREF;
                }else{
                    $("#dlTxt").empty().html("There was some problem. Please try again.");
                    openDiv('dlVld');
                    return false;
                } 
           }
       });
    }   
}

function criticsRatingsHtml(d){
	var html = '';
	if (typeof(d.criticsratings) !='undefined' && d.criticsratings.length>0){
	var rcnt = d.criticsratings.length;
	var reviewpgurl;
	var reviewName;	
	var crdtl =  d.criticsreviewer;
	if (rcnt>0){
	 $('.mov_ttle').show();	
	}
		for(i=0; i<rcnt; i++)
		{		
			crObj =  d.criticsratings[i];
			reviewer_name = crObj.reviewer_name;
			review_id = (crObj.review_id !=undefined)?crObj.review_id:'';
			revarr = (reviewer_name.toLowerCase()).split(' ');
			critics = crdtl[revarr[0]];			
			reviewName = crObj.reviewer_name.replace(/[^a-zA-Z0-9]/g,'');		
			reviewernameId = 'mvcrnm'+reviewName;
			reviewText = (crObj.final_opinion).trim();
			reviewlen = reviewText.length;
			html += '<div class="row1">';
			html += '<div class="lft" id="'+reviewernameId+'">';
			//html += '		<span class="cmnt_icn"></span>';						
			html += '			<span class="pic_nm">';
			html += '			<img src="'+critics['img']+'" alt="" width="65" height="65" id="crwimg'+i+'">';
			
			html += '			<span id="crwname'+i+'">'+critics['name']+' </span>';
			html += '			<span class="jdor">Jd\'s Official Reviewer</span>';
			html += '		</span>';			
			if (critics['bio'].length>270){
				var bioHtml = critics['bio'].substr(0,270) + '... <a href="javascript:;" onclick="return openCritsBio(\'bio'+reviewName+'\',\''+critics['name']+'\',\'crwimg'+i+''+'\');">more</a>';						
				html += '			<span class="critics_msg">"'+bioHtml+'"</span>';
				html += '<input type="hidden" id="bio'+reviewName+'" value="'+critics['bio']+'"/>';
			}
			else {
				var bioHtml = critics['bio']; 
				html += '			<span class="critics_msg">"'+bioHtml+'"</span>';	
			}			
								
			html += '	</div><!--end of lft-->';						
			html += '	<div class="rgt">';
			html += '		<div class="ratsectn">';
			html += '			<span class="cr_ur">';
			html += '						<span class="flt">Critics Rating: </span>';
			//html += '						<a onclick="setCookieRating(\'showpage\',\'ratings\');" href="http://www.justdial.com/Movies/shamitabh-(hindi-movie)/11285636" class="sel">';
			var p;
							var len = crObj.star.length;
							var rwstars = (eval(crObj.star)).toString();
							html += '<span class="stars_m" id="crwstars'+i+'" star="'+rwstars+'">';												 
							for(p=0; p<len; p++)
							{
								html += '<span class="rs'+crObj.star[p]+'"></span>';
							}
							html += '</span>';
							
			//html += '							<span class="stars_m"><span class="rs10"></span><span class="rs10"></span><span class="rs7"></span><span class="rs0"></span><span class="rs0"></span></span>';
			//html += '						</a>';
			html += '					</span>';							
			html += '			<span class="agotx">'+crObj.Cur_Date +'</span>';							
			html += '		</div><!--end of ratsectn-->';
			if(reviewText)
			{					
				html += '		<div class="rewtx">';
				html += '		<p><span class="ttle">Jd\'s Official Review:</span> <span  id="crwopinion'+i+'">'+reviewText+'</span></p>';
				html += '		</div><!--end of rewtx-->';
			}
			if (movieUrl!= '' && reviewlen>500) {
						reviewpgurl = (movieUrl+'?rname='+reviewName);
						if (review_id != '' && review_id>0){
						reviewpgurl += '&rid='+review_id;
						reviewpgurl += '&version=1.0';
						}
						html += '<span class="sclicon">Share with: <a href="javascript:void(0);"  title="Share via Facebook"  onclick="fbs_click(\''+encodeURI(reviewpgurl+'&flg=fb')+'\');_ct(\'mvrevfbshare\',\'moviedtpg\',\'16777216\');" class="fbcls"></a>';
						html += '<a  title="Share via Twitter"  id=\'headerSocialTwitter'+i+'\' title="twitter" href="https://twitter.com/intent/tweet?url='+encodeURI(reviewpgurl+'&flg=tw')+'&via=Just_Dial&text=Check out Jd\'s official review for '+movieNameShrt+'" class="twtcls" onclick="javascript:_ct(\'mvrevtwittershare\',\'moviedtpg\',\'16777216\');"></a>';
						html += '<a title="Share via Google Plus" href="https://plus.google.com/share?url='+encodeURI(reviewpgurl+'&flg=gm')+'" onclick="javascript:_ct(\'mvrevgmailshare\',\'moviedtpg\',\'16777216\');window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600,top=10,left=10\');return false;" class="gpluscls"></a>';
						html += '<a title="Share via Email" href="javascript:void(0);" class="emailcls" title="share via email" onclick="openSvemail(\''+i+'\',\'moviedtpg\',\'critics\');"></a>';
						//html += '<a href="#" class="nwcls"></a><a href="#" class="whatsupcls"></a>';
						html += '</span>';
					}			
			html += '	</div>';//<!--end of rgt-->
			html += '	</div>';//<!--end of row1-->
			//html += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"
			
		}
	}
	return html;
}

function shareLink(lnk)
{
	window.open(lnk, 'socialShareWin', 'toolbar=0,status=0,width=548,height=325,top=10,left=10');
	closeDiv('swf');
	return false;
}

function shareWithFriend(by, t)
{
	var emailExp = /^(([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,7}){0,1}$/;
	var mobileExp = /^[7,8,9]{1}[0-9]{9}$/;
	var srcterm = $("#searchterm").val();
	var did = $("#mpdocid").val();
	var validemail = 1;
	var validmobile = 1;
	var closedown_flag = $("#closedown_flag0").val();
	
	$('.err').html('');
	$('.err').hide();
	
	if(by == 'email') {
		var sender_name = getCookie('inLogName'); 
		var sender_email = getCookie('inLogMobile');
		
		/*if(sender_name == '' || sender_name.search('e.g') == 0)
		{
			$('#nerr2').html('Name cannot be blank');
			$('#nerr2').show();
			$("#sname2").focus();
			validemail = 0;
			return false;
		}
		else if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(sender_name)))
		{
			$('#nerr2').html('Only alphabets are allowed');
			$('#nerr2').show();
			$("#sname2").focus();
			validemail = 0;
			return false;
		}
		else if(sender_email == '') 
		{
			$("#nerr3").html('Email id cannot be blank');
			$("#nerr3").show();
			$('#shrem').focus();
			validemail = 0;
			return false;
		}
		else if(!($.trim(sender_email).match(emailExp)))
		{
			$("#nerr3").html('Invalid email');
			$("#nerr3").show();
			$('#shrem').focus();
			validemail = 0;
			return false;
		}*/
		
		var i, fName;
		var isValidInfo = true;
		var fnestr = '';
		var emlArr = new Array();
		$('#frndErr').html('');
		$('#frndErr').hide();
		
		$('[id^="shrenm"]').each(function() {
			fName = $(this).attr('id');
			i = fName.replace('shrenm','');
			
			FrndName =  $('#shrenm'+i).val();
			FrndEmail = $('#shrem'+i).val();
			FrndName = FrndName.trim();
			FrndEmail = FrndEmail.trim();
			
			fnestr += FrndName+'##'+FrndEmail+',';
			
			if(FrndName == '' || FrndName.search('e.g') == 0)
			{
				isValidInfo = false;
			}
			if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(FrndName)))
			{
				isValidInfo = false;
			}
			if(FrndEmail == '') 
			{
				isValidInfo = false;
			}
			if(!($.trim(FrndEmail).match(emailExp)))
			{
				isValidInfo = false;
			}
			
			if(FrndEmail != '') {
				if($.inArray(FrndEmail, emlArr) == -1 ) 
				{
					emlArr.push(FrndEmail);
				}
				else
				{
					$("#frndErr").html("Duplicate email entered");
					$("#frndErr").show();
					$('#shrem'+i).val('');
					$('#shrem'+i).focus();
					validemail = 0;
					return false;
				}
			}
		});
		
		if(isValidInfo == false) {
			$('#frndErr').html('Please enter valid name / email id');
			$('#frndErr').show();
			validemail = 0;
			return false;
		} 
		
		if(validemail == 1) {
			$.get(WEBROOT+"functions/ajxshare.php",{by:by,srcterm:srcterm,did:did,city:getcity,closedown_flag:closedown_flag,sender_name:sender_name,sender_email:sender_email,fnestr:fnestr}, function(data) {
				var nm = data.split('#');
				if($.trim(nm[0]) == 1){
					var rsl_txt = '';
					if($.trim(nm[1]) != 'limit') {
						rsl_txt += '<br/>Thank you '+$.trim(nm[1])+'<br> The listing has been successfully shared with your friend(s)<br/>';
					}	
					if(nm[2] != '') {
						rsl_txt += '<br/> Sharing limit exceeded for '+nm[2];
					} 
					$('#thmsg').html(rsl_txt);	
					closeDiv('swf');
					closeDiv('shrEmail');
					openDiv('swfthank');
					setTimeout("sharePageReload('email');",2500);
				} else if($.trim(nm[0]) == 3) {
					$('#thmsg').html('You have reached limit for the day.');	
					closeDiv('swf');
					closeDiv('shrEmail');
					openDiv('swfthank');
					setTimeout("sharePageReload('email');",2500);
				} else {
					alert("Email not sent. Please try after sometime.");
					return false;
				}
			});
		}
	} else if(by == 'sms') {
		var sender_name = getCookie('inLogName'); 
		var sender_mobile = getCookie('inLogMobile');
		
		/*if(sender_name == '' || sender_name.search('e.g') == 0)
		{
			$('#nerr1').html('Name cannot be blank');
			$('#nerr1').show();
			$("#sname1").focus();
			validmobile = 0;
			return false;
		}
		else if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(sender_name)))
		{
			$('#nerr1').html('Only alphabets are allowed');
			$('#nerr1').show();
			$("#sname1").focus();
			validmobile = 0;
			return false;
		}
		else if(sender_mobile == '') 
		{
			$("#nerr4").html('Email id cannot be blank');
			$("#nerr4").show();
			$('#shrem').focus();
			validmobile = 0;
			return false;
		}
		else if(!($.trim(sender_mobile).match(mobileExp)))
		{
			$("#nerr4").html('Invalid mobile');
			$("#nerr4").show();
			$('#shrem').focus();
			validmobile = 0;
			return false;
		}*/
		
		var i, fName;
		var isValidInfo = true;
		var fnmstr = '';
		$('#frndSMSErr').html('');
		$('#frndSMSErr').hide();
		var mobArr = new Array();
		$('[id^="shrmnm"]').each(function() {
			fName = $(this).attr('id');
			i = fName.replace('shrmnm','');
			
			FrndName =  $('#shrmnm'+i).val();
			FrndMobile = $('#shrmn'+i).val();
			FrndName = FrndName.trim();
			FrndMobile = FrndMobile.trim();
			
			fnmstr += FrndName+'##'+FrndMobile+',';
			
			if(FrndName == '' || FrndName.search('e.g') == 0)
			{
				isValidInfo = false;
			}
			if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(FrndName)))
			{
				isValidInfo = false;
			}
			if(FrndMobile == '') 
			{
				isValidInfo = false;
			}
			if(!($.trim(FrndMobile).match(mobileExp)))
			{
				isValidInfo = false;
			}
			
			if(FrndMobile != '') {
				if($.inArray(FrndMobile, mobArr) == -1 ) 
				{
					mobArr.push(FrndMobile);
				}
				else
				{
					$("#frndSMSErr").html("Duplicate mobile entered");
					$("#frndSMSErr").show();
					$('#shrmn'+i).val('');
					$('#shrmn'+i).focus();
					//isValidInfo = false;
					validmobile = 0;
					return false;
				}
			}	
		});
		
		if(isValidInfo == false) {
			$('#frndSMSErr').html('Please enter valid name / mobile number');
			$('#frndSMSErr').show();
			validmobile = 0;
			return false;
		} 
		
		if(t == 2) {
			var vcodelft = $('#shvcodelft').val();
			var vcodert = $('#shvcodert').val();
			var vcode = vcodelft +'-'+ vcodert;
			if(vcode == '-')
			{
				$('#shr_ver_error').show();
				$('#shr_ver_error').html('Please Enter Verification Code');
				$('#shvcodelft').focus();
				validmobile = 0;
				return false;
			}
		}
		
		if(validmobile == 1) {
			$.get(WEBROOT+"functions/ajxshare.php",{by:by,srcterm:srcterm,did:did,city:getcity,closedown_flag:closedown_flag,sender_name:sender_name,sender_mobile:sender_mobile,fnmstr:fnmstr,t:t,vcode:vcode}, function(data) {
				var nm = data.split('#');
				if($.trim(nm[0]) == 1) {
					var rsl_txt = '';
					if($.trim(nm[1]) != 'limit') {
						rsl_txt += '<br/>Thank you '+$.trim(nm[1])+'<br> The listing has been successfully shared with your friend(s)<br/>';
					}
					if(nm[2] != '') {
						rsl_txt += '<br/> Sharing limit exceeded for '+nm[2];
					} 
					$('#thmsg').html(rsl_txt);	
					closeDiv('swf');
					closeDiv('shrSms');
					closeDiv('shrvcode');
					openDiv('swfthank');
					setTimeout("sharePageReload('sms');",2500);
				} else if($.trim(nm[0]) == 2) {
					closeDiv('shrSms');
					$('#shrrsvc').html('<a href="javascript:ratethisVerificationResend('+sender_mobile+',\'shareWithFrnd\');">Click Here</a>');			
					openDiv('shrvcode');
				} else if($.trim(nm[0]) == 3) {
					$('#thmsg').html('You have reached limit for the day.');	
					closeDiv('swf');
					closeDiv('shrSms');
					openDiv('swfthank');
					setTimeout("sharePageReload('sms');",2500);
				} else {
					alert("SMS not sent. Please try after sometime.");
					return false;
				}
			});
		}
	}
}

function addMrFrndEmail()
{
	var validemail = 1;
	var emailExp = /^(([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,7}){0,1}$/;
	var i, fName;
	var isValidInfo = true;
	var emlArr = new Array();
	$('#frndErr').html('');
	$('#frndErr').hide();
	$('[id^="shrenm"]').each(function() {
		fName = $(this).attr('id');
		i = fName.replace('shrenm','');
		
		FrndName =  $('#shrenm'+i).val();
		FrndEmail = $('#shrem'+i).val();
		FrndName = FrndName.trim();
		FrndEmail = FrndEmail.trim();
		
		if(FrndName == '' || FrndName.search('e.g') == 0)
		{
			isValidInfo = false;
		}
		if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(FrndName)))
		{
			isValidInfo = false;
		}
		if(FrndEmail == '') 
		{
			isValidInfo = false;
		}
		if(!($.trim(FrndEmail).match(emailExp)))
		{
			isValidInfo = false;
		}
		
		if(FrndEmail != '') {
			if($.inArray(FrndEmail, emlArr) == -1 ) 
			{
				emlArr.push(FrndEmail);
			}
			else
			{
				$("#frndErr").html("Duplicate email entered");
				$("#frndErr").show();
				$('#shrem'+i).val('');
				$('#shrem'+i).focus();
				validemail = 0;
				return false;
			}
		}	
	});
	
	if(isValidInfo == false) {
		$('#frndErr').html('Please enter valid name / email id');
		$('#frndErr').show();
		validemail = 0;
		return false;
	} 
	
	if(validemail == 1) {
		$('#eml').remove();
		var frndCnt = $('#shrfemcnt').val();	
		var newCnt = parseInt(frndCnt) + 1;
		var html = '';
		var addMrHtml = '';
		if(parseInt(frndCnt) < 2) { 
			addMrHtml = '<a class="pppls" id="eml" href="javascript:void(0);" onclick="addMrFrndEmail();"></a>';
		}
		html = '<span class="eachotr sline" id="emlFrnd'+newCnt+'"><p><span class="ifld"><label for="nam">Name</label><input type="text" class="jinp" id="shrenm'+newCnt+'" name="shrenm'+newCnt+'" value="e.g Ravi Verma" style="color:#BDBDBD" onblur="stat=true;clear_text_box_val(\'e.g Ravi Verma\',\'shrenm'+newCnt+'\',\'onblur\')" onkeyup="sfKeyup(this.id,\'email\',\'frndErr\');" onfocus="clear_text_box_val(\'e.g Ravi Verma\',\'shrenm'+newCnt+'\',\'onfocus\')"  /></span></p><p><span class="ifld"><span class="lftlbl"><label>Email</label></span><span class="rgtinpt"><span><span class="rtrsp" id="rmoutr'+newCnt+'"><span class="jinp"><input type="text" validation="email" id="shrem'+newCnt+'" value="e.g. abc@xyz.com" name="shrem'+newCnt+'" class="min jd_rule" onblur="stat=true;clear_text_box_val(\'e.g. abc@xyz.com\',\'shrem'+newCnt+'\',\'onblur\')" onkeyup="sfKeyup(this.id,\'email\',\'frndErr\');" onfocus="clear_text_box_val(\'e.g. abc@xyz.com\',\'shrem'+newCnt+'\',\'onfocus\')" style="color:#BDBDBD"><span id="emlFrndId'+newCnt+'" class="clb vh" onclick="javascript:removeEmFrnd('+newCnt+');"></span><br clear="all"></span>'+addMrHtml+'</span></span></span></span></p></span>';
		$('#shrFrndEm').append(html);
		$('#shrfemcnt').val(newCnt);
	}
}

function removeEmFrnd(cnt)
{
	$('#emlFrnd'+cnt).remove();
	var frndCnt = $('#shrfemcnt').val();	
	var newCnt = parseInt(frndCnt) - 1;
	$('#shrfemcnt').val(newCnt);
	if(parseInt(newCnt) < 3 && !$('#eml').is(':visible')) { 
		$('#rmoutr'+newCnt).append('<a class="pppls" id="eml" href="javascript:void(0);" onclick="addMrFrndEmail();"></a>');
	}
}

function addMrFrndSms()
{
	var validmobile = 1;
	var mobileExp = /^[7,8,9]{1}[0-9]{9}$/;
	var i, fName;
	var isValidInfo = true;
	var mobArr = new Array();
	$('#frndSMSErr').html('');
	$('#frndSMSErr').hide();
	$('[id^="shrmnm"]').each(function() {
		fName = $(this).attr('id');
		i = fName.replace('shrmnm','');
		
		FrndName =  $('#shrmnm'+i).val();
		FrndMobile = $('#shrmn'+i).val();
		FrndName = FrndName.trim();
		FrndMobile = FrndMobile.trim();
		
		if(FrndName == '' || FrndName.search('e.g') == 0)
		{
			isValidInfo = false;
		}
		if(!(/^[a-zA-Z]+([.]{0,1}[ ]{0,1}[a-zA-Z]+)*$/.test(FrndName)))
		{
			isValidInfo = false;
		}
		if(FrndMobile == '') 
		{
			isValidInfo = false;
		}
		if(!($.trim(FrndMobile).match(mobileExp)))
		{
			isValidInfo = false;
		}
		
		if(FrndMobile != '') {
			if($.inArray(FrndMobile, mobArr) == -1 ) 
			{
				mobArr.push(FrndMobile);
			}
			else
			{
				$("#frndSMSErr").html("Duplicate mobile entered");
				$("#frndSMSErr").show();
				$('#shrmn'+i).val('');
				$('#shrmn'+i).focus();
				//isValidInfo = false;
				validmobile = 0;
				return false;
			}
		}	
	});
	
	if(isValidInfo == false) {
		$('#frndSMSErr').html('Please enter valid name / mobile number');
		$('#frndSMSErr').show();
		validmobile = 0;
		return false;
	} 
	
	if(validmobile == 1) {
		$('#shrmsg').remove();
		var frndCnt = $('#shrfsmscnt').val();	
		var newCnt = parseInt(frndCnt) + 1;
		var html = '';
		var addMrHtml = '';
		if(parseInt(frndCnt) < 2) { 
			addMrHtml = '<a class="pppls" id="shrmsg" href="javascript:void(0);" onclick="addMrFrndSms();"></a>';
		}
		html = '<span class="eachotr sline" id="smsFrnd'+newCnt+'"><p><span class="ifld"><label for="nam">Name</label><input type="text" class="jinp" id="shrmnm'+newCnt+'" name="shrmnm'+newCnt+'" value="e.g Ravi Verma" style="color:#BDBDBD" onblur="stat=true;clear_text_box_val(\'e.g Ravi Verma\',\'shrmnm'+newCnt+'\',\'onblur\')" onkeyup="sfKeyup(this.id,\'sms\',\'frndSMSErr\');" onfocus="clear_text_box_val(\'e.g Ravi Verma\',\'shrmnm'+newCnt+'\',\'onfocus\')"  /></span></p><p><span class="ifld"><span class="lftlbl"><label>Mobile</label></span><span class="rgtinpt"><span><span class="rtrsp" id="rmoutrmb'+newCnt+'"><span class="jinp"><span class="numotr"><span id="ism0" class="mcode sfmpc">+91</span></span><input type="text" validation="mobile" id="shrmn'+newCnt+'" value="e.g 9867045061" name="shrmn'+newCnt+'" class="min jd_rule" onblur="stat=true;clear_text_box_val(\'e.g 9867045061\',\'shrmn'+newCnt+'\',\'onblur\')" onkeyup="sfKeyup(this.id,\'sms\',\'frndSMSErr\');" onfocus="clear_text_box_val(\'e.g 9867045061\',\'shrmn'+newCnt+'\',\'onfocus\')" maxlength="10" style="color:#BDBDBD"><span id="smsFrndId'+newCnt+'" class="clb vh vhn" onclick="javascript:removeSmsFrnd('+newCnt+');"></span><br clear="all"></span>'+addMrHtml+'</span></span></span></span></p></span>';
		$('#shrFrndSms').append(html);
		$('#shrfsmscnt').val(newCnt);
	}
}

function removeSmsFrnd(cnt)
{
	$('#smsFrnd'+cnt).remove();
	var frndCnt = $('#shrfsmscnt').val();	
	var newCnt = parseInt(frndCnt) - 1;
	$('#shrfsmscnt').val(newCnt);
	if(parseInt(newCnt) < 3 && !$('#shrmsg').is(':visible')) { 
		$('#rmoutrmb'+newCnt).append('<a class="pppls" id="shrmsg" href="javascript:void(0);" onclick="addMrFrndSms();"></a>');
	}
}

function sfKeyup(id, by, errid)
{
	if(errid != undefined) {
		$('#'+errid).html('');
		$('#'+errid).hide();
	}
	if(by == 'sms') {
		$('#frndSMSErr').html('');
		$('#frndSMSErr').hide();
	} else if(by == 'email') {
		$('#frndErr').html('');
		$('#frndErr').hide();
	}
}

function sharePageReload(srctype)
{
	var url = location.href;
	if(srctype=='sms') {
	url = url.replace(/\?tab=fsms$/, '');	
	}
	else if(srctype=='email') {
	url = url.replace(/\?tab=femail$/, '');
	}
	//url = url.replace(/[?]/g,'');
	if(window.event) {
		window.event.returnValue = false;
		window.location = url;
		return false;
	}else {
		window.location = url;
	}	
}

/* write a review page - photo preview - start */
$(function () {
    $('.photoInput').change(function () {
        if($(this).val().length > 0) {
            var $photoUploadBox = $(this).parents('.photoUploadBox');
            
            var photoUrl;
            if(window.URL) // for browsers support window.URL
            {
				photoUrl = window.URL.createObjectURL(this.files[0]);
            }
            else // for browsers do not support window.URL
            {
				photoUrl = 'http://img.jdmagicbox.com/icontent/preview-not-available.jpg';
            }
            
            $photoUploadBox.find('.photoImg').attr('src', photoUrl);
            
            $photoUploadBox.find('.photoAddBtn').addClass('dn');
            $photoUploadBox.find('.photoAdded').removeClass('dn');
            
            $('#photoRmAll').removeClass('dn');
        }
    });
    
    $('#photoUploadBoxes .photoAdd').click(function () {
		var $photoUploadBox = $(this).parents('.photoUploadBox');
		
		/* if image is not already selected */
		if($photoUploadBox.find('.photoAdded').hasClass('dn'))
		{
			$photoUploadBox.find('.photoInput').click();
		}
    });
    
    $('#photoUploadBoxes .photoRm').click(function (e) {
        var $photoUploadBox = $(this).parents('.photoUploadBox');
        
        $photoUploadBox.find('.photoInput').val('');
        $photoUploadBox.find('.photoCaption').val('').trigger('blur').css({"color":"#BDBDBD"});
        
        $photoUploadBox.find('.photoImg').attr('src', '');
        
        /* only useful for update review page - start */
        $photoUploadBox.find('.photoThumb').remove();
        $photoUploadBox.find('.photoBig').remove();
        /* only useful for update review page - end */
        
        $photoUploadBox.find('.photoAdded').addClass('dn');
        $photoUploadBox.find('.photoAddBtn').removeClass('dn');
        
        var photoCount = $('#photoUploadBoxes .photoAdded').not('.dn').length;
        
        /* decrement photo count by 1 - start */
        $('#phtcnt').val(photoCount);
        /* decrement photo count by 1 - end */
        
        if(photoCount == 0)
        {
			$('#photoRmAll').addClass('dn');
        }
        
        // to stop event bubble
        return false;
    });
    
    $('#photoRmAll').click(function () {
        $('#photoUploadBoxes .photoRm').each(function () {
            $(this).trigger('click');
        });
    });
    
    if($.browser.msie && $.browser.version.substr(0, 1) < 11)
    {
		$('.photoAdd').hide();
		$('.photoInput').removeClass('dn');
		$('.photoUploadBox,.photoInput,.photoCaptionContainer,.photoCaption').css({"width":"100%"});
		$('#photoRmAll').hide();
    }
	
	
	// click trackers for banners
	$('#Banners .banner_img').click(function () {
		_ct('comp_banner', lnk_loc);
	});
});
/* write a review page - photo preview - end */

/* for write a review page - social sharing - start */
var fbAppId = '662457077232236';
var userRatings = 0;

function getUserRatings()
{
	return userRatings;
}

function setUserRatings()
{
	userRatings = parseInt($('#rating').val());
	userRatings = !isNaN(userRatings) ? userRatings : 0;
}

function shareFb(link, caption, description)
{
	/* click tracker */
	_ct('sharethis_fb', 'dtpg');
	
	//if(getUserRatings() > 0)
	//{
		//var shareLinkUrl = 'https://www.facebook.com/dialog/feed?display=popup&app_id=' + fbAppId + '&link=' + link + '&caption=' + encodeURIComponent(caption) + '&description=' + encodeURIComponent(description) + '&redirect_uri=' + encodeURIComponent(link);
		var shareLinkUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link);
		
		shareLink(shareLinkUrl);
	//}
	//else
	//{
		//alert('Please rate before sharing!');
	//}
}

function shareTwtr(url, text)
{
	/* click tracker */
	_ct('sharethis_twtr', 'dtpg');
	
	//if(getUserRatings() > 0)
	//{
		var shareLinkUrl = 'https://twitter.com/share?text=' + encodeURIComponent(text) + '&url=' + url;
		
		shareLink(shareLinkUrl);
	//}
	//else
	//{
		//alert('Please rate before sharing!');
	//}
}



$(window).load(function () {
	setUserRatings();
	
	$('#rating_stars .ratingStar').bind('click', function () {
		setTimeout(function () {
			setUserRatings();
		}, 300);
		
	});
	
	
	
	
	
});


/* for write a review page - social sharing - end */


/* banner animation start */
// only if banners are showing
if(typeof comptbanner !=  'undefined' && comptbanner == 1)
{
	var bannerSectionsLength;
	var bannerHoverState = false;

	function doBannersAnimation()
	{
		if(!bannerHoverState)
		{
			var firstBannersSection = $('.bannersSection:first');
			var secondBannersSection = $('.bannersSection:eq(1)');
			var thirdBannersSection = $('.bannersSection:eq(2)');
			
			firstBannersSection.animate({"left":-firstBannersSection.outerWidth()}, 500, function () {
				var left = firstBannersSection.outerWidth() * (bannerSectionsLength - 1);
				
				$('#bannersContainer').append(firstBannersSection.detach().css({"left":left}));
			});
			
			secondBannersSection.animate({"left":0}, 500);
			
			if(thirdBannersSection.length > 0)
			{
				thirdBannersSection.css({"left":thirdBannersSection.outerWidth()});
			}
		}
	}

	$(function () {
		bannerSectionsLength = $('.bannersSection').length;
		
		// animate only if there are more than 1 banner sections
		if(bannerSectionsLength > 1)
		{
			var firstSectionBenners = $('.bannersSection:first img');
			var firstSectionBennersLength = firstSectionBenners.length;
			
			firstSectionBenners.one('load', function () {
				firstSectionBennersLength--;
				
				// if this is the last banner of first section
				if(firstSectionBennersLength == 0)
				{
					$('#bannersContainer').hover(function () {
						bannerHoverState = true;
					}, function () {
						bannerHoverState = false;
					});
                    
                    $('.bannersSection').each(function (index) {
                        var left = $(this).outerWidth() * index;
                        
                        $(this).css({"left":left,"display":"inline-block"});
                    });
					
					// start banner animation
					window.setInterval(doBannersAnimation, 10000);
				}
			}).each(function () {
				if(this.complete)
				{
					$(this).load();
				}
			});
		}
	});
    
    $('.bannersSection:first').css({"display":"inline-block"});
}
/* banner animation end */

function tgl_id(id){
    $('#'+id).toggle();
}
function setadtg(e){
    var add_tag = e.text;
    var ext = '';

    if($("#edtAddr").is(":visible")){
        ext = '_edt';
    }
    $('#tgad_val'+ext).val(add_tag);
    $('#addr_tag_list'+ext).hide(); 
    if( $.trim(add_tag).toLowerCase() == 'other'){
        $('#tgad_otr_txt'+ext).hide();
        $('#tgad_otr_bx'+ext).show();
        $('#tgad_otr_val'+ext).val('');
        $('#address_type'+ext).val('3');        
    }else{
        if($.trim(add_tag).toLowerCase() == 'home'){
            $('#address_type'+ext).val('1');
            $('#tgad_otr_val'+ext).val('home');
        }else if($.trim(add_tag).toLowerCase() == 'office'){
            $('#address_type'+ext).val('2');
            $('#tgad_otr_val'+ext).val('office');
        }else{
            $('#tgad_otr_val'+ext).val('');
        }
        $('#tgad_otr_txt'+ext).show();
        $('#tgad_otr_bx'+ext).hide();
    }
}
$(document).on('click', function(e) {
    if ( $(e.target).closest('#addr_tag_list').length || $(e.target).closest('#tgad_val').length) {
        return;
    }else if ( ! $(e.target).closest('#addr_tag_list').length ) {
        $('#addr_tag_list').hide();
    }
    if ( $(e.target).closest('#addr_tag_list_edt').length || $(e.target).closest('#tgad_val_edt').length) {
        return;
    }else if ( ! $(e.target).closest('#addr_tag_list_edt').length ) {
        $('#addr_tag_list_edt').hide();
    }
});
/*****************Start Coupen Code********************/
		 
function redeemResCoupons(){
	var promocode = $("#promocodeinp").val();
       
	if($("#promocodeinp").val() == '' || $("#promocodeinp").val() == "Enter Promo Code"){
            alert('Please enter Coupon code');
 			var width = "60";
			$("#actv-smry-redm-btn").removeClass('loader_gray_vertical');	
			$("#actv-smry-redm-btn").text('Reedem');
			$("#actv-smry-redm-btn").addClass('actv-smry-redm-btn').css('width',width+'px');
            return false;
	}
	var orderid  = getCookie('orderId_'+MDOCIDJ);
        $.ajax({
        url:WEBROOT+"functions/redeemResCoupons.php", 
        type:"get",
        datatype: "json",
        data:{
            'coupon_code': promocode,
            'docid' : $("#docid").val(),
            'orderid': orderid,
            'case'  : 'add_coupon',
            'action' : 'apply_coupon'
        },
        success:function(response){
                response = jQuery.parseJSON(response);						
                if(response.result.err_code == 0){
                    var discount_amt			= 	response.result.final_amount.discount_amt;
                    var total_aftr_discount 	= response.result.final_amount.total_aftr_discount;
                    var total_bfr_discount 		= response.result.final_amount.otal_bfr_discount;
                    $('#discount_price').html(discount_amt);
                   // $('#totSmry').html(total_aftr_discount);
                  // $('#tot').text(response.result.final_amount.total_aftr_discount);
                  
                  
                  
                  var subTotal = 0;
    var apsNaStr = ''; 
     
    $('.itmTotal').each(function(i)
    {    
        var txt = $.trim($(this).text());
        if(txt == 'APS**'){
            subTotal += 0;
            apsNaStr += ' + ' + txt + '';
        }
        else if(txt == 'N / A*'){
            subTotal += 0;
            apsNaStr = '<span style="display:inline-block"> + ' + txt + '</span>';
        }
        else{ 
            //subTotal += parseFloat($(this).text());
             subTotal = response.result.final_amount.total_aftr_discount;
        
        }
    });
    subTotal = parseFloat(subTotal);
    subTotal = subTotal.toFixed(2);
    var total = 0;
                      var dlchrg =  (isNaN(parseFloat($("#dlchrg").text()))) ? 0 : parseFloat($("#dlchrg").text()); 
                      var pckindelflg = (isNaN(parseFloat($("#pckindelflg").val()))) ? 0 : parseFloat($("#pckindelflg").val());
                      var pckinFlg = (isNaN(parseFloat($("#pckinFlg").val()))) ? 0 : parseFloat($("#pckinFlg").val());
                      var pckinTaxPerc = (isNaN(parseFloat($("#pckinPerc").val()))) ? 0 : parseFloat($("#pckinPerc").val());
                      var servTaxPerc = (isNaN(parseFloat($("#taxPerc").val()))) ? 0 : parseFloat($("#taxPerc").val());
                      var vatPerc = (isNaN(parseFloat($("#vatPerc").val()))) ? 0 : parseFloat($("#vatPerc").val());
    //var servTax = (isNaN(parseFloat($("#servTax").text()))) ? 0 : parseFloat($("#servTax").text());
    
                    if(pckinFlg == 1 && pckinTaxPerc >0){
                            var packaging_charge= (pckinTaxPerc / 100) * subTotal;
                                $("#pckgchrg").html(Math.round(packaging_charge));
                    }else{
                            var packaging_charge= 0;
                    }
      
                   // $("#sbttl").html(Math.round(subTotal));
    
    switch (pckindelflg){
        case 1:
            if(pckinFlg == 1){
                subTotal= parseFloat(subTotal) + parseFloat(packaging_charge);
            }
                break;
        case 2:
            subTotal= parseFloat(subTotal) + parseFloat(dlchrg);
                break;
        case 3:
            subTotal= parseFloat(subTotal) + parseFloat(dlchrg) + parseFloat(packaging_charge);
                break;
    }
			
    var servTax =  (servTaxPerc / 100) * subTotal; 
     
    
    //var vat = (isNaN(parseFloat($("#vat").text()))) ? 0 : parseFloat($("#vat").text());
    var vat =  (vatPerc / 100) * subTotal;
    
    $("#servTax").text(Math.round(servTax));
    $("#vat").text(Math.round(vat));
    
    if(pckindelflg == '1'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat) + parseFloat(dlchrg);         
    }else if(pckindelflg == '2'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat) + parseFloat(packaging_charge);         
    }else if(pckindelflg == '3'){
        total = parseFloat(subTotal) + parseFloat(servTax) + parseFloat(vat); 
    }else{
        total = parseFloat(subTotal) + parseFloat(dlchrg) + parseFloat(servTax) + parseFloat(vat) + parseFloat(packaging_charge); 
    }
    
    
    
    total = Math.round(total);
    //total = total.toFixed(2);
     
    subTotal = "<b>" + subTotal + apsNaStr + "</b>";
     
     
    $("#tot").text(total);
    $("#totSmry").text(total);
             // $('#actv-smry-redm-btn').css()
              //$('#actv-smry-redm-btn').css('background','grey').attr('disabled',true);
              $('#actv-smry-redm-btn').removeClass('actv-smry-redm-btn').addClass('actv-smry-redm-btn_dsbld').attr('disabled',true);
              //alert($('#redm-btn').attr('class'));
              $('#rmv_spn').removeClass('dn').addClass('dt');
              $('#coupon_smry').removeClass('dt').addClass('dn');
              $('#coupon_dscp').text(response.result.final_amount.discount_percent+"% off : Max discount limit is Rs."+response.result.final_amount.max_dsc_amt+"  ");
              $('#coupcode').val('applied');
                   
                   
                }
                
                openDiv('coupon_pop');
                 if(response.result.err_code == 0){
                	var width = "60";			
					$("#actv-smry-redm-btn").removeClass('loader_gray_vertical');	
					$("#actv-smry-redm-btn").text('Reedem');
					$("#actv-smry-redm-btn").addClass('actv-smry-redm-btn').css('width',width+'px');
					$('#actv-smry-redm-btn').addClass('actv-smry-redm-btn_dsbld').attr('disabled',true); 
					$("#actv-smry-redm-btn").addClass('actv-smry-redm-btn');
					$('.sucsfly_msg_res').css('width','215px');			
					
				}
				else{
                	var width = "60";
					$("#actv-smry-redm-btn").removeClass('loader_gray_vertical');	
					$("#actv-smry-redm-btn").text('Reedem');
					$("#actv-smry-redm-btn").addClass('actv-smry-redm-btn').css('width',width+'px');				
					$('#coupon_pop_img').removeClass('add_sucsfly_img_res');
					
					
				}
				$('#coupon_txt').text(response.result.err_msg);
               		$('#promocodeinp').val('');
               
               // $('#err_mesg').html(err_msg);$("#err_mesg").css("color", "red");
                //window.location.reload(true);
        }
    });
}



