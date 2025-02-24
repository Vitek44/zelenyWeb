<?php

header('Content-Type: application/json');
require_once 'ini.php'; // Připojení k databázi přes MySQLi

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Získání dat z JSON vstupu
$data = json_decode(file_get_contents('php://input'), true);
$Id = $data['Id'] ?? null;

if (!$Id || !is_numeric($Id)) {
    echo json_encode(["status" => "invalid-id", "message" => "Chybí nebo je neplatné ID stolu"]);
    exit;
}

// Aktualizace pouze URL sloupců na NULL
$stmt = $conn->prepare("UPDATE Stoly_na_miru SET URL = NULL, URL1 = NULL, URL2 = NULL, URL3 = NULL WHERE Id = ?");
$stmt->bind_param("i", $Id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Obrázky byly úspěšně odstraněny"]);
} else {
    echo json_encode(["status" => "db-error", "message" => "Chyba při mazání obrázků: " . $stmt->error]);
}

$stmt->close();
$conn->close();

?>
