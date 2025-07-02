<?php
require_once 'ini.php'; // Připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Získání dat z POSTu
$data = json_decode(file_get_contents("php://input"), true);
$ig = $data['instagram'] ?? null;

if ($ig === null || !is_numeric($ig)) {
    echo json_encode(["success" => false, "message" => "Neplatný počet sledujících."]);
    exit;
}

// UPDATE Instagram hodnoty (předpokládám, že máš jen 1 řádek v tabulce Socials)
$sql = "UPDATE Socials SET instagram = '$ig' LIMIT 1";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Počet sledujících byl úspěšně aktualizován."]);
} else {
    echo json_encode(["success" => false, "message" => "Chyba při aktualizaci: " . $conn->error]);
}

$conn->close();
