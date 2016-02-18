<?php session_start(); ?>

<html>
<body>

   
<div class="container"  >
<div class= "row"  >
<div class="col-sm-7" style="background-color: #dd4b39; ">
<header class="main-header" style="height:40px">
   <a href="index.php"  >
      <span style="color:white;font-size: 30px"><b>We</b>Assist</span>
    </a>
    </header>

</div>

</div>
<div class="row">
<div class="col-sm-7" style="background-color: #ecf0f5;padding-bottom: 2%" >
<h4 style="margin-left: 5%;padding-top: 2%">Dear <?php echo $_SESSION['f_name'] . " " .$_SESSION['l_name'] ; ?>, </h4><br/>
<h4 style="margin-left: 5%;">You Have sucessfully created a Job below are the details : </h4>
  <div class="box box-primary" style="border:1px solid grey;margin-left:5%;margin-top:1%;padding-bottom:1%;background-color: white;height: 220px;width: 85%;padding: 2%;">
  <h style="font-size: 18px">  Jobcategory : </h>  &nbsp&nbsp<font size="4px" text=normal><?php echo $_SESSION['jobcat'] ?></font>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <h style="font-size: 18px">  Subcategory : </h>&nbsp&nbsp<font size="4px" text=normal><?php echo $_SESSION['subcat'] ?></font> <br/><br/>
  <h style="font-size: 18px">  Jobtitle : </h>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<font size="4px" text=normal><?php echo $_SESSION['jobti'] ?></font> <br/><br/>            
  <h style="font-size: 18px">  JobDescription : </h>&nbsp&nbsp<font size="4px" text=normal><?php echo $_SESSION['jobdes'] ?></font> <br/><br/>            
  <h style="font-size: 18px">  JobPhoto : </h>&nbsp&nbsp&nbsp&nbsp<img src="image/<?php echo $_SESSION['jobph'] ?>" style="width:85px;height:45px;"><br/><br/>            
</div>
</div>
</div>
<div class="row">
<div class="col-sm-7" style="background-color: white;height:3%;padding:2%"  >
    <footer class="main-f" >
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.3.2
    </div>
    <strong>Copyright &copy; 2014-2015 <a href="../../main/" style="color:black">WeAssist</a>.</strong> All rights
    reserved.
  </footer>


  
</div>
</div>
</div>
</body>
</head> 
</html>