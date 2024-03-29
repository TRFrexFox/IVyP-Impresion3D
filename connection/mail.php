<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                    //Enable verbose debug output
    $mail->isSMTP();                                          //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                 //Enable SMTP authentication
    $mail->Username   = 'ssgalaxyii22@gmail.com';             //SMTP username
    $mail->Password   = 'gs5034.sec221518';                   //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;          //Enable implicit TLS encryption
    $mail->Port       = 465;                                  //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress('v.ortegaaz@gmail.com', 'Joe User');    //Add a recipient
    //$mail->addAddress('ellen@example.com');                 //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');           //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');      //Optional name

    //Content
    $mail->isHTML(true);                                      //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = file_get_contents('../assets/mail/Carta/index.php');
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $files = opendir('../assets/mail/Carta/images');
    while (($file = readdir($files)) !== false) {
        if($file != '.' && $file != '..')
        $mail->AddEmbeddedImage("../assets/mail/Carta/images/$file", explode (".", $file)[0], $file);
    }
    closedir($files);

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
