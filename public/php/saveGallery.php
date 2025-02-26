<?php
require_once 'ini.php'; // Zajištění připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Zpracování POST dat
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$popis = $popis['popis'] ?? '';
$kategorie = $kategorie['kategorie'] ?? '';

if (!isset($data['popis'], $data['kategorie'])) {
    echo json_encode(["success" => false, "message" => "Chybí požadované údaje"]);
    exit;
}

if ($id) {
    $sql = "UPDATE Galerie SET 
                popis='$popis', kategorie='$kategorie'
            WHERE id='$id'";
} else {
    $sql = "INSERT INTO Galerie (popis, kategorie) 
            VALUES ('$popis', '$kategorie')";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => $id ? "Data byla úspěšně aktualizována" : "Data byla úspěšně vložena"]);
} else {
    echo json_encode(["success" => false, "message" => "Chyba při ukládání dat: " . $conn->error]);
}

$conn->close();
