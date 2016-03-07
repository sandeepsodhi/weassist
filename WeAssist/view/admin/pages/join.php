<?php
require_once '../../../model/dbConnect.php';
if($_POST['subcat_city'])
{
$subcat_city=$_POST['subcat_city'];
$cat_id = $_POST['cat_id'];
$subcat_id = $_POST['subcat_id'];
$sql=mysqli_fetch_assoc(mysqli_query($conn,"select channel from chat_user where cat_id='$cat_id'and subcat_id='$subcat_id' and u_id in(select u_id from users where city='$subcat_city')"));
	$ch =  $sql['channel'];	
	$fp=fopen('my.json','w');
	fwrite($fp, json_encode($ch));
	fclose($fp);
}
?>
<script type="text/javascript">
var c = "<?php echo 'cat_id= '.$cat_id.',subcat_id='.$subcat_id.',city='.$subcat_city;?>";	
console.log(c);
</script>