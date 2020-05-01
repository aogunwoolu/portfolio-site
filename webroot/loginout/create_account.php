<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>login</title>
    <link rel="stylesheet" href="login.css" type="text/css"/>
  </head>
  <body>
    <form id = "login" method="POST" action="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/create_account_process.php" method="post" >
      <div class="inputs">
        <legend class = "loginL title">Create your character!</legend>
        <div class="inputBar">
          <label class = "loginL" for="email">UserName:</label>
          <input class = "loginL aligner" name="userName" value="" autocomplete="off">
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="email">Name:</label>
          <input class = "loginL aligner" name="name" value="" autocomplete="off">
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="email">Date of Birth:</label>
          <input class = "loginL aligner" type="date" name="dob" value="" autocomplete="off">
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="password">Password:</label>
          <input class = "loginL" id="pass" name="pass" value="" autocomplete="off">
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="password">Re-enter Pass:</label>
          <input class = "loginL" id="re-pass" name="pass2" value="" autocomplete="off" required>
        </div>
        <br>
        <div class="inputBar">
          <label class = "loginL" for="password">Email:</label>
          <input class = "loginL"  type="email" name="mail" value="" autocomplete="off">
        </div>
        <br>
        <button class = "loginL" id="okButton" type="submit">sign up</button>
      </div>
    </form>
  </body>
</html>
