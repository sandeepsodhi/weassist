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
								<form action="http://handyman.dan-fisher.com/job-professionals.html" method="POST" role="form">

<!--									<div class="row">
										<div class="col-md-3 col-md-offset-1">
											<div class="form-group">
												<input type="text" class="form-control" placeholder="All Professionals">
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<input type="text" class="form-control" placeholder="Any Location">
											</div>
										</div>-->
										<div class="col-md-7" style="margin-left: 20%">
											<div class="form-group">
											<!--	<div class="select-style">
													<select class="form-control">
														<option>All Services</option>
														<option>Handiwork</option>
														<option>Painting</option>
														<option>Decks</option>
														<option>Electrical</option>
														<option>Plumbing</option>
														<option>Plaster &amp; Drywall</option>
														<option>Flooring</option>
														<option>Kitchen Design</option>
														<option>Welding</option>
													</select>
												</div>-->
													<input type="text" class="form-control" placeholder="I Am Looking For ..... " style="font-size:20px">
											</div>
										</div>
										<div class="col-md-1">
											<button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search"></i></button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- Slider / End -->

			<!-- Page Content -->
			<section class="page-content">
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

					<!-- Listings -->
					<div class="title-bordered">
						<h2>Our Professionals <small>Latest added</small></h2>
					</div>
					<div class="job_listings">
						<ul class="job_listings">
							<li class="job_listing">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person1.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>Debbie Bidart</h3>
										<div class="company">
											<strong>Paint Removal from Exterior or Interior Surfaces</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> Melbourne, AU
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-half-o"></i>
										</div>
										<div class="reviews-num">12 Reviews</div>
									</div>
									<ul class="meta">
										<li class="job-type">Painting</li>
										<li class="date">
											Posted 1 month ago
										</li>
									</ul>
								</a>
							</li>
							<li class="job_listing">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person2.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>Construction Inc.</h3>
										<div class="company">
											<strong>Strives to meet the consumers needs.</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> New York, US
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
										</div>
									</div>
									<ul class="meta">
										<li class="job-type">Bathroom Design</li>
										<li class="date">
											Posted 2 months ago
										</li>
									</ul>
								</a>
							</li>
							<li class="job_listing job_position_featured">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person3.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>C &amp; G Plastering</h3>
										<div class="company">
											<strong>Quality Jobs You Can Afford</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> London, UK
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
										</div>
										<div class="reviews-num">5 Reviews</div>
									</div>
									<ul class="meta">
										<li class="job-type">Plaster &amp; Drywall</li>
										<li class="date">
											Posted 2 months ago
										</li>
									</ul>
								</a>
							</li>
							<li class="job_listing">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person4.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>White &amp; Sons</h3>
										<div class="company">
											<strong>Apply Concrete Floor Coating</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> Melbourne, AU
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-half-o"></i>
											<i class="fa fa-star-o"></i>
										</div>
										<div class="reviews-num">4 Reviews</div>
									</div>
									<ul class="meta">
										<li class="job-type">Painting</li>
										<li class="date">
											Posted 3 months ago
										</li>
									</ul>
								</a>
							</li>
							<li class="job_listing">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person5.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>Tim's Plastering</h3>
										<div class="company">
											<strong>We pride ourselves in excellent workmanship.</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> Houston, TX
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star"></i>
											<i class="fa fa-star-o"></i>
										</div>
										<div class="reviews-num">1 Review</div>
									</div>
									<ul class="meta">
										<li class="job-type">Plaster &amp; Drywall</li>
										<li class="date">
											Posted 2 months ago
										</li>
									</ul>
								</a>
							</li>
							<li class="job_listing">
								<a href="#">
									<div class="job_img">
										<img src="images/samples/person6.jpg" alt="" class="company_logo">
									</div>
									<div class="position">
										<h3>Crystal Glass Ltd</h3>
										<div class="company">
											<strong>Bring the best customer service</strong>
										</div>
									</div>
									<div class="location">
										<i class="fa fa-location-arrow"></i> New York, US
									</div>
									<div class="rating">
										<div class="rating-stars">
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
											<i class="fa fa-star-o"></i>
										</div>
									</div>
									<ul class="meta">
										<li class="job-type">Furniture Repair &amp; Refinish</li>
										<li class="date">
											Posted 3 months ago
										</li>
									</ul>
								</a>
							</li>
						</ul>
					</div>

					<div class="spacer"></div>

					<div class="row">
						<div class="col-md-4 col-md-offset-4">
							<a class="btn btn-default btn-block" href="#">View All Professionals</a>
						</div>
					</div>

					<!-- Listings / End -->

					<div class="spacer-xxl"></div>

					<!-- Promobox -->
					<div class="promobox" data-stellar-background-ratio="0.5">
						<div class="row">
							<div class="col-md-4 promobox-item">
								<h4><span>For</span> Designers</h4>
								<img src="images/samples/worker3.png" alt="" class="img-responsive">
								<a href="#" class="btn btn-primary btn-sm">See Here</a>
							</div>
							<div class="col-md-4 promobox-item">
								<h4><span>For</span> Plumbers</h4>
								<img src="images/samples/worker1.png" alt="" class="img-responsive">
								<a href="#" class="btn btn-primary btn-sm">See Here</a>
							</div>
							<div class="col-md-4 promobox-item">
								<h4><span>For</span> Builders</h4>
								<img src="images/samples/worker2.png" alt="" class="img-responsive">
								<a href="#" class="btn btn-primary btn-sm">See Here</a>
							</div>
						</div>
					</div>
					<!-- Promobox / End -->

					<div class="spacer-lg"></div>

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

	<!-- slider button -->
	<script src="js/highlight.js"></script>
    <script src="js/bootstrap-switch.js"></script>
    <script src="js/main.js"></script>





	<!-- Newsletter Form -->
	<script src="vendor/jquery.validate.js"></script>
	<script src="js/newsletter.js"></script>

	<script src="js/custom.js"></script>

	<script>
		jQuery(function($){
			$('body').addClass('loading');
		});
		
		$(window).load(function(){
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
	  
      
	
</body>

<!-- Mirrored from handyman.dan-fisher.com/index.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Jan 2016 06:55:11 GMT -->
</html>