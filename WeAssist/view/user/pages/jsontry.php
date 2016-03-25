<?php
$m="biiii";
$fp=fopen('my.json','w');
    fwrite($fp, json_encode($m));
    fclose($fp);
//   echo  json_decode($fp);
    $client = new \AlgoliaSearch\Client("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  $index = client.initIndex('category');

$batch = json_decode(file_get_contents("contacts.json"), true);
$index->addObjects($batch);

?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script>
//alert("ffff");
$.getJSON("my.json",function(data)
{
//$.each(data,function(key,val)
{
console.log(data);//"k "+ key + val);
alert(data);
}

	//);
//alert("ddd"+data);
//console.log(data);

}


	);

</script>