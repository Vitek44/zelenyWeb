<?php
require_once 'cors.php';

//db connect
$db_host = "db.dw237.webglobe.com";
$db_user = "filipzeleny_cz";
$db_password = "Dobraprace13052025";
$db_name = "filipzeleny_cz";
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$conn) {
    die("Připojení se nezdařilo. " . mysqli_connect_error());
}