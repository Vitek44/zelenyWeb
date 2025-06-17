<?php
// saveImage.php - Nahrání obrázku na FTP

require_once 'ini.php'; // Připojení k databázi

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
    $ftpServer = 'ftp.filipzeleny.cz';
    $ftpUsername = 'filipzeleny.cz';
    $ftpPassword = 'Dobraprace13052025';
    $ftpPath = '/public_html/uploads/';

    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = basename($_FILES['file']['name']);

    $ftpConn = ftp_connect($ftpServer);
    $login = ftp_login($ftpConn, $ftpUsername, $ftpPassword);
    ftp_pasv($ftpConn, true);

    if ($ftpConn && $login) {
        if (ftp_put($ftpConn, $ftpPath . $fileName, $fileTmpPath, FTP_BINARY)) {
            echo json_encode(["success" => true, "message" => "Obrázek byl úspěšně nahrán.", "url" => $ftpPath . $fileName]);
        } else {
            echo json_encode(["success" => false, "message" => "Chyba při nahrávání obrázku."]);
        }
        ftp_close($ftpConn);
    } else {
        echo json_encode(["success" => false, "message" => "Nepodařilo se připojit k FTP serveru."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Nebyl vybrán žádný soubor."]);
}
?>