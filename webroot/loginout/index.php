<?php
include 'db_connection.php';
echo "test1";
$conn = OpenCon();
echo "test2";
echo "Connected Successfully";
CloseCon($conn);
?>
