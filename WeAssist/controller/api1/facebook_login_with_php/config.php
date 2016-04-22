<?php
include_once("inc/facebook.php"); //include facebook SDK
######### Facebook API Configuration ##########
$appId = '1499856963656095'; //Facebook App ID
$appSecret = '4d8ed10a151857e1e44d1b80fc6fe557'; // Facebook App Secret
$homeurl = 'http://localhost/weassist/controller/api/facebook_login_with_php/';  //return to home
$fbPermissions = 'email';  //Required facebook permissions

//Call Facebook API
$facebook = new Facebook(array(
  'appId'  => $appId,
  'secret' => $appSecret

));
$fbuser = $facebook->getUser();
?>