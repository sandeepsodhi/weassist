<html>
<head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                 
                 function search(){
 
                      var title=$("#search").val();
 
                      if(title!=""){
                        $("#result").html("<img alt='ajax search' />");
                         $.ajax({
                            type:"post",
                            url:"trysearch.php",
                            data:"title="+title,
                            success:function(data){
                                $("#result").html(data);
                                $("#search").val("");
                             }
                          });
                      }
                      
 
                     
                 }
 
                  $("#button").click(function(){
                  	 search();
                  });
 
                  $('#search').keyup(function(e) {
                     if(e.keyCode == 13) {
                        search();
                      }
                  });
            });
        </script>
</head>
<body>
        <div id="container">
             <input type="text" id="search" placeholder="Search Tutorials Here... Ex: Java, Php, Jquery..."/>
             <input type="button" id="button" value="Search" />
             <div id="livesearch"></div>
             <ul id="result"></ul>
        </div>
  </body>
  </html>