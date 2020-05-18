<?php
	//reset the entire session
	session_start();
	session_unset();
	session_destroy();
	//direct user back to index.php
    header("Location: ../index.php");
?>
