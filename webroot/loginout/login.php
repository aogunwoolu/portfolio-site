<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
    <form id = "login" method="POST" action="http://localhost/miniProject/loginout/login_process.php" method="post" >
      <div class="inputs">
        <legend class = "loginL title">Enter the dungeon...</legend>
        <div class="inputBar">
          <label class = "loginL" for="email">email:</label>
          <input class = "loginL aligner" type="email" name="mail" value="" autocomplete="on">
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="password">password:</label>
          <input class = "loginL" type="password" name="pass" value="" autocomplete="on">
        </div>
        <br>
        <button class = "loginL" type="submit">login</button>
      </div>
      <a href="http://localhost/miniProject/loginout/create_account.php" class="inputs">Create Account</a>
    </form>
  </body>
</html>
