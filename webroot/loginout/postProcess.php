<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
<?php
    session_start();
    include 'autoload.php';

$servername = getenv("MYSQL_SERVICE_HOST");
$dbport = getenv("MYSQL_SERVICE_PORT");
$username = getenv("DATABASE_USER");
$password = getenv("DATABASE_PASSWORD");
$db = getenv("DATABASE_NAME");

$conn = new mysqli($servername, $username, $password,$db);

    function idGen($conn){
        $value = mysqli_real_escape_string($conn,uniqid());
        $result = mysqli_query($conn,"SELECT `postID` FROM `posts` WHERE `postID` = '" . $value ."'");
        if (mysqli_num_rows($result) > 0) {
            return idGen($conn);
        }
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

   $returner = array();
   // Create connection

   $postID = idGen($conn);
   $postDate = date("Y-m-d h:i:s");
   $postTitle = mysqli_real_escape_string($conn,$_POST["titleToUpload"]);
   $postContents = mysqli_real_escape_string($conn,$_POST["postToUpload"]);
   $likes = 0;
   $dislikes = 0;

   echo $postID;

   // Now check to see if the values match in your database
   // This assumes you have already written your connecting to database code
   $statement = "INSERT INTO posts (postID,postDate,postTitle,post,likes,dislikes) VALUES ('$postID','$postDate','$postTitle','$postContents',$likes,$dislikes)";
   if (mysqli_query($conn,$statement)){
     echo "created successfully";
   }else{
     echo "error".mysqli_error($conn);
   }

   $user = unserialize($_SESSION["user"]);
   $userName = $user->getUN();

   $statement = "INSERT INTO userowns (userName,postID) VALUES ('$userName','$postID')";
   if (mysqli_query($conn,$statement)){
       echo "created successfully";
   }else{
       echo "error".mysqli_error($conn);
   }

   $conn->close();

   header("Location: viewBlog.php");
   exit;
?>
</body>
</html>
