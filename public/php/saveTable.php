<?php
require_once 'ini.php'; // Zajištění připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Zpracování POST dat
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['Id'] ?? null;
$nazev = $data['nazev'] ?? '';
$nazevEN = $data['nazevEN'] ?? '';
$nazevDE = $data['nazevDE'] ?? '';
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
$zakoupeno = $data['zakoupeno'] ?? 0; // Přidáno pro případné další použití
$images = $data['images'] ?? [];

// Připravíme cesty obrázků
$url = $images[0] ?? '';
$url2 = $images[1] ?? '';
$url3 = $images[2] ?? '';
$url4 = $images[3] ?? '';

if (!isset($data['nazev'], $data['material'], $data['vyska'], $data['sirka'], $data['tloustka'], $data['delka'], $data['cena'])) {
    echo json_encode(["success" => false, "message" => "Chybí požadované údaje"]);
    exit;
}

if ($id) {
    $sql = "UPDATE Stoly_na_miru SET
                Nazev='$nazev', NazevEN='$nazevEN', NazevDE='$nazevDE', Material='$material', Vyska='$vyska', Sirka='$sirka',
                Tloustka='$tloustka', Uhlopricka='$delka', popis='$popisCZ',
                popisEN='$popisEN', popisDE='$popisDE', Cena='$cena', Typ='$typ', Zakoupeno='$zakoupeno',
                URL='$url', URL1='$url2', URL2='$url3', URL3='$url4'
            WHERE Id='$id'";
} else {
    $sql = "INSERT INTO Stoly_na_miru (Nazev, NazevEN, NazevDE, Material, Vyska, Sirka, Tloustka, Uhlopricka, popis, popisEN, popisDE, Cena, Typ, Zakoupeno, URL, URL1, URL2, URL3) 
            VALUES ('$nazev', '$nazevEN', '$nazevDE', '$material', '$vyska', '$sirka', '$tloustka', '$delka', '$popisCZ', '$popisEN', '$popisDE', '$cena', '$typ', '$zakoupeno',  '$url', '$url2', '$url3', '$url4')";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => $id ? "Data byla úspěšně aktualizována" : "Data byla úspěšně vložena"]);
} else {
    echo json_encode(["success" => false, "message" => "Chyba při ukládání dat: " . $conn->error]);
}

$conn->close();
