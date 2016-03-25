

	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">

	<link rel="stylesheet" href="css1/bootstrap.min.css">
	<link rel="stylesheet" href="css1/docs.min.css">
	<link rel="stylesheet" href="css1/fonts/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="css1/fonts/entypo/css/entypo.css">
	<link rel="stylesheet" href="vendor1/owl-carousel/owl.carousel.css" media="screen">
	<link rel="stylesheet" href="vendor1/owl-carousel/owl.theme.css" media="screen">
	<link rel="stylesheet" href="vendor1/magnific-popup/magnific-popup.css" media="screen">
	<link rel="stylesheet" href="vendor1/flexslider/flexslider.css" media="screen">
	<link rel="stylesheet" href="vendor1/job-manager/frontend.css" media="screen">

	<!-- slider button-->
	<link href="css1/bootstrap-switch.css" rel="stylesheet">
    	
	<!-- Theme CSS-->
	<link rel="stylesheet" href="css1/theme.css">
	<link rel="stylesheet" href="css1/theme-elements.css">
	<link rel="stylesheet" href="css1/animate.min.css">

	<!-- login dialog -->
	<link href="assets/css/login.css" rel="stylesheet" />
    <link href="assets/css/social.css" rel="stylesheet" />
    <link href="assets/css/padd.css" rel="stylesheet" />
    <link href="assets/js/validate.js" rel="stylesheet" />
        
    <!-- FONT AWESOME ICONS STYLE SHEET -->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    

	<!-- Head Libs -->
	<script src="vendor1/modernizr.js"></script>
</head>
<body >
<font   color="black">
<!-- <input type="text" id="search-input" name="search-input" style="font-color:black" />
 -->
<!-- <input type="button" id="btnsub" name="btnsub" value="Search"/> -->

</font>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="//cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
<script>
  var client = algoliasearch("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  var index = client.initIndex('category');
 var res = client.initIndex('category');
  var params={hitsPerPage:5};
  autocomplete('#search-input', { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'cat_name',
      templates: {
        suggestion: function(suggestion) {
  for (var i = 0; i < 5; ++i) {
    // return suggestion._highlightResult.cat_name.value;
     return suggestion._highlightResult.cat_name.value;
        }
      }
    } }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(suggestion, dataset);
  });
var det  =[];
var htm='';
var htm1='';
var size;
var cont= [ [],[],[],[] ,[] ];
 
//for(var i=0;i<4;i++)

//button code
var ch="";
var j=0;
$('#btnsearch').click(function(){
htm1='';

//ch='';
// res.search($('#search-input').val(), searchMultiCallback);
// function searchMultiCallback(err, content) {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   var categories = content.results;
//   for (var i = 0; i < categories.hits.length; ++i) {
//     console.log(categories.hits[i]);
//   }
// }
// });
//var ch=1;
//index.search($('#search-input').val(), searchCallback);
 //ch=$('#search-input').val();
console.log(ch + "chhh");
//ch=0;
// with parameters
index.search(
 $('#search-input').val(), {
    hitsPerPage: 5, facets: '*'
  },
  searchCallback
);
function searchCallback(err, content) {
  if (err) {
    return err;
  }

  content.hits.forEach(function(hit) {
  //  det.push(hit);
// $("#namec").append(hit.cat_name);

//alert($('#search-input').serialize());
if(ch!=$('#search-input').val())
{
var inp=$('#search-input').val();
$.post('catret.php', {cat:inp}, function(response) {
 size=response.length;
 //alert(size);
for(var i=0;i<response.length;i++)
{ 
  //cont[i]=[];
  cont[i][0]=response[i].f_name;
  cont[i][1]=response[i].l_name;
   cont[i][2]=response[i].subcat_name;
  cont[i][3]=response[i].city;
  cont[i][4]=response[i].profile_pic;
  for(j=0;j<4;j++ )
   console.log(cont[i][j]  + i);

  htm+=	           '<div class="job_listings" id="a" style="margin-right:10px;margin-left: 10px">' +
						'<ul class="job_listings" id="b">'+
						'	<li class="job_listing" id="c">'+
								'<a href="#">'+
								'	<div class="job_img" >'+
								'	<img src="image/'+ cont[i][4] +'" alt="" class="company_logo">'+
								'	</div>'+
								'	<div class="position" id="d"  style="height:100%;width:30%">'+
								'		<h3 id="namec" style="margin-left:10%">' + cont[i][0] + "  " + cont[i][1] +'</h3>'+
								'		<div class="company" style="margin-left:10%">'+
								'			<strong>' + "Deals in " +  cont[i][2] +'</strong>'+
								'		</div>'+
								'	</div>'+
                             	'	<div class="location" >'+
								'		<i class="fa fa-location-arrow"></i>' + cont[i][3] +
								'	</div>'+

								'	<div class="rating">'+
								'		<div class="rating-stars">'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star"></i>'+
								'			<i class="fa fa-star-half-o"></i>'+
								'		</div>'+
								'		<div class="reviews-num">12 Reviews</div>'+
								'	</div>'+
								'	<ul class="meta">'+
								'		<li class="job-type">Painting</li>'+
								'		<li class="date">'+
								'			Posted 1 month ago'+
								'		</li>'+
								'	</ul>'+
								'</a>'+
							'</li>'+

'</ul>'+
'</div>';

    htm1+='<br/>' + htm;
    htm='';
 $('#loc').html(htm1);
  

}



}, 'json');


//  alert("ggffgfg");








//$('#loc').html(htm1);
}
ch=$('#search-input').val();

    console.log(hit);

  });
}
//ch=$('#search-input').val();

//alert(det);
}


);


</script>
