<?php
    session_start();

    if(isset($_SESSION["user"])) {
        echo "here";
        unset($_SESSION["user"]);
    }

    header("Location: ../portfolioSite.php");
?>