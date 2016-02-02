<!DOCTYPE>
<html>
  <head>
      <title>WeAssist</title>
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  </head>
  <body>
<?php
// print_r($content);
 
require_once '../../../model/dbConnect.php';

 $fname = $content['person']['first-name'];
 $lname = $content['person']['last-name'];
 $uname = $content['person']['email-address'];

$result = $conn->prepare("call linkedin_login(?,?,?)");
$result->bind_param("sss",$uname,$fname,$lname);
$result->execute();

echo "<script>
      opener.location.href = '../../../view/handy/job-dashboard.html';
      close();
      </script>      
      ";


?>
      
  </body>
</html>
