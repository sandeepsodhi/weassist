<!DOCTYPE html>
<html class="not-ie no-js" lang="en">  

<head>

	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>Handyman - Job Board HTML Template</title>


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

	
	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="images/favicons/favicon.ico">
	<link rel="apple-touch-icon" sizes="120x120" href="images/favicons/favicon-120.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/favicons/favicon-152.png">
	
</head><body>

	<div class="site-wrapper">

		<!-- Header -->
<?php include('header.php'); ?>	 		<!-- Header / End -->


		<!-- Main -->
		<div class="main" role="main">

			<!-- Page Heading -->
			<section class="page-heading">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h1>Contacts</h1>
						</div>
					</div>
				</div>
			</section>
			<!-- Page Heading / End -->

			<!-- Page Content -->
			<section class="page-content">

				<!-- Google Map -->
				<div class="googlemap-wrapper googlemap-wrapper__contact">
					<div id="map_canvas" class="map-canvas"></div>
				</div>
				<!-- Google Map / End -->

				<div class="container">

					<div class="row">
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-location-arrow"></i>
								</div>
								<div class="icon-box-body">
									<h6>Address:</h6>
									HandyMan Co., Old Town Avenue, New York, USA 23000
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-phone"></i>
								</div>
								<div class="icon-box-body">
									<h6>Phone:</h6>
									+1700 124-5678<br>
									+1700 124-5678
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="icon-box">
								<div class="icon">
									<i class="fa fa-clock-o"></i>
								</div>
								<div class="icon-box-body">
									<h6>Working Hours:</h6>
									Monday - Friday 9:00 - 21:00<br>
									Saturday - Sunday 10:00 - 16:00
								</div>
							</div>
						</div>
					</div>

					<div class="spacer-lg"></div>
					
					<div class="row">
						<div class="col-md-12">
							<h3>Contact Form</h3>
							<form action="http://handyman.dan-fisher.com/php/contact-form.php" id="contact-form">

								<div class="alert alert-success hidden" id="contact-alert-success">
									<strong>Success!</strong> Thank you for your message. Reply will be in a while!
								</div>
								<div class="alert alert-danger hidden" id="contact-alert-error">
									<strong>Error!</strong> Something went wrong sending your message.
								</div>

								<div class="row">
									<div class="col-md-4">
										<div class="form-group">
											<label>Name <span class="required">*</span></label>
											<input type="text"
												value=""
												data-msg-required="Please enter your name."
												class="form-control"
												name="name" id="name">
										</div>
									</div>
									<div class="col-md-4">
										<div class="form-group">
											<label>Email <span class="required">*</span></label>
											<input type="email" 
												value=""
												data-msg-required="Please enter your email address."
												data-msg-email="Please enter a valid email address."
												class="form-control"
												name="email"
												id="email">
										</div>
									</div>
									<div class="col-md-4">
										<div class="form-group">
											<label>Subject</label>
											<input type="text" 
												value=""
												data-msg-required="Please enter the subject."
												class="form-control"
												name="subject"
												id="subject">
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label>Message <span class="required">*</span></label>
											<textarea
												data-msg-required="Please enter your message."
												rows="10"
												class="form-control"
												name="message"
												id="message"></textarea>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<input type="submit" value="Send Message" class="btn btn-primary" data-loading-text="Loading...">
									</div>
								</div>
							</form>
						</div>
					</div>

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
	<script src="vendor/jquery.countTo.js"></script>

	<script src="js/custom.js"></script>
 <script src="js/bootstrap-switch.js"></script>
<!--  slider button   -->
    <script src="js/highlight.js"></script>
    <script src="js/bootstrap-switch.js"></script>
    <script src="js/main.js"></script>
<!-- slider end -->
	<!-- Contact Page specific scripts
	================================================== -->

	<!-- Contact Form -->
	<script src="vendor/jquery.validate.js"></script>
	<script src="js/contact.js"></script>

	<!-- Newsletter Form -->
	<script src="js/newsletter.js"></script>
	
	<!-- Google Map -->
	<script src="http://maps.google.com/maps/api/js?sensor=true"></script>
	<script src="vendor/jquery.gmap3.min.js"></script>
	
	<!-- Google Map Init-->
	<script type="text/javascript">
		jQuery(function($){
			$('#map_canvas').gmap3({
				marker:{
					address: '40.717599,-74.005136' 
				},
					map:{
					options:{
					zoom: 17,
					scrollwheel: false,
					streetViewControl : true
					}
				}
		    });
		});
	</script>

</body>

<!-- Mirrored from handyman.dan-fisher.com/page-contacts.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Jan 2016 06:57:24 GMT -->
</html>