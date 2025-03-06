<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Spuštění session (musí být jako první)
session_start();

// Generování tokenu
$token = bin2hex(random_bytes(8));

// Uložení tokenu do session
$_SESSION['token'] = $token;

// Uložení tokenu do cookies (musí být před jakýmkoliv výstupem)
setcookie("token", $token, time() + 3600, "/", "", false, true);

// Připojení k databázi
require_once 'ini.php'; 

// Uložení tokenu do databáze
try {
    // Příprava dotazu
    $sql = "INSERT INTO tokens (token) VALUES (?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->close();

        // ✅ Přesměrování na /admin/admin-panel po úspěšném uložení
        header("Location: /admin/admin-panel");
        exit(); // Ukončí skript, aby se nepokračovalo v provádění
    } else {
        throw new Exception("Chyba při přípravě dotazu: " . $conn->error);
    }
} catch (Exception $e) {
    echo 'Chyba při ukládání tokenu: ' . $e->getMessage();
}

// Debug - zobrazíme session a cookies (vypíše se jen při chybě)
echo "Session token: " . ($_SESSION['token'] ?? 'není nastaven') . "<br>";
echo "Cookie token: " . ($_COOKIE['token'] ?? 'není nastaven') . "<br>";
?>
