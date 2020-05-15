<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>login</title>
    <link href='../reset.css' rel='stylesheet'>
    <link rel="stylesheet" href="post.css" type="text/css"/>
</head>
<body>
<form name="reply" id = "panel2" method="POST" onsubmit="return preventDefault();" action="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/replyProcess.php" method="post" >
    <div class="inputs">
        <legend class = "loginL title">uno reverse card!</legend>
        <label class = "loginL subtitle">Message</label>
        <textarea style = 'white-space:pre-line;' id= "txtArea" onkeypress="onTestChange();" name="postToUpload" style="resize: none" class="uploadmessage validate" rows="22" cols="50"></textarea>
        <br>
        <button class = "postText" type="submit">reply</button>
        <input type='button' class = "discard" onclick='goBack();' value='discard'/>
    </div>
    <script>
        function goBack(){
            var conF = confirm('are you sure you want to discard message?');
            if (conF){
                window.location.href = 'viewBlog.php';
            }
        }
        function preventDefault() {
            var hasContent = true;
            //Reference all INPUT elements in the Table.
            var inputs = document.getElementsByClassName("validate");

            const URLString = window.location.search;
            const URLParams = new URLSearchParams(URLString);
            const postID = URLParams.get("postID");

            document.reply.action = "replyProcess.php?postID="+postID;

            //Loop through all INPUT elements.
            for (var i = 0; i < inputs.length; i++) {
                //Check whether its Value is not BLANK and Validation is required.
                if (Trim(inputs[i].value) == "" && i==0) {
                        //If Validation has FAILED, show error message.
                    hasContent = false;
                }
            }
            if (hasContent == false){
                alert("you have to have a body!");
            }
            return (hasContent);
        }
        function Trim(value) {
            return value.replace(/^\s+|\s+$/g, '');
        };
        </script>
</form>
</body>
</html>
