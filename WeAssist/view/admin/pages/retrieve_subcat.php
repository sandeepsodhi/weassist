<?php
require_once '../../../model/dbConnect.php';
if($_POST['cat_id'])
{
$cat_id=$_POST['cat_id'];
$sql=mysqli_query($conn,"select subcat_id,subcat_name from sub_category where cat_id='$cat_id'");

echo "<select name='subcat_id' id='subcat_id' onchange='catchanged()' style='margin-top:7px' class='col-xs-12 col-sm-12 btn btn-border' required>
    <option value=''  selected disabled><center>Select SubCategory</center></option>";
while($row=mysqli_fetch_array($sql,MYSQL_ASSOC))
{
	$subcat_name=$row['subcat_name'];
	$subcat_id=$row['subcat_id'];
	echo '<option value="'.$subcat_id.'">'.$subcat_name.'</option>';
}
echo "</select>
	  <div id='city'></div>	";
}
?>
<script type="text/javascript">
// console.log("s");
$(document).ready(function(){
function catchanged()
{
	alert('hello subcat_id change called');
/*console.log("in");
var subcat_id=$(this).val();
var cat_id = '<?php echo $cat_id;?>';
var dataString = 'subcat_id='+ subcat_id+'&cat_id='+cat_id;

$.ajax
({
type: "POST",
url: "retrieve_city.php",
data: dataString,
cache: false,
success: function(html)
{
$("#city").html(html);
} 
});*/
}	
});
</script>    

