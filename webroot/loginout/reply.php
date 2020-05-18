<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>login</title>
	<!-----reset css call----->
    <link href='../reset.css' rel='stylesheet'>
	<!-----page css call----->
    <link rel="stylesheet" href="post.css" type="text/css"/>
</head>
<body>
<!-----create form using post method and
calling post process php and using JS to validate
form inputs before submit----->
<form name="reply" id = "panel2" method="POST" onsubmit="return preventDefault();" action="http://cakephp-mysql-persistent-qboecs417.bde1.qmul-eecs.openshiftapps.com/loginout/replyProcess.php" method="post" >
    <div class="inputs">
        <legend class = "loginL title">uno reverse card!</legend>
        <label class = "loginL subtitle">Message</label>
        <textarea id= "txtArea" onkeypress="onTestChange();" name="postToUpload" style="resize: none;" class="uploadmessage validate" rows="22" cols="50"></textarea>
        <br>
        <button class = "postText" type="submit">reply</button>
        <input type='button' class = "discard" onclick='goBack();' value='discard'/>
    </div>
	<!-----javascript functions----->
    <script>
		//go back function (view blog page)
        function goBack(){
            var conF = confirm('are you sure you want to discard message?');
            if (conF){
                window.location.href = 'viewBlog.php';
            }
        }

        //prevent default function
        function preventDefault() {
            var hasContent = true;
            //Reference all INPUT elements in the Table.
            var inputs = document.getElementsByClassName("validate");

            //get url string
            const URLString = window.location.search;
            //split string into usable strings in a list
            const URLParams = new URLSearchParams(URLString);
            //get value corresponding to 'postID'
            const postID = URLParams.get("postID");

            //change action to have valid postID
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
		//remove all unwanted characters
        function Trim(value) {
            return value.replace(/^\s+|\s+$/g, '');
        };
        </script>
</form>
</body>
</html>
