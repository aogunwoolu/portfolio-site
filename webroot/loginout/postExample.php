<?php
include 'autoload.php';
session_start();

if (isset($_GET['title']) && isset($_GET['body'])){
    $title = $_GET['title'];
    $body = $_GET['body'];
}

$user = unserialize($_SESSION["user"]);
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
    <link href='../reset.css' rel='stylesheet'>
    <script>
        let button = document.createElement('logoutbutton');
        button.innerHTML = 'Logout';
        
        let dashboard = document.getElementsByClassName('dash');
        body.appendChild(button);
    </script>
    <link rel='stylesheet' href='viewBlog.css' type='text/css'/>
</head>
<body>
<nav class='navbar navbar-expand-sm bg-dark navbar-dark'>
    <a class='navbar-brand' id= 'title' href = 't'>Abisade Ogunwoolu</a>
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span class='navbar-toggler-icon'></span>
    </button>
    <div class='collapse navbar-collapse' id='navbarNav'>
        <ul class='navbar-nav'>
            <li class='nav-item nav-link'>
                <a id= 'lk' href = ''>back to portfolio</a>
            </li>
        </ul>
    </div>
</nav>
<div style='border: 4px solid red' class='container-fluid'>
    <div class='row'>
        <div id = 'lefter' class='col-12'>
            <h1>Abisade's posts</h1>
        </div>
    </div>
    <div class='row'>
        <div class='col-9'>
            <div style='border: 2px solid red' id = 'message1' class = 'glassBack'>
                <h2>$title</h2>
                <p>$body</p>
                <p style='font-size: 60%;color: #13386b;'>".date('l jS \of F Y h:i:s A')." UTC</p>
                <button name = 'likeButton' id='like1' onclick='reply(this.id)' type='submit'>reply</button>
            </div>
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

                <div id = 'message0' class = 'glassBack'>
                    <h2>another post</h2>
                    <p>-another post body-</p>
                    <p style='font-size: 60%;color: #13386b;'>20xx-xx-xx xx:xx:xx UTC</p>
                    <button name = 'likeButton' id='like0' onclick='reply(this.id)' type='submit'>reply</button>
                </div>

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
</div>
<button style='color: white; border-color: red;background-color: red;' onclick='edit()'>edit</button>
<tr/>
<button style='color: white; border-color: red;background-color: red;' onclick='post()'>post</button>
<script>
    function edit() {
        window.location.href = 'addPost.php?title=$title&body=$body';
     }
    function post() {
        window.location.href = 'postProcess.php?titleToUpload=$title&postToUpload=$body';
    }
</script>
</body>
</html>";

?>