<!DOCTYPE html>
<?php
include 'autoload.php';
  session_start();

date_default_timezone_set('Europe/London'); //set timezone

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

if (isset($_GET['delete']) && isset($_GET['postOrReply'])){
    if ($_GET['postOrReply'] == 0) {
        $posIDToDelete = (int)($_GET['delete']);
        $index = $_SESSION["postArr"][$posIDToDelete] -> getID();

        $postsql = "
                UPDATE posts
                SET deleted = 1
                WHERE postID = '$index'
            ";

        mysqli_query($conn,$postsql);

        $repsql = mysqli_query($conn,"
                SELECT replyID
                FROM postreply
                WHERE postID = '$index'
            ");

        while ($repliesToDelete = mysqli_fetch_row($repsql)) {
            $deletesql = "
                UPDATE replies
                SET deleted = 1
                WHERE replyID = '$repliesToDelete[0]'
            ";

            mysqli_query($conn,$deletesql);
        }

        header("Refresh:0; url=viewBlog.php");
    }
    elseif ($_GET['postOrReply'] == 1){
        $replyIDToDelete = ($_GET['delete']);

        $deletesql = "
                UPDATE replies
                SET deleted = 1
                WHERE replyID = '$replyIDToDelete'
            ";

        mysqli_query($conn,$deletesql);
    }
}

$_SESSION["postArr"]  = array();

$postToPrint = "";
$replies = "<div id='accordion'>";

$posts = mysqli_query($conn, "
        SELECT postID,postDate,postTitle,post,likes,dislikes,deleted
        FROM posts
        ORDER BY UNIX_TIMESTAMP(postDate) DESC;
         "
);

$queryLength = mysqli_num_rows($posts);

$noPosts = 1;
$noDeleted = 0;

$user = unserialize($_SESSION["user"]);
$userName = $user->getUN();
$addPostButton = "";

if (mysqli_num_rows($posts)>0) {
    $i = 0;

    $checkDeleted = mysqli_query($conn, "
        SELECT postID,postDate,postTitle,post,likes,dislikes,deleted
        FROM posts
        ORDER BY UNIX_TIMESTAMP(postDate) DESC;
         "
    );

    while ($row = mysqli_fetch_row($checkDeleted)) {
        if ($row[6] == 1) {
            $noDeleted++;
        }
    }

    while ($row = mysqli_fetch_row($posts)) {
        if ($row[6] == 0) {
            $replyNum = 0;

            $tempPost = new post($row[0], $row[1], $row[2], $row[3], $row[4], $row[5]);
            $_SESSION["postArr"][] = $tempPost;

            $tempPostID = $row[0];

            $repliesToPost4Count = mysqli_query($conn, "
            SELECT postID,replyID
            FROM postreply
            WHERE postID = '$tempPostID';
         ");

            while ($row2 = mysqli_fetch_row($repliesToPost4Count)) {
                $postAmount = mysqli_query($conn, "
                    SELECT *
                    FROM replies
                    WHERE replyID = '$row2[1]' AND deleted = 0;
            "
                );
                while ($row3 = mysqli_fetch_row($postAmount)) {
                    if ($row3[4] == 0) {
                        $replyNum++;
                    }
                }
            }

            $repliesToPost = mysqli_query($conn, "
            SELECT postID,replyID
            FROM postreply
            WHERE postID = '$tempPostID';
         ");

            $replies .= "
            <div class='card'>
                <div class='card-header bg-dark' id='heading" . ($queryLength - $i - (1+$noDeleted)) . "'>
                   <h5 class='mb-0'>
                     <button class='btn btn-link text-danger' data-toggle='collapse' data-target='#collapse" . ($queryLength - $i - (1+$noDeleted)) . "' aria-expanded='true' aria-controls='collapse" . ($queryLength - $i - (1+$noDeleted)) . "'>
                        replies
                     </button>
                     <span class='badge badge-primary bg-danger badge-pill'>$replyNum</span>
                    </h5>
                </div>
                <div id='collapse" . ($queryLength - $i - (1+$noDeleted)) . "' class='collapse show reply" . ($queryLength - $i - (1+$noDeleted)) . "' aria-labelledby='headingOne' data-parent='#accordion'>
                    <div class='card-body'>
        ";

            $j = 0;
            while ($row2 = mysqli_fetch_row($repliesToPost)) {
                $reply = mysqli_query($conn, "
                SELECT replyID,userName,DATE_FORMAT(replyDate,'%D %M %Y, %H:%i') AS replyDate,reply,deleted
                FROM replies
                WHERE replyID = '$row2[1]';
            "
                );

                $deleteButton = "";

                //echo ($queryLength - $i -1)."-".($queryLengthreplies - $j -1)." | ";
                while ($row3 = mysqli_fetch_row($reply)) {
                    if ($user->getAdmin()==1 || $userName == $row3[1]){
                        $deleteButton = "<button onclick='deleteReply(\"" . $row3[0] . "\")' id = 'delete' class='deleteButton' class='deleteButton'>delete</button>";
                    }
                    if ($row3[4] == 0) {
                        $replies .= "
                        <h2 style='color: crimson;'>$row3[1]</h2>
                        <p style='color: gray;'>$row3[3]</p>
                        <p style='font-size: 60%;color: #13386b;'>$row3[2]</p>
                        <p style='font-size: 50%;'>
                        $deleteButton
                        <hr/>
                    ";
                    }
                }
                $j++;
            }
            $replies .= "
                  </div>
                </div>
              </div>
              <br>";

            $deletePost = "";

            if ($user->getAdmin()==1){
                $deletePost = "<button onclick='deletePost(" . ($queryLength - $i - (1+$noDeleted)) . ")' id = 'delete' class='deleteButton'>delete</button>";
            }

            $postToPrint .= "
            <div id = 'message" . ($queryLength - $i - (1+$noDeleted)) . "' class = 'glassBack'>
                <h2>$row[2]</h2>
                <p>$row[3]</p>
                <p style='font-size: 60%;color: #13386b;'>".date('dS F Y', strtotime($row[1])).', '.date('g:ia', strtotime($row[1])).' '.date('T')."</p>
                <button name = 'likeButton' id='like" . ($queryLength - $i - (1+$noDeleted)) . "' onclick='reply(this.id)' type='submit'>reply</button>
                $deletePost
            </div>
            " . $replies . "
          ";

            $i++;
            $replies = "";

            $noPosts = 0;
        }
    }
}
if ($noPosts == 1){
    $postToPrint .= "<img style='background-color: transparent ' src='../mascotEmpty.png' height='512px' width='512px' alt='empty...'></div><br>";
}

if (isset($_POST['postID'])){
    $pos = $_GET['postID'];
    mysqli_query($conn, "
            UPDATE posts
            SET deleted = 1
            WHERE postID = '$pos';
         "
    );
}
if (isset($_POST['replyID'])){
    $pos = $_GET['replyID'];
    mysqli_query($conn, "
            UPDATE replies
            SET deleted = 1
            WHERE postID = '$pos';
         "
    );
}

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
            
            function deletePost(postIndex) {
              var totalLen = Number(".((int)($queryLength )-(int)(1+$noDeleted)).");

              window.location.href = 'viewBlog.php?delete='+(totalLen-Number(postIndex))+'&postOrReply=0';
            }
            function deleteReply(replyID) {
                window.location.href = 'viewBlog.php?delete='+(replyID)+'&postOrReply=1';
            }
            var dashboard = document.getElementsByClassName('dash');
            body.appendChild(button);
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
        <div class='col-9'>
           ".$postToPrint."
            </div>
        </div>
        <div class='col-3'>
            <div class='card bg-dark'>
                <img class='card-img-top' src='https://i.ytimg.com/vi/GN5z4mk5y_M/maxresdefault.jpg' alt='Card image cap'/>
                <div class='card-body'>
                  <h5 class='card-title'>".$userName."</h5>
                  <p class='card-text text-white'>hello, what would you like to do?</p>
                  <input id='LO' type='button' onclick='logOut()' value='log out'/>
                  ".$addPostButton."
                </div>
            </div>
        </div>
      </div>
      <script>
        function logOut(){
            var conF = confirm('are you sure you want to log out?');
            if (conF){
                window.location.href = 'logout.php';
            }
        }

        function formVisible() {
            window.location.href = 'addPost.php';
        }

        function reply(clicked_id) {
            var selectedPost = Trim(clicked_id);
            window.location.href = 'reply.php?postID=' + selectedPost;
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
  </div>
</body>
</html>
    ";
?>

