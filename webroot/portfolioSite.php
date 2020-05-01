<!DOCTYPE html>
<?php session_start();?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
      <title></title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="portfolioSite.css" type="text/css"/>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous" defer></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous" defer></script>
    <link href="https://fonts.googleapis.com/css?family=Bungee+Inline|Oxanium:300|Rubik+Mono+One&display=swap" rel="stylesheet">
  </head>
  <body>
    <?php
      $endPrint = "
      <nav class='navbar navbar-expand-sm bg-dark navbar-dark'>
        <a class='navbar-brand' id= 'title' href = ''#about'>Abisade Ogunwoolu</a>
        <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='navbar-nav'>
            <li class='nav-item nav-link'>
              <a id= 'lk' href = ''>Experience</a>
            </li>
            <li class='nav-item nav-link'>
              <a id= 'lk' href = ";
      if (!isset($_SESSION["user"])){
        $endPrint = $endPrint."http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/login.php";
      }
      else{
        $endPrint = $endPrint."http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/viewBlog.php";
      }
        $endPrint = $endPrint.">blog</a>
              </li>
              <li class='nav-item dropdown'>
                <a class='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                  Programming Portfolio
                </a>
                <div class='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <a class='dropdown-item' href='pythonPage.html'>python</a>
                  <a class='dropdown-item' href='javaPage.html'>java</a>
                  <a class='dropdown-item' href='#'>web development</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div class='container-fluid'>
          <div class='row'>
            <div id = 'lefter' class='col-md-2'>
              <div id = 'RI'>
                <h1>Research Interests</h1>
                <p>Robotics</p>
                <p>Artificial Intelligence</p>
                <p>Software Development</p>
                <p>Machine learning<p>
              </div>

              <ul id = 'links' class='nav nav-pills flex-column'>
                <li>
                  <a href = ''>CV</a>
                </li>
                <li>
                  <a href = '#skills'>Skill</a>
                </li>
                <li>
                  <a href = '#hobbies'>Hobbies</a>
                </li>
                <li>
                  <a href = ''>Links</a><br>
                </li>
              </ul>

              <div id = 'skills'>
                <div id='skillsList'>
                  <h1 id='boxTitle'>Skills</h1>
                  <div class='media'>
                    <img src='https://cdn1.iconfinder.com/data/icons/system-shade-circles/512/java-512.png' height='48px' width='48px' alt='1st'>
                    <p>Java - OOP and procedural</p>
                  </div>
                  <div class='media'>
                    <img src='https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png' height='48px' width='48px' alt='2nd'>
                    <p>python - OOP and procedural</p>
                  </div>
                  <div class='media'>
                    <img src='https://cdn0.iconfinder.com/data/icons/web-development-glyph/32/search_web_development-512.png' height='48px' width='48px' alt='3rd'>
                    <p>web development - javaScript, HTML, CSS, PHP</p>
                  </div>
                </div>
              </div>
            </div>
            <div class='col-md-7'>
              <div class='container-fluid'>
                <div id='mid' class='row'>
                  <div class='col-sm-12'>
                    <div class='container-fluid'>
                      <div class='row'>
                        <div class='col-sm-8'>
                          <h1>About Myself</h1>
                          <p>My name is Abisade Ogunwoolu and i am a student within the School of Electronic Engineering and Computer Science and Computer Science at Queen Mary University of London.</p>
                        </div>
                        <div class='col-sm-4'>
                          <img id = 'Iabout' src='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyNjgwMDQ0NjE4MTMwNzU4/gettyimages-503700338jpg.jpg' height='135vw' width=''='135vw' alt='Me'>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class='col-sm-12'>
                    <div id='table-responsive'>
                      <h2>Education</h2>
                      <table class='table'>
                        <tbody>
                          <tr>
                            <td scope='col'>
                              <p id = 'BOLD'>2019-2022</p><p id='following'> underGrad- BSc Computer Science - Queen Mary University London</p>
                            </td>
                          </tr>
                          <tr>
                            <td scope='col'>
                              <p id = 'BOLD'>2017-2019</p><p id='following'> Harris Academy Chafford Hundred</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class='col-sm-12'>
                    <h2>Personal Statement</h2>
                    <p>I am a persistently motivated and creative individual with a passion and eagerness for the field of technology, this is evident in my chosen A level subjects. I am studying economics, computer science and maths, which form a fundamental foundation that is essential for my choice of course in University. I also have strong teamwork skills, as I have completed the Duke of Edinburgh bronze award and the national citizen service. These challenged me as at their core these events test an individual’s teamwork and perseverance and this skill has carried over to my coding ability as it means i am able to quickly pick up a programming language because of my perseverance in learning the essential paradigms or programming such as object oriented and procendural and functional, meaning i can apply this to any new language i need to learn and pick this up quickly


                    My punctuality and attendance is very important to me as it shows an individual’s dedication to their work, this is proven by my 100% attendance for 5 years in secondary school from year 7 to 11 and onwards to sixth form and university. I have taken part in many different projects which have allowed me to broaden my range of skills and abilities in general and further improve my ability to adapt to different roles I may encounter which can be found in their respective programming language pages.
                  </p>
                  </div>
                </div>
              </div>
            </div>
            <div class='col-md-3'>
              <div id = 'skills'>
                <div id='followingList'>
                  <h1 id='boxTitle'>Hobbies</h1>
                  <p>Programming</p>
                  <p>Anime</p>
                  <p>Manga</p>
                </div>
              </div>

              <div id = 'skills'>
                <div id='followingList'>
                  <h1 id='boxTitle'>Top 5 Movies</h1>
                  <p>Parasite</p>
                  <p>a silent voice</p>
                  <p>joker</p>
                  <p>grave of the fireflies</p>
                  <p>kill bill</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='footer' class='fixed-bottom'>
          <p>© Quam Bisade Ogunwoolu</p>
        </div>
        ";

        echo $endPrint;
     ?>

  </body>
</html>
