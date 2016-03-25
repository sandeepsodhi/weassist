<?php
header('Content-Type:application/json');
$detail=array( array("name"=>"Shu","age"=>"20"),
               array("name"=>"Shss","age"=>"22"),
               array("name"=>"Shuqqw","age"=>"24")
             );
 echo json_encode($detail);

?>