<?php

 header("Content-Type","application/json")?>
   <?php 
  
   require_once '../../../model/dbConnect.php'; 

   $i=0;
		$fetch = mysqli_query($conn,"select subcat_id, subcat_name from sub_category");    
		while ($row = mysqli_fetch_array($fetch, MYSQL_ASSOC)) 
		{
	//$catarr[] =array($row['subcat_id']);
	//$catarr[] =array($row['subcat_name']);
  	
	$i=$i+1;
	
	$catarr = array
	(
	
			array($row['subcat_id']),
			array($row['subcat_name'])

		);
		}
		
				echo json_encode($catarr);

				
		
		?>
		
		



