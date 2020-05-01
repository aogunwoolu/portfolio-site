<!DOCTYPE html>
<?php session_start(); 
  include 'autoload.php';

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

    $message = "<html lang='en' dir='ltr'>
  <head>
    <meta charset='utf-8'>
    <title>login</title>
    <link rel='stylesheet' href='login.css' type='text/css'/>
  </head>
  <body>
  <div class='inputBar'>
    <p id = 'unsucc'>click the button to reset your password</p>
    <p>if you have not requested a password reset, ignore this message</p>
    
    <button class = 'loginL' type='submit'>reset</button>
  </div>
  </body>
  </html>
  ";

  $header = "From:AOPortfolioSite@doNotReply.com \r\n";
  $header .= "Cc:a.ogunwoolu@@gmail.com \r\n";
  $header .= "Content-type: text/html\r\n";

   $mail = mysqli_real_escape_string($conn,$_POST["mail"]);

   // Now check to see if the values match in your database
   // This assumes you have already written your connecting to database code
   $result = mysqli_query($conn,"SELECT `userName`,`name`,`DOB`,`adminStatus` FROM `userdetails` WHERE `Email` = '" . $mail ."'");
   if(mysqli_num_rows($result) > 0) {
       mail( $mail, "Portfolio site password recovery", $message, $header );
     exit;
    // return $returner;
    }

   mysqli_close($conn);
?>

