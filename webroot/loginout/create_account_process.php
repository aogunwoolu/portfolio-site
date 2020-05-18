<?php
/*
   $servername = "localhost";
   $username = "root";
   $password = "password123";
   $db = "login_details";
*/

	//database connection
	$servername = getenv("MYSQL_SERVICE_HOST");
	$dbport = getenv("MYSQL_SERVICE_PORT");
	$username = getenv("DATABASE_USER");
	$password = getenv("DATABASE_PASSWORD");
	$db = getenv("DATABASE_NAME");

	// Create connection
	$conn = new  mysqli($servername, $username, $password,$db);

	//get post variables for use in database
	$userName = mysqli_real_escape_string($conn,$_POST["userName"]);
	$name = mysqli_real_escape_string($conn,$_POST["name"]);
	$dob = date("Y-m-d",strtotime(mysqli_real_escape_string($conn,$_POST["dob"])));
	$password = mysqli_real_escape_string($conn,$_POST["pass"]);
	$mail = mysqli_real_escape_string($conn,$_POST["mail"]);
	$admin = 0;

	//create SQL statement to query the database
	$statement = "INSERT INTO userdetails (userName,name,DOB,password,Email,adminStatus) VALUES ('$userName','$name','$dob','$password','$mail',$admin)";
	//query database
	if (mysqli_query($conn,$statement)){
		echo "created successfully";
	}else{
		echo "error".mysqli_error($conn);
	}

	//close database connection
	$conn->close();

	//go to login page
	header("Location: login.html");
	exit;
?>
