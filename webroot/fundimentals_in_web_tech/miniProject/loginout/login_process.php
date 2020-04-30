<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
<?php
  include 'autoload.php';

   $servername = "localhost";
   $username = "root";
   $password = "password123";
   $db = "login_details";

   $returner = array();
   // Create connection
   $conn = new  mysqli($servername, $username, $password,$db);
   // Check connection
   /*
   if (!$conn) {
     die("Connection failed: " . mysqli_connect_error());
   }
   echo "Connected successfully";
   */


   $userName = mysqli_real_escape_string($conn,$_POST["mail"]);
   $password = mysqli_real_escape_string($conn,$_POST["pass"]);

   // Now check to see if the values match in your database
   // This assumes you have already written your connecting to database code
   $result = mysqli_query($conn,"SELECT `userName`,`name`,`DOB`,`adminStatus` FROM `userdetails` WHERE `Email` = '" . $userName . "' AND `password` = '" . $password . "' ");
   if(mysqli_num_rows($result) > 0) {
     $row = mysqli_fetch_array($result);
     $currentUser = new user($row['userName'],$row['name'],$row['DOB'],$row['adminStatus']);

     echo $currentUser->getUN()."\n";
     $_SESSION["user"] = serialize($currentUser);
     header("Location: viewBlog.php");
     exit;
    // return $returner;
    }
    else {
      echo "<form id = 'login' method'POST' action='http://localhost/miniProject/loginout/login_process.php' method='post' >
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
        <a href='http://localhost/miniProject/loginout/create_account.php' class='inputs'>Create Account</a>
      </form>";
    }

   mysqli_close($conn);
?>
</body>
</html>
