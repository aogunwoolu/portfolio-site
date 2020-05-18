<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
	<!-----reset css call----->
    <link href='../reset.css' rel='stylesheet'>
	<!-----page css call----->
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
<?php
	//start session to access variables
    session_start();
	//include autoloader (to use any class)
    include 'autoload.php';

    //database connection
	$servername = getenv("MYSQL_SERVICE_HOST");
	$dbport = getenv("MYSQL_SERVICE_PORT");
	$username = getenv("DATABASE_USER");
	$password = getenv("DATABASE_PASSWORD");
	$db = getenv("DATABASE_NAME");

	/*
	$servername = "localhost";
	$username = "root";
	$password = "password123";
	$db = "login_details";
	*/

	//Create connection
	$conn = new mysqli($servername, $username, $password,$db);

	//function for generating unique IDs
	function idGen($conn){
		//generates unique ID under constraints of connection
		$value = mysqli_real_escape_string($conn,uniqid());
		//check if id exists already in database
		$result = mysqli_query($conn,"SELECT `postID` FROM `posts` WHERE `postID` = '" . $value ."'");
        if (mysqli_num_rows($result) > 0) {
            return idGen($conn);
        }
        else{
            return $value;
        }
    }

    //generate unique id using idGen function ^^^
    $postID = idGen($conn);
	//get current date/time
	$postDate = date("Y-m-d h:i:s");
	//get URL vars
	$postTitle = mysqli_real_escape_string($conn,$_GET["titleToUpload"]);
	$postContents = mysqli_real_escape_string($conn,$_GET["postToUpload"]);
	//@todo
	$likes = 0;
	$dislikes = 0;

	//create SQL statement to query the database
	$statement = "INSERT INTO posts (postID,postDate,postTitle,post,likes,dislikes) VALUES ('$postID','$postDate','$postTitle','$postContents',$likes,$dislikes)";
	//query with statement
	if (mysqli_query($conn,$statement)){
		echo "created successfully";
	}
	else{
		echo "error".mysqli_error($conn);
	}

	//unserialize user object in session
	$user = unserialize($_SESSION["user"]);
	//make local variable from username
	$userName = $user->getUN();

	//create SQL statement to query the database
   	$statement = "INSERT INTO userowns (userName,postID) VALUES ('$userName','$postID')";
	//query with statement
   	if (mysqli_query($conn,$statement)){
   		echo "created successfully";
   	}
   	else{
   		echo "error".mysqli_error($conn);
   	}

	//close database connection
   	$conn->close();

	//close database connection
   	header("Location: viewBlog.php");
   	exit;
?>
</body>
</html>
