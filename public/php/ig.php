<?php
require_once 'ini.php'; // Zajistí připojení k databázi
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT instagram FROM Socials LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(["instagram" => $row["instagram"]]);
    } else {
        echo json_encode(["error" => "Žádný záznam nebyl nalezen."]);
    }
} else {
    echo json_encode(["error" => "Tento skript podporuje pouze GET metodu."]);
}

$conn->close();
?>