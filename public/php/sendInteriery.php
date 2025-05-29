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
if (!isset($_POST['nazev'], $_POST['jmeno'], $_POST['email'], $_POST['telefon'], $_POST['zprava'])) {
    echo json_encode(["success" => false, "error" => "Chybějící data ve formuláři."]);
    exit;
}

$nazev = htmlspecialchars($_POST['nazev']);  // Ochrana proti XSS
$jmeno = htmlspecialchars($_POST['jmeno']);
$email = htmlspecialchars($_POST['email']);
$telefon = htmlspecialchars($_POST['telefon']);
$zprava = htmlspecialchars($_POST['zprava']);

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0; // Debug vypnutý
    $mail->CharSet = "UTF-8";  
    $mail->isSMTP();
    $mail->Host = 'mail.webglobe.cz';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@filipzeleny.cz';
    $mail->Password = 'Dobraprace13052025'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('info@filipzeleny.cz', 'Poptávka stolu ' . $nazev);
    $mail->addAddress('info@filipzeleny.cz');  

    $mail->isHTML(true);
    $mail->Subject = 'Poptávka interiéru - ' . $nazev;
    $mail->Body = "<b>Poptávka interiéru</b>: $nazev <br><br> 
                   Jméno: $jmeno <br> 
                   Email: $email <br> 
                   Telefon: $telefon <br> 
                   Zpráva: $zprava";

    $mail->send();
    
    echo json_encode(["success" => true]); // Odpověď v JSONu

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]); // Odpověď s chybou
}
