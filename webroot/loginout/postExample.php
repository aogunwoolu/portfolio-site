<?php
//include autoloader (to use any class)
include 'autoload.php';
//start session to access variables
session_start();

//check if there are URL variables for title and body
if (isset($_GET['title']) && isset($_GET['body'])){
	//set local variables if so
    $title = $_GET['title'];
    $body = $_GET['body'];
}

//unserialize user object
$user = unserialize($_SESSION["user"]);
//call username getter for use locally
$userName = $user->getUN();
$addPostButton = "";

echo"
<!DOCTYPE html>

<html lang='en' dir='ltr'>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no'>
    <title></title>
    <!-- Bootstrap core CSS -->
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous'>
    <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous' defer></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js' integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49' crossorigin='anonymous' defer></script>
    <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js' integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy' crossorigin='anonymous' defer></script>
    <link href='https://fonts.googleapis.com/css?family=Bungee+Inline|Oxanium:300|Rubik+Mono+One&display=swap' rel='stylesheet'>
    <!-----reset css call----->
    <link href='../reset.css' rel='stylesheet'>
    <!-----page css call----->
    <link rel='stylesheet' href='viewBlog.css' type='text/css'/>

    <!-----javascript for HTML----->
    <script>
    	//create button and set its text to 'logout'
        let button = document.createElement('logoutbutton');
        button.innerHTML = 'Logout';

        //create dashboard and append button
        let dashboard = document.getElementsByClassName('dash');
        body.appendChild(button);
    </script>
</head>
<body>
<!-----navigation bar----->
<nav class='navbar navbar-expand-sm bg-dark navbar-dark'>
	<!-----add title link----->
    <a class='navbar-brand' id= 'title' href = '../portfolioSite.php'>Abisade Ogunwoolu</a>
    <!-----create dropdown on smaller screens----->
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span class='navbar-toggler-icon'></span>
    </button>
    <!-----dropdown options----->
    <div class='collapse navbar-collapse' id='navbarNav'>
        <ul class='navbar-nav'>
            <li class='nav-item nav-link'>
                <a id= 'lk' href = ''>back to portfolio</a>
            </li>
        </ul>
    </div>
</nav>

<!-----main page container----->
<div style='border: 4px solid red' class='container-fluid'>
	<!-----first row----->
    <div class='row'>
    	<!-----title that spans the full row----->
        <div id = 'lefter' class='col-12'>
            <h1>Abisade's posts</h1>
        </div>
    </div>
    <!-----second row----->
    <div class='row'>
    	<!-----all post (spans 9 column spaces)----->
        <div class='col-9'>
        	<!-----example post----->
            <div style='border: 2px solid red' id = 'message1' class = 'glassBack'>
                <h2>$title</h2>
                <p>$body</p>
                <p style='font-size: 60%;color: #13386b;'>".date('l jS \of F Y h:i:s A')." UTC</p>
                <button name = 'likeButton' id='like1' onclick='reply(this.id)' type='submit'>reply</button>
            </div>
            <!-----replies----->
            <div id='accordion'>
                <div class='card'>
                    <div class='card-header bg-dark' id='heading1'>
                        <h5 class='mb-0'>
                            <button class='btn btn-link text-danger' data-toggle='collapse' data-target='#collapse1' aria-expanded='true' aria-controls='collapse1'>
                                replies
                            </button>
                            <span class='badge badge-primary bg-danger badge-pill'>1</span>
                        </h5>
                    </div>
                    <div id='collapse1' class='collapse show reply1' aria-labelledby='headingOne' data-parent='#accordion'>
                        <div class='card-body'>
                            <h2 style='color: crimson;'>User</h2>
                            <p style='color: gray;'>reply</p>
                            <p style='font-size: 60%;color: #13386b;'>20xx-xx-xx xx:xx:xx UTC</p>
                            <hr/>
                        </div>
                    </div>
                </div>
                <br>

				<!-----another post----->
                <div id = 'message0' class = 'glassBack'>
                    <h2>another post</h2>
                    <p>-another post body-</p>
                    <p style='font-size: 60%;color: #13386b;'>20xx-xx-xx xx:xx:xx UTC</p>
                    <button name = 'likeButton' id='like0' onclick='reply(this.id)' type='submit'>reply</button>
                </div>
				<!-----replies----->
                <div class='card'>
                    <div class='card-header bg-dark' id='heading0'>
                        <h5 class='mb-0'>
                            <button class='btn btn-link text-danger' data-toggle='collapse' data-target='#collapse0' aria-expanded='true' aria-controls='collapse0'>
                                replies
                            </button>
                            <span class='badge badge-primary bg-danger badge-pill'>0</span>
                        </h5>
                    </div>
                    <div id='collapse0' class='collapse show reply0' aria-labelledby='headingOne' data-parent='#accordion'>
                        <div class='card-body'>

                        </div>
                    </div>
                </div>
                <br>

            </div>
        </div>
        <!-----option hub (spans 3 column spaces)----->
        <div class='col-3'>
            <div class='card bg-dark'>
                <img class='card-img-top' src='https://i.ytimg.com/vi/GN5z4mk5y_M/maxresdefault.jpg' alt='Card image cap'/>
                <div class='card-body'>
                    <h5 class='card-title'>$userName</h5>
                    <p class='card-text text-white'>hello, what would you like to do?</p>
                    <input id='LO' type='button' onclick='logOut()' value='log out'/>
                    <input id='AP' type='button' onclick='formVisible();' value='add Post'/>
                </div>
            </div>
        </div>
    </div>
<!-----editing buttons (edit and post)----->
</div>
<button style='color: white; border-color: red;background-color: red;' onclick='edit()'>edit</button>
<tr/>
<button style='color: white; border-color: red;background-color: red;' onclick='post()'>post</button>
<script>
	/*****************************************************************************
	* 								button functions							 *
	******************************************************************************/
	//edit function (goes back using URL vars)
    function edit() {
        window.location.href = 'addPost.php?title=$title&body=$body';
    }
    //submit post (using URL vars)
    function post() {
        window.location.href = 'postProcess.php?titleToUpload=$title&postToUpload=$body';
    }
</script>
</body>
</html>";

?>
