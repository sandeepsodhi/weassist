<?php
require_once '../../../model/dbConnect.php';
if($_POST['subcat_id'])
{
 $subcat_id=$_POST['subcat_id'];
 $cat_id = $_POST['cat_id'];
$sql=mysqli_query($conn,"select subcat_id,subcat_city from sub_category where subcat_id='$subcat_id'");

echo "<select name='subcat_city' id='subcat_city' style='margin-top:7px;border:1px solid grey' class='col-xs-12 col-sm-12 btn btn-border' required>
          <option value=''  selected disabled><center>Select City</center></option>";
while($row=mysqli_fetch_array($sql,MYSQL_ASSOC))
{
	$subcat_city=$row['subcat_city'];
	$subcat_id=$row['subcat_id'];
	echo '<option value="'.$subcat_city.'">'.$subcat_city.'</option>';
}
}


?>

<script type="text/javascript">

$(document).ready(function(){
	$("#subcat_city").change(function()
	{
	var subcat_city=$(this).val();
	var subcat_id = "<?php echo $subcat_id; ?>";
	var cat_id = "<?php  echo $cat_id; ?>";
	var dataString = 'subcat_city='+subcat_city+'&cat_id='+cat_id+'&subcat_id='+subcat_id;
	$.ajax
	({
		type: "POST",
		url: "join.php",
		data: dataString,
		cache: false,
		success: function(html)
		{
		$("#sh").html(html);
		} 
	});

	});	
});
</script>

