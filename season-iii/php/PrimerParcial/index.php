<?php

require __DIR__ . '/vendor/autoload.php';
include_once './usuario.php';
include_once './estacionamiento.php';
include_once './clientes.php';

use \Firebase\JWT\JWT;

header('Content-Type: application/json'); //No se bien que hace pero cambia a json el ResponseBody del Postman si lo tengo
date_default_timezone_set("America/Argentina/Buenos_Aires"); //setea la zona horaria, quiere decir que tambn modifica la hora a aquella zona

$path = $_SERVER['PATH_INFO'];
$method = $_SERVER['REQUEST_METHOD'];


$json = file_get_contents('php://input');
$json = json_decode($json);
$pathIndx = explode('/', $path);
$key = 'primerparcial';
$dateNow =  date('d/m/Y') . ' ' . date('H:m');

switch ($method) {
    case 'POST':
        switch ($pathIndx[1]) {
            case 'registro':

                if(!user::verificarUserRegistered($_POST['email'])){
                $regist = new User($_POST['email'], $_POST['password'], $_POST['tipo']);

                echo $regist->__toString();
                $regist->SaveUserOnFile();
                }
                else
                user::ResponseWrongToken($dateNow, "Usuario ya registrado");
                break;

            case 'login':
                if (User::ValidarUsuarioRegistrado($_POST['email'])) {
                    try {
                        $userAux = User::returnUser($_POST['email']);

                        $payload = array(
                            "iat" => 1356999524,
                            "nbf" => 1357000000,
                            "email" => $userAux->email,
                            "type" => $userAux->typeUser
                        );

                        $jwt = JWT::encode($payload, $key);


                        $response = new stdClass();
                        $response->date = $dateNow;
                        $response->access_token = $jwt;

                        $userLoged = $response->access_token;
                        $response = json_encode($response);

                        echo $response;
                    } catch (\Throwable $th) {
                        User::ResponseWrongToken($dateNow, "problem with Token");
                    }
                } else
                    User::ResponseWrongToken($dateNow, "Invalid User or Password");

                break;
            case 'precio':

                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    if ($jwt->type == 'admin') {

                        $estacionamiento = new Estacionamiento($_POST['precio_hora'], $_POST['precio_estadia'], $_POST['precio_mensual']);
                        $estacionamiento->SaveOnFile();

                        // $list =Files::getArrayJSON('./listaPrecios.json');

                        //echo json_encode($list[0]);
                    } else {
                        User::ResponseWrongToken($dateNow, "El usuario no es Admin");
                    }
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }

                break;

            case 'ingreso':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    if ($jwt->type == 'user') {

                        $list = Files::getArrayJSON('./listaPrecios.json');
                        $monto = null;
                        switch ($_POST['tipo']) {
                            case 'hora':
                                $monto = $list[0]->hora;
                                break;
                            case 'estadia':
                                $monto = $list[0]->estadia;
                                break;
                            case 'mensual':
                                $monto = $list[0]->mensual;
                                break;
                        }

                        $cliente = new clientes($_POST['patente'], $dateNow, $monto, $jwt->email);
                        $cliente->SaveOnFile();
                    } else {
                        User::ResponseWrongToken($dateNow, "El usuario no es Admin");
                    }
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;
        }
        break;

    case 'GET':
        switch ($pathIndx[1]) {
            case 'retiro':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    if ($jwt->type == 'user') {

                        $list = Files::getArrayJSON('./listaPrecios.json');
                        $monto = clientes::getMountByToken($jwt->email);


                        $cliente = new clientes(basename($path), $dateNow, $monto, $jwt->email);
                        $cliente->SaveOnFile();

                        echo $cliente->__toString();
                    } else {
                        User::ResponseWrongToken($dateNow, "El usuario no es User");
                    }
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;

            case 'ingresos':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    Estacionamiento::ordenarYMostrar();
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;

            case 'ingreso':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    clientes::showClientByPatent($_GET['patente']);
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;

            case 'importe/:tipo':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    if ($jwt->type == 'admin') {
                    } else
                        User::ResponseWrongToken($dateNow, "El usuario no es admin");
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;

            case 'importe':
                try {
                    $token = $_SERVER["HTTP_TOKEN"];
                    $jwt = JWT::decode($token, $key, array('HS256'));

                    if ($jwt->type == 'admin') {

                        Estacionamiento::totalRecaudado($_GET['fecha_inicio'], $_GET['fecha_final']);
                    } else
                        User::ResponseWrongToken($dateNow, "El usuario no es admin");
                } catch (\Throwable $th) {
                    User::ResponseWrongToken($dateNow);
                }
                break;
        }
}
        
//echo $pathIndx[1];