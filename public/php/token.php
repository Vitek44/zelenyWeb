<?php
session_start();
require_once 'ini.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://www.filipzeleny.cz"/);
header("Access-Control-Allow-Credentials: true");

// Session kontrola
if (!isset($_SESSION['token'])) {
    echo json_encode([
        "success" => false,
        "message" => "Session token chybí"
    ]);
    exit;
}

$sessionToken = $_SESSION['token'];

// Načti poslední token z databáze
$sql = "SELECT token FROM tokens ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    $databaseToken = $row['token'];

    if ($sessionToken === $databaseToken) {
        echo json_encode([
            "success" => true,
            "sessionToken" => $sessionToken,
            "databaseToken" => $databaseToken
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Tokeny se neshodují",
            "sessionToken" => $sessionToken,
            "databaseToken" => $databaseToken
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Token v databázi nenalezen"
    ]);
}

