<!DOCTYPE html>
<!--[if IE 7]>                  <html class="ie7 no-js" lang="en">     <![endif]-->
<!--[if lte IE 8]>              <html class="ie8 no-js" lang="en">     <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="not-ie no-js" lang="en">  <!--<![endif]-->

<!-- Mirrored from handyman.dan-fisher.com/job-post-profile.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Jan 2016 06:56:34 GMT -->
<head>

	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>Post a Profile | Handyman - Job Board HTML Template</title>
	<meta name="description" content="Handyman - Job Board HTML Template - 1.0">
	<meta name="author" content="http://themeforest.net/user/dan_fisher">


	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
	
	
	
	<!-- CSS
	================================================== -->
	<!-- Base + Vendors CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/fonts/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="css/fonts/entypo/css/entypo.css">
	<link rel="stylesheet" href="vendor/owl-carousel/owl.carousel.css" media="screen">
	<link rel="stylesheet" href="vendor/owl-carousel/owl.theme.css" media="screen">
	<link rel="stylesheet" href="vendor/magnific-popup/magnific-popup.css" media="screen">
	<link rel="stylesheet" href="vendor/job-manager/frontend.css" media="screen">

	<!-- Theme CSS-->
	<link rel="stylesheet" href="css/theme.css">
	<link rel="stylesheet" href="css/theme-elements.css">
	<link rel="stylesheet" href="css/animate.min.css">

   
    	<link href="assets/css/login.css" rel="stylesheet" />
    <link href="assets/css/social.css" rel="stylesheet" />
    <link href="assets/css/padd.css" rel="stylesheet" />
    <link href="assets/js/validate.js" rel="stylesheet" />

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

		<!-- Header -->
<?php include('header.php'); ?>			<!-- Header / End -->


		<!-- Main -->
		<div class="main" role="main">

			<!-- Page Heading -->
			<section class="page-heading">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<h1>Post a Profile</h1>
						</div>
					</div>
				</div>
			</section>
			<!-- Page Heading / End -->

			<!-- Page Content -->
			<div class="page-content">
				<div class="container">
					
					<div class="row">
						<div class="col-md-8 col-md-offset-2">
							<!-- Profile Form -->
							<form action="#" method="post" id="submit-job-form" class="job-manager-form" enctype="multipart/form-data">

								<fieldset>
									<label>Have an account?</label>
									<div class="field account-sign-in">
										<p>
											<a class="btn btn-primary btn-sm" href="#"><i class="fa fa-key"></i> Sign in</a>
										</p>

										<div class="alert alert-info alert-dismissable">
											<button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="fa fa-times"></i></button>
											If you don‘t have an account you can create one below by entering your email address. A password will be  automatically emailed to you.
										</div>
									</div>
								</fieldset>

								<fieldset>
									<label>Your Email <span class="required">*</span></label>
									<div class="field">
										<input type="email" class="form-control" name="create_account_email" id="account_email" placeholder="you@yourdomain.com" value="" />
									</div>
								</fieldset>
								
								<!-- Profile Information Fields -->
								<fieldset class="fieldset-job_title">
									<label for="resume_title">Job title</label>
									<div class="field">
										<input type="text" class="form-control" name="job_title" id="job_title" placeholder="e.g. “Painter”" value=""/>
									</div>
								</fieldset>

								<fieldset class="fieldset-job_location">
									<label for="job_location">Location <small>(optional)</small></label>
									<div class="field">
										<input type="text" class="form-control" name="job_location" id="job_location" placeholder="e.g. &quot;London, UK&quot;, &quot;New York&quot;, &quot;Houston, TX&quot;" value=""/>
										<small class="description">Leave this blank if the job can be done from anywhere (i.e. telecommuting)</small>
									</div>
								</fieldset>

								<fieldset class="fieldset-company_logo">
									<label for="company_logo">Photo <small>(optional)</small></label>
									<div class="field">
										<input type="file" class="form-control" name="company_logo" id="company_logo" />
										<small class="description">Max. file size: 50 MB. Allowed images: jpg, gif, png.</small>
									</div>
								</fieldset>

								<div class="row">
									<div class="col-md-6">
										<fieldset class="fieldset-job_type">
											<label for="job_type">Job Type</label>
											<div class="field select-style">
												<select name="job_type" id="job_type" class="form-control">
													<option>Unspecified</option>
													<option>Furniture Repair &amp; Refinish</option>
													<option>Pools</option>
													<option>Plaster &amp; Drywall</option>
													<option>Painting</option>
												</select>
											</div>
										</fieldset>
									</div>
									<div class="col-md-6">
										<fieldset class="fieldset-job_category">
											<label for="job_category">Job category</label>
											<div class="field select-style">
												<select name="job_category" id="job_category" class="form-control">
													<option>Unspecified</option>
													<option>Appliance Services</option>
													<option>Electrical</option>
													<option>Handiwork</option>
													<option>Plumbing</option>
													<option>Bathroom Design &amp; Remodelling</option>
												</select>
											</div>
										</fieldset>
									</div>
								</div>

								<fieldset class="fieldset-job_description">
									<label>Description</label>
									<div class="field">
										<textarea name="textarea" cols="30" rows="8" class="form-control"></textarea>
									</div>
								</fieldset>

								<fieldset class="fieldset-skills">
									<label>Skills</label>
									<div class="field">
										<input type="text" class="form-control" name="skills" id="skills" placeholder="Comma separate a list of relevant skills" value=""/>
									</div>
								</fieldset>

								<fieldset class="fieldset-url">
									<label>URL(s)</label>
									<div class="field">
										<a href="#">+ Add URL</a> &nbsp; &nbsp; &nbsp; <small class="description">Optionally provide links to any of your websites or social network profiles.</small>
									</div>
								</fieldset>

								<fieldset class="fieldset-education">
									<label>Education</label>
									<div class="field">
										<a href="#">+ Add Education</a>
									</div>
								</fieldset>

								<fieldset class="fieldset-experience">
									<label>Experience</label>
									<div class="field">
										<a href="#">+ Add Experience</a>
									</div>
								</fieldset>

								<div class="spacer"></div>

								<p>
									<input type="submit" name="submit_job" class="btn btn-primary" value="Preview Profile &rarr;" />
								</p>

							</form>
							<!-- Profile Form / End -->
						</div>
					</div>

				</div>
			</div>
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

	<!-- Newsletter Form -->
	<script src="vendor/jquery.validate.js"></script>
	<script src="js/newsletter.js"></script>

	<script src="js/custom.js"></script>


	
</body>

<!-- Mirrored from handyman.dan-fisher.com/job-post-profile.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Jan 2016 06:56:34 GMT -->
</html>