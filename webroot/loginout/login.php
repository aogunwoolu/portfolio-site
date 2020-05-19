<!DOCTYPE html>
<!--start session to access variables--->
<?php session_start(); ?>
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

	// Create connection
	$conn = new  mysqli($servername, $username, $password,$db);
	// Check connection
	if (!$conn) {
     	die("Connection failed: " . mysqli_connect_error());
   	}
	echo "Connected successfully";


	//get post variables, and make them local variables
	$userName = mysqli_real_escape_string($conn,$_POST["mail"]);
	$password = mysqli_real_escape_string($conn,$_POST["pass"]);

	//create SQL statement to query the database
	$result = mysqli_query($conn,"SELECT `userName`,`name`,`DOB`,`adminStatus` FROM `userdetails` WHERE `Email` = '" . $userName . "' AND `password` = '" . $password . "' ");
	//if there is a valid match with the inputted email and password
	if(mysqli_num_rows($result) > 0) {
		//get the results in form of an array
		$row = mysqli_fetch_array($result);
		//create user instance using query result (utilises autoload)
		$currentUser = new user($row['userName'],$row['name'],$row['DOB'],$row['adminStatus']);

		//serialize user object and add as session variable
		$_SESSION["user"] = serialize($currentUser);

		//if the user is an admin: bring user to add post on login
		if ($row['adminStatus'] == 1){
			header("Location: addPost.php");
		}
		//if the user is not an admin: bring user to view blog on login
		else {
			header("Location: viewBlog.php");
		}

		//close database connection
		$conn->close();
		exit;
	}
	//if the users iunput is not a valid match, display form again but with unsuccessful text
	else {
		echo "
			<form id = 'login' method'POST' action='http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/login.html' method='post' >
				<div class='inputs'>
          			<legend class = 'loginL title'>Enter the dungeon...</legend>
          			<div class='inputBar'>
            			<label class = 'loginL' for='email'>email:</label>
            			<input class = 'loginL aligner' type='email' name='mail' value='' autocomplete='on'>
          			</div>
          			<br>
          			<div class='inputBar'>
            			<label class = 'loginL' for='password'>password:</label>
            			<input class = 'loginL' type='password' name='pass' value='' autocomplete='on'>
          			</div>
          			<br>
          			<button class = 'loginL' type='submit'>login</button>

          			<p id = 'unsucc'>login U N S U C C E S S F U L</p>
        		</div>
        		<a href='http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/create_account.html' class='inputs'>Create Account</a>
      		</form>
      		";
    }

    //close database connection
	mysqli_close($conn);
?>
</body>
</html>
