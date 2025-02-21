<?php
require_once 'ini.php'; // Připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1); // Připojení k databázi

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

// Ověření, zda jsou parametry předány
if (!isset($data["Id"]) || !isset($data["column"])) {
    echo json_encode(["success" => false, "message" => "Neplatné parametry"]);
    exit;
}

$Id = intval($data["Id"]);
$column = $data["column"]; // file, file2, file3, file4

// Povolené sloupce pro bezpečnost
$allowedColumns = ["URL", "URL1", "URL2", "URL3"];
if (!in_array($column, $allowedColumns)) {
    echo json_encode(["success" => false, "message" => "Neplatný název sloupce"]);
    exit;
}

// Získání cesty k obrázku z databáze
$query = $conn->prepare("SELECT $column FROM Stoly_na_miru WHERE Id = ?");
$query->bind_param("i", $Id);
$query->execute();
$result = $query->get_result()->fetch_assoc();
$query->close();

if (!$result || empty($result[$column])) {
    echo json_encode(["success" => false, "message" => "Obrázek nenalezen"]);
    exit;
}

$imagePath = $_SERVER['DOCUMENT_ROOT'] . "/public_html/" . $result[$column];

// Aktualizace databáze (nastavení hodnoty na NULL)
$updateQuery = $conn->prepare("UPDATE produkty SET $column = NULL WHERE Id = ?");
$updateQuery->bind_param("i", $Id);
$success = $updateQuery->execute();
$updateQuery->close();

if ($success) {
    // Smazání souboru ze serveru, pokud existuje
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }
    echo json_encode(["success" => true, "message" => "Obrázek úspěšně odstraněn"]);
} else {
    echo json_encode(["success" => false, "message" => "Chyba při mazání obrázku"]);
}

$conn->close();
?>
