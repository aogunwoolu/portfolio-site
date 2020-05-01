<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
<?php
    /*
   $servername = "localhost";
   $username = "root";
   $password = "password123";
   $db = "login_details";
    */

$servername = getenv("MYSQL_SERVICE_HOST");
$dbport = getenv("MYSQL_SERVICE_PORT");
$username = getenv("DATABASE_USER");
$password = getenv("DATABASE_PASSWORD");
$db = getenv("DATABASE_NAME");

   $returner = array();
   // Create connection
   $conn = new  mysqli($servername, $username, $password,$db);

   $userName = mysqli_real_escape_string($conn,$_POST["userName"]);
   $name = mysqli_real_escape_string($conn,$_POST["name"]);
   $dob = date("Y-m-d",strtotime(mysqli_real_escape_string($conn,$_POST["dob"])));
   $password = mysqli_real_escape_string($conn,$_POST["pass"]);
   $mail = mysqli_real_escape_string($conn,$_POST["mail"]);
   $admin = 0;

   // Now check to see if the values match in your database
   // This assumes you have already written your connecting to database code
   $statement = "INSERT INTO userdetails (userName,name,DOB,password,Email,adminStatus) VALUES ('$userName','$name','$dob','$password','$mail',$admin)";
   if (mysqli_query($conn,$statement)){
     echo "created successfully";
   }else{
     echo "error".mysqli_error($conn);
   }

   $conn->close();

   header("Location: login.html");
   exit;
?>
</body>
</html>
