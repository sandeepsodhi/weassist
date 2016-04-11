<style>
.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 1px solid #999;
  border-top: none;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #B2D7FF;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}
.algolia-autocomplete .category {
  text-align: left;
  background: #efefef;
  padding: 10px 5px;
  font-weight: bold;
}
</style>
<div id="demo-search"></div>
<input type="text" id="search-input" />
<script src="js/algolia/algoliasearch.min.js"></script>
<script src="js/algolia//hogan.min.js"></script>
<script src="js/algolia/autocomplete.min.js"></script>
<script>
  var client = algoliasearch("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  var teams = client.initIndex('category');
//  var players = client.initIndex('YourPlayersIndexName');

  // Mustache templating by Hogan.js (http://mustache.github.io/)
  /*var templatePlayer = Hogan.compile('<div class="player">' +
    '<div class="name">{{{ _highlightResult.name.value }}} <small>({{ points }})</small></div>' +
    '<div class="team">{{{ _highlightResult.team.value }}}</div>' +
  '</div>');*/
  var templateTeam = Hogan.compile('<div class="team">' +
    '<div class="name">{{{ _highlightResult.name.value }}}</div>' +
    '<div class="location">{{{ _highlightResult.location.value }}}</div>' +
  '</div>'); 

  // autocomplete.js initialization
  autocomplete('#search-input', {hint: false}, [
    {
      source: autocomplete.sources.hits(teams, {hitsPerPage: 5}),
      displayKey: 'cat_name',
      templates: {
        header: '<div class="category"></div>',
        suggestion: function(hit) {
          // render the hit using Hogan.js
          return templateTeam.render(hit);
        }
      }
    }
    /*{
      source: autocomplete.sources.hits(players, {hitsPerPage: 5}),
      displayKey: 'name',
      templates: {
        header: '<div class="category">Players</div>',
        suggestion: function(hit) {
          // render the hit using Hogan.js
          return templatePlayer.render(hit);
        }
      }
    }*/

  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(suggestion, dataset);
  });
</script>












<!DOCTYPE html>
<html class="not-ie no-js" lang="en">  

<head>

  <!-- Basic Page Needs
  ================================================== -->
  <meta charset="utf-8">
  <title>Handyman - Job Board HTML Template</title>


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
<style>
.algolia-autocomplete {
  width: 100%;
}
.algolia-autocomplete .aa-input, .algolia-autocomplete .aa-hint {
  width: 100%;
}
.algolia-autocomplete .aa-hint {
  color: #999;
}
.algolia-autocomplete .aa-dropdown-menu {
  width: 100%;
  background-color: #fff;
  border: 1px solid #999;
  border-top: none;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion {
  cursor: pointer;
  padding: 5px 4px;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion.aa-cursor {
  background-color: #B2D7FF;
}
.algolia-autocomplete .aa-dropdown-menu .aa-suggestion em {
  font-weight: bold;
  font-style: normal;
}
</style>
</head>
<body>
<font   color="black">
<input type="text" id="search-input" style="font-color:black" />
<input type="submit" id="btnsub" name="btnsub" value="Search"/> 
<br/>
<div id="sh" name="sh" ></div>
</font>

  <br/><br/>
          <div class="job_listings" id="a" style="margin-right:10px;margin-left: 10px">
            <ul class="job_listings" id="b">
              <li class="job_listing" id="c">
                <a href="#">
                  <div class="job_img" >
                    <img src="images/samples/person1.jpg" alt="" class="company_logo">
                  </div>
                  <div class="position" id="d">
                    <h3 id="namec">Debbie Bidart</h3>
                    <div class="company">
                      <strong>Paint Removal from Exterior or Interior Surfaces</strong>
                    </div>
                  </div>
                  <div class="location">
                    <i class="fa fa-location-arrow"></i> Melbourne, AU
                  </div>
                  <div class="rating">
                    <div class="rating-stars">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star-half-o"></i>
                    </div>
                    <div class="reviews-num">12 Reviews</div>
                  </div>
                  <ul class="meta">
                    <li class="job-type">Painting</li>
                    <li class="date">
                      Posted 1 month ago
                    </li>
                  </ul>
                </a>
              </li>
</ul>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="//cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
<script>
  var client = algoliasearch("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8");
  var index = client.initIndex('category');
//saving data into index from database eachtime

//end saving
  var params={hitsPerPage:5};
  
  autocomplete('#search-input', { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'cat_name',
      templates: {
        suggestion: function(suggestion) {
  


    //index.search($('#search-input').val(), params)
//.then(function searchSuccess(content) {
//  $("#namec").html("");
//$('#btnsub').click(function(){
  for (var i = 0; i < 5; ++i) {
  //  console.log(content.hits[i].cat_name);
  //alert($('#search-input').val());
    
     return suggestion._highlightResult.cat_name.value;
  //$("#namec").append( temp + content.hits[i].cat_name + " <br/> "+ content.hits[i].cat_id+"<br/>")  ;
   //  $("#sh").append("<br/>"+ content.hits[i].cat_name+ content.hits[i].cat_id + "  " +content.hits[i].cat_desc)  ;
  //}


//});

//})
//.catch(function searchFailure(err) {
 // console.error(err);
//}); 
     return suggestion._highlightResult.cat_name.value;
        }
      }
    } }
  ]).on('autocomplete:selected', function(event, suggestion, dataset) {
    console.log(suggestion, dataset);
  });

/*
index.search('p', params)
.then(function searchSuccess(content) {

  for (var i = 0; i < content.hits.length; ++i) {
    console.log(content.hits[i].cat_name);
    document.write('<div id="sh" name="sh">');
    document.write('<p>' + content.hits[i].cat_name + content.hits[i].cat_id + '</p>' );
    document.write('</div>');
    document.write('<br/>');

  }

})
.catch(function searchFailure(err) {
  console.error(err);
});  */
</script>



</html>














