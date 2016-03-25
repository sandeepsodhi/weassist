<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="//cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
<?php 
//require_once 'vendor/autoload.php';
require_once 'alg/algoliasearch.php';
  $client = new \AlgoliaSearch\Client("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  $index = $client->initIndex('category');
$pdo = new PDO('mysql:host=localhost;dbname=weassist', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));

$results = $pdo->query("SELECT * from category");
//echo $results.cat_name;
if ($results)
{
  $batch = array();
  // iterate over results and send them by batch of 10000 elements
  foreach ($results as $row)
  {
  	// select the identifier of this row
    $row['objectID'] = $row['cat_id'];
      //echo $row;
 array_push($batch, $row);
  // echo array_pop($batch);
 //  echo $batch[]; 
    echo count($batch);
    if (count($batch) == 5)
    {
      $index->saveObjects($batch);
      $batch = array();
    }
//    $index->saveObjects($batch);
  }
//  echo "dgdge";
//  $index = "<script> index </script>";  
//  $index->saveObjects($batch);

}
?>
