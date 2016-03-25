<html>
<head>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript">
 $(document).ready(function(){
	var req = null;
	$('#keysearch').on('keyup', function(){
		var key = $('#keysearch').val();
		if (key )
		{
			$('#loading').css('display', 'block');
			if (req)
				req.abort();
			req = $.ajax({
				url : 'fetch_record.php',
				type : 'POST',
				cache : false,
				data : {
					keysearch : key,
				},
				success : function(data)
				{
					console.log(data)
					if (data)
					{
						$('#loading').css('display', 'none');
						$("#result").html(data).show();
					}
				}
			});
		}
		else
		{
			$('#loading').css('display', 'none');
			$('#result').css('display', 'none');
		}
 
	});
});
</script>
<style type="text/css">
.panel-default{padding: 15px;}
.form-group{margin-top: 15px;}
.panel-heading{background-color: #40A2BE !important; color: #FFFFFF !important;}
#loading{display: none;}
#searchid
{
    width:500px;
    border:solid 1px #000;
    padding:10px;
    font-size:14px;
}
#result
{
    position:absolute;
    width:500px;
    padding:10px;
    display:none;
    margin-top:-1px;
    border-top:0px;
    overflow:hidden;
    border:1px #CCC solid;
    background-color: white;
}
.show{font-size:20px;height: 50px;padding: 5px;}
.show:hover{background:#40A2BE;color:#FFF;cursor:pointer;}
img#search{width:50px; height:40px; float:left; margin-right:6px;}
 
</style>
</head>
<body>
<h1>Live search using jquery and mysql in php</h1>
	<div class="row">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span>Live Search</span>
			</div>
			<div class="form-group">
				<label for="username">Username :</label>
				<input name="keysearch" value="" placeholder="name" id="keysearch" type="text" class="form-control">
				<span id="loading">Loading...</span>
			</div>
			<div id="result"></div>
		</div>
	</div>
</div>
</body>
</html>