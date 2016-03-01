<?php
    require_once '../../../model/dbConnect.php';
    //open connection to mysql db
  
    //fetch table rows from mysql db
    $sql = "select * from category";
    $result = mysqli_query($conn, $sql); 

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
     $fp = fopen('empdata.json', 'w');
    fwrite($fp, json_encode($emparray));
    fclose($fp);
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($conn);
?>