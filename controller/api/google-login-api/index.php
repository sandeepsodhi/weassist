<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
function pop_url(){
//	var url="https://www.google.com";
var url="<?php echo $authUrl ?>"; 
window.open(url,'win2','status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,resizable=yes,width=1076,height=768,directories=no,location=no') ;
}
</script>

</head>
<body>
<?php

session_start(); //session start

require_once ('libraries/Google/autoload.php');

//Insert your cient ID and secret 
//You can get it from : https://console.developers.google.com/
$client_id = '122120274303-us18a5vafcf6p797b22hf7ajq71ookah.apps.googleusercontent.com'; 
$client_secret = 'u4-VPsc6Et7jFvKoJkiiqDNO';
$redirect_uri = 'http://localhost/WeAssist/controller/api/google-login-api/index.php';

//database
/*
$db_username = "xxxxxxxxx"; //Database Username
$db_password = "xxxxxxxxx"; //Database Password
$host_name = "localhost"; //Mysql Hostname
$db_name = 'xxxxxxxxx'; //Database Name*/

//incase of logout request, just unset the session var
/*if (isset($_GET['logout'])) {
  unset($_SESSION['access_token']);
}*/

/************************************************
  Make an API request on behalf of a user. In
  this case we need to have a valid OAuth 2.0
  token for the user, so we need to send them
  through a login flow. To do this we need some
  information from our API console project.
 ************************************************/
$client = new Google_Client();
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->addScope("email");
$client->addScope("profile");

/************************************************
  When we create the service here, we pass the
  client to it. The client then queries the service
  for the required scopes, and uses that when
  generating the authentication URL later.
 ************************************************/
$service = new Google_Service_Oauth2($client);

/************************************************
  If we have a code back from the OAuth 2.0 flow,
  we need to exchange that with the authenticate()
  function. We store the resultant access token
  bundle in the session, and redirect to ourself.
*/
  
if (isset($_GET['code'])) {
  $client->authenticate($_GET['code']);
  $_SESSION['access_token'] = $client->getAccessToken();
  header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
  exit;
}

/************************************************
  If we have an access token, we can make
  requests, else we generate an authentication URL.
 ************************************************/
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
  $client->setAccessToken($_SESSION['access_token']);
} else {
  $authUrl = $client->createAuthUrl();
}
//echo $authUrl;

//Display user info or display login url as per the info we have.
echo '<div style="margin:20px">';
if (isset($authUrl)){
	
	//show login url
	echo '<div align="center">';
//	echo '<h3>Login with Google -- Demo</h3>';
//	echo '<div>Please click login button to connect to Google.</div>';
	echo '<a class="login" href="' . $authUrl . '"><img src="images/google.png" /></a>';
	//echo '<a class="login" href="<script>
 // window.open(' .$authUrl. ', "", "width=200, height=100");
//</script>" ><img src="images/google.png" /></a>';
	//echo'<input type="button"  onclick="<script>   window.open('.$authUrl.', "", "width=200, height=100"); </script>">';   
//	echo '<a class="login"  href=" echo '<script> function pop_url() { var name = ' . json_encode($authUrl) . ';  }</script>'; "><img src="images/google.png" /></a>';
	
	//$link = window.open($authUrl 'width=710,height=555,left=160,top=170');
    //echo $link;
	echo '</div>';

echo '</div>';
	} else {
	
	require_once '../../../model/dbConnect.php';	

	$user = $service->userinfo->get(); //get user info 
	//echo '<pre>';
	//echo '<img src="'.$user->picture.'" style="float: right;margin-top: 33px;" />';
	
	print_r($user);
	
	$fname = $user->givenName;  //firstname
	$lname = $user->familyName; //lastname
	$email = $user->email;		//email
	//echo '</pre>';


	$result = $conn->prepare("call social_login(?,?,?)");
	$result->bind_param("sss",$fname,$lname,$email);
	$result->execute();

	if($result)
	{
		echo "<script>
		opener.location.href = '../../../view/user/';
		close();
		</script>
		";
	}
	else
	{
		echo "<script>
		opener.location.href = '../../../view/handy/';
		close();
		</script>
		";
	}

	//echo '</pre>';
}	
	// connect to database
/*	$mysqli = new mysqli($host_name, $db_username, $db_password, $db_name);
    if ($mysqli->connect_error) {
        die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
    }
	
	//check if user exist in database using COUNT
	$result = $mysqli->query("SELECT COUNT(google_id) as usercount FROM google_users WHERE google_id=$user->id");
	$user_count = $result->fetch_object()->usercount; //will return 0 if user doesn't exist
	
	*///show user picture
/*	echo '<img src="'.$user->picture.'" style="float: right;margin-top: 33px;" />';
	
	*///if($user_count) //if user already exist change greeting text to "Welcome Back"
    {
    //  echo 'Welcome back '.$user->name.'! [<a href="'.$redirect_uri.'?logout=1">Log Out</a>]';
    }
	/*else //else greeting text "Thanks for registering"
	{ 
        echo 'Hi '.$user->name.', Thanks for Registering! [<a href="'.$redirect_uri.'?logout=1">Log Out</a>]';
		$statement = $mysqli->prepare("INSERT INTO google_users (google_id, google_name, google_email, google_link, google_picture_link) VALUES (?,?,?,?,?)");
		$statement->bind_param('issss', $user->id,  $user->name, $user->email, $user->link, $user->picture);
		$statement->execute();
		echo $mysqli->error;
    }
	
	//print user details
	echo '<pre>';
	print_r($user);
	echo '</pre>';
}
echo '</div>';
*/

?>

</body>
</html>