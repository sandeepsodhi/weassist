<?php 
session_start();
//session_destroy();
//echo isset($_SESSION['u_name']); 
if(isset($_SESSION['u_name']))
$_SESSION['test']=$_SESSION['u_name'];
else
$_SESSION['test']='';
//$_SESSION['u_name']='';


?>
<!DOCTYPE html>
<html class="not-ie no-js" lang="en">  

<head>

	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>WeAssist </title>


	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
	
	
	
	<!-- CSS
	================================================== -->
	<!-- Base + Vendors CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/docs.min.css">
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
    <link href="assets/js/validate.js" rel="stylesheet" />
        
    <!-- FONT AWESOME ICONS STYLE SHEET -->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    

	<!-- Head Libs -->
	<script src="vendor/modernizr.js"></script>

	<!-- validation -->
	    <link href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/css/bootstrap.css" rel="stylesheet" media="screen">
	<link href="http://cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.0/css/bootstrapValidator.css" rel="stylesheet"/>	




	
	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/favicons/favicon.ico">
	<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/favicon-120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/favicon-152.png">
	
<!-- timing display css -->
	<link rel="stylesheet" href="css/timingstyle.css">

<style>
#myModl{
height: 1000px;
width: 80%;
margin-left: 140px;
/*margin-right: 60px;*/
margin-bottom: 20px;
margin-top: 20px;


}
.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 1px solid #999;
  border-top: none;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #B2D7FF;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}

</style>

</head>
<body>

	<div class="site-wrapper">

<?php include('header.php'); ?>		<!-- Header / End -->

		<!--login/register sign-up box-->
					<!-- Main -->
		<div class="main" role="main">

			<!-- Slider -->
			<section class="slider-holder">
				<div class="flexslider carousel">
					<ul class="slides">
						<li>
							<img src="images/samples/slide1.jpg" alt="" />
						</li>
						<li>
							<img src="images/samples/slide2.jpg" alt="" />
						</li>
						<li>
							<img src="images/samples/slide3.jpg" alt="" />
						</li>
					</ul>

					<div class="search-box">
						<div class="container">
							<div class="search-box-inner">
								<h1>Search for Professionals</h1>
								<form action="#">

									<div class="row" style="margin-left: 21%">
										<div class="col-md-8">
										<font   color="black">
											<div class="form-group">
												<input type="text" id="search-input" class="form-control" placeholder="Search For Job"
												 onKeydown="javascript: if (event.keyCode==13) ressearch();">
											</div>
										</div>
										<div class="col-md-1">
											<button type="button" id="btnsearch" name="btnsearch" class="btn btn-primary btn-block"><i class="fa fa-search"></i></button>
										</div>
										</font>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div class="title-bordered" id="searchtitle" >
			<br/>
						<h2 visibility="hidden">Search Result<small>Here</small></h2>
					    
					</div>

				<div id="loc"  visibility="hidden"  ><!--  data-toggle="modal" data-target="#myModl" > --> 
						<!-- <h4  id="nosearch" style="display: none;" >Sorry No Data Found</h4>				 -->
				</div>

			<section class="page-content" id="pagec">
				<div class="container">
                	
					<!-- Stats -->
					<div class="section-light section-nomargin">
						<div class="section-inner">
							<div class="row">
								<div class="col-md-3">
									<div class="counter-holder counter-dark">
										<i class="fa fa-3x fa-suitcase"></i>
										<span class="counter-wrap">
											<span class="counter" data-to="42" data-speed="1500" data-refresh-interval="50">42</span>
										</span>
										<span class="counter-info">
											<span class="counter-info-inner">All Jobs</span>
										</span>
									</div>
								</div>
								<div class="col-md-3">
									<div class="counter-holder counter-dark">
										<i class="fa fa-3x fa-thumbs-o-up"></i>
										<span class="counter-wrap">
											<span class="counter" data-to="12" data-speed="1500" data-refresh-interval="50">12</span>
										</span>
										<span class="counter-info">
											<span class="counter-info-inner">Jobs Filled</span>
										</span>
									</div>
								</div>
								<div class="col-md-3">
									<div class="counter-holder counter-dark">
										<i class="fa fa-3x fa-user"></i>
										<span class="counter-wrap">
											<span class="counter" data-to="48" data-speed="1500" data-refresh-interval="50">48</span>
										</span>
										<span class="counter-info">
											<span class="counter-info-inner">Professionals</span>
										</span>
									</div>
								</div>
								<div class="col-md-3">
									<div class="counter-holder counter-dark">
										<i class="fa fa-3x fa-users"></i>
										<span class="counter-wrap">
											<span class="counter" data-to="64" data-speed="1500" data-refresh-interval="50">64</span>
										</span>
										<span class="counter-info">
											<span class="counter-info-inner">Members</span>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Stats / End -->

						<div class="spacer-xl"></div>

					<!-- Services -->
					<div class="title-bordered">
						<h2>Our Services <small>services we provided</small></h2>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-bug"></i>
								</div>
								<div class="icon-box-body">
									<h5>Pest Control</h5>
									<p>We use the latest technology to test new and innovated products so we can protect.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-cog"></i>
								</div>
								<div class="icon-box-body">
									<h5>Engineering Consultant</h5>
									<p>Consulting engineering is a professional service that provides independent expertise.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-recycle"></i>
								</div>
								<div class="icon-box-body">
									<h5>Environmental Consulting</h5>
									<p>Managing, protecting and restoring the environment are integral to our services.</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-suitcase"></i>
								</div>
								<div class="icon-box-body">
									<h5>Handiwork</h5>
									<p>We are professional tile installers who can install and repair tile in many areas of your home.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-lightbulb-o"></i>
								</div>
								<div class="icon-box-body">
									<h5>Lighting Design</h5>
									<p>Professional lighting designers dedicate their careers exclusively to the art and science of lighting.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-cube"></i>
								</div>
								<div class="icon-box-body">
									<h5>Storage</h5>
									<p>Hiring our professional handyman services ensures proper storage installation.</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-tree"></i>
								</div>
								<div class="icon-box-body">
									<h5>Tree Service</h5>
									<p>Provides vegetation management, storm restoration, and work planning services.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-car"></i>
								</div>
								<div class="icon-box-body">
									<h5>Moving</h5>
									<p>Whether you're moving down the street or across the country, we'll help you manage your relocation stress.</p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="entypo tools"></i>
								</div>
								<div class="icon-box-body">
									<h5>General Contracting</h5>
									<p>We develop special tailor-made solutions in collaboration with our customers.</p>
								</div>
							</div>
						</div>
					</div>
					<!-- Services / End -->

					<!-- Clients -->
					<div class="section-light section-bg2 section-overlay__yes section-overlay-color__primary section-overlay_opacity-90" data-stellar-background-ratio="0.5">
						<div class="section-inner">
							<div class="row">
								<div class="col-sm-3 col-md-3">
									<div class="text-center">
										<a href="#"><img src="images/samples/client-logo1-dark.png" alt="" class="img-responsive"></a>
									</div>
								</div>
								<div class="col-sm-3 col-md-3">
									<div class="text-center">
										<a href="#"><img src="images/samples/client-logo2-dark.png" alt="" class="img-responsive"></a>
									</div>
								</div>
								<div class="col-sm-3 col-md-3">
									<div class="text-center">
										<a href="#"><img src="images/samples/client-logo3-dark.png" alt="" class="img-responsive"></a>
									</div>
								</div>
								<div class="col-sm-3 col-md-3">
									<div class="text-center">
										<a href="#"><img src="images/samples/client-logo4-dark.png" alt="" class="img-responsive"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Clients / End -->

					<div class="spacer"></div>

					<!-- Testimonials -->
					<div class="title-bordered">
						<h2>Testimonials <small>what clients say</small></h2>
					</div>
					<div class="row">
						<div class="col-md-3">
							<div class="testimonial">
								<blockquote>
									<p>If you're faced with home improvement or repair tasks, and don't have the time, I would give Handyman my highest recommendation.</p>
								</blockquote>
								<div class="bq-author">
									<figure class="author-img">
										<img src="images/samples/user1-sm.jpg" alt="">
									</figure>
									<h6>Michael Smith</h6>
									<span class="bq-author-info">Copywriter</span>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="testimonial">
								<blockquote>
									<p>They worked hard and offered to help me set up my furniture once it was in my new home.</p>
									<p>Very pleased!</p>
								</blockquote>
								<div class="bq-author">
									<figure class="author-img">
										<img src="images/samples/user3-sm.jpg" alt="">
									</figure>
									<h6>Bradley Cooper</h6>
									<span class="bq-author-info">Teacher</span>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="testimonial">
								<blockquote>
									<p>The movers were friendly, helpful, polite, professional and efficient. They did a great job! I would highly recommend them! Thank you!</p>
								</blockquote>
								<div class="bq-author">
									<figure class="author-img">
										<img src="images/samples/user2-sm.jpg" alt="">
									</figure>
									<h6>Hanna Pinkman</h6>
									<span class="bq-author-info">Radiologist</span>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="testimonial">
								<blockquote>
									<p>I am very happy with their work. they did a great job. They were very helpful with other aspects of the work i had in mind. They were very clean, and very quick.</p>
								</blockquote>
								<div class="bq-author">
									<figure class="author-img">
										<img src="images/samples/user4-sm.jpg" alt="">
									</figure>
									<h6>Erick Fox</h6>
									<span class="bq-author-info">Botanist</span>
								</div>
							</div>
						</div>
					</div>
					<!-- Testimonials / End -->

				</div>
			</section>
			<!-- Page Content / End -->

			<!-- Footer -->
			<footer class="footer" id="footer">
				<div class="footer-widgets">
					<div class="container">
						<div class="row">
							<div class="col-sm-4 col-md-4">
								<!-- Widget :: Contacts Info -->
								<div class="contacts-widget widget widget__footer">
									<h3 class="widget-title">Contact Us</h3>
									<div class="widget-content">
										<ul class="contacts-info-list">
											<li>
												<i class="fa fa-map-marker"></i>
												<div class="info-item">
													HandyMan Co., Old Town Avenue, New York, USA 23000
												</div>
											</li>
											<li>
												<i class="fa fa-phone"></i>
												<div class="info-item">
													+1700 124-5678<br>
													+1700 124-5678
												</div>
											</li>
											<li>
												<i class="fa fa-envelope"></i>
												<span class="info-item">
													<a href="mailto:info@dan-fisher.com">support@dan-fisher.com</a>
												</span>
											</li>
											<li>
												<i class="fa fa-clock-o"></i>
												<div class="info-item">
													Monday - Friday 9:00 - 21:00
												</div>
											</li>
										</ul>
									</div>
								</div>
								<!-- /Widget :: Contacts Info -->
							</div>
							<div class="col-sm-4 col-md-4">
								<!-- Widget :: Latest Posts -->
								<div class="latest-posts-widget widget widget__footer">
									<h3 class="widget-title">Recent Posts</h3>
									<div class="widget-content">
										<ul class="latest-posts-list">
											<li>
												<figure class="thumbnail"><a href="#"><img src="images/samples/post-img1-sm.jpg" alt=""></a></figure>
												<h5 class="title"><a href="#">Three Simple Household Repairs That'll Save You Hundreds</a></h5>
												<span class="date">April, 18 2015</span>
											</li>
											<li>
												<figure class="thumbnail"><a href="#"><img src="images/samples/post-img2-sm.jpg" alt=""></a></figure>
												<h5 class="title"><a href="#">Tools That Make Yard Work Easy: The Big Backpack Blower</a></h5>
												<span class="date">March, 21 2015</span>
											</li>
											<li>
												<figure class="thumbnail"><a href="#"><img src="images/samples/post-img3-sm.jpg" alt=""></a></figure>
												<h5 class="title"><a href="#">11 Tips for Dealing With Water Damage, Mold and Mildew</a></h5>
												<span class="date">March, 21 2015</span>
											</li>
										</ul>
									</div>
								</div>
								<!-- /Widget :: Latest Posts -->
							</div>

							<div class="clearfix visible-sm"></div>

							<div class="col-sm-4 col-md-4">
								<!-- Widget :: Newsletter -->
								<div class="widget_newsletter widget widget__footer">
									<h3 class="widget-title">Get Our Newsletter</h3>
									<div class="widget-content">
										<p>Get timely DIY projects for your home and yard delivered right to your inbox every week!</p>

										<form action="http://handyman.dan-fisher.com/php/newsletter-form.php" method="POST" id="newsletter-form">

											<div class="alert alert-success hidden" id="newsletter-alert-success">
												<strong>Success!</strong> Thank you for subscribing.
											</div>
											<div class="alert alert-danger hidden" id="newsletter-alert-error">
												<strong>Error!</strong> Something went wrong.
											</div>

											<div class="form-group">
												<input type="email" 
													value=""
													data-msg-required="Please enter email address."
													data-msg-email="Please enter a valid email address."
													class="form-control"
													placeholder="Enter your email here..."
													name="subscribe-email"
													id="subscribe-email">
											</div>
											<button type="submit" class="btn btn-primary btn-block" data-loading-text="Loading...">Subscribe</button>
										</form>
									</div>
								</div>
								<!-- /Widget :: Newsletter -->
							</div>
						</div>
					</div>
				</div>
				<div class="footer-copyright">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">
								Copyright &copy; 2015  <a href="index.html">HandyMan</a> &nbsp;| &nbsp;All Rights Reserved
							</div>
						</div>
					</div>
				</div>
			</footer>
			<!-- Footer / End -->
			<div id="myModl" class="modal fade" role="dialog">
<div class="modal-content">
      <div class="modal-header" style="height: 70px">

        <button type="button" class="close" id="mclose" data-dismiss="modal">&times;</button>
    <p style="float: left;font-size: 22px;color: black"> Book your Appointment . </p>        
 
      </div>
      <div class="modal-body">
<!--       <div class="row">
<div class="col-sm-3" ></div>
<div class="col-sm-4" ><p style="font-size: 15px;color: black">Select Date</div>
      </div>
 -->    
      <div class="row" id="conf" style="display: none;">
               <div style="padding-left: 30px;padding-top: 0px" class="col-sm-4">
                
                    <h5 style="display: inline;">Selected Date : </h5><p id="seldate" style="display: inline;color:black">2016-4-19</p><br/>
                    <h5 style="display: inline;">Selected Time : </h5><p style="color: black;display: inline;" id="seltime">16:00</p>

                                         </div>

       
       <div class="col-sm-6"><h4 style="color: black">You have Sucessfully Booked Your Appointment</h4>
       <input type="button" id="btnconf" class="btn btn-info" style="width: 200px;height: 60px;color:black;font-size:18px;background-color: #ff3200" 
              value="Go To Dashboard">
       </div>
       </div>
       
       </div>
       <div class="row">
       <div class="col-sm-4" id="callab">  
<br/>
       <div class="row" id="box" style="margin-left: 40%">
        
<br/>

       <div class="row" >
        
         <div class="col-sm-4">
         <div id="box1"></div></div>
      <div class="col-sm-6">
      <br/>
           <b>Not Available</b>        </div></div>
                <div class="row" >
         <div class="col-sm-4">

         <div id="box2"></div></div>
      
      <div class="col-sm-6">
            <br/>
           <b> Available</b>        
      </div>
         
        </div>
 
        
 </div>
 </div>
       <div class="col-sm-4" id="caldis">
          <b style="font-size: 18px;float: left;margin-left:15px;color: black">Select Date</b>
          <div id="glob-data" data-toggle="calendar" >
          <div class="datetimepicker" ><div class="paging">
          <span class="prev"><i class="prev"></i></span>
          <div class="month-name">March, 2016</div>
          <span class="next"><i class="next"></i></span></div>
          <table><thead><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></thead>
          <tbody><tr><td class="available near-month">28</td><td class="available near-month">29</td>
          <td class="available cur-month">1</td><td class="available cur-month">2</td>
          <td class="available cur-month">3</td><td class="available cur-month">4</td>
          <td class="available cur-month">5</td></tr><tr><td class="available cur-month">6</td>
          <td class="available cur-month">7</td><td class="unavailable cur-month">8</td>
          <td class="available cur-month">9</td><td class="unavailable cur-month">10</td>
          <td class="available cur-month">11</td><td class="available cur-month">12</td></tr>
          <tr><td class="available cur-month">13</td><td class="available cur-month">14</td>
          <td class="available cur-month">15</td><td class="available cur-month">16</td>
          <td class="available cur-month">17</td><td class="available cur-month">18</td>
          <td class="available cur-month">19</td></tr><tr><td class="available cur-month">20</td>
          <td class="available cur-month">21</td><td class="available cur-month">22</td>
          <td class="available cur-month">23</td><td class="available cur-month">24</td>
          <td class="available cur-month">25</td><td class="available cur-month">26</td></tr>
          <tr><td class="available cur-month">27</td><td class="available cur-month">28</td>
          <td class="available cur-month">29</td><td class="available cur-month">30</td>
          <td class="available cur-month">31</td><td class="available near-month">1</td>
          <td class="available near-month">2</td></tr><tr><td class="available near-month">3</td>
          <td class="available near-month">4</td><td class="available near-month">5</td>
          <td class="available near-month">6</td><td class="available near-month">7</td>
          <td class="unavailable near-month">8</td><td class="available near-month">9</td>
          </tr></tbody></table></div></div>
        </div>

        <div class="col-sm-3" id="tspace" style="display: none;padding-left: 50px;padding-top: 40px">
                    <h5 >Selected Date : </h5><p id="seldates" style="color: black;"></p>

                                        </div>
        <div class="col-sm-5" id="tdis" style="display: none;">
                     
                      <a href="#" id="backcal" onclick="backtocal()" style="color: #1274c0;margin-right: 60%">ReSelect Date</a>
                      <div id="boxtiming" style="margin-left: 30px">
                      
                      <h class="timehead"> Pick your Timings</h>
                      
                     <ul class="ptime">
                        <li>
                       <a onclick="" href="javascript:;">9:00 AM</a>
                       </li>              
                   
                       <li>
                       <a onclick="timedis('10')" href="javascript:;" id="tid">10:00 AM</a>
                       </li>                   
                       <li>
                       <a onclick="timedis('11')" href="javascript:;" id="tid">11:00 AM</a>
                       </li>              
                       <li>
                       <a onclick="timedis('12')" href="javascript:;" id="tid">12:00 PM</a>
                       </li>              
                       <li>
                       <a onclick="timedis('13')" href="javascript:;" id="tid">13:00 PM</a>
                       </li>              
                    <li>
                       <a onclick="timedis('14')" href="javascript:;" id="tid">14:00 PM</a>
                       </li>              
                    <li>
                       <a onclick="timedis('15')" href="javascript:;" id="tid">15:00 PM</a>
                       </li>              
                      <li>
                       <a onclick="timedis('16')" href="javascript:;" id="tid">16:00 PM</a>
                       </li>              
                      <li>
                       <a onclick="timedis('17')" href="javascript:;" id="tid">17:00 PM</a>
                       </li>              
                   <li>
                       <a onclick="timedis('18')" href="javascript:;" id="tid">18:00 PM</a>
                       </li>              
                   <li>
                       <a onclick="timedis('19')" href="javascript:;" id="tid">19:00 PM</a>
                       </li>              
                   <li>
                       <a onclick="timedis('20')" href="javascript:;" id="tid">20:00 PM</a>
                       </li>              
                   <li>
                       <a onclick="timedis('21')" href="javascript:;" id="tid">21:00 PM</a>
                       </li>              
                  
                    </ul>  
                  </div>
    
        </div>
      </div>

      <!-- </div> -->
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="mclosed" data-dismiss="modal">Close</button>
      </div>
    </div>
</div>
		</div>
		<!-- Main / End -->
	</div>
	
	
	
	
	<!-- Javascript Files
	================================================== -->
	<script src="vendor/jquery-1.11.0.min.js"></script>
	<script src="vendor/jquery-migrate-1.2.1.min.js"></script>
	<script src="vendor/bootstrap.js"></script>
	<script src="vendor/jquery.flexnav.min.js"></script>
	<script src="vendor/jquery.hoverIntent.minified.js"></script>
	<script src="vendor/jquery.flickrfeed.js"></script>
	<script src="vendor/isotope/jquery.isotope.min.js"></script>
	<script src="vendor/isotope/jquery.isotope.sloppy-masonry.min.js"></script>
	<script src="vendor/isotope/jquery.imagesloaded.min.js"></script>
	<script src="vendor/magnific-popup/jquery.magnific-popup.js"></script>
	<script src="vendor/owl-carousel/owl.carousel.min.js"></script>
	<script src="vendor/jquery.fitvids.js"></script>
	<script src="vendor/jquery.appear.js"></script>
	<script src="vendor/jquery.stellar.min.js"></script>
	<script src="vendor/flexslider/jquery.flexslider-min.js"></script>
	<script src="vendor/jquery.countTo.js"></script>
	<script src="js/jquery-ui.js"></script>
    <script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
    <script src="//cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
	<!-- slider button -->
	<script src="js/highlight.js"></script>
    <script src="js/bootstrap-switch.js"></script>
    <script src="js/main.js"></script>

<!-- calendar js -->
    <script src="js/dateTimePicker.js"></script> 
 



	<!-- Newsletter Form -->
	<script src="vendor/jquery.validate.js"></script>
	<script src="js/newsletter.js"></script>


	<script src="js/custom.js"></script>


	<script>
		jQuery(function($){
			$('body').addClass('loading');
		});
		
		$(window).load(function(){
			$('#searchtitle').hide();
			$('#nosearch').hide();
			$('.flexslider').flexslider({
				animation: "fade",
				controlNav: true,
				directionNav: false,
				prevText: "",
				nextText: "",
				start: function(slider){
					$('body').removeClass('loading');
				}
			});
		});
	</script>



<!--  algolia searching script start -->

<script>
  var client = algoliasearch("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  var index = client.initIndex('category');
 var res = client.initIndex('category');
  var params={hitsPerPage:5};
  autocomplete('#search-input', { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'cat_name',
      templates: {
        suggestion: function(suggestion) {
  for (var i = 0; i < 5; ++i) {
    // return suggestion._highlightResult.cat_name.value;
     return suggestion._highlightResult.cat_name.value;
        }
      }
    } }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(suggestion, dataset);
  });
var det  =[];
var htm='';
var htm1='';
var size;
var cont= [ [],[],[],[] ,[] ];
 var f=0;
//for(var i=0;i<4;i++)

//button code
var ch="";
var j=0;
var inp,workname;
$('#btnsearch').click(function(){
     
     $('#pagec').hide();
	$('#searchtitle').show();	

 // var dem = document.getElementById('btnsearch');
 // dem.scrollTop  =dem.scrollHeight-dem.clientHeight;
//$('#btnsearch').scrollTop(100);
$('html,body').animate({scrollTop:600});

     //$('#btnsearch').scrollTop="123px";
     $('#loc').show();

htm1='';
console.log(ch + "chhh");
index.search(
 $('#search-input').val(), {
    hitsPerPage: 5, facets: '*'
  },
  searchCallback
);
function searchCallback(err, content) {
  if (err) {
    return err;
  }

  content.hits.forEach(function(hit) {
  //  det.push(hit);
// $("#namec").append(hit.cat_name);
//alert($('#search-input').serialize());
if(ch!=$('#search-input').val())
{
 inp=$('#search-input').val();
$.post('catret.php', {cat:inp}, function(response) {
 size=response.length;
 //alert(size);
 //$('#nosearch').hide();

if(size>=1)
{
for(var i=0;i<response.length;i++)
{ 
  //cont[i]=[];
  cont[i][0]=response[i].f_name;
  cont[i][1]=response[i].l_name;
   cont[i][2]=response[i].subcat_name;
  cont[i][3]=response[i].city;
  cont[i][4]=response[i].profile_pic;
  cont[i][5]=response[i].u_name;
  for(j=0;j<6;j++ )
   console.log(cont[i][j]  + i);

  htm+=	           '<div class="job_listings" id="a" style="margin-right:10px;margin-left: 10px" '+' onclick="javascript:fun('+i+')">' +
						'<ul class="job_listings" id="b">'+
						'	<li class="job_listing" id="c">'+
								'<a >'+
								'	<div class="job_img" style="width:15%" >'+
								'	<img src="images/'+ cont[i][4] +'" alt="" class="company_logo">'+
								'	</div>'+
								'	<div class="position" id="d"  style="height:100%;width:20%">'+
								'		<h3 id="namec" style="margin-left:4%">' + cont[i][0] + "  " + cont[i][1] +'</h3>'+
								'	</div>'+
                                '	<ul class="meta" style="font-weight:bold;width:10%">'+
								'		<li class="job-type">'+'<b>' +inp+'</b>'  + '</li>'+
								'		<div class="company" style="font-weight:bold">'+
								'			<strong>' + "Deals in " + '<b>' + cont[i][2] +'</b>' +'</strong>'+
								'		</div>'+
        						'	</ul>'+                             
						     	'	<div class="location" style="margin-left:20%;" >'+
								'		<i class="fa fa-location-arrow" style="margin-left:50%;"></i>' + cont[i][3] +
								'	</div>'+

								'	<div class="rating">'+
								'		<div class="rating-stars">'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star-half-o"></i>'+
								'		</div>'+
								'		<div class="reviews-num">12 Reviews</div>'+
								'	</div>'+
								
								'</a>'+
							'</li>'+

'</ul>'+
'</div>';

    htm1+= htm+'<br/>' ;
    htm='';
 $('#loc').html(htm1);
}
}
else
{

var ht;
ht="<h4>Sorry No Data Found </h4>";
$('#loc').html(ht);


}
}, 'json');
}
ch=$('#search-input').val();

    console.log(hit);

  });
}

// if(f==0)
// { 

// $('#nosearch').show();
// }
// else
// $('#nosearch').hide();
// f=0;

});

</script>
<script>
//$('#search-input').keyup(function(e){
//if(e.keyCode==13){
//e.preventDefault();
var f;
function ressearch(){
f=0;
 $('#pagec').hide();
	$('#searchtitle').show();	
  // var dem = document.getElementById('btnsearch');
 // dem.scrollTop  =dem.scrollHeight-dem.clientHeight;
//$('#btnsearch').scrollTop(100);
$('html,body').animate({scrollTop:600});

     //$('#btnsearch').scrollTop="123px";
     $('#loc').show();
if($('#search-input').val()=='')
{
   var ht;
ht="<h4>Sorry No Data Found </h4>";
$('#loc').html(ht);

	return false;
}
htm1='';
//$('#loc').html(htm1);
console.log(ch + "chhh");
index.search(
 $('#search-input').val(), {
    hitsPerPage: 5, facets: '*'
  },
  searchCallback
);
function searchCallback(err, content) {
  if (err) {
    return err;
  }

  content.hits.forEach(function(hit) {
  //  det.push(hit);
// $("#namec").append(hit.cat_name);
//alert($('#search-input').serialize());
if(ch!=$('#search-input').val())
{
 inp=$('#search-input').val();
$.post('catret.php', {cat:inp}, function(response) {
 size=response.length;
 //alert(size);
// f++;
//$('#loc').html('');
if(size>=1)
{
 console.log("s"+size);

for(var i=0;i<response.length;i++)
{ 
  //cont[i]=[];
  cont[i][0]=response[i].f_name;
  cont[i][1]=response[i].l_name;
   cont[i][2]=response[i].subcat_name;
  cont[i][3]=response[i].city;
  cont[i][4]=response[i].profile_pic;
  cont[i][5]=response[i].u_name;
  for(j=0;j<6;j++ )
   console.log(cont[i][j]  + i);

  htm+=	           '<div class="job_listings" id="a" style="margin-right:10px;margin-left: 10px" '+' onclick="javascript:fun('+i+')">' +
						'<ul class="job_listings" id="b">'+
						'	<li class="job_listing" id="c">'+
								'<a >'+
								'	<div class="job_img" style="width:15%" >'+
								'	<img src="images/'+ cont[i][4] +'" alt="" class="company_logo">'+
								'	</div>'+
								'	<div class="position" id="d"  style="height:100%;width:20%">'+
								'		<h3 id="namec" style="margin-left:4%">' + cont[i][0] + "  " + cont[i][1] +'</h3>'+
								'	</div>'+
                                '	<ul class="meta" style="font-weight:bold;width:10%">'+
								'		<li class="job-type">'+'<b>' +inp+'</b>'  + '</li>'+
								'		<div class="company" style="font-weight:bold">'+
								'			<strong>' + "Deals in " + '<b>' + cont[i][2] +'</b>' +'</strong>'+
								'		</div>'+
        						'	</ul>'+                             
						     	'	<div class="location" style="margin-left:20%;" >'+
								'		<i class="fa fa-location-arrow" style="margin-left:50%;"></i>' + cont[i][3] +
								'	</div>'+

								'	<div class="rating">'+
								'		<div class="rating-stars">'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star-half-o"></i>'+
								'		</div>'+
								'		<div class="reviews-num">12 Reviews</div>'+
								'	</div>'+
								
								'</a>'+
							'</li>'+

'</ul>'+
'</div>';

    htm1+= htm+'<br/>' ;
    htm='';
 $('#loc').html(htm1);
//console.log("fr"+f);
}

}
else
{
//document.getElementById('loc').innerHTML="";	
//		 $('#loc').html('');
//$('#loc').css("display",'block');
//$('#loc').html($('#nosearch').html());
//$('#nosearch').show();	
var ht;
ht="<h4>Sorry No Data Found </h4>";
$('#loc').html(ht);
}

}, 'json');
}
else

ch=$('#search-input').val();

    console.log(hit);
console.log("fr"+f);
  });
}
/*
if(f==0)
{ 
//document.getElementById("loc").innerHTML='';
//$('#loc').hide();
console.log("f"+f);
$('#nosearch').show();
}
else
{
$('#nosearch').hide();
f=0;
}*/
f=0;


}
//});
</script>


<script type="text/javascript">
//	$('#a').click(function(){
//    $('#myModl').modal('show'); 
  //   });
var uid,pwd,subname;
 function fun(dsa)
 {
	 console.log("uid="+uid);
workname=cont[dsa][5];
subname=cont[dsa][2];
//$('#myModl').modal('show'); 
if( '<?php echo $_SESSION['test'] ?>')
{
$('#myModl').modal('show'); 
console.log("true"+'<?php echo $_SESSION['test'] ?>');
uid='<?php echo $_SESSION['test'] ?>';
pwd=$('#pswd').val();
console.log("uid="+uid);
}
else   
{
	$('#myModal').modal('show'); 
	$('#btnsub').click(function(){
$('#logform').submit(function () {
// sendContactForm();

 return false;
});

console.log("testing "+"<?php echo $_SESSION['test'] ?>");
uid=$('#u_name').val();
pwd=$('#pswd').val();
$.post('../../controller/loginsearch.php',{uname:uid,pw:pwd},function(response){
if(response==1)
	{
         $('#myModl').modal('show'); 

		//alert('valid');
	}
else
	alert('Invalid');

})

 //$('#myModl').modal('show'); 
    //alert('desrf');

	}) ;
console.log("false"+'<?php echo $_SESSION['test'] ?>');
 }}


</script>
<script type="text/javascript">
//function fun(dsa)
{
	//alert("dede"+dsa);
}
 // 	$('#a').click(function() {
	// 	alert('deded');
	// });
// 	$('#loc').click(function() {
// console.log('dekjknrefejfke');
// //alert('hogya');
// //$('#myModl').s;
// });


</script>

<!--   algolia end -->

    <script type="text/javascript">
var dym;
    $(document).ready(function()
    {
      $('#basic').calendar();
      $('#glob-data').calendar(
      {
        unavailable: ['*-*-8', '*-*-10'],
                onSelectDate: function(date, month, year)
        { 
        	 dym=[year, month, date].join('-') ;
        	console.log('dym'+dym);
          $('#callab').css("display","none");  
          $('#caldis').css("display","none"); 
          $('#tdis').css("display","block");
           $('#tspace').css("display","block");	
          //alert([year, month, date].join('-') + ' is: ' + this.isAvailable(date, month, year));
          $('#seldate').html(dym);
          $('#seldates').html(dym);
        }

      });
    });
function timedis(tdis)
{
console.log('time'+tdis+ dym);

var tim=tdis+':'+'00'+':'+'00'+':'+'0000';
var tims=tdis+':'+'00';
          $('#seltime').html(tims);

console.log('time'+tim);
//alert(uid);
  $.post('uploadjob.php',{
   cat_name:inp,
   timec:tim,
   datec:dym,
   uname:uid,
   subcat:subname,
   reg_name:workname
  }
  ,function(response){

//alert(response);
//window.location.href = "../customer/pages/index.php";
$('#conf').show();
$('#tdis').hide();
$('#tspace').hide();
//$('#tid').attr('href','../../user/pages/index.php');
  })
    .fail(function() {
    alert( "error" );
  });

}

$('#btnconf').click(function(){
window.location.href = "../customer/pages/index.php";

});
    </script>
   <!-- back to calendar -->
   <script type="text/javascript">
   	function backtocal()
   	{
   	  $('#tdis').hide();	
      $('#caldis').show();
      $('#callab').show();
      $('#tspace').hide();
   	}
   </script>
   <!-- after closing model -->
   <script type="text/javascript">
   	$('#mclose').click(function(){
   		//$('#box').show();
   	 	$('#caldis').show();
   	    $('#tspace').hide();   
   	    $('#tdis').hide();
   	    $('#callab').show();
   	    $('#conf').hide();
   	});
   	$('#mclosed').click(function(){
   		//$('#box').show();
   	 	$('#caldis').show();
   	    $('#tspace').hide();   
   	    $('#tdis').hide();
   	    $('#callab').show();
   	    $('#conf').hide();
   	});
   </script>
</body>

<!-- Mirrored from handyman.dan-fisher.com/index.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Jan 2016 06:55:11 GMT -->
</html>