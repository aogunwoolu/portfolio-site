<?php
include 'autoload.php';
session_start();
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
      <link href='../reset.css' rel='stylesheet'>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
<?php
/*
$servername = getenv("MYSQL_SERVICE_HOST");
$dbport = getenv("MYSQL_SERVICE_PORT");
$username = getenv("DATABASE_USER");
$password = getenv("DATABASE_PASSWORD");
$db = getenv("DATABASE_NAME");
*/

$servername = "localhost";
$username = "root";
$password = "password123";
$db = "login_details";

$conn = new mysqli($servername, $username, $password,$db);

$pos = (int)($_GET['postID']);

$post = $_SESSION["postArr"][count($_SESSION["postArr"])-$pos-(1)];
echo $post->getTitle();
$postID = $post->getID();
//echo "this is the pos: |".$pos."|\nthis is the post ID: |".$postID."|\nthis is the size of arr: |".count($_SESSION["postArr"])."|\n";

function idString($length) {
    $char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $char = str_shuffle($char);
    for($i = 0, $rand = '', $l = strlen($char) - 1; $i < $length; $i ++) {
        $rand .= $char{mt_rand(0, $l)};
    }
    return $rand;
}

function idGen($conn){
  $value = idString(11);
  $result = mysqli_query($conn,"SELECT `replyID` FROM `replies` WHERE `replyID` = '" . $value ."'");
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

   // Create connection

   $replyID = idGen($conn);
   $postDate = date("Y-m-d h:i:s");
   $postContents = $_POST["postToUpload"];

    $user = unserialize($_SESSION["user"]);
    $userName = $user->getUN();

   // Now check to see if the values match in your database
   // This assumes you have already written your connecting to database code
   $statement = "INSERT INTO replies VALUES ('$replyID','$userName','$postDate','$postContents',0)";
   if (mysqli_query($conn,$statement)){
     echo "created successfully";
   }else{
     echo "error".mysqli_error($conn);
   }

   $statement = "INSERT INTO postreply VALUES ('$postID','$replyID')";
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
