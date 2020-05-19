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
  	<!-----form using post method going to blog page on submission of form----->
    <form id = "login" method="POST" action="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/login_process.php" >
      <div class="inputs">
		<!-----title of form----->
        <legend class = "loginL title">Enter the dungeon...</legend>
		<!-----input for email----->
        <div class="inputBar">
          <label class = "loginL" for="email">email:</label>
          <input class = "loginL aligner" type="email" name="mail" value="" autocomplete="on">
        </div>
        <br>
		<!-----input for password----->
        <div class="inputBar">
          <label class = "loginL" for="password">password:</label>
          <input class = "loginL" type="password" name="pass" value="" autocomplete="on">
        </div>
        <br>
		<!-----login button (submit form)----->
        <button class = "loginL" type="submit">login</button>
      </div>
	  <!-----create account link----->
      <a href="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/create_account.php" class="inputs">Create Account</a>
    </form>
  </body>
</html>
