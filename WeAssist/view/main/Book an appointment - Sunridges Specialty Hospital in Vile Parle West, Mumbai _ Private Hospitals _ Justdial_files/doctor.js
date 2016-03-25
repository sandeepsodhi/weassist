var redirctErr = 0, chkAppts = 0;
var total;
var pgNo=1;
var lazyloadng=1;
var orderIntervalID1 ='';
var blockedrefnum = '';
var status_flag = true;
var org_loader_text = '';

$(document).ready(function() {
    jQuery(function() {
        var curdt = new Date();
        var strtdt = curdt.getFullYear() - 100;
        $("#patdob").datepicker({
            dateFormat: 'dd-M-yy',
           // showOn: "button",
            //buttonImage: DOMAIN+"tools/img/calendar_icon.gif",
            //buttonImageOnly: true,
            //showButtonPanel: false,
            //showOn: "both",
            beforeShowDay: nonWorkingDates,
            inline:true,
            maxDate: 0,
            changeYear: true,
            changeMonth: true,
            yearRange: strtdt + ":" + curdt.getFullYear(),
            autoSize: true,
            onSelect: function(selectedDate) {
                $('#patdob').val(selectedDate);
                var isProper = checkPatntInfo('age');
            }
        });
    });
    
    $(document).on("click","#iamPatnt",function(event){		//Iam a patient

		var userdetails = $('#userdetails').val();
		var data = JSON.parse(userdetails);
		
		$(".errorr").html("").hide();
		var alflag = $(this).prop('checked');
		if(alflag)
		{
			$('.alrtmob').addClass('dn').removeClass('dt');
			$('#altmob').val('');
			
			if(data.isExternal == "1")
			{
				//batras
				$('#patnm').val(data.ufname);
				$('#patlnm').val(data.ulname);
				$('#patmob').val(data.umobile);
				$('#patemail').val(data.uemail);
				if(data.ugender == 0)
					$("input:radio[name=patgender]:first").attr('checked', true);
				else if(data.ugender == 1)
					$("input:radio[name=patgender]:last").attr('checked', true);
				$('#patdob').val(data.udob);
			}	
			else
			{
				$('#patnm').val(data.uname);
				$('#patmob').val(data.umobile);
				if(data.ugender == 0)
					$("input:radio[name=patgender]:first").attr('checked', true);
				else if(data.ugender == 1)
					$("input:radio[name=patgender]:last").attr('checked', true);

				$('#patntage').val(data.uage);
			}
		}
		else
		{
			$('.alrtmob').addClass('dt').removeClass('dn');
			$('#altmob').val(data.umobile);
			
			if(data.isExternal == "1")
			{
				//batras
				$('#patnm').val('');
				$('#patlnm').val('');
				$('#patmob').val('');
				$('#patemail').val('');
				$("input:radio[name=patgender]").attr('checked', false);
				$('#patdob').val('');
			}	
			else
			{
				$('#patnm').val('');
				$('#patmob').val('');
				$("input:radio[name=patgender]").attr('checked', false);
				$('#patntage').val('');
			}
		}
	});
	
	/*var loginchk = getCookie('attn_user');		//Auto checked on load for loggedin flow
    var usertype = getCookie('user_type');
    if(loginchk == 'login' && usertype == 'verified_user')
    {
    	$('#iamPatnt').prop('checked',true).trigger('click').prop('checked',true);
    }*/

    /*jQuery(function() {
        var months = new Array();
        months[1] = 'Jan';
        months[2] = 'Feb';
        months[3] = 'Mar';
        months[4] = 'Apr';
        months[5] = 'May';
        months[6] = 'Jun';
        months[7] = 'Jul';
        months[8] = 'Aug';
        months[9] = 'Sep';
        months[10] = 'Oct';
        months[11] = 'Nov';
        months[12] = 'Dec';

        if($("#usrbrthdt") && $("#usrbrthdt").val() != '' && $("#usrbrthdt").val() != 'null' && $("#usrbrthdt").val()!= null && $("#usrbrthdt").val() != undefined && $("#usrbrthdt").val() != 'undefined' && typeof $("#usrbrthdt").val() != 'undefined') {
            var dtt = $("#usrbrthdt").val();
            var bdt = dtt.split('-');
            var brthdt = new Date(bdt[0], bdt[1], bdt[2]);
            $('#patdob').datepicker('setDate', brthdt.getDate() + '-' + months[brthdt.getMonth()] + '-' + brthdt.getFullYear());
        } else {
            $('#patdob').datepicker('setDate', 'today');
        }
    });*/

    $("#patdob").click(function() {
        if ($('#ui-datepicker-div').css('display') == 'block') {
             //$("select.hdn").css("visibility","hidden");
        }
    });
			
    $("#patdob").blur(function() {
        if ($('#ui-datepicker-div').css('display') == 'none') {
            $("select.hdn").css("visibility","visible");
        } 
    });

    $(document).keydown(function(event) {
        var isviconfm = $('#ptconfm').is(':visible');
        var isvidocrsch = $('#reschdlapp').is(':visible');

        if((isvidocrsch || isviconfm) && event.keyCode == 27) {
            clearConfCookie();
            window.location = baseurl;
        }

        /*var isviptn = $("#ptdtl").is(":visible");
        var isvidtpkr = $("#ui-datepicker-div").is(":visible");
        if(isviptn && event.keyCode == 27 && isvidtpkr) {
            $("#patdob").datepicker("hide");
            $("#patdob").blur();
        }*/
    });

    $(document).mousedown(function(event) {
        var isviconfm = $('#ptconfm').is(':visible');
        var isvirshdl = $('#ptrshdl').is(':visible');
        var isvidocerr = $('#docerr').is(':visible');
        var isvidocrsch = $('#reschdlapp').is(':visible');

        if(isviconfm || isvirshdl) {
            if(event.target.offsetParent != null) {
                if((isviconfm && event.target.offsetParent.id != 'ptconfm') || (isvirshdl && event.target.offsetParent.id != 'ptrshdl')) {
                    var btnevent = event.which || event.button;

                    if((isviconfm || isvirshdl) && btnevent == 1) {
                        clearConfCookie();
                        window.location = baseurl;
                    }
                } else {
                    if(event.target.id == 'ptcfmcls' || event.target.id == 'ptcfmclsres') {
                        clearConfCookie();
                        window.location = baseurl;
                    }
                }
            } else {
                clearConfCookie();
                window.location = baseurl;
            }
        } else if(isvidocerr) {
            if(event.target.offsetParent != null) {
                if(event.target.offsetParent.id != 'docerr') {
                    var btnevent = event.which || event.button;

                    if(isviconfm && btnevent == 1) {
                        window.location = baseurl;
                    }
                } else {
                    if(event.target.id == 'docerrcls') {
                        window.location = baseurl;
                    }
                }
            } else {
                window.location = baseurl;
            }
        } else if(isvidocrsch) {
            if(event.target.offsetParent != null) {
                if(event.target.offsetParent.id != '') {
                    var btnevent = event.which || event.button;

                    if(btnevent == 1 && event.target.id == 'reschdlappcls') {
                        setPatientCookie("chkdResch", '');
                        chkAppts = 0;
                    }
                } else {
                    if(event.target.id == 'reschdlappcls') {
                        window.location = baseurl;
                    } else {
                        setPatientCookie("chkdResch", '');
                        chkAppts = 0;
                    }
                }
            } else {
                setPatientCookie("chkdResch", '');
                chkAppts = 0;
            }
        }
    });
});

$(window).scroll(function(event) {
			total=Math.ceil($('#total').val()/9);
			var pagename = $('#pagename').val();
				if(getScrollTop() + $(window).height() >= $(document).height() - 500) { 

						if(pgNo < total && lazyloadng && pagename == 'my_account')
						{
							$(".load_more").html("<img src='http://img.jdmagicbox.com/icontent/sfloader.gif' /> Loading more details");
							pgNo++;
							$('#docloader').show();
							lazyloadng=0;
							showMoreDocAppointments();
						} else if(pgNo == total && pagename == 'my_account'){
							$(".load_more").html("No more details to load.");
						}
			   }
		});
		
function showMoreDocAppointments(){

		var sort = $('#sortby').val();
		$.ajax({url:DOMAIN+"webmain/doctHistory.php?sortaction="+sort+"&page="+pgNo,dataType:"json", success:function(result){
			var html='';

			if(result != ''){
				$(".load_more").html("<img src='http://img.jdmagicbox.com/icontent/sfloader.gif' /> Loading more details");
				lazyloadng=1;
				$.each(result.results, function(i,obj) 
				{
					var book_status = result.results[i].rsvndetails.booking_status;
					var str = result.results[i].compdetails.docid;
					var dcd = str.replace(".", "-");

					var str2 = result.results[i].rsvndetails.entry_date;
					var edate = str2.split(" ");
					var d = new Date(edate[0]);
					var entry_date = d.getDate() + '/' + ((d.getMonth())+1) + '/' + d.getFullYear();

					var reqbk = result.results[i].compdetails.popular_flag ? result.results[i].compdetails.popular_flag : '';
					if(reqbk == 1) {
						var IdText = 'Request '; var CnclButTxt = 'Request '; var AppbookingTxt = 'Request for Appointment';
					}else {
						var IdText  = 'Booking '; var CnclButTxt = 'Appointment '; var AppbookingTxt = 'Book New Appointment';
					}

					var curtime = Date.parse(new Date());
					
					var btime = result.results[i].rsvndetails.booking_datetime;
					var btime = btime.replace(" ", "T");
					var bktime = Date.parse(btime);

					var bdatetime = result.results[i].rsvndetails.booking_datetime;
					var bdatetime = new Date(bdatetime.replace(" ", "T"));
					var hours = bdatetime.getHours() > 12 ? bdatetime.getHours() - 12 : bdatetime.getHours();
					var am_pm = bdatetime.getHours() >= 12 ? "PM" : "AM";
					hours = hours < 10 ? "0" + hours : hours;
					var minutes = bdatetime.getMinutes() < 10 ? "0" + bdatetime.getMinutes() : bdatetime.getMinutes();
					//var seconds = bdatetime.getSeconds() < 10 ? "0" + bdatetime.getSeconds() : bdatetime.getSeconds();
					var booking_datetime = bdatetime.getDate() + '/' + ((bdatetime.getMonth())+1) + '/' + bdatetime.getFullYear() + " | "+ hours + ":" + minutes +" " + am_pm;

					
					//var book_new_url = DOMAIN+'dctcity+''/'+cnm+'-<near>-'+dcarea+'/'+dcd+'_BZDET';
					var book_new_url = result.results[i].urlpart;
					var book_new_url = DOMAIN+book_new_url.replace("~", "-<near>-");
					if(result.results[i].compdetails.totloc > 1 || result.results[i].compdetails.tothosp > 0) {
						if(book_status == 2) {
								book_new_url += '/?tab=book-appointment?stb=2&reqbk='+reqbk;
						} else {
								book_new_url += '/?tab=book-appointment&reqbk='+reqbk;
							}
					} else {
							book_new_url += '/?tab=book-appointment&reqbk='+reqbk;
					}

					if(result.results[i].compdetails.external_api == 1) {
							var cnclcls = 'disb';
							var onclick = '';
					} else {
							var cnclcls = '';
							var onclick = 'cancelHistoryAppt(\'popup\', \''+result.results[i].rsvndetails.ref_number+'\')';
					}
						

					html+='<section class="fdr_box">';
						html+='<span class="fhd"><b>'+result.results[i].compdetails.compname;
						if(result.results[i].compdetails.area)
							html+=','+result.results[i].compdetails.area+'</b></span>';
						else
							html+='</b></span>';
						
						html+='<div class="fdt">';
							html+='<span><b>Booking Date:</b> '+entry_date+'</span> | <span><b>Date &amp; Time of Appointment :</b> '+booking_datetime+'</span> | <span><b>'+IdText+'ID: </b>'+result.results[i].rsvndetails.ref_number+'</span>';
							html+='<input type="hidden" id="type_flag" name="type_flag" value="2"/>';
						html+='</div>';

							html+='<table class="odrdt" border="0" cellspacing="0" cellpadding="0"><tr><td width="15%">Name Of Doctor:</td><td width="45%">'+result.results[i].compdetails.entity_name+'</td><td rowspan="2" class="drapmnt">';

							if (book_status == -1)
							{
								html+='<a class="green" id="booknew" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \'\', \''+result.results[i].compdetails.docid+'\');">'+AppbookingTxt+'</a><a class="gray disb" id="cancelled">Cancelled</a>';
							} else if(book_status == 3)
							{
									var str6 = result.results[i].rsvndetails.booking_source;
									var n = str6.indexOf("vendor"); 
										if(n>=0) {
											if(bktime <= curtime) {
												html+= '<a class="green" id="booknew" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \'\', \''+result.results[i].compdetails.docid+'\');">'+AppbookingTxt+'<!--Book New Appointment --></a>';
											} else {
												html+= '<a class="green" id="reschedule" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \''+result.results[i].compdetails.ref_number+'\', \''+result.results[i].compdetails.docid+'\');">Reschedule </a><a class="gray '+cnclcls+'" href="javascript:;" id="cancelappt" onclick="'+onclick+'">Cancel Appointment</a>';
											}
										} else {
											html+= '<a class="green" id="booknew" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \'\', \''+result.results[i].compdetails.docid+'\');">'+AppbookingTxt+'<!--Book New Appointment --></a><a class="gray disb" id="completed">Completed</a>';
										}
							} else if(book_status == 2) {
										if(bktime <= curtime)
										{
											html+= '<a class="green" id="booknew" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \'\', \''+result.results[i].compdetails.docid+'\');">'+AppbookingTxt+'<!--Book New Appointment --></a>';
										}
										else
										{
											html+= '<a class="green" id="reschedule" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \''+result.results[i].compdetails.ref_number+'\', \''+result.results[i].compdetails.docid+'\');">Reschedule </a><a class="gray '+cnclcls+'" href="javascript:;" id="cancelappt" onclick="'+onclick+'">Cancel '+CnclButTxt+'<!--Appointment--></a>';
										}
							} else {
										html+='<a class="green" id="booknew" href="javascript:;" onclick="gotoBookNew(\''+book_new_url+'\', \'\', \''+result.results[i].compdetails.docid+'\');">'+AppbookingTxt+'<!--Book New Appointment --></a>';
									}
							html+='</td></tr>';

							
							if(result.results[i].compdetails.department)
								html+='<tr><td width="15%">Department:</td><td width="45%">'+result.results[i].compdetails.department+'</td></tr></table>';
							else html+='</table>';
					html+='</section>';
				});
				$('#apptResults').append(html);
			}
			if(pgNo >= total){
						 $(".load_more").html("No more details to load.");
					}
			
		}});
}

function checkPatntInfo(wht)
{
    var whtval = '';
    var whtdbval = '';
    var whtdbvalorg = '';
    var patntage = '';
    var isPresent = true;
    var extrnl_api = $("#external_api").val();
    if(wht == 'age') {
    	if(extrnl_api == "1")
        	whtval = $('#patdob').val();
        else
        	whtval = $('#patntage').val();
        	
        whtdbval = $('#patdbage').val();
        whtdbvalorg = whtdbval;
    } else if(wht == 'gender') {
        whtval = $('input[name=patgender]:checked').val();
        whtdbval = $('#patdbgen').val();
        whtdbvalorg = whtdbval;
    }

    //$("#patdobErr").hide();
    $("#patageErr").hide();
    $("#patgenderErr").hide();

    //$("#patdobErr").html("");
    $("#patageErr").hide();
    $("#patgenderErr").html("");

    //if(whtdbval.indexOf("-")) {
        whtdbval = whtdbval.split("-");
    //}

    if(whtval != '' && whtval != 'null' && whtval != null && whtval != 'undefined' && whtval != undefined && typeof whtval != 'undefined') {
        if(wht == 'age') {
            if(extrnl_api == "1")
            	patntage = getAge(whtval);
            else
            	patntage = parseInt(whtval);
            
            if((extrnl_api != 1) || (extrnl_api == 1 && whtdbval[0] != '' && whtdbval[0] != null && whtdbval[0] != 'null' && whtdbval[0] != 'undefined' && whtdbval[0] != undefined)) {
                if(patntage < whtdbval[0] || patntage > whtdbval[1]) {
                    isPresent = false;
                }
            }
        } else if(wht == 'gender') {
            if((extrnl_api != 1) || (extrnl_api == 1 && whtdbval[0] != '' && whtdbval[0] != null && whtdbval[0] != 'null' && whtdbval[0] != 'undefined' && whtdbval[0] != undefined)) {
                if(!in_array(whtval, whtdbval)) {
                    isPresent = false;
                }
            }
        }

        if(isPresent == false) {
            if(wht == 'age') {
                //$("#patdobErr").html("Doctor take appointment of patient between " + whtdbvalorg + " age.");
               // $("#patdobErr").show();
               $("#patageErr").html("Doctor take appointment of patient between " + whtdbvalorg + " age.");
               $("#patageErr").show();
            } else if(wht == 'gender') {
                $("#patgenderErr").html("Doctor don't see patient of the selected gender");
                $("#patgenderErr").show();
            }
        } else {
            if(wht == 'age') {
                setPatientCookie('patntdob', whtval);
                setPatientCookie('patntage', patntage);
            } else if(wht == 'gender') {
                setPatientCookie('patntgender', whtval);
            }
        }
    }

    return isPresent;
}

function in_array(needle, haystack, argStrict)
{
    var key = '', strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
    return false;
}

function getAge(dateString) {
    var months = new Array();
    months['Jan'] = 1;
    months['Feb'] = 2;
    months['Mar'] = 3;
    months['Apr'] = 4;
    months['May'] = 5;
    months['Jun'] = 6;
    months['Jul'] = 7;
    months['Aug'] = 8;
    months['Sep'] = 9;
    months['Oct'] = 10;
    months['Nov'] = 11;
    months['Dec'] = 12;

    var today = new Date();
    var dte_splt = dateString.split('-');
    var birthDate = new Date(dte_splt[2], months[dte_splt[1]], dte_splt[0]);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = (today.getMonth()+1) - birthDate.getMonth();

    if (m < 0) {
        age--;
    } else if(m === 0 && birthDate.getDate() < today.getDate()) {
        age++;
    }

    return age;
}

function startCalendar(month, year, docid)
{
    var spltcaldt = '';
    if(year != 0) {
        if(month> 12) {
            month = 1;
            year  = +year+1;
        } else if (month < 1) {
            month = 12;
            year  = +year-1;
        }
    }

    if(docid == undefined || docid == null || docid == '') {
        docid = '';
    }

    var timestmp = new Date().getTime();

    if(docid != '') {
        $.post(DOMAIN+"webmain/doc.php",{action:'startCalendar', forWhere:'', fromWhere:'Inner_Page_Calendar', tflag: trim($("#type_flag").val()), docdetails: '', month:month, year:year, doctid:docid, base_url: baseurl, timestamp: timestmp}, function(data) {        
            var dataev = eval('(' + data + ')');
            data = dataev.cal_data;

            if(data.indexOf('|@|') != -1) {
                spltcaldt = data.split('|@|');
                if(spltcaldt[1] == 'ACTION') {
                    $('#docerrmsg').html('Please enter action');
                } else if(spltcaldt[1] == 'DEFAULT') {
                    $('#docerrmsg').html('No matching action found');
                } else {
                    $('#docerrmsg').html(spltcaldt[1]);
                }
                openDiv('docerr');
                document.getElementById('calendarInternal').innerHTML = '';
            } else {
                document.getElementById('calendarInternal').innerHTML = data;
            }
        });
    }

    return false;
}

function startCalendarDet(month, year, docid)
{
    var spltcaldt = '';
    if(year != 0) {
        if(month> 12) {
            month = 1;
            year  = +year+1;
        } else if (month < 1) {
            month = 12;
            year  = +year-1;
        }
    }

    if(docid == undefined || docid == null || docid == '') {
        docid = '';
    }

    var timestmp = new Date().getTime();

    $.post(DOMAIN+"webmain/doc.php",{action:'startCalendar', forWhere:'details', fromWhere:'Details_Page_Calendar', tflag: trim($("#type_flag").val()), docdetails: '', month:month, year:year, doctid:docid, base_url: baseurl, timestamp: timestmp}, function(data) {        
        var dataev = eval('(' + data + ')');
        data = dataev.cal_data;

        if(data.indexOf('|@|') != -1) {
            spltcaldt = data.split('|@|');
            if(spltcaldt[1] == 'ACTION') {
                $('#docerrmsg').html('Please enter action');
            } else if(spltcaldt[1] == 'DEFAULT') {
                $('#docerrmsg').html('No matching action found');
            } else {
                $('#docerrmsg').html(spltcaldt[1]);
            }
            openDiv('docerr');
            document.getElementById('calendarInternal').innerHTML = '';
        } else {
            document.getElementById('calendarInternal').innerHTML = data;
        }
    });

    return false;
}


function selDocLocation(doctid, nxturl, scase, mdoctids, chkd)
{
    var ischkd = getCookie('chkdResch');

    if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
        //setPatientCookie('chkdResch', 1);
        ischkd = 1;
    }

    if(typeof scase != 'undefined' && scase != '' && scase != null && scase != undefined && scase != 'undefined' && scase != 'null') {
        if(ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') {
            setPatientCookie('doctid', doctid);
            checkAppointments(doctid, nxturl, mdoctids);
        } else {
            setPatientCookie('doctid', doctid);
            window.location.href = nxturl;
        }
    } else {
        setPatientCookie('doctid', doctid);
        window.location.href = nxturl;
    }
    return false;
}

function setDetailsRedirect(doctid, nxturl, mdoctids, dochk, chkd)
{
    var ischkd = getCookie('chkdResch');
    setPatientCookie('doctid', doctid);
    var isdochk = (dochk != '' && dochk != null && dochk != 'null' && dochk != 'undefined' && dochk != undefined && typeof dochk != 'undefined') ? 1 : 0;

    if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
       // setPatientCookie('chkdResch', 1);
        ischkd = 1;
        
        if((ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') && isdochk) {
		    checkAppointments(doctid, nxturl, mdoctids);
		} else {
		    window.location.href = nxturl;
		}
    }
    else
    {
    	if((ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') && isdochk) {
		    checkAppointments(doctid, nxturl, mdoctids);
		} else {
		    window.location.href = nxturl;
		}
    }
}

function checkAppointments(doctid, nxturl, mdoctids, isReturn)
{
    var pmobno = $("#patmob").val();
    if(!pmobno) mobno = getCookie('inLogMobile');
    else mobno = pmobno;
    var extrnl_api = $("#external_api").val();
    var timestmp = new Date().getTime();
    var html_not = '';
    var html_can = '<tr><th width="10%"></th><th width="40%">Booking ID</th><th width="25%">Date</th><th width="25%">Time</th></tr>';
    var result = new Array();
    var reqbk = $("#reqbk").val();
    if(!reqbk) reqbk = $("#poplr_flg").val();
    var logchk = getCookie('attn_user');
    var usrtype = getCookie('user_type');
    $("#BtnCnclAppt").show();

    var ret = false;

    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'checkPreAppts',
            mobno: mobno,
            mdoctids : mdoctids,
            timestamp: timestmp
        },
        success: function(res) {
            result = eval('(' + res + ')');

            if(result.length > 0) {
				
				//if(((logchk != '' && logchk != null && logchk != undefined && logchk != 'undefined' && logchk != 'null' && typeof logchk != 'undefined') || usrtype == 'verified_user') && pmobno == mobno) {
				if(logchk == 'login' && usrtype == 'verified_user' && (pmobno == mobno || $("#patmob").val() == undefined)) {
					chkAppts = 1;
					//setPatientCookie('chkdResch', getCookie('inLogMobile')+'-'+getCookie('doctid')); //mobno-docid
					
					for(var i=0; i<result.length; i++) {
						if(result[i].error == 1) {
							var id = result[i].resp[0].rsvndetails.ref_number;
							var booking_det = result[i].resp[0].rsvndetails.booking_datetime_format;
							bdate = booking_det.split('|~|');

							if(result[i].resp[0].compdetails.entity_name == result[i].resp[0].compdetails.entity_workplace) {
								ent_wrkplc = result[i].resp[0].compdetails.entity_workplace + "'s Clinic.";
							} else {
								ent_wrkplc = result[i].resp[0].compdetails.entity_workplace + '.';
							}

							if(result[i].resp[0].compdetails.entity_name.indexOf('(') != -1) {
								ent_nm = result[i].resp[0].compdetails.entity_name.split("(");
								entity_name = ent_nm[0];
							} else {
								entity_name = result[i].resp[0].compdetails.entity_name;
							}

							html_not = 'You have an appointment with ' + entity_name + ' on ' + bdate[0] + ' at ' + bdate[1] + ' at ' + ent_wrkplc;
							html_not += '<br/>';
							html_not += 'The appointment cannot be rescheduled / cancelled as per the cancellation policy of the doctor.';

							//$("#docerrmsg").html(html_not);
						} else {
							var id = result[i].rsvndetails.ref_number;
							var booking_det = result[i].rsvndetails.booking_datetime_format;
							bdate = booking_det.split('|~|');
							if(reqbk == 1){
							$('#dtltext').html('Request details:');	
							$('#reschmsgs').html('You have already requested appointment with :');
							$('#BtnresdlAppt').html('Reschedule Request');
							$('#BtnCnclAppt').html('Cancel Request');
							}else{
							$('#dtltext').html('Appointment details:');
							$('#reschmsgs').html('You have already booked appointment with :');
							$('#BtnresdlAppt').html('Reschedule Appointment');
							$('#BtnCnclAppt').html('Cancel Appointment');
							}	
							$('#patname').html("Hi, "+decodeURIComponent(result[i].usrdetails.name));
							$('#doc_name').html("\""+decodeURIComponent(result[i].compdetails.compname)+"\"");
							html_can += '<tr><td id="td_'+id+'"><input type="checkbox" name="checkbox" onclick="selectAppt(\''+id+'\');" value="'+id+'"/></td><td>#'+id+'</td><td>'+bdate[0]+'</td><td>'+bdate[1]+'</td></tr>';
							$('#dettab').html(html_can);

							if(parseInt(extrnl_api) == 1) {
								$("#BtnCnclAppt").hide();
							}
						}
					}
					closeDiv('docloading');
					if(html_not != '') {
						redirctErr = 1;
						$("#docerrmsg").html(html_not);
						openDiv('docerr');
					} else {
						redirctErr = 1;
						if(reqbk == 1){
						$('#reschmsg').html('You have already requested appointment with :');
						}else{
						$('#reschmsg').html('You have already booked appointment with :');
						}
						openDiv('reschdlapp');
					}
				}
				else
				{
						var bstatus = result[0].rsvndetails.booking_status;
						if(bstatus==1 || bstatus=='1')
						{
							var blkappid = result[0].rsvndetails.ref_number;
							$.ajax({
								url: DOMAIN + 'webmain/doc.php',
								async: false,
								type: 'POST',
								data: {
									action: 'canblockedappt',
									preRefNum: blkappid,
									actionflag : '-1'
								},
								success: function(res) {
									
									}
								});
							ret = true;
						}
						else
						{
							closeDiv('docloading');
							setPatientCookie('chkdResch', '');		//Non-loggedin flow
							redirctErr = 1;
							$("#docerrmsg").html("You already have a Appointment.</br>Please login and Reschedule/Cancel the Appointment");
							openDiv('docerr');
						}
				}
				
            } else if(isReturn == undefined || isReturn == 'undefined' || typeof isReturn == 'undefined' || isReturn == '' || isReturn == null || isReturn == 'null') {
                var predid = getCookie('doctid');

                if(predid != '' && predid != null && predid != undefined && predid != 'undefined' && predid != 'null') {
                    if(doctid != predid) {
                        setPatientCookie('mdyapp', '');
                        setPatientCookie('apprefnumber', '');
                    }
                }

                setPatientCookie('doctid', doctid);
                window.location.href = nxturl;
            } else {
                setPatientCookie('doctid', doctid);
                ret = true;
            }
        }
    });

    return ret;
}

function selAppointmentDate(doctid, nxturl, cdte, mdoctids, chkcase, chkd)
{
	var refno = '';
	refno = $('#oldrefno').val();
	var resc_flag=1;
	if(refno)
	{
		$.ajax({
			url: DOMAIN + 'webmain/doc.php',
			async: false,
			type: 'POST',
			data: {
				action:'cancelPolicy',
				appid: refno
			},
			success: function(data) {
				if(data == '' || data == null || data == 'null' || data == undefined || typeof data == 'undefined') {
					
					resc_flag=0;
					$("#docerrmsg").html("There was some problem in Rescheduling.\nPlease try again!");
					openDiv('docerr');
				} else {
					var poplr_flg = $("#poplr_flg").val();
					var splt_dt = data.split('|@|');
					if(splt_dt[0] == 0) {
						setPatientCookie('mdyapp', 2);
						setPatientCookie('canReschLink', 1);
						setPatientCookie('apprefnumber', refno);
						setPatientCookie('chkdResch', getCookie('inLogMobile')+'-'+getCookie('doctid')); //mob-docid
					} else {
						resc_flag=0;
						if(splt_dt[1] == 'NOT_CANCEL') {
							$("#docerrmsg").html("Appointments cannot be rescheduled!");
							openDiv('docerr');
						} else {
							
							$("#docerrmsg").html(splt_dt[1]);
							openDiv('docerr');
						}
					}
				}
			}
		});
	}
	
	if(resc_flag)
	{
		setPatientCookie('bookdate', cdte);
		setPatientCookie('doctid', doctid);
		var ischkd = getCookie('chkdResch');

		if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
			//setPatientCookie('chkdResch', 1);
			ischkd = 1;
			}

			if(chkcase != undefined && typeof chkcase != 'undefined' && chkcase != '' && chkcase != null && chkcase != 'null' && chkcase != 'undefined') {
				if(ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') {
					checkAppointments(doctid, nxturl, mdoctids);
				} else {
					if(nxturl != undefined && typeof nxturl != 'undefined' && nxturl != '' && nxturl != null && nxturl != 'null' && nxturl != 'undefined') {
						nurl = nxturl;
					} else {
						nurl = baseurl+'/?tab=book-appointment&stb=3&dt='+cdte;
					}

					window.location.href = nurl;
				}
			} else {
				if(nxturl != undefined && typeof nxturl != 'undefined' && nxturl != '' && nxturl != null && nxturl != 'null' && nxturl != 'undefined') {
					nurl = nxturl;
				} else {
					nurl = baseurl+'/?tab=book-appointment&stb=3&dt='+cdte;
				}

				window.location.href = nurl;
			}
			return false;
	}
}

function selectDoctorDetail(doctid, nxturl, mdoctids, chkcase)
{
    setPatientCookie('doctid', doctid);
    var ischkd = getCookie('chkdResch');

    if(chkcase != undefined && typeof chkcase != 'undefined' && chkcase != '' && chkcase != null && chkcase != 'null' && chkcase != 'undefined') {
        if(ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') {
            checkAppointments(doctid, nxturl, mdoctids);
        } else {
            window.location.href = nxturl;
        }
    } else {
        window.location.href = nxturl;
    }
    return false;
}

function selectDoctor(doctid, nxturl, mdoctids, chkcase, chkd)
{
    setPatientCookie('doctid', doctid);
    var ischkd = getCookie('chkdResch');

    if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
        //setPatientCookie('chkdResch', 1);
        ischkd = 1;
    }

    if(chkcase != undefined && typeof chkcase != 'undefined' && chkcase != '' && chkcase != null && chkcase != 'null' && chkcase != 'undefined') {
        if(ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') {
            checkAppointments(doctid, nxturl, mdoctids);
        } else {
            window.location.href = nxturl;
        }
    } else {
        window.location.href = nxturl;
    }
    return false;
}

function selectFilterType(selid, selop)
{
    if(selid == 'doclist')
        $('#deptlist').hide();
    else
        $('#doclist').hide();

    if(selop == 'selbydoc')
        $('#selbydept').removeClass('sel');
    else
        $('#selbydoc').removeClass('sel');

    if(!$('#'+selop).hasClass('sel'))
        $('#'+selop).addClass('sel');

    $('#'+selid).show();
}

function highlightCalendarCell(element)
{
    $('#'+element).css('border', 'solid 1px #999999');
}

function resetCalendarCell(element)
{
    $('#'+element).css('border', 'solid 1px #ccc');
}

function filterDocs(tid, btnclk)
{
    var docval = trim($("#"+tid).val());
    docval = docval.toLowerCase();
    var splti;

    var curid, isAvailable;
    var isvidept=0, isvidoc=0;
    var totdeptvisid = Array();
    var totdocvisid = Array();

    $("#deptli").show();
    $("#docli").show();

    if(docval.toLowerCase().indexOf('dr') == 0) {
        docval = docval.replace('dr', '');
    }
    docval = trim(docval);

    $("#doclist li").each(function() {
        curid = this.id;

        if(curid != '')
        {
            isAvailable = $('#'+curid+" a").text().toLowerCase().indexOf(docval);

            if(isAvailable != -1) {
                $("#"+curid+"").show();

                if($("#"+curid).hasClass('first_child'))
                    $("#"+curid).removeClass('first_child');

                if($("#"+curid).hasClass('last_child'))
                    $("#"+curid).removeClass('last_child');
            } else if(typeof btnclk == 'undefined') {
                if(docval.indexOf(' ') != -1) {
                    var myregexp = new RegExp(/ {2,}/g);
                    docval = docval.replace(myregexp,' ');
                    var spltdocnm = docval.split(' ');

                    for(splti = 0; splti < spltdocnm.length; splti++) {
                        isAvailable = $('#'+curid+" a").text().toLowerCase().indexOf(spltdocnm[splti]);
                        if(isAvailable != -1) {
                            $("#"+curid).show();

                            if($("#"+curid).hasClass('first_child'))
                                $("#"+curid).removeClass('first_child');

                            if($("#"+curid).hasClass('last_child'))
                                $("#"+curid).removeClass('last_child');

                            break;
                        } else {
                            $("#"+curid).hide();
                        }
                    }
                } else {
                    $("#"+curid).hide();
                }
            } else {
                $("#"+curid).hide();
            }
        }
    });

    $("#doclist li").each(function() {
        clscurid = this.id;

        if(clscurid != '') {
            if(clscurid.indexOf('dept') != -1) {
                if($("#" + clscurid).is(':visible')) {
                    totdeptvisid[isvidept] = clscurid;
                    isvidept++;
                }
            } else {
                if($("#" + clscurid).is(':visible')) {
                    totdocvisid[isvidoc] = clscurid;
                    isvidoc++;
                }
            }
        }
    });

    if(isvidept > 0) {
        $('#deptli').show();
        $("#depthead").show();
    } else {
        $("#depthead").hide();
        $('#deptli').hide();
    }

    if(isvidoc > 0) {
        $("#docli").show();
    } else {
        $("#docli").hide();
    }

    if(docval != '') {
        $("#" + totdeptvisid[0]).addClass('first_child');
        $("#" + totdeptvisid[isvidept-1]).addClass('last_child');

        $("#" + totdocvisid[0]).addClass('first_child');
        $("#" + totdocvisid[isvidoc-1]).addClass('last_child');
    }
}

function sendVerifyCode(mobnoId,mobnoErr)
{
    $("#dcvcodeErr").hide();
    $("#dcvcodeErr").html("");
    
    var mobno = $.trim($('#'+mobnoId).val());

    var timestmp = new Date().getTime();
    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'sendVerCode',
            mobno: mobno,
            preRefNum: blockedrefnum,
            timestamp: timestmp
        },
        success: function(res) {
            var spltdata = res.split("|@|");
            closeDiv('docloading');
            if(spltdata[0] == 1) {
				$('#vmobile').html(mobno);
				//if(spltdata[2]) //email display
					//$('#pemal').html(' and '+spltdata[2]);
                openDiv('dcvfy');
                
                clearInterval(orderIntervalID1);
				clearInterval(intervalID);
				timerFlag = false;
                var fiveMinutes = 5*60;
				display = $('#time');
				mtype = $('#disptime');
				startTimer(fiveMinutes, display, mtype);
				getTimerStatus();
				
            } else {
                if(spltdata[1] == 'ACTION' || spltdata[1] == 'DEFAULT') {
                    $("#genErr").html('Please enter Action');
                    $("#genErr").show();
                } else if(spltdata[1] == 'LIMIT') {
                    $("#genErr").html("SMS Limit reached");
                    $("#genErr").show();
                } else if(spltdata[1] == 'MOBNO') {
                    $("#"+mobnoId).focus();
                    $("#"+mobnoErr).html("Please enter mobile number");
                    $("#"+mobnoErr).show();
                } else {
                    $("#genErr").html("Verification code send failure");
                    $("#genErr").show();
                }
				closeDiv('docloading');
            }
        }
    });
}

function getTimerStatus()
{
	var mobno = ($('#iamPatnt').prop('checked')) ? trim($("#patmob").val()) : trim($("#altmob").val());
	
	orderIntervalID1 = setInterval(function(){

		if(timerFlag) {
			timerFlag = false;
			closeDiv('dcvfy');
			openDiv('vcodexpir');	//session expired popup
			clearInterval(orderIntervalID1);
		}
		else
		{
			$.ajax({
				url: DOMAIN + 'webmain/doc.php',
				type: 'POST',
				data: {
					action: 'checkVerCode',
					check: 'checkmobver',
					mobno: mobno
				},
				success: function(res){
					if(res==1)
					{
						if(status_flag)
						{
							timerFlag = false;
							clearInterval(intervalID);
							clearInterval(orderIntervalID1);
							closeDiv('dcvfy');
							openDiv('docloading');
							bookappointment();
						}
					}
				}
			});
		}
		
		if(!($('#dcvfy').is(':visible')) && !timerFlag) {
			timerFlag = false;
			clearInterval(orderIntervalID1);
		}
		
	},5000);
}
	
function resendVerifyCode()
{
    var pmbno = ($('#iamPatnt').prop('checked')) ? trim($("#patmob").val()) : trim($("#altmob").val());

    var timestmp = new Date().getTime();
    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'resendVerCode',
            mobno: pmbno,
            preRefNum: blockedrefnum,
            timestamp: timestmp
        },
        success: function(res) {
            var spltdata = res.split("|@|");
            if(spltdata[0] == 1) {
				
				clearInterval(orderIntervalID1);
				clearInterval(intervalID);
				timerFlag = false;
                var fiveMinutes = 5*60;
				display = $('#time');
				mtype = $('#disptime');
				startTimer(fiveMinutes, display, mtype);
				getTimerStatus();
				
                $("#dcvcodeErr").html('Verification code sent.');
                $("#dcvcodeErr").show();
            } else {
                if(spltdata[1] == 'ACTION' || spltdata[1] == 'DEFAULT') {
                    $("#dcvcodeErr").html('Please enter Action');
                    $("#dcvcodeErr").show();
                } else if(spltdata[1] == 'LIMIT') {
                    $("#dcvcodeErr").html("SMS Limit reached");
                    $("#dcvcodeErr").show();
                } else {
                    $("#dcvcodeErr").html("Verification code send failure");
                    $("#dcvcodeErr").show();
                }
            }
        }
    });
}

function combineVerCode(vcid, nxturl, mdoctids, frstid, scndid)
{
    var frstvercode = '';
    var scndvercode = '';
    var vercode = '';
    var validcode;
	var pname = trim($("#patnm").val());
    var pmbno = ($('#iamPatnt').prop('checked')) ? trim($("#patmob").val()) : trim($("#altmob").val());
	
	$("#" + vcid + "Err").html("");
	$("#" + vcid + "Err").hide();

	frstvercode = $('#' + frstid).val();
	scndvercode = $('#' + scndid).val();

	if(frstvercode == '' || frstvercode == null || frstvercode == undefined || scndvercode == '' || scndvercode == null || scndvercode == undefined) {
		$("#" + frstid).focus();
		$("#" + vcid + "Err").html("Please enter verification code");
		$("#" + vcid + "Err").show();
	} else {		
		vercode = $('#' + frstid).val() + "-" + $('#' + scndid).val();
		validcode = verifyCode(pmbno, vercode, pname);
		if(validcode) {
			$.ajax({type: 'POST', url: DOMAIN+"webmain/doc.php", async:false, data: {action:'updatestatus', preRefNum: blockedrefnum, actionflag: '2'},success: function(data) {

					var data = eval('(' + data + ')');
					if(data.error.code==0)
					{
						closeDiv('dcvfy');
						openDiv('docloading');
					}
					else
					{
						
						status_flag = false;
						$('#docerrmsg').html(data.error.msg);
						redirctErr = 1;
						closeDiv('dcvfy');
						openDiv('docerr');
					}
				}
			});
		}
	}
}

var cnt = 0;
function bookappointment()
{
	var flag = 0;
	var curl = baseurl+'?tab=book-appointment&stb=5&refno='+blockedrefnum;
	cnt++;
	$.ajax({type: 'POST', url: DOMAIN+"webmain/doc.php", async:false, data: {action:'rsvndetails', preRefNum: blockedrefnum},success: function(data) {
			var bookdetails = eval('(' + data + ')');
							
			if(bookdetails.error.code==0 && bookdetails.results.rsvndetails.booking_status==2)
			{
				flag = 1;
				setPatientCookie('patntnm', bookdetails.results.usrdetails.name);
				setPatientCookie('patntlnm', bookdetails.results.usrdetails.last_name);
				setPatientCookie('patntmob', bookdetails.results.usrdetails.mobile);
				setPatientCookie('patntemail', bookdetails.results.usrdetails.email);
				setPatientCookie('mdyapp', '');
				setPatientCookie('chkdResch', '');
				setPatientCookie('apprefnumber', bookdetails.results.rsvndetails.ref_number);
				window.location.href = curl;
			}
			if(cnt>=10)	window.location.href = curl;
		}
	});
	if(!flag)
		setTimeout(function(){ bookappointment(); }, 5000);
}

function verifyCode(pmbno, code, pnm)
{
    var flag = 0;
    var timestmp = new Date().getTime();

    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'checkVerCode',
            mobno: pmbno,
            bname: pnm,
            vcode: code,
            timestamp: timestmp
        },
        success: function(res){
            var spltdata = res.split("|@|");

            if(spltdata[0] == 1) {
                flag = 1;
                timerFlag = false;
				clearInterval(intervalID);
				clearInterval(orderIntervalID);
            } else {
                if(spltdata[1] == 'ACTION' || spltdata[1] == 'DEFAULT') {
                    $("#dcvcodeErr").html('Please enter Action');
                } else if(spltdata[1] == 'MOBNO_VCODE') {
                    $("#dcvcodeErr").html("Please enter verification code");
                } else if(spltdata[1] == 'NOT_FOUND') {
                    $("#dcvcodeErr").html("Verification code not found");
                } else {
                    $("#dcvcodeErr").html("Please enter valid verification code");
                }
                $("#dcvcode").focus();
                $("#dcvcodeErr").show();
                flag = 0;
            }
        }
    });

    return flag;
}

function confirmApp(apptime, appdate, timeshow, patntnmck, patntmobck, doctidck, mdyappck, apprefck, chkd)
{
    $("#plzwtxt").hide();
    $("#subptn").show();
    var ischkd = getCookie('chkdResch');

    if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
        //setPatientCookie('chkdResch', 1);
    }

    if((getCookie('doctid') == '' || getCookie('doctid') == null) && (doctidck != '' && doctidck != null && doctidck != 'null')) {
        setPatientCookie('doctid', doctidck);
    }

    if((getCookie('patntnm') == '' || getCookie('patntnm') == null) && (patntnmck != '' && patntnmck != null && patntnmck != 'null')) {
        setPatientCookie('patntnm', patntnmck);
    }

    if((getCookie('patntmob') == '' || getCookie('patntmob') == null) && (patntmobck != '' && patntmobck != null && patntmobck != 'null')) {
        setPatientCookie('patntmob', patntmobck);
    }

    if((getCookie('mdyapp') == '' || getCookie('mdyapp') == null) && (mdyappck != '' && mdyappck != null && mdyappck != 'null')) {
        setPatientCookie('mdyapp', mdyappck);
    }

    if((getCookie('apprefnumber') == '' || getCookie('apprefnumber') == null) && (apprefck != '' && apprefck != null && apprefck != 'null')) {
        setPatientCookie('apprefnumber', apprefck);
    }

    

    /*var appdocid = (doctidck) ? doctidck : getCookie('doctid');
    var pname = (patntnmck) ? patntnmck : getCookie('patntnm');
    var pmob = (patntmobck) ? patntmobck : getCookie('patntmob');

    if(appdocid == '' || appdocid == null || appdocid == undefined || pmob == '' || pmob == null || pmob == undefined || pname == '' || pname == null || pname == undefined) {
        clearConfCookie();
        window.location = baseurl;
    }*/

    setPatientCookie('appTime', apptime);
    setPatientCookie('appDate', appdate);

    //$('#timeAppt').html(timeshow);

    /*openDiv('cnfapp');*/
    if(getCookie('canReschLink') == '1')
	{
		 openDiv('docloading');
		 confirmAppointment();
	}
    else
    {
		var burl = window.location.search + "&time=" + apptime;
    	burl = burl.replace('stb=3', 'stb=4');
    	window.location = burl;
    }
    return false;
}

function showloader(thisObj)
{
	org_loader_text = $(thisObj).text();
	
	var width = $(thisObj).css("width");
	var height = $(thisObj).css("height");
	
	$(thisObj).html('');
	$(thisObj).addClass('loader_blue_vertical');
	$(thisObj).css("width",width);
	$(thisObj).css("height",height);
}

function remove_loader(thisObj){
    $(thisObj).removeClass('loader_blue_vertical').text(org_loader_text);
}

function submitPatient()
{
	$(".read").attr("readonly", true);
    var valdtls = validateDetails();

    $(".read").attr("readonly", false);
    if(!valdtls){
    	remove_loader('#submit_patient');
        return false;
    }

    var pmbno = trim($("#patmob").val());
    var amob = ($('#iamPatnt').prop('checked')) ? '' : trim($("#altmob").val());
    var doctid = getCookie("doctid");
    var logchk = getCookie('attn_user');
    var usrtype = getCookie('user_type');
    var mdoctids = getCookie('mdoctids');
    var chklmts = false;
    var chklmtsarr = '';
    var chkrschdl = '';
    var ischkd = getCookie('chkdResch');
    var prelog_mob = getCookie('inLogMobile');
    var prerefnum = getCookie('apprefnumber');
    var changeapp = getCookie('mdyapp');

    $("#genErr").html("");

    $("#genErr").hide();

    if(valdtls)
    {
        /*$("#plzwtxt").show();
        $("#subptn").hide();*/
		//var pmbno = trim($("#patmob").val());

		var is_status = '';
		var timestmp = new Date().getTime();

		openDiv('docloading');

		$.ajax({
			url: DOMAIN + 'webmain/doc.php',
			async: true,
			type: 'POST',
			data: {
				action: 'checkLimit',
				mobno: pmbno,
				actionflag: 1,
				fromWhere:'Inner_Page_Calendar',
				timestamp: timestmp
			},
			success: function(res){
				chklmtsarr = res;
				//console.log(res);
				//return false;
				if(chklmtsarr != '' && chklmtsarr != null && chklmtsarr != 'null' && chklmtsarr != undefined && chklmtsarr != 'undefined' && typeof chklmtsarr != 'undefined') {
					if(chklmtsarr.indexOf('|@|')) {
						chklmtsarr = chklmtsarr.split("|@|");

						if(chklmtsarr[0] == 1) {
							remove_loader('#submit_patient');
							if(chklmtsarr[1] >= 5) {
								closeDiv('docloading');
								$("#genErr").html('You have reached limit for booking');
								$("#genErr").show();
							} else {
								chklmts = true;
							}
						} else {
							closeDiv('docloading');
							if(chklmtsarr[1] == '' || chklmtsarr[1] == null || chklmtsarr[1] == 'null' || chklmtsarr[1] == 'undefined' || chklmtsarr[1] == undefined || typeof chklmtsarr[1] == 'undefined') {
								$("#genErr").html('There was some error due to which appointment limits were not check.');
								$("#genErr").show();
							} else {
								$("#genErr").html(chklmtsarr[1]);
								$("#genErr").show();
							}
						}
					} else {
						closeDiv('docloading');
						$("#genErr").html('There was some error due to which appointment cannot be confirmed.');
						$("#genErr").show();
					}
				} else {
					closeDiv('docloading');
					$("#genErr").html('There was some error due to which appointment cannot be confirmed.');
					$("#genErr").show();
				}

				if(chklmts) {
					if(mdoctids == '' || mdoctids == 'null' || mdoctids == null || mdoctids == 'undefined' || typeof mdoctids == 'undefined' || mdoctids == undefined) {
						mdoctids = doctid;
					}

					if(ischkd == '' || ischkd == null || ischkd == 'null' || ischkd == 'undefined' || ischkd == undefined || typeof ischkd == 'undefined') {
						if(prerefnum == '' ||  changeapp == '' || prerefnum == undefined || changeapp == undefined)
						{
							chkrschdl = checkAppointments(doctid, '', mdoctids, true);
						}
						else
						{
							chkrschdl = true;
						}
					} else {
						chkrschdl = true;
					}
				}
				
			if(chkrschdl) {
        	
        		var cmobile = ($('#iamPatnt').prop('checked')) ? trim($("#patmob").val()) : trim($("#altmob").val());
        		
					//if(((logchk != '' && logchk != null && logchk != undefined && logchk != 'undefined' && logchk != 'null' && typeof logchk != 'undefined') || usrtype == 'verified_user') && prelog_mob == pmbno) {

					if(logchk == 'login' && usrtype == 'verified_user' && prelog_mob == cmobile) {
						confirmAppointment();
				}
				else {

					var pname = trim($("#patnm").val());
					var plname = '';
					var pmob = trim($("#patmob").val());
					var patemail = '';
					var changeapp = getCookie('mdyapp');
					var prerefnum = getCookie('apprefnumber');
					var appdocid = getCookie('doctid');
					
					var amob = ($('#iamPatnt').prop('checked')) ? '' : trim($("#altmob").val());
    				var aname = '';
    				var amail = '';
    	
					var reschflag = getCookie('chkdResch');
					if(reschflag.length >1)
					{
						reschflag = reschflag.split('-');
						if(reschflag[0] == '' || reschflag[0] != pmob || reschflag[1] != appdocid)
						{
							prerefnum = '';
							changeapp = '';
						}
					}

					var appdate = getCookie('appDate');
					var apptime = getCookie('appTime');
					var patgen = $('input[name=patgender]:checked').val();
					var patrsn = $("#patreason").val();
					var extn_api = $("#external_api").val();
					if(extn_api == "1")
					{
						var patdob = $("#patdob").val();
						var patage = '';
					}
					else
					{
						var patdob = '';
						var patage = $('#patntage').val();
					}
					var reqbk = $("#reqbk").val();
					var patnature = $('input[name=patnature]:checked').val(), urcty = getcity;
					var batra_apt_id = '';
					var chkextrnl = true;
					
					if(extn_api != 'null' && (extn_api == 1 ||extn_api == '1') && extn_api != null && typeof extn_api != 'undefined' && extn_api != undefined && extn_api != 'undefined') {
						plname = trim($("#patlnm").val());
						patemail = trim($("#patemail").val());
					}
					else
					{
						$.ajax({type: 'POST', url: DOMAIN+"webmain/doc.php", async:false, data: {action:'patemail', mobno: pmob},success: function(edata) {
							var edata = eval('(' + edata + ')');
							patemail = edata.email;
						}
					});
					}
					
					if(urcty == '' || urcty == null || urcty == 'null' || urcty == 'undefined' || urcty == undefined || typeof urcty == 'undefined') {
						urcty = hiddencity;
					}

					var timestmp = new Date().getTime();

					var canCheck = (changeapp == '' || changeapp == null || changeapp == 'null' || changeapp == 'undefined' || changeapp == undefined || typeof changeapp == 'undefined') ? true : false;
					if(extn_api != 'null' && extn_api != 0 && extn_api != null && typeof extn_api != 'undefined' && extn_api != undefined && extn_api != 'undefined' && canCheck) {
						chkextrnl = checkExternalBookings();
					}

					if(chkextrnl == false) {
						$("#docerrmsg").html("Patient <b>'"+pname+"'</b> already has an active appointment with Dr. Batra's, To book an appointment for another member use his/her first name.");
						closeDiv('docloading');
						$("#plzwtxt").hide();
						$("#subptn").show();
						redirctErr = 1;
						openDiv('docerr');
					} else {

						$.post(DOMAIN+"webmain/doc.php",{action:'confirmApp', doctid:appdocid, call_name:aname, call_mobno:amob, call_mail:amail, mobno:pmob, bname:pname, blstname: plname, book_city: urcty, reason:patrsn, nature:patnature, patage:patage, patdob:patdob, patgender:patgen, bdate:appdate, btime:apptime, actionflag:1, bemail:patemail, numbook:1, preRefNum: prerefnum, changeApp: changeapp, external_api:extn_api, external_flag:'book', timestamp: timestmp}, function(data){
							var sptcdt	= data.split("|@|");
							if(sptcdt[0] == 1) {
								var bookdetails = eval('(' + sptcdt[1] + ')');
								var refnum = bookdetails.results.rsvndetails.ref_number;
								blockedrefnum = refnum;
								if(amob == '')
								{
									sendVerifyCode('patmob','patmobErr');
								}
								else
								{
									sendVerifyCode('altmob','altmobErr');
								}
							}
							else
							{
								if(sptcdt[1] == 'ACTION' || sptcdt[1] == 'DEFAULT')
								{
									$('#docerrmsg').html('Action is mandatory');
								}
								else if(sptcdt[1] == 'MAX_LIMIT')
								{
									redirctErr = 1;
									$('#docerrmsg').html("You have reached maximum booking limit");
								}
								else if(sptcdt[1] != '' && sptcdt[1] != null && sptcdt[1] != undefined)
								{
									redirctErr = 1;
									$('#docerrmsg').html(sptcdt[1]);
								}
								else
								{
									$('#docerrmsg').html('There was some problem while booking appointment. Please try again later');
									redirctErr = 1;
								}
								closeDiv('docloading');
								openDiv('docerr');
							}
						});
					}
				}
			}
			}
		});
    }
}

function checkAppointmentLimits()
{
    var pmbno = trim($("#patmob").val());

    var is_status = '';
    var timestmp = new Date().getTime();

    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'checkLimit',
            mobno: pmbno,
            actionflag: 1,
            fromWhere:'Inner_Page_Calendar',
            timestamp: timestmp
        },
        success: function(res){
            is_status = res;
        }
    });

    return is_status;
}

function checkExternalBookings()
{
    var fname = trim($("#patnm").val());
    var mbno = trim($("#patmob").val());
    var timestmp = new Date().getTime();
    var flag = true;

    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'chkExtrnlBook',
            mobno: mbno,
            bname: fname,
            timestamp: timestmp
        },
        success: function(res) {
            var spltdata = res.split("|@|");
            if(spltdata[0] == 0) {
                flag = false;
            }
        }
    });

    return flag;
}

function validateDetails()
{
    var fname = trim($("#patnm").val());
    var mbno = trim($("#patmob").val());
    var email = '';
    var rsn = trim($("#patreason").val());
    var extrnl_api = $("#external_api").val();
    var gndr = true;
    var chkgndr = '';
    var vstntr = true;
    var patdob = '';
    var patdobvisible = false;
    var lname = '';

    if(extrnl_api != 'null' && extrnl_api == '1' && extrnl_api != null && typeof extrnl_api != 'undefined' && extrnl_api != undefined && extrnl_api != 'undefined') {
        lname = trim($("#patlnm").val());
        email = trim($("#patemail").val());
    }

    if($("#patGen").is(":visible")) {
        if($('input[name=patgender]:checked').length <= 0) {
            gndr = false;
        //} else if(extrnl_api == '' || extrnl_api == null || extrnl_api == 0 || extrnl_api == 'undefined' || extrnl_api == 'null' || typeof extrnl_api == 'undefined') {
        } else {
            gndr = checkPatntInfo('gender');
            chkgndr = 1;
        }
    }

    if($("#patAge").is(":visible")) {
    	if(extrnl_api == "1")
        	patdob = $("#patdob").val();
        else
        	patdob = $("#patntage").val();
        patdobvisible = $("#patAge").is(":visible");
    }

    if ($('input[name=patnature]:checked').length <= 0) {
        vstntr = false;
    }

    var flag = false;

    $("#patnm").val(fname);
    $("#patmob").val(mbno);

	$(".errorr").html("").hide();
    /*$("#patnmErr").hide();
    $("#patmobErr").hide();
    $("#patgenderErr").hide();
    $("#patreasonErr").hide();
    $("#patnatureErr").hide();
    $("#patdobErr").hide();

    $("#patnmErr").html("");
    $("#patmobErr").html("");
    $("#patgenderErr").html("");
    $("#patreasonErr").html("");
    $("#patnatureErr").html("");
    $("#patdobErr").html("");*/

    if(extrnl_api != 'null' && extrnl_api == '1' && extrnl_api != null && typeof extrnl_api != 'undefined' && extrnl_api != undefined && extrnl_api != 'undefined') {
        $("#patlnm").val(lname);
        $("#patlnmErr").hide();
        $("#patlnmErr").html("");

        $("#patemail").val(email);
        $("#patemailErr").hide();
        $("#patemailErr").html("");
    }

    if(validate_fname(fname, 'fname') && validate_fname(lname, 'lname')) {
		if(validate_mobile('patmob','patmobErr')) {
			if(!$('#iamPatnt').prop('checked')) {
				if(validate_mobile('altmob','altmobErr')) {
					if($.trim($("#patmob").val()) == $.trim($("#altmob").val()))
					{
						$("#altmobErr").html("Your Mobile Number is same as Patient's Number").show();
        				$("#altmob").focus();
        				flag = false;
        				return false;
					}
				}
			}
			if(validate_email(email)) {
                if(gndr) {
                    if(validate_birthdate(patdob, patdobvisible)) {
                        if(validate_reason(rsn)) {
                            //if(vstntr) {
                                if(validate_badwords('patmob','patmobErr', fname, lname)) {
                                	if(!$('#iamPatnt').prop('checked'))
                                	{
										if(validate_badwords('altmob','altmobErr', fname, lname))
										{
                                    		flag = true;
                                   		}
                                   	}
                                   	else
                                   	{
                                   		flag = true;
                                   	}
                                }
                            /*} else {
                                $("#patnatureErr").html('Please select nature of visit');
                                $("#patnatureErr").show();
                            }*/
                        }
                    }
                } else {
                    if(chkgndr == '') {
                        $("#patgenderErr").html('Please select gender');
                    } else if(chkgndr == 1) {
                        $("#patgenderErr").html("Doctor don't see patient of the selected gender");
                    }
                    $("#patgenderErr").show();
                    flag = false;
                }
            }
        }
    }

    return flag;
}

function validate_badwords(mbnoId, mbnoErr, fname, lname)
{
    var flag = true;
    var timestmp = new Date().getTime();
	var mbno = $('#'+mbnoId).val();
	
    $.ajax({
        url: DOMAIN + 'webmain/doc.php',
        async: false,
        type: 'POST',
        data: {
            action: 'checkBadList',
            mobno: mbno,
            bname: fname,
            blstname: lname,
            timestamp: timestmp
        },
        success: function(res) {
            var spltdata = res.split("|@|");
            if(spltdata[0] == 1) {
                $("#patnm").val(trim(spltdata[1]));
                $("#patlnm").val(trim(spltdata[2]));
            } else {
                if(spltdata[1] == 'ACTION' || spltdata[1] == 'DEFAULT') {
                    $("#genErr").html('Please enter Action');
                    $("#genErr").show();
                } else if(spltdata[1] == 'MOBNO') {
                    $("#"+mbnoId).focus();
                    $("#"+mbnoErr).html("Mobile Number is mandatory");
                    $("#"+mbnoErr).show();
                } else if(spltdata[1] == 'NAME') {
                    $("#patnm").focus();
                    $("#patnmErr").html("Name is mandatory");
                    $("#patnmErr").show();
                } else if(spltdata[1] == 'LNAME') {
                    $("#patlnm").focus();
                    $("#patlnmErr").html("Last Name is mandatory");
                    $("#patlnmErr").show();
                } else if(spltdata[1] == 'BLOCK') {

                	var h = '<section class="jpbg"><span class="jcl" onClick="openDiv(\'ptdtl\');">X</span><p class="cfm" id="docerrmsg" style="font-size:14px";>This number is blocked from availing this service.<br>To know the reasons please write to <a href="mailto:rusers@justdial.com">rusers@justdial.com</a></p><p class="oc_outer"><button class="jbtn" type="button" onClick="closeErrPopup();openDiv(\'ptdtl\');" >Ok</button></p></section>';
                	
                	$('#docerr').html(h);
					openDiv('docerr');
					
                } else {
                    $("#genErr").html(spltdata[1]);
                    $("#genErr").show();
                }

                flag = false;
            }
        }
    });

    return flag;
}

function validate_fname(fname, wht)
{
    var nmExp = /^[a-zA-Z]+([.]{0,1}[']{0,1}[ ]{0,1}[a-zA-Z]+)*$/;
    var flag = true;
    var extrnl_api = $("#external_api").val();
    if(fname == '' || fname == null || fname == undefined) {
        if(wht == 'fname') {
            $("#patnmErr").html("Please enter name");
            $("#patnm").focus();
            $("#patnmErr").show();
            flag = false;
        } else if(wht == 'lname' && extrnl_api != 'null' && extrnl_api == '1' && extrnl_api != null && typeof extrnl_api != 'undefined' && extrnl_api != undefined && extrnl_api != 'undefined') {
            $("#patlnmErr").html("Please enter last name");
            $("#patlnm").focus();
            $("#patlnmErr").show();
            flag = false;
        }
    } else if(nmExp.test(fname) == false) {
        if(wht == 'fname') {
            $("#patnmErr").html("Please enter valid name");
            $("#patnm").focus();
            $("#patnmErr").show();
            flag = false;
        } else if(wht == 'lname' && extrnl_api != 'null' && extrnl_api == '1' && extrnl_api != null && typeof extrnl_api != 'undefined' && extrnl_api != undefined && extrnl_api != 'undefined') {
            $("#patlnmErr").html("Please enter valid last name");
            $("#patlnm").focus();
            $("#patlnmErr").show();
            flag = false;
        }
    }

    return flag;
}

function validate_reason(reason)
{
    var extrnl_api = $("#external_api").val();
    var flag = true;
    if(reason != '' && reason != null && reason != undefined && reason != 'null' && reason != 'undefined') {
        if(isNaN(reason) == false && extrnl_api != 1) {
            $("#patreasonErr").html("Please enter valid reason of visit");
            $("#patreason").focus();
            $("#patreasonErr").show();
            flag = false;
        }
    } else if(extrnl_api == 1 && (reason == '' || reason == null || reason == 'null' || reason == undefined || reason == 'undefined') || typeof reason == 'undefined') {
        $("#patreasonErr").html("Please select reason of visit");
        $("#patreasonErr").show();
        flag = false;
    }

    return flag;
}

function validate_mobile(valid,valerr) 
{
	var mobno = $("#"+valid).val();
    var mobExp = /^[7,8,9]{1}[0-9]{9}$/;
    var flag = true;
    
    if(mobno == '' || mobno == null || mobno == undefined) {
        $("#"+valerr).html("Please enter mobile number").show();
        $("#"+valid).focus();
        flag = false;
    } else if(mobExp.test(mobno) == false) {
        $("#"+valerr).html("Please enter valid number").show();
        $("#"+valid).focus();
        flag = false;
    }

    return flag;
}

function validate_email(email)
{
    var flag = true;
    var extrnl_api = $("#external_api").val();

    if(extrnl_api != 'null' && (extrnl_api == '1' && extrnl_api != null && typeof extrnl_api != 'undefined' && extrnl_api != undefined && extrnl_api != 'undefined')) {
        if(email == '' || email == null || email == undefined) {
            $("#patemailErr").html("Please enter email address");
            $("#patemail").focus();
            $("#patemailErr").show();
            flag = false;
        } else {
            /*var emailExpJD = /^[a-zA-Z0-9._-]+@justdial.com$/i;
            if(email.match(emailExpJD)) {
                $("#patemailErr").html("Please do not use your justdial email id");
                $("#patemail").focus();
                $("#patemailErr").show();
                flag = false;
            } else {*/
                flag = isValidEmail(email);
            //}
        }
    }

    return flag;
}

function isValidEmail(email)
{
    var flag = true;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var isSpace = email.indexOf(" ");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length || isSpace != -1) {
        $("#patemailErr").html("Please enter valid email address");
        $("#patemail").focus();
        $("#patemailErr").show();
        flag = false;
    }

    return flag;
}

function validate_birthdate(bdt, ptvsbl)
{
    var flag = true;
    var extrnl_api = $("#external_api").val();

    if(ptvsbl && (bdt == '' || bdt == null || bdt == undefined)) {

    	if(extrnl_api == "1")
    	{
    		$("#patdobErr").html("Please enter Date of Birth");
        	$("#patdobErr").show();
    	}
    	else
    	{
    		$("#patageErr").html("Please select a valid age.");
        	$("#patageErr").show();
    	}
    	   
        flag = false;
    } else if(ptvsbl) {
        flag = checkPatntInfo('age');
    }

    return flag;
}

function confirmAppointment()
{
	
    var pname = $("#patnm").val();
    var plname = '';
    var pmob = $("#patmob").val();
    var amob = ($('#iamPatnt').prop('checked')) ? '' : $("#altmob").val();
    if(amob == '')
    {
    	var aname = '';
    	var amail = '';
    }
    else
    {
    	if(getCookie('canReschLink') != '1')
    	{
			var userdetails = $('#userdetails').val();
			var data = JSON.parse(userdetails);
		
			var aname = data.uname;
			var amail = data.uemail;
		}
    }
    
    var patemail = ''; //getCookie('inLogEmail');
    var prerefnum = getCookie('apprefnumber');
    var changeapp = getCookie('mdyapp');
    var appdocid = getCookie('doctid');
    var reschflag = getCookie('chkdResch');
    var appdate = getCookie('appDate');
    var apptime = getCookie('appTime');
    var patgen = getCookie('patntgender');
    
    var patage = getCookie('patntage');
    var patrsn = $("#patreason").val();
    var extn_api = $("#external_api").val();
    if(extn_api == '1')
    	var patdob = $("#patdob").val(); //getCookie('patntdob');
    else
    	var patdob = '';
    var reqbk = $("#reqbk").val();
    var patnature = $('input[name=patnature]:checked').val(), urcty = getcity;
    var batra_apt_id = '';
    var chkextrnl = true;
			
    if(extn_api != 'null' && (extn_api == 1 ||extn_api == '1') && extn_api != null && typeof extn_api != 'undefined' && extn_api != undefined && extn_api != 'undefined') {
        plname = trim($("#patlnm").val());
        patemail = trim($("#patemail").val());
    }
    else
    {
    	$.ajax({type: 'POST', url: DOMAIN+"webmain/doc.php", async:false, data: {action:'patemail', mobno: pmob},success: function(edata) {
				var edata = eval('(' + edata + ')');
				patemail = edata.email;
			}
		});
    }

	if(reschflag.length >1)
	{
		reschflag = reschflag.split('-');
		if(reschflag[0] == '' || reschflag[0] != pmob || reschflag[1] != appdocid)
		{
			prerefnum = '';
			changeapp = '';
		}
	}
	
	if(getCookie('canReschLink') == '1')
	{
		var d = getCookie('resdlLinkData');
		d = JSON.parse(d);
		pname = d.name;
		pmob = d.mobile;
		plname = d.last_name;
        patemail = d.email;
        patgen = d.gender;
        patdob = d.dob;
        if(patdob!='')
			patage = getAge(patdob);
		else if(d.age !='')
			patage = d.age;
		
        patrsn = d.reason_visit;
        patnature = d.nature_visit;
        reqbk = d.reqbk;
        
        aname = d.caller_name;
        amob = d.caller_mobile;
        amail = d.caller_email;
        
        prerefnum = getCookie('apprefnumber');
   		changeapp = getCookie('mdyapp');
	}
    if(urcty == '' || urcty == null || urcty == 'null' || urcty == 'undefined' || urcty == undefined || typeof urcty == 'undefined') {
        urcty = hiddencity;
    }
	
    var timestmp = new Date().getTime();

	var canCheck = (changeapp == '' || changeapp == null || changeapp == 'null' || changeapp == 'undefined' || changeapp == undefined || typeof changeapp == 'undefined') ? true : false;
	if(extn_api != 'null' && (extn_api == 1 ||extn_api == '1') && extn_api != null && typeof extn_api != 'undefined' && extn_api != undefined && extn_api != 'undefined' && canCheck) {
		chkextrnl = checkExternalBookings();
	}

	if(chkextrnl == false) {
		$("#docerrmsg").html("Patient <b>'"+pname+"'</b> already has an active appointment with Dr. Batra's, To book an appointment for another member use his/her first name.");
		closeDiv('docloading');
		$("#plzwtxt").hide();
		$("#subptn").show();
		redirctErr = 1;
		openDiv('docerr');
	} else {

		$.post(DOMAIN+"webmain/doc.php",{action:'confirmApp', doctid:appdocid, call_name:aname, call_mobno:amob, call_mail:amail, mobno:pmob, bname:pname, blstname: plname, book_city: urcty, reason:patrsn, nature:patnature, patage:patage, patdob:patdob, patgender:patgen, bdate:appdate, btime:apptime, actionflag:2, bemail:patemail, numbook:1, preRefNum: prerefnum, changeApp: changeapp, external_api:extn_api, timestamp: timestmp}, function(data){
			var sptcdt	= data.split("|@|");
			if(sptcdt[0] == 1) {
				var bookdetails = eval('(' + sptcdt[1] + ')');
						
				var curl = baseurl+'?tab=book-appointment&stb=5&refno='+bookdetails.results.rsvndetails.ref_number;
				setPatientCookie('apprefnumber', bookdetails.results.rsvndetails.ref_number);
				window.location.href = curl;
			}
			else
			{
				if(sptcdt[1] == 'ACTION' || sptcdt[1] == 'DEFAULT')
				{
					$('#docerrmsg').html('Action is mandatory');
				}
				else if(sptcdt[1] == 'MAX_LIMIT')
				{
					redirctErr = 1;
					$('#docerrmsg').html("You have reached maximum booking limit");
				}
				else if(sptcdt[1] != '' && sptcdt[1] != null && sptcdt[1] != undefined)
				{
					redirctErr = 1;
					$('#docerrmsg').html(sptcdt[1]);
				}
				else
				{
					$('#docerrmsg').html('There was some problem while booking appointment. Please try again later');
					redirctErr = 1;
				}
				closeDiv('docloading');
				//$("#cnfpopbtns").show();
				//$("#plzwtxt").hide();
				openDiv('docerr');
			}
		});
	}
}

function closeErrPopup()
{
    if(redirctErr && redirctErr == 1) {
        clearConfCookie();
        window.location = baseurl;
    } else {
        closeDiv('docerr');
        chkAppts = 0;
    }
}

function setDataRedirect(nxturl, ptnmob, ptnm, dcid, mdappt, apptref, chkd)
{
    var expDate = new Date();
    expDate.setYear(expDate.getFullYear() + 1);
    var ischkd = getCookie('chkdResch');

    if(chkd != undefined && chkd != '' && chkd != 'null' && chkd != null && chkd != 'undefined' && typeof chkd != 'undefined' && (ischkd == '' || ischkd == 'null' || ischkd == null || ischkd == undefined || ischkd == 'undefined' || typeof ischkd == 'undefined')) {
        //setPatientCookie('chkdResch', 1);
    }

    if(ptnm != '' && ptnm != null && typeof ptnm != 'undefined') {
        document.cookie = "patntnm" + "=" + escape(ptnm) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }

    if(ptnmob != '' && ptnmob != null && typeof ptnmob != 'undefined') {
        document.cookie = "patntmob" + "=" + escape(ptnmob) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }

    if(dcid != '' && dcid != null && typeof dcid != 'undefined') {
        document.cookie = "doctid" + "=" + escape(dcid) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }

    if(apptref != '' && apptref != null && typeof apptref != 'undefined') {
        document.cookie = "apprefnumber" + "=" + escape(apptref) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }

    if(mdappt != '' && mdappt != null && typeof mdappt != 'undefined') {
        document.cookie = "mdyapp" + "=" + escape(mdappt) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }

    window.location = nxturl;
}


var selectAppt = function(id) {
    if(!selectAppt.appts) selectAppt.appts = [];

    var ind = selectAppt.appts.indexOf(id);

    if(ind>-1) {
        selectAppt.appts.splice(ind,1);
    } else {
        selectAppt.appts.push(id);
    }
}

function cancelApp(appidlink)
{
    //var value = $("input:checkbox[name='checkbox']:checked").val();
    if((selectAppt.appts && selectAppt.appts.length > 0) || appidlink) {
		openDiv('docloading');
		
		if(selectAppt.appts && selectAppt.appts.length > 0)
			var appID = selectAppt.appts.join();
		else if(appidlink)
			var appID = appidlink;
			
        $.post(DOMAIN+"webmain/doc.php",{action:'cancelAppt', appid: appID}, 
        function(data) {
            var splt_dt = data.split('|@|');

            if(splt_dt[0] == 1) {
                $("#docerrmsg").html('Appointment cancelled successfully.');
            } else {
                if(splt_dt[1] != '' && splt_dt[1] != null && splt_dt[1] != null && splt_dt[1] != 'null') {
                    if(splt_dt[1] == 'NOT_CANCEL') {
                        $("#docerrmsg").html('Appointment cannot be cancelled!');
                    } else {
                        $("#docerrmsg").html(splt_dt[1]);
                    }
                } else {
                    $("#docerrmsg").html('There was some problem cancelling appointment. Please try again!');
                }

				if(!appidlink)
				{
					if(selectAppt.appts.length > 0) {
						selectAppt.appts = [];
					}
				}
            }

            if(window.location.href.indexOf('tab=book-appointment') != -1) {
                redirctErr = 1;
            }

			if(selectAppt.appts && selectAppt.appts.length > 0)
				closeDiv('reschdlapp');
				
            closeDiv('docloading');
            openDiv('docerr');
        });
    } else {
        alert("Please select appointment id to cancel");
    }
}

function rescheduleApp(nxturl)
{
    var t_loc = '';
    var t_hosp = '';
    var ischkd = getCookie('chkdResch');

    if(!selectAppt.appts || !selectAppt.appts.length) {
        alert('Please select appointment id to reschedule');
    } else {
        if($("input:checkbox[name='checkbox']:checked").length != $("input:checkbox[name='checkbox']").length) {
            alert("All appointments should be selected for rescheduling.\n Selecting all appointments.");
            $("input:checkbox[name='checkbox']").each(function(i){
                if(!$(this).is(':checked')) {
                    $(this).attr('checked', 'checked');
                    selectAppt($(this).attr('value'));
                }
            });
        }

        $.post(DOMAIN+"webmain/doc.php",{action:'cancelPolicy', appid: selectAppt.appts.join()}, function(data) {
            if(data == '' || data == null || data == 'null' || data == undefined || typeof data == 'undefined') {
                closeDiv('reschdlapp');
                $("#docerrmsg").html("There was some problem.\nPlease try again!");
                openDiv('docerr');
            } else {
                var poplr_flg = $("#poplr_flg").val();
                var splt_dt = data.split('|@|');
                if(splt_dt[0] == 0) {
                    setPatientCookie('mdyapp', 2);
                    setPatientCookie('apprefnumber', selectAppt.appts.join());
                    //if(ischkd != '' || ischkd != null || ischkd != 'null' || ischkd != 'undefined' || ischkd != undefined || typeof ischkd != 'undefined') {
						setPatientCookie('chkdResch', getCookie('inLogMobile')+'-'+getCookie('doctid'));//mob-docid
					//}

                    closeDiv('reschdlapp');
                    if(tabVal == 'apptime') {
                        openDiv('docloading');
                        confirmAppointment();
                    } else {
                        t_loc = $("#total_loc").val();
                        t_hosp = $("#total_hosp").val();
                        var bkdte = getCookie('bookdate');
                        var doctid = getCookie('doctid');
                        if(nxturl == '' || nxturl == 'null' || nxturl == null || nxturl == 'undefined' || nxturl == undefined || typeof nxturl == 'undefined') {
                            if(t_loc == 1) {
                                if(bkdte == '' || bkdte == null || bkdte == 'null' || bkdte == 'undefined' || bkdte == undefined || typeof bkdte == 'undefined') {
                                    nxturl = baseurl + '?tab=book-appointment&reqbk='+poplr_flg;
                                } else {
                                    if(poplr_flg == 1){
                                    nxturl = baseurl + '?tab=book-appointment&dt='+bkdte+'&stb=3&reqbk=1';
                                    }else{
                                    nxturl = baseurl + '?tab=book-appointment&dt='+bkdte+'&stb=3';
									}
                                }
                            } else if(t_loc > 1) {
								if(poplr_flg == 1){
									nxturl = baseurl + '?tab=book-appointment&reqbk=1&stb=2';
								}else{
									nxturl = baseurl + '?tab=book-appointment&stb=2';
								}	
                            } else if(t_hosp >= 1) {
                                if(doctid != '' && doctid != 'null' && doctid != null && doctid != 'undefined' && doctid != undefined && typeof doctid != 'undefined') {
                                    nxturl = baseurl + '?tab=book-appointment&stb=2';
                                }
                            }
                        }

                        window.location.href = nxturl;
                    }
                } else {
                    if(splt_dt[1] == 'NOT_CANCEL') {
                        if(window.location.href.indexOf('tab=book-appointment') != -1) {
                            redirctErr = 1;
                        }

                        closeDiv('reschdlapp');
                        $("#docerrmsg").html("Appointments cannot be rescheduled!");
                        openDiv('docerr');
                    } else {
                        if(window.location.href.indexOf('tab=book-appointment') != -1) {
                            redirctErr = 1;
                        }

                        closeDiv('reschdlapp');
                        closeDiv('docloading');
                        $("#docerrmsg").html(splt_dt[1]);
                        openDiv('docerr');
                    }

                    if(selectAppt.appts.length > 0) {
                        selectAppt.appts = [];
                    }
                }
            }
        });
    }
}

function setNxtLnk(dcid)
{
    if(dcid != '' && dcid != 'null' && dcid != null && dcid != 'undefined' && dcid != undefined) {
        setPatientCookie('doctid', dcid);
    }

    openDiv('rlogin');
}

function setPatientCookie(CookieName, CookieValue)
{
    var expDate = new Date();
    var blankexpDate = new Date();

    expDate.setYear(expDate.getFullYear() + 1);

    blankexpDate.setDate(blankexpDate.getDate() - 1);

    if(CookieValue === '') {
        document.cookie = escape(CookieName) + "=" + escape(CookieValue) + "; expires=" + blankexpDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    } else {
        document.cookie = escape(CookieName) + "=" + escape(CookieValue) + "; expires=" + expDate.toGMTString() + "; path=/; domain=" + cookieondomain;
    }
}

function saveDoctID(doctid, hurl)
{
	setPatientCookie('doctid', doctid);
	window.location = hurl;
}

function clearConfCookie()
{
    setPatientCookie('apprefnumber', '');
    setPatientCookie('patntmob', '');
    setPatientCookie('patntnm', '');
    setPatientCookie('patntlnm', '');
    setPatientCookie('patntemail', '');
    setPatientCookie('doctid', '');
    setPatientCookie('appDate', '');
    setPatientCookie('appTime', '');
    setPatientCookie('bookdate', '');
    setPatientCookie('mdyapp', '');
    setPatientCookie('chkdResch', '');
    setPatientCookie('patntdob', '');
    setPatientCookie('patntage', '');
    setPatientCookie('patntgender', '');
}
