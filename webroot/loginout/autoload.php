<?php
  //creates an autoload function using existing function
  spl_autoload_register(
  	//function to call when autoload is required
  	function($className){
  		//php passes classname to function
    	$file = $className.'.php';
    	//check if file exists
    	if (file_exists($file)){
    		//include file if there is a valid file found
      		include $file;
    	}
  	}
  	);
 ?>
