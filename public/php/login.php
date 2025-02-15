<?php
require_once 'ini.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Připojení k databázi pomocí MySQLi

// Kontrola připojení
if ($conn->connect_error) {
    die(json_encode(["error" => "Chyba připojení: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // SQL dotaz pro získání všech záznamů z tabulky 'login'
        $sql = "SELECT * FROM Login";
        $result = $conn->query($sql); // Spustí SQL dotaz

        // Zkontrolujeme, zda dotaz vrátil nějaké výsledky
        if ($result->num_rows > 0) {
            $logins = [];

            // Načteme všechny výsledky do pole
            while ($row = $result->fetch_assoc()) {
                $logins[] = $row;
            }

            // Vrátíme odpověď jako JSON
            echo json_encode($logins, JSON_PRETTY_PRINT);
        } else {
            // Pokud není žádný výsledek, vrátíme prázdné pole
            echo '[]';
        }
    } catch (Exception $e) {
        // Chyba při dotazu na databázi
        http_response_code(404);
        echo json_encode(["error" => "Chyba při zpracování požadavku: " . $e->getMessage()]);
    }
}

// Zavření připojení k databázi
$conn->close();
?>
