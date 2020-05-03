<!DOCTYPE html>
<?php
  session_start();
?>

<?php
    include 'autoload.php';

    /*
  $servername = "localhost";
  $username = "root";
  $password = "password123";
  $db = "login_details";
    */

    $servername = getenv("MYSQL_SERVICE_HOST");
    $dbport = getenv("MYSQL_SERVICE_PORT");
    $username = getenv("DATABASE_USER");
    $password = getenv("DATABASE_PASSWORD");
    $db = getenv("DATABASE_NAME");

  $returner = array();
  // Create connection
  $conn = new  mysqli($servername, $username, $password,$db);

$postToPrint = "";

$result2 = mysqli_query($conn, "
        SELECT postID,postDate,postTitle,post,likes,dislikes
        FROM posts
        ORDER BY UNIX_TIMESTAMP(postDate) DESC
         "
);



$queryLength = mysqli_num_rows($result2);

$postArr = array();

if (mysqli_num_rows($result2)>0) {
    $i = 0;
    while ($row = mysqli_fetch_row($result2)) {
        array_push($postArr, new post($row[0],$row[1],$row[2],$row[3],$row[4],$row[5]));

        echo ($queryLength - $i -1);

        $postToPrint .= "
                <div id = 'message".($queryLength - $i -1)."' class = 'glassBack'>
                    <h2>$row[2]</h2>
                    <p>$row[3]</p>
                    <p style='font-size: 50%;color: #13386b;'>$row[1]</p>
                    <p style='font-size: 50%;'>
                    <p id='Lshow".($queryLength - $i -1)."'>$row[4]</p>
                    	<button name = 'likeButton' id='like".($queryLength - $i -1)."' onclick='like(this.id)' type='submit'>
                    		<img src='https://img.icons8.com/ios/10/000000/thumb-up.png'/>
                    	</button>
                    <p id='DLshow".($queryLength - $i -1)."'>$row[5]</p>
                    	<button name = 'dislikeButton' id='dislike".($queryLength - $i -1)."' onclick='dlike(this.id)' type='submit'>
                    		<img src='https://img.icons8.com/ios/10/000000/thumbs-down.png'/>
                    	</button>
                    </p>
                </div>
                <br>
                ";
        $i++;
    }
}
else{
    $postToPrint .= "<img style='background-color: transparent ' src='../mascotEmpty.png' height='512px' width='512px' alt='empty...'>";
}

$user = unserialize($_SESSION["user"]);
$userName = $user->getUN();
$addPostButton = "";

$_SESSION["post"] = "";
$_SESSION["num"] = "";
$_SESSION["like"] = 0;

if (isset($_SESSION['prevPost']) && isset($_SESSION['prevNum'])){
	if (!($_SESSION['prevPost'] == $_SESSION["post"]) && !($_SESSION['prevNum'] == $_SESSION["num"])) {
		if ($_SESSION["like"] == 0) {
			$number = $_SESSION['num'];
			$postID = $_SESSION['post'];

			$sql = "UPDATE post SET likes = $number where postID = $postID";
		}
		if ($_SESSION["like"] == 1) {
			$number = $_SESSION['num'];
			$postID = $_SESSION['post'];

			$sql = "UPDATE post SET dislikes = $number where postID = $postID";
		}
	}
}

if ($user->getAdmin()==1){
        $addPostButton = "<input id='AP' type='button' onclick='formVisible();' value='add Post'/>";
    }

echo "
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
            var button = document.createElement('logoutbutton');
            button.innerHTML = 'Logout';

            var dashboard = document.getElementsByClassName('dash');
            body.appendChild(button);

            button.addEventListener('click',function(){
                alert('something');
            });
        </script>
        <link rel='stylesheet' href='viewBlog.css' type='text/css'/>
    </head>
    <body>
    <nav class='navbar navbar-expand-sm bg-dark navbar-dark'>
      <a class='navbar-brand' id= 'title' href = '#about'>Abisade Ogunwoolu</a>
      <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarNav'>
        <ul class='navbar-nav'>
          <li class='nav-item nav-link'>
            <a id= 'lk' href = 'http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/index.php'>back to portfolio</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class='container-fluid'>
      <div class='row'>
        <div id = 'lefter' class='col-12'>
          <h1>Abisade's posts</h1>
        </div>
      </div>
      <div class='row'>
        <div id = 'lefter' class='col-9'>
           ".$postToPrint."
        </div>
        <div id = 'lefter' class='col-3 dash'>
          <div class = 'glassBack sidePanel' >
            <p>hello, ".$userName." what would you like to do?</p>
            <br>
            <input id='LO' type='button' onclick='logOut()' value='log out'/>
            <br>
            ".$addPostButton."
          </div>
        </div>
      </div>
    ";
?>
<script>
    function logOut(){
        var conF = confirm('are you sure you want to log out?');
        if (conF){
            window.location.href = 'logout.php';
        }
    }

    function formVisible() {
        window.location.href = 'addPost.html';
    }

    function like(clicked_id) {
        var selectedPost = Trim(clicked_id);
        if (sessionStorage.getItem('oneLike'+selectedPost) !== 'true'){

            var likeNum = document.getElementById('Lshow'+selectedPost);
            var num = likeNum.innerHTML;
            num++;
            likeNum.innerHTML = num++;

			let passedArray =
				<?php echo json_encode($postArr); ?>;

			Session["prevPost"] = passedArray[selectedPost];
			Session["prevNum"] = num;
			Session["like"] = 1;

            sessionStorage.setItem('oneLike'+selectedPost,'true');
        }
		else{

			var likeNum = document.getElementById('Lshow'+selectedPost);
			var num = likeNum.innerHTML;
			num--;
			likeNum.innerHTML = num--;

			let passedArray =
				<?php echo json_encode($postArr); ?>;

			Session["prevPost"] = passedArray[selectedPost];
			Session["prevNum"] = num;
			Session["like"] = 0;

			sessionStorage.setItem('oneLike'+selectedPost,'false');
		}
    }

    function dlike(clicked_id) {
        window.location.href = 'addPost.html';
    }

    function Trim(value) {
        var replacedStr = value.replace('like', '');
        var replacedStr = replacedStr.replace('d', '');
        return replacedStr;
    }
</script>
<div id='footer' class='fixed-bottom'>
    <p>© Quam Bisade Ogunwoolu</p>
</div>
</body>
</html>
