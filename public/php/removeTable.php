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

// Kontrola počtu záznamů
$countResult = $conn->query("SELECT COUNT(*) as count FROM Stoly_na_miru");
if (!$countResult) {
    echo json_encode(["status" => "db-error", "message" => "Chyba při čtení záznamů"]);
    exit;
}
$countRow = $countResult->fetch_assoc();
if ($countRow['count'] <= 1) {
    echo json_encode(["status" => "cannot-delete-last", "message" => "Nelze smazat poslední záznam"]);
    exit;
}

// Odstranění záznamu
$stmt = $conn->prepare("DELETE FROM Stoly_na_miru WHERE Id = ?");
$stmt->bind_param("i", $Id);
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Stůl byl úspěšně odstraněn"]);
} else {
    echo json_encode(["status" => "db-error", "message" => "Chyba při odstraňování: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>