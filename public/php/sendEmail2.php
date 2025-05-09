<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

header('Content-Type: application/json'); // Správná odpověď v JSONu
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$_POST = json_decode(file_get_contents('php://input'), true);

// Kontrola, zda jsou všechny hodnoty nastavené
if (!isset($_POST['jmeno'], $_POST['email'], $_POST['predmet'], $_POST['zprava'])) {
    echo json_encode(["success" => false, "error" => "Chybějící data ve formuláři."]);
    exit;
}

$jmeno = htmlspecialchars($_POST['jmeno']);
$email = htmlspecialchars($_POST['email']);
$telefon = htmlspecialchars($_POST['predmet']);
$zprava = htmlspecialchars($_POST['zprava']);

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0; // Debug vypnutý
    $mail->CharSet = "UTF-8";  
    $mail->isSMTP();
    $mail->Host = 'mail.webglobe.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@designjj-test.eu';
    $mail->Password = 'Radegast12*'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('info@designjj-test.eu', 'Poptávka stolu ' . $nazev);
    $mail->addAddress('vitejajan@gmail.com');  

    $mail->isHTML(true);
    $mail->Subject = $predmet;
    $mail->Body = "<b>Poptávka stolu</b>: $nazev <br><br> 
                   Jméno: $jmeno <br> 
                   Email: $email <br> 
                   Zpráva: $zprava <br>"; 

    $mail->send();
    
    echo json_encode(["success" => true]); // Odpověď v JSONu

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]); // Odpověď s chybou
}
