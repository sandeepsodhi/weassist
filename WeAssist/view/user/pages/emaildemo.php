<?php
$url = 'https://api.sendgrid.com/';
$params = array(
    'api_user'  => 'Shuviru219',   // My send grid username
    'api_key'   => '175@shuviru',   // My send grid password
    'to'        => 'shuvam.jha007@gmail.com',     
    'subject'   => 'Any',
    'html'      => 'HIIII',
    'from'      => 'shuviru219@gmail.com'
);

$request =  $url.'api/mail.send.json';
$session = curl_init($request);
curl_setopt ($session, CURLOPT_POST, true);
curl_setopt ($session, CURLOPT_POSTFIELDS, $params);
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($session);
curl_close($session);
?>