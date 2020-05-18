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
<!-----create form using post method and
calling create account process php to validate form inputs----->
<form id = "login" method="POST" action="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/create_account_process.php" >
	<div class="inputs">
		<!-----title for the form---->
		<legend class = "loginL title">Create your character!</legend>
		<!-----username input---->
		<div class="inputBar">
			<label class = "loginL" for="email">UserName:</label>
			<input class = "loginL aligner" name="userName" value="" autocomplete="off">
		</div>
		<br>
		<!-----name input---->
		<div class="inputBar">
			<label class = "loginL" for="email">Name:</label>
			<input class = "loginL aligner" name="name" value="" autocomplete="off">
		</div>
		<br>
		<!-----DOB input---->
		<div class="inputBar">
			<label class = "loginL" for="email">Date of Birth:</label>
			<input class = "loginL aligner" type="date" name="dob" value="" autocomplete="off">
		</div>
		<br>
		<!-----password input---->
		<div class="inputBar">
			<label class = "loginL" for="password">Password:</label>
			<input class = "loginL" id="pass" name="pass" value="" autocomplete="off">
		</div>
		<br>
		<!-----password re-enter input---->
		<div class="inputBar">
			<label class = "loginL" for="password">Re-enter Pass:</label>
			<input class = "loginL" id="re-pass" name="pass2" value="" autocomplete="off" required>
		</div>
		<br>
		<!-----Email input---->
		<div class="inputBar">
			<label class = "loginL" for="password">Email:</label>
			<input class = "loginL"  type="email" name="mail" value="" autocomplete="off">
		</div>
		<br>
		<!-----submit input---->
		<button class = "loginL" id="okButton" type="submit">sign up</button>
	</div>
</form>
</body>
</html>
