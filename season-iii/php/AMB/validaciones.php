<?php


function verificar_email($email)
{
  if (preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $email)) {
    return true;
  }
  return false;
}

function ResponseWrongToken($dateNow, $message = "Error on Authentication")
{
  $response = new stdClass();
  $response->date = $dateNow;
  $response->Message = $message;
  $response = json_encode($response);
  echo $response;
}
