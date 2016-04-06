<?php
    session_start();
	require_once '../../../model/dbConnect.php';
    $jobcategory=mysqli_escape_string($conn,$_POST["jobcateg"]);
    //$subcateg=mysqli_escape_string($conn,$_POST["id"]);
    $subcateg=mysqli_escape_string($conn,$_POST["subcateg"]);
    $jobtitle=mysqli_escape_string($conn,$_POST["jobtitle"]);
    $jobdesc=mysqli_escape_string($conn,$_POST["jobdesc"]);
//    $jobdate=mysqli_escape_string($conn,$_POST["Edate"]);
  $jobdat=$_POST["Edate"];
   $jobdate=date_create($jobdat);
   $jobdate=date_format($jobdate,"Y-m-d");

    $jobtime=mysqli_escape_string($conn,$_POST["tapp"]);
   $jobprice=mysqli_escape_string($conn,$_POST["jobprice"]);
   $jobtodaydate=date("Y-m-d");
   $jobtime=$jobtime.":"."00".":"."00"."000000";
    $uname=$_SESSION['u_name'];
   $res=mysqli_query($conn,"select cat_name from category where cat_id='$jobcategory'");
                  $ress=mysqli_fetch_row($res);
 $jobcateg=$ress[0];
   $res4=mysqli_query($conn,"select subcat_id from sub_category where subcat_name='$subcateg'");
                  $ress4=mysqli_fetch_row($res4);
 $subcategid=$ress4[0];
$_SESSION['jobcategory']=$jobcateg;

    if(!empty($_FILES['jobphoto']) || $_FILES['jobphoto']['size']>0){
		$name = mysqli_escape_string($conn,$_FILES['jobphoto']['name']);
		$type = $_FILES['jobphoto']['type'];
		$error = $_FILES['jobphoto']['error'];
		$size = $_FILES['jobphoto']['size'];
		$temp = $_FILES['jobphoto']['tmp_name'];


		if($error > 0)
		{
	//	$res = $conn->prepare("call updatedetails(?,?,?,?,?,?,?,?)");
    //$res->bind_param("sssdssss",$f_name,$l_name,$email,$phone,$city,$uname,$state,$country);
    //echo $res->execute();	
	           //echo "frfr";
          $conn->query("CALL insertjobs('$jobcategory','$subcateg','$jobtitle','$jobdesc','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
         
                            $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");
 
		}
		else
		{
			if($size > 10000000)
				echo "Format not allowed or file size is too big!";
			elseif (substr($type,0,5)=='image') {
				//$result = mysqli_query($conn,"insert into users (u_name,pswd,f_name,l_name,email,contact,profile_pic) values ('$u_name','$pswd','$f_name','$l_name','$email','$contact','$name')");
				    if($name)
					{	move_uploaded_file($temp,"image/".$name);	

  	                    $conn->query("CALL insertjob('$jobcategory','$subcateg','$jobtitle','$jobdesc','$name','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
                    $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");

                    }
                    else
                    {

                       $conn->query("CALL insertjobs('$jobcateg','$subcateg','$jobtitle','$jobdesc','$uname','$jobprice','$jobtodaydate','$jobdate','$jobtime')");
                         $query1="select subcat_id from createjob where jobcategory='$jobcategory' AND subcategory='$subcateg' AND uname='$uname' AND job_date='$jobtodaydate'" ;

 $result1 = mysqli_query($conn, $query1); 
$row1 =mysqli_fetch_assoc($result1);
$jobid=$row1['subcat_id'];
                        $conn->query("CALL insertstatus('$jobid','$jobcategory','$subcategid')");


                    }

  
               }
           }
       
        }


         else {
                       
         }  

//     include('emailagain.php');

?>