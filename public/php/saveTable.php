<?php
require_once 'ini.php'; // Zajištění připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Zpracování POST dat
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['Id'] ?? null;
$nazev = $data['nazev'] ?? '';
$material = $data['material'] ?? '';
$vyska = $data['vyska'] ?? '';
$sirka = $data['sirka'] ?? '';
$tloustka = $data['tloustka'] ?? '';
$delka = $data['delka'] ?? '';
$popisCZ = $data['popisCZ'] ?? '';
$popisEN = $data['popisEN'] ?? '';
$popisDE = $data['popisDE'] ?? '';
$cena = $data['cena'] ?? '';
$typ = $data['typ'] ?? '';



if (!isset($data['nazev'], $data['material'], $data['vyska'], $data['sirka'], $data['tloustka'], $data['delka'], $data['cena'])) {
    echo json_encode(["success" => false, "message" => "Chybí požadované údaje"]);
    exit;
}

if ($id) {
    $sql = "UPDATE Stoly_na_miru SET 
                Nazev='$nazev', Material='$material', Vyska='$vyska', Sirka='$sirka', 
                Tloustka='$tloustka', Uhlopricka='$delka', popis='$popisCZ', 
                popisEN='$popisEN', popisDE='$popisDE', Cena='$cena', Typ='$typ' 
            WHERE Id='$id'";
} else {
    $sql = "INSERT INTO Stoly_na_miru (Nazev, Material, Vyska, Sirka, Tloustka, Uhlopricka, popis, popisEN, popisDE, Cena, Typ) 
            VALUES ('$nazev', '$material', '$vyska', '$sirka', '$tloustka', '$delka', '$popisCZ', '$popisEN', '$popisDE', '$cena', '$typ')";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => $id ? "Data byla úspěšně aktualizována" : "Data byla úspěšně vložena"]);
} else {
    echo json_encode(["success" => false, "message" => "Chyba při ukládání dat: " . $conn->error]);
}

$conn->close();
