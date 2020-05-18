<?php
//include autoloader (to use any class)
include 'autoload.php';
//tart session to access variables
session_start();
?>
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

//get post position
$pos = (int)($_GET['postID']);

//get post from post array using the position
$post = $_SESSION["postArr"][count($_SESSION["postArr"])-$pos-(1)];
//make local variable from post ID
$postID = $post->getID();

//function for generating unique IDs
function idString($length) {
	//character pool to generate from
    $char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //shuffles character pool
    $char = str_shuffle($char);
	$rand = '';
    //for loop selecting a random char from shuffled char pool and append to rand
    for($i = 0, $l = strlen($char) - 1; $i < $length; $i ++) {
        $rand .= $char[mt_rand(0, $l)];
    }
    return $rand;
}

//top level id generator
function idGen($conn){
	//generate id at length 11
	$value = idString(11);
	//query database to see if ID already exists
	$result = mysqli_query($conn,"SELECT `replyID` FROM `replies` WHERE `replyID` = '" . $value ."'");
	//if exists: generate another ID
	if (mysqli_num_rows($result) > 0) {
		return idGen($conn);
	}
	//else: return value
	else{
		return $value;
	}
}

    /*
   $servername = "localhost";
   $username = "root";
   $password = "password123";
   $db = "login_details";
    */

   	//generate unique id using idGen function ^^^
	$replyID = idGen($conn);
   	//get current date
   	$postDate = date("Y-m-d h:i:s");
   	//get reply contents from form
   	$postContents = $_POST["postToUpload"];

   	//unserialize user object
    $user = unserialize($_SESSION["user"]);
    //store username in local variable using getter
    $userName = $user->getUN();

	//create SQL statement to query the database
   	$statement = "INSERT INTO replies VALUES ('$replyID','$userName','$postDate','$postContents',0)";
   	//query database
   	if (mysqli_query($conn,$statement)){
     	echo "created successfully";
   	}else{
     	echo "error".mysqli_error($conn);
   	}

	//create SQL statement to query the database
   	$statement = "INSERT INTO postreply VALUES ('$postID','$replyID')";
	//query database
   	if (mysqli_query($conn,$statement)){
       	echo "created successfully";
   	}else{
       	echo "error".mysqli_error($conn);
   	}

   	//close controller
   	$conn->close();

   	//redirect to viewblog
   	header("Location: viewBlog.php");
   	exit;
?>
</body>
</html>
