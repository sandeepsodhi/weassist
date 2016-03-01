
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

<input type="text" id="search-input" />
<div id="sh" name="sh" ></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
<script src="//cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>
<script>
  var client = algoliasearch("IWAHMM52HK", "194fa6150b9718afc0236eb74f5e7fb8")
  var index = client.initIndex('category');
  var params={hitsPerPage:5};
  
  autocomplete('#search-input', { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'cat_name',
      templates: {
        suggestion: function(suggestion) {
    
index.search('c', params)
.then(function searchSuccess(content) {

  for (var i = 0; i < 5; ++i) {
  //  console.log(content.hits[i].cat_name);
    
    $("#sh").append(suggestion._highlightResult.cat_name.value + " <br/> "+ content.hits[i].cat_id)  ;
   //  $("#sh").append("<br/>"+ content.hits[i].cat_name+ content.hits[i].cat_id + "  " +content.hits[i].cat_desc)  ;
  }

})
.catch(function searchFailure(err) {
  console.error(err);
}); 
     return suggestion._highlightResult.cat_name.value;
        }
      }
    }
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



