<?php

    require_once '../model/dbConnect.php';  //this is used to call once data.

    $u_name = mysql_escape_string($_POST['u_name']);
    echo "<br>";
    $pswd = mysql_escape_string($_POST['pswd']);

    ////fetching the password of the user to compare with existing password
    $login = mysqli_query($conn,"call login('".$u_name."','".$pswd."')");
    //$login  = $conn->prepare("call login(?,?)");
    //$login->bind_param("ss",$email,$pswd);
    //$login->execute();


//    mysqli_query($conn,"select f_name from users where u_name='$u_name' AND pswd='$pswd'");
    if (mysqli_num_rows($login) === 1) {
      //  $ans = mysqli_fetch_assoc($sqlre);
      //  $_SESSION['fname'] = $ans['fname'];
      //  $_SESSION['lname'] = $ans['lname'];
      //  $_SESSION['usr_id'] = $ans['usr_id'];
      //  $_SESSION['mobile'] = $ans['mobile'];
      //  $_SESSION['usr_type'] = $ans['usr_type'];
      echo "<body onload = 'alert(\"logged in successful!!!\");'></body> ";
      header("location:../view/handy/page-services.php");
           
    } else {
        echo "<body onload='alert(\"LOGIN FAILED !!! TRY AGAIN WITH CORRECT CREDENTIAL\");'></body> ";
     //   header("location:handy/");
        $_SESSION['login'] ='1';      
    }
?>
