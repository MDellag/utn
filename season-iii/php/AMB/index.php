<?php
include_once './Personas.php';
include_once './validaciones.php';
include_once './Files/Files.php';
include_once './users.php';
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

header('Content-Type: application/json'); //No se bien que hace pero cambia a json el ResponseBody del Postman si lo tengo
date_default_timezone_set("America/Argentina/Buenos_Aires"); //setea la zona horaria, quiere decir que tambn modifica la hora a aquella zona

$path = $_SERVER['PATH_INFO'];
$method = $_SERVER['REQUEST_METHOD'];
//$pathServer = getcwd() . "/index.php";

$json = file_get_contents('php://input');
$json = json_decode($json); //esto anda devuelv el objeto entero
$pathFix = explode('/', $path);

$dateNow =  date('d/m/Y') . ' ' . date('H:m');
$userLoged = null; //new stdClass();

//echo base64_decode('MzgyOA==');

switch ($method) {
    case 'POST':
        switch ($pathFix[1]) {
            case 'login':

                if (user::AuthenticateUserLogIn($json->username, $json->password)) {
                    try {
                        $payload = array(
                            "iat" => 1356999524,
                            "nbf" => 1357000000,
                            "email" => $json->username,
                            "type" => $json->type
                        );

                        $jwt = JWT::encode($payload, $json->password);


                        $response = new stdClass();
                        $response->date = $dateNow;
                        $response->access_token = $jwt;

                        $userLoged = $response->access_token;
                        $response = json_encode($response);

                        echo $response;
                    } catch (\Throwable $th) {
                        ResponseWrongToken($dateNow, "problem with Token");
                    }
                } else
                    ResponseWrongToken($dateNow, "Invalid User or Password");

                break;

            case 'singUp':
                $regist = new user($json->mail, $json->username, $json->password);
                user::tokenFile($json);
                echo $regist->__toString();
                $regist->SaveUserOnFile();
                break;

            case 'alta':
                if ($method == "POST") {
                    try {
                        $token = $_SERVER["HTTP_TOKEN"];
                        JWT::decode($token, user::getUser('enanah'), array('HS256'));

                        echo $userLoged;

                        $persona = new Persona(Persona::setIdPersona(), $json->dni, $json->name, $json->lastname);
                        Files::guardarJSON('users.json', $persona);
                        echo $persona->__toString();
                    } catch (\Throwable $th) {
                        ResponseWrongToken($dateNow);
                    }
                }
                break;
        }

        break;

    case 'GET':
        switch ($pathFix[1]) {
            case 'getAll':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    //$userLoged = user::decodeToken($token);
                    $decoded = JWT::decode($token, user::getUser("enanah"), array('HS256'));
                    echo Files::leerJSONtxt('./users.json');
                } catch (\Throwable $th) {
                    ResponseWrongToken($dateNow);
                }

                break;
        }

    case 'PUT':
        switch ($pathFix[1]) {
            case 'update':
                if ($method == "PUT") {
                    Persona::updatePerson(basename($path), $json->name, $json->lastname, $json->dni);
                }
                break;
        }
        break;
}


// $token = get_headers($pathServer);

//$arr = array('a' => 1, 'b' => 2);

//echo json_encode($arr);
