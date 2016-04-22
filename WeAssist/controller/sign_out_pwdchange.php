<?php
session_start();
include "../model/dbConnect.php";
if(isset($_SESSION['u_id']))
{
mysqli_query($conn,"update chat_USER set is_online='offline' where pr_id in(select pr_id from profession where u_id = '".$_SESSION['u_id']."')");
}
session_destroy();
session_start();
    $_SESSION['pwdchange']='true';
header('location:../view/main/');
?>