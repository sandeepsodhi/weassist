<?php
header('Content-Type:application/json');
    require_once '../../model/dbConnect.php';


$detailnew=array();
//$query1="select cat_id from category where cat_name='$catname'";
// $result1 = mysqli_query($conn, $query1); 
//$row =mysqli_fetch_assoc($result1);
//$catid=$row['cat_id'];
$query3="select cat_id,subcat_id,u_name from profession";
$result3 = mysqli_query($conn, $query3);
	

while($row3 =mysqli_fetch_assoc($result3))
{
	

	$query4="SELECT s.subcat_name,u.f_name, c.cat_name,u.l_name,u.profile_pic,u.city,u.u_name from sub_category s,users u,category c where s.subcat_id='".$row3['subcat_id']."' AND u.u_name='".$row3['u_name']."'AND c.cat_id='".$row3['cat_id']."'";

 $result4 = mysqli_query($conn, $query4); 
 $row4 =mysqli_fetch_assoc($result4);
 $detailnew[]=$row4;
}
// $query2="select f_name,l_name,subcat_name,city,image from profession where cat_name='health'";

//  $result2 = mysqli_query($conn, $query2); 

//  $detail=array();

// while($row2 =mysqli_fetch_assoc($result2))
// {

// 	$detail[]=$row2;
// }
echo json_encode($detailnew);
?>