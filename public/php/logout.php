<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'ini.php'; // Předpokládám, že tento soubor obsahuje připojení k databázi pomocí MySQLi
session_start();

// Funkce pro odhlášení uživatele
function logout() {
    global $conn;

    // Pokud chcete odstranit token z databáze, použijeme MySQLi
    if (isset($_SESSION['token'])) {
        try {
            // Předpokládáme, že máte tabulku 'tokens' a chcete odstranit token uživatele
            $sql = "DELETE FROM tokens WHERE token = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $_SESSION['token']);
            $stmt->execute();
            $stmt->close();
        } catch (Exception $e) {
            // Pokud dojde k chybě při dotazu
            echo "Chyba při odstraňování tokenu: " . $e->getMessage();
        }
    }

    // Zrušit konkrétní token ze session
    unset($_SESSION['token']);

    // Zrušit všechny session proměnné (volitelné)
    session_unset();

    // Zničit celou session
    session_destroy();

    // Přesměrovat na přihlašovací stránku (nebo jinam)
    header("Location: /admin"); // Nahraďte URL podle potřeby
    exit;
}

// Volání funkce logout
logout();

?>
