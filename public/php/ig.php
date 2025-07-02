<?php
require_once 'ini.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT instagram FROM Socials LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row["instagram"]); // vrací jen hodnotu
    } else {
        echo json_encode(null);
    }
} else {
    echo json_encode("Tento skript podporuje pouze GET metodu.");
}

$conn->close();
?>
