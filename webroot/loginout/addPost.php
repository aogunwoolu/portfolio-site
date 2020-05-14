**<?php
include 'autoload.php';
session_start();

$title = "";
$body = "";

if (isset($_GET['title']) && isset($_GET['body'])){
    $title = $_GET['title'];
    $body = $_GET['body'];
}

echo "
<!DOCTYPE html>
<html lang='en' dir='ltr' xmlns='http://www.w3.org/1999/html'>
<head>
    <meta charset='utf-8'>
    <title>login</title>
    <link href='../reset.css' rel='stylesheet'>
    <link rel='stylesheet' href='post.css' type='text/css'/>
</head>
<body>
<form name='preview' id = 'panel' onsubmit='return preventDefault();' action='http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/postProcess.php' method='GET' >
    <div class='inputs'>
        <legend class = 'loginL title'>send out a message? beep boop</legend>
        <p class = 'loginL subtitle'>Title</p>
        <textarea  name='titleToUpload' style='resize: none' class='uploadmessage validate' rows='1' cols='50'>$title</textarea>
        <p class = 'loginL subtitle'>Message</p>
        <textarea name='postToUpload' style='white-space:pre-line;resize: none' class='uploadmessage validate' rows='22' cols='50'>$body</textarea>
        <br>
        <input type='button' class = 'goBack' onclick='goBack();' value='go back'/>
        <button class = 'postText' type='submit'>post</button>
        <input type='button' class = 'examplePost' onclick='example();' value='preview'/>
        <button type='reset' class = 'discard' onclick='return clearForm();'/>clear</button>
    </div>
    <script>
        function example() {
            //const URLString = window.location.search;
            //const URLParams = new URLSearchParams(URLString);
            //const postID = URLParams.get('postID');

            var inputs = document.getElementsByClassName('validate');

            window.location.href =  'postExample.php?title='+(inputs[0].value)+'&body='+(inputs[1].value);
        }

        function goBack(){
            let conF = confirm('are you sure you want to discard message?');

            if (conF){
                window.location.href = 'viewBlog.php';
            }
        }
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
        function preventDefault() {
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
