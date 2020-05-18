<!DOCTYPE html>
<!---start session---->
<?php session_start();?>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	<title></title>
	<!-- Bootstrap core CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<!-----reset css call----->
	<link href='../reset.css' rel='stylesheet'>
	<!-----page css call----->
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
                    <p>python - OOP & procedural</p>
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
                    <p style='font-size: medium'>Most users see a computer at the front and use the graphical user interfaces. The first time I used a computer, it intrigued me to know how these interfaces work, the theory behind computers and the methodology of how they work. I am a keen to further my Computer Science knowledge.

Studying Computing, ICT and Maths at A-Level has increased my desire to want to know more about this subject.

Furthermore I believe that my two week work experience placement, based in IT support at ARM Holdings, gave me a great insight into how an international Computing business works and confirmed that I wanted to go into computing.

I am familiar with Python, which I have learnt to use for programming and have learnt about the theory behind Stored Program Concept, Fetch-Execute Cycle and also the Internet along with the legal aspects behind Computing.

I have advanced my programing skills using PyQt to develop my own user interfaces and further programming techniques including Object and Event orientated programming.

With this knowledge I feel that my problem solving has developed culminating in my project, which I am currently in the process of completing. I am enjoying the experience of the project, not only with the programming but the process of the project - from the analysis to the testing.

I feel to study Computer Science you would need to be more scientific in your thinking as arguments need supporting evidence before they are proved.

To be a successful student you need to be organised, able to communicate and capable of independent research as an individual to expand your knowledge.

In using my computing A-Level skills, I have gained a significant level of knowledge of how computers work; the theory behind them and also why we need computer scientists in the world of work. It is important to be able to analyse problems and work out solutions, as well as to program the solutions and ensure that if there is a gap in the market you develop these ideas.

Computer scientists' work ensures that current computing programs and processes are maintained and updated if appropriate.

I am always searching for programs or websites to help me with my studies and programs, such as using GitHub as a version control system for my project.

I am currently Chair of the Student Committee at Long Road Sixth Form College; I was elected by the committee to sit on the Board of Governors for the College to represent student views, values and opinions.

I also oversee and plan the entertainments and charitable events, which has given me the opportunity to develop my teamwork and people skills.

I am committed to the charity BeatBullying; which involves taking on the responsibility of Young and Media Ambassador. I also am a mentor for both BeatBullying and its sister charity MindFull helping young people suffering from bullying and mental health issues. This has helped me understand complex personal issues and to further enhance my communication skills.

Since July 2013, I have worked part-time at both Cambridge University Hospitals as a Customer Service Administrator, which has strengthened me as an individual and I had the responsibility of helping others to ensure patient safety and confidentiality.

At Linton Village College I was awarded the Enterprise Honour for being the Manager of the Technical Team and a Student Leader of the Library, which involved organising the day to day running of the Library.

At the same time I was nominated for the Business Studies Linton Honour.

The projects will enable me to draw on all my previous knowledge and experience to enhance at university and further it independently to create a substantial finished product for an external client. I am looking forward to the excitement and challenge that studying science will bring at a higher level.

My future aspirations are to leave the university to enter into the world of work to pursue a career in Computer Science and ultimately, to start my own business in Computer Science.                  </p>
                  </div>
                  <hr>
                  <div>
                  	<div class='progress'>
  						<div class='progress-bar bg-success' role='progressbar' style='width: 25%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'>SQL cerification</div>
				  	</div>
				  	<div class='progress'>
  						<div class='progress-bar bg-info' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>python certification</div>
				   	</div>
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

				<div id = \"skills\">
            		<div id=\"followingList\">
              			<a class=\"twitter-timeline\" href=\"https://twitter.com/Abisade17?ref_src=twsrc%5Etfw\">Tweets by Abisade17</a> <script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>
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
