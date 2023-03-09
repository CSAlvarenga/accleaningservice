<?php

if(isset($_POST['email']) && !empty($_POST['email'])){

$nome = addcslashes($_POST['name'])
$email = addcslashes($_POST['email'])
$tel = addcslashes($_POST['tel'])
$message = addcslashes($_POST['message'])

$to = "Info@accleaningservices.info";
$subject = "Contact - AC Cleaning Services"
$body = "Name: ".$nome. "\r\n".
        "email: ".$email. "\r\n".
        "tel: ".$tel. "\r\n".
        "message: ".$message;
$header = "From:contact@accleaningservices.info"."\r\n".
          "Reply-To: ".$email."/r/n".
          "X=Mailer:PHP/".phpversion();

if(mail($to,$subject,$body,$header)){
  echo("Email enviado com sucesso!");

}else {
  echo("Email não pode ser enviado");
}

}

?>