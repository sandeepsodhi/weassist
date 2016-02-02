<?php
    session_start();
    require_once '../model/dbConnect.php';  //this is used to call once data.

    $u_name = mysql_escape_string($_POST['u_name']);
    echo "<br>";
    $pswd = mysql_escape_string($_POST['pswd']);

    ////fetching the password of the user to compare with existing password

    $login = mysqli_query($conn,"call login('".$u_name."','".$pswd."')");
    $res =mysqli_fetch_assoc($login);
	//$login  = $conn->prepare("call login(?,?)");
    //$login->bind_param("ss",$email,$pswd);
    //$login->execute();
//    mysqli_query($conn,"select f_name from users where u_name='$u_name' AND pswd='$pswd'");
    if (mysqli_num_rows($login) === 1) {
		
       	//$ans = mysqli_fetch_assoc($sq);
      //  $_SESSION['fname'] = $ans['fname'];
      //  $_SESSION['lname'] = $ans['lname'];
      //  $_SESSION['usr_id'] = $ans['usr_id'];
      //  $_SESSION['mobile'] = $ans['mobile'];
      //  $_SESSION['usr_type'] = $ans['usr_type'];
<<<<<<< HEAD
      echo "<body onload = 'alert(\"logged in successful!!!\");'></body> ";
      header("location:../view/handy/page-services.php");
=======
      //echo "<body onload = 'alert(\"logged in successful!!!\");'></body> ";
      $_SESSION['f_name']=$res['f_name'];
	  $_SESSION['l_name']=$res['l_name'];
	  $_SESSION['email']=$res['u_name'];
       //echo $_SESSION['fname'];   
	  	  header("location:../view/user/index.php");
	  
>>>>>>> 897d5244ea11e8a959cd604eeb8f267bb29ffc8d
           
    } else {
        echo "<body onload='alert(\"LOGIN FAILED !!! TRY AGAIN WITH CORRECT CREDENTIAL\");'></body> ";
     //   header("location:handy/");
        $_SESSION['login'] ='1';      
    }
	//session_close();
?>
