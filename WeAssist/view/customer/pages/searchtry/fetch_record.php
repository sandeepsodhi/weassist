 	
<?php
	require_once '../../../../model/dbConnect.php';

if(isset($_POST['keysearch']))
{
    $search = $_POST['keysearch'];
   $res=mysqli_query($conn,"select cat_name from category where cat_name like '%$search%'");
   
while($ress=mysqli_fetch_row($res))    {
        $name   = $ress[0];
        echo "<div class='show'>"."<span class='name'>". $name . "</span></div>";
    }
}
?>