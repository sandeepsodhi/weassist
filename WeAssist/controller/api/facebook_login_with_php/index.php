<?php
include_once("config.php");
//include_once("includes/functions.php");
//destroy facebook session if user clicks reset
if(!$fbuser){
	$fbuser = null;
	$loginUrl = $facebook->getLoginUrl(array('redirect_uri'=>$homeurl,'scope'=>$fbPermissions));
	//echo $homeurl;
//	echo '<a href="'.$loginUrl.'"></a>';

	$output = '<a href="'.$loginUrl.'"><img src="images/fb_login.png"></a>'; 	
}else{
	$user_profile = $facebook->api('/me?fields=id,first_name,last_name,email,gender,locale,picture');
//	$user = new Users();
//	$user_data = $user->checkUser('facebook',$user_profile['id'],$user_profile['first_name'],$user_profile['last_name'],$user_profile['email'],$user_profile['gender'],$user_profile['locale'],$user_profile['picture']['data']['url']);
	//$user_profile;
	
//	print_r($user_profile['picture']['data']['url']);
	//echo implode("",$path);
	if(!empty($user_profile)){
		$output = '<h1>Facebook Profile Details </h1>';
		$output .= '<img src="' .$user_profile['picture']['data']['url']. '">';
     // 	$output .= '<img src="implode("",$path)">';
	  $output .= '<br/>Facebook ID : ' . $user_profile['id'];
        $output .= '<br/>Name : ' . $user_profile['first_name'].' '.$user_profile['last_name'];
        $output .= '<br/>Email : ' . $user_profile['email'];
        $output .= '<br/>Gender : ' . $user_profile['gender'];
        $output .= '<br/>Locale : ' . $user_profile['locale'];
        $output .= '<br/>You are login with : Facebook';
//        $output .= '<br/>Logout from <a href="logout.php?logout">Facebook</a>'; 
	}else{
		$output = '<h3 style="color:red">Some problem occurred, please try again.</h3>';
	}
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login with Facebook using PHP by CodexWorld</title>
<style type="text/css">
h1{font-family:Arial, Helvetica, sans-serif;color:#999999;}
</style>
</head>
<body >
<div>
<?php echo $output; ?>
</div>

</body>
</html>