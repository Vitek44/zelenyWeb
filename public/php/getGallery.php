<?php
require_once 'ini.php'; // Zajistí připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

// Ověření připojení k databázi
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Nepodařilo se připojit k databázi.']);
    exit;
}

// Získání ID z parametru GET
$id = isset($_GET['id']) ? intval($_GET['id']) : 0; // Pokud není id, nastavíme na 0

// Pokud není id, vrátíme všechny produkty
if ($id > 0) {
    // SQL dotaz pro konkrétní produkt
    $sql = "SELECT * FROM Galerie WHERE id = $id";
} else {
    // SQL dotaz pro všechny produkty
    $sql = "SELECT * FROM Galerie";
}

$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Chyba při dotazu: ' . mysqli_error($conn)]);
    exit;
}

// Načtení dat jako asociativní pole
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Uzavření připojení
mysqli_free_result($result);
mysqli_close($conn);

// Vrácení JSON odpovědi
echo json_encode(['success' => true, 'data' => $data]);
?>
