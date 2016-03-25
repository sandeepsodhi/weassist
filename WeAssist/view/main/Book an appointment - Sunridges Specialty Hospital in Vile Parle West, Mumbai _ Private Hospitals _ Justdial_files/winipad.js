function sendappLink(type, popupFlag)
{
	var sndflg = 0;
	$("#aemsg").hide();
	$("#aemsg").html("");
	var phn	=	$("#aphn").val();
	var em	=	$("#aem").val();
	//var vc	=	$("#avc").val();
	if(popupFlag == 1) {
		var vcodelft = $("#vcodelftdw").val();
		var vcodert = $("#vcodertdw").val();
	} else {
		var vcodelft = $("#vcodelft").val();
		var vcodert = $("#vcodert").val();
	}
	var vcode = vcodelft+'-'+vcodert;
	var applink	= $("#applink").val();
	var appPage = (onloadFn != '' && (onloadFn == 'jd_on_mobile')) ? 'jdmpage' : (onloadFn != '') ? 'winipad' : '';
	//var vc1	=	$("#avc1").val();
	if(touchy)
	{
		$('.div_outer').removeClass('pos_rel');
	}
		//if(phn.search("e.g") == 0 && em.search("e.g") == 0 )
		if(phn.search("e.g") == 0)
		{
		sndflg = 1;
		//$(".jerr").show();
		$(".jmerr").show();
		$("#aemsg").html("Please enter a valid mobile number");
		return false;
		}
		//if(phn == "" && em == "")
		if(phn == "")
		{
		sndflg = 1;
		//$(".jerr").show();
		$(".jmerr").show();
		//$("#aemsg").html("Enter phone number or Email id");
		$("#aemsg").html("Please enter a valid mobile number");
		return false;
		}
		if(phn != "" && phn.search("e.g") != 0 )
		{
		if(!validateMobileAndroid("aphn"))
		{
			sndflg = 1;
			//$(".jerr").show();
			$(".jmerr").show();
			$("#aemsg").html("Please enter a valid mobile number"); 
			return false;
		}
		
		$fchar = phn.charAt(0);	
		if($fchar != 7 && $fchar != 8 && $fchar != 9)
		{
			sndflg = 1;
			//$(".jerr").show();
			$(".jmerr").show();
			$("#aemsg").html("Please enter a valid mobile number"); 
			return false;
		}
		var alphaExp = /^[0-9]+$/;
		if(!phn.match(alphaExp))
		{
			sndflg = 1;
			//$(".jerr").show();
			$(".jmerr").show();
			$("#aemsg").html("Please enter a valid mobile number"); 
			return false;
		}
		}
			
		if(em != "" && em.search("e.g") != 0 )
		{
			
			if(!isValid(em,"email"))
			{
				sndflg = 1;
				$(".jerr").show();
				$("#aemsg").html("Enter valid Email Id"); 
				return false;
			}
		}
		
		if(vcode == "-" && $("#dwlpvc").is(":visible"))
		{
			sndflg = 1;
			$(".jerr").show();
			$("#vcodelft").focus();
			$("#avcErr").html("Please enter verification code"); 
			return false;
		}
	
	if(sndflg == 0)
	{
		//$(".jerr").hide();
		$(".jmerr").hide();
		
		$.get(DOMAIN+"functions/ajxandroid.php", {phn:phn,em:em,vcode:vcode,type:type,applink:applink,'apppage' : appPage},function(data) {
			if(data == 1)
			{
					$('.txt_outer').css('display', 'none');
					$('#cont3').css('display', 'block');
					$('#cont3Msg').html('Thank you for your information. SMS Sent.');
					winipadlogin(phn,1)
			}
			else if(data == 0)
			{
				
					$('.txt_outer').css('display', 'none');
					//$('#dwlpvcevent').attr('onclick', 'return logAndroidAppMobile(2, 1);');
					$('#cont2').css('display', 'block');
				
			}
			else if(data == 4)
			{
				$("#vcodelft").val('');
				$("#vcodert").val('');
				$(".jerr").show();
				$("#vcodelft").focus();
				$("#avcErr").html("Please enter correct verification code"); 
			
					$('.txt_outer').css('display', 'none');
					$('#cont2').css('display', 'block');
				
			}
			else if(data == 2)
			{
				
					$('.txt_outer').css('display', 'none');
					$('#cont3').css('display', 'block');
					$('#cont3Msg').html('You have reached your maximum limit of attempts for the day.Please try again later.');
					//setTimeout("window.location.reload(true);",3000);
				
			}
			else if(data == 3)
			{
				$('.txt_outer').css('display', 'none');
				$('#cont3').css('display', 'block');
				$('#cont3Msg').html('Could not send SMS/Email.Please try again later.');
				//setTimeout("window.location.reload(true);",3000);
				
			}
		});
	}
}



function showwinipaddiv()
{
	$('.slidediv #cont1').css("display","block");
	$('.slidediv #cont2').css("display","none");
	$('.slidediv #cont3').css("display","none");
	
	if($('#downloadWinPopup').hasClass('show') == false)
	{
		$('#downloadWinPopup').addClass('show');
		_ct('winipadbtn','hmpg');
	
	} else
	{
		$('#downloadWinPopup').removeClass('show');
	}
}

$(document).on("click",  function (e) {
	
	var wipad_div = $('.wipad');
	var slide_div = $('.slidediv');
	if ((!wipad_div.is(e.target) && wipad_div.has(e.target).length === 0) && (!slide_div.is(e.target) && slide_div.has(e.target).length === 0)) {	
		$('#downloadWinPopup').removeClass('show');
	}
});

function winipadlogin(mobile,smssucess)
{
	loginId = getCookie('inLogID');
	if(!loginId){
		if(smssucess == 1){
			$.post(DOMAIN+"functions/ajxuserlogin.php", {mobile:mobile}, function(data) {
				if(data == 2){
					str = location.href;
					loc1 = str.substr(-2);
					if(loc1 == '/1'){
					  Nhref = str.replace(str.substr(-2),'');
					  window.location = Nhref;
					}
					else{
						setTimeout("location.reload(true)",500);
					}
				}
				else if(data == 3 || data == 1){
					return false;
				}
			});
		}
	}
	else if(smssucess == 1)
	{
		setTimeout("location.reload(true)",500);
	}
}

function clear_winipad_eg(eg_type,id,event,flag) {

	if(event=="onfocus") { 
		if(document.getElementById(id).value=="e.g 9867045061" || document.getElementById(id).value=="e.g. abc@xyz.com") {
			document.getElementById(id).value = "";
			document.getElementById(id).style.color = "#000000";
		}
		if(touchy && flag == 1)
		{ 
			$('.div_outer').addClass('pos_rel');
		}
	}
	if(event == "onblur") {
		if(document.getElementById(id).value=="") {
			if(id == "aem" || id == "anmail" || id == "iem" || id == "wem") {
					document.getElementById(id).value = "e.g. abc@xyz.com";
			}
			if(id == "aphn" || id == "anphone" || id == "iphn" || id == "winphn" || id == "jdmm") {
				document.getElementById(id).value = "e.g 9867045061";
			}
			
			document.getElementById(id).style.color = "#BDBDBD";
		}
		if(touchy && flag == 1)
		{
			$('.div_outer').removeClass('pos_rel');
		}
	}
}
function logAndroidAppMobile(type, popupFlag)
{
	var sndflg = 0;
	var phn	=	$("#aphnapp").val();
	if(popupFlag == 1) {
		var vcodelft = $("#vcodelftdw").val();
		var vcodert = $("#vcodertdw").val();
	} else {
		var vcodelft = $("#vcodelft").val();
		var vcodert = $("#vcodert").val();
	}
	var vcode = vcodelft+'-'+vcodert;
	var applink	= 'aib';
		var appPage = (onloadFn != '' && (onloadFn == 'jd_on_mobile' || onloadFn == 'Result' || onloadFn == 'NSsearch' || onloadFn == 'Result')) ? 'jdmpage' : '';
	if(touchy)
	{
		$('.div_outer').removeClass('pos_rel');
	}
		if(phn.search("e.g") == 0)
		{
		sndflg = 1;

		$(".jmerr").show();
		$("#aemsg").html("Please enter a valid mobile number");
		return false;
		}
		if(phn == "")
		{
		sndflg = 1;
		$(".jmerr").show();
		$("#aemsg1").html("Please enter a valid mobile number");
		return false;
		}
		if(phn != "" && phn.search("e.g") != 0 )
		{
		if(!validateMobileAndroid("aphnapp"))
		{
			sndflg = 1;
			$(".jmerr").show();
			$("#aemsg1").html("Please enter a valid mobile number"); 
			return false;
		}
		
		$fchar = phn.charAt(0);	
		if($fchar != 7 && $fchar != 8 && $fchar != 9)
		{
			sndflg = 1;
			$(".jmerr").show();
			$("#aemsg1").html("Please enter a valid mobile number"); 
			return false;
		}
		var alphaExp = /^[0-9]+$/;
		if(!phn.match(alphaExp))
		{
			sndflg = 1;
			$(".jmerr").show();
			$("#aemsg1").html("Please enter a valid mobile number"); 
			return false;
		}
		}
	if(vcode == "-" && $("#dwlpvc").is(":visible"))
		{
			sndflg = 1;
			$(".jerr error").show();
			$("#vcodelft").focus();
			$("#avcErr").html("Please enter verification code"); 
			return false;
		}
	
	if(sndflg == 0)
	{
		$(".jmerr").hide();
		
		$.get(WEBROOT+"functions/ajxandroid.php", {phn:phn,vcode:vcode,type:type,applink:applink,'apppage' : appPage},function(data) { 
			if(data == 1)
			{
				if(popupFlag == 1) {	
					$('.txt_outer').css('display', 'none');
					$('#cont3').css('display', 'block');
					$('#cont3Msg').html('Thank you for your information. SMS Sent.');
				} else {
					if(applink == 'android')
						$('#sutxt').html('Android Application');
					else
						$('#sutxt').html('JD Mobile Application');
					if($('#dwlpvc').is(':visible')){
						hideshowPopUp('dwlpvc','dwlpsu','');
					}else{
						hideshowPopUp('','dwlpsu','');
					}
				}
				//setTimeout("window.location.reload(true);",3000);
			}
			else if(data == 0)
			{
				hideshowPopUp('','dwlpvc','');
			}
			else if(data == 4)
			{
				$("#vcodelft").val('');
				$("#vcodert").val('');
				$(".jerr").show();
				$("#vcodelft").focus();
				$("#avcErr").html("Please enter correct verification code"); 
				if(popupFlag == 1) {
					$('.txt_outer').css('display', 'none');
					$('#cont2').css('display', 'block');
				} else {
				}
			}
			else if(data == 2)
			{
				if(popupFlag == 1) {
					$('.txt_outer').css('display', 'none');
					$('#cont3').css('display', 'block');
					$('#cont3Msg').html('You have reached your maximum limit of attempts for the day.Please try again later.');
					setTimeout("window.location.reload(true);",3000);
				} else {
					if(applink == 'android')
						$('#sutxt').html('Android Application');
					else
						$('#sutxt').html('JD Mobile Application');
					hideshowPopUp('','dwlpfll','');
				}
			}
			else if(data == 3)
			{
				if(popupFlag == 1) {
					$('.txt_outer').css('display', 'none');
					$('#cont3').css('display', 'block');
					$('#cont3Msg').html('Could not send SMS/Email.Please try again later.');
					setTimeout("window.location.reload(true);",3000);
				} else {
					if(applink == 'android')
						$('#sutxt').html('Android Application');
					else
						$('#sutxt').html('JD Mobile Application');
					closeDiv("dwlpvc");
					openDiv("dwlpfl");
				}
			}
		});
	}
}


function validateMobileAndroid(id)
{
    var x = ed(id).value;
     if(isNaN(x)|| x.indexOf(" ")!=-1){
             return false; }
	if (x.length != 10 ){
       	   return false;
	}
	if(x[0] == 0){
		return false;
	}
	return true;
}
