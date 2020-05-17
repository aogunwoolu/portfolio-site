<?php
//automatically loads classes any time they are called
include 'autoload.php';
//start session
session_start();

//set title and body to nothing, and keep it nothing if
//no URL variables exist
$title = "";
$body = "";

if (isset($_GET['title']) && isset($_GET['body'])){
    $title = $_GET['title'];
    $body = $_GET['body'];
}

//HTML for the form
echo "
<!DOCTYPE html>
<html lang='en' dir='ltr' xmlns='http://www.w3.org/1999/html'>
<head>
    <meta charset='utf-8'>
    <title>login</title>
    <!-----reset css call----->
    <link href='../reset.css' rel='stylesheet'>
    <!-----page css call----->
    <link rel='stylesheet' href='post.css' type='text/css'/>
</head>
<body>
<!-----form that calls preventDefault JS to see if true (submit) or false (no submit)----->
<form name='preview' id = 'panel' onsubmit='return preventDefault();' action='http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/postProcess.php' method='GET' >
    <div class='inputs'>
        <legend class = 'loginL title'>send out a message? beep boop</legend>
        <label class = 'loginL subtitle'>Title</label>
        <!-----validate text areas as well as input text into them if required----->
        <textarea  name='titleToUpload' style='resize: none' class='uploadmessage validate' rows='1' cols='50'>$title</textarea>
        <label class = 'loginL subtitle'>Message</label>
        <textarea name='postToUpload' style='white-space:pre-line;resize: none' class='uploadmessage validate' rows='22' cols='50'>$body</textarea>
        <br>
        <!-----buttons doing respective functions by calling JS functions----->
        <input type='button' class = 'goBack' onclick='goBack();' value='go back'/>
        <button class = 'postText' type='submit'>post</button>
        <input type='button' class = 'examplePost' onclick='example();' value='preview'/>
        <button type='reset' class = 'discard' onclick='return clearForm();'/>clear</button>
    </div>
    <script>
    	//function for displaying example post
        function example() {
            //get all elements with validate class
            var inputs = document.getElementsByClassName('validate');

            //as we know there will always be 2 values in
            //the inputs array, append URL variables & go to post example php
            window.location.href =  'postExample.php?title='+(inputs[0].value)+'&body='+(inputs[1].value);
        }

        //function to go back (prompts user if they're sure)
        function goBack(){
            let conF = confirm('are you sure you want to discard message?');

            if (conF){
                window.location.href = 'viewBlog.php';
            }
        }

        //function to clear form (by resetting URL variables)
        function clearForm() {
            let conF = confirm('are you sure you want to discard message?');

            if (conF) {
                window.location.href = 'addPost.php';
                return true;
            }
            else{
                window.location.href = 'addPost.php';
                return false;
            }
        }

        //prevent default method
        function preventDefault() {
            //set variables
            var hasTitle = true;
            var hasContent = true;

            //Reference all INPUT elements in the Table.
            var inputs = document.getElementsByClassName('validate');

            //Loop through all INPUT elements.
            for (var i = 0; i < inputs.length; i++) {
                //Check whether its Value is not BLANK and Validation is required.
                if (Trim(inputs[i].value) == '' && i==0) {
                        //If Validation has FAILED, show error message.
                    inputs[0].style.border = '2px solid red';
                    hasTitle = false;
                }
                else if (Trim(inputs[i].value) == '' && i==1) {
                    //If Validation has FAILED, show error message.
                    inputs[1].style.border = '2px solid red';
                    hasContent = false;
                }
                else{
                    inputs[1].style.border = '0px solid grey';
                }
            }
            //if either of variables 
            if (hasTitle == false){
                alert('you have to have a title!');
            }
            else if (hasContent == false){
                alert('you have to have a body!');
            }
            return (hasTitle && hasContent);
        }
        function Trim(value) {
            return value.replace(/^\s+|\s+$/g, '');
        };
        </script>
</form>
</body>
</html>";
