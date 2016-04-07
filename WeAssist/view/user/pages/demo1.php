<?php require_once("../../../model/dbconnect.php");?>
<?php
   
    $searchTerm = $_GET['term'];
    
    //get matched data from skills table
    $query = mysqli_query($conn,"SELECT * FROM sub_category WHERE subcat_name LIKE '%".$searchTerm."%' ORDER BY subcat_name ASC");
    while ($row = $query->fetch_assoc()) {
        $data[] = $row['subcat_name'];
    }
    
    //return json data
    echo json_encode($data);
?>