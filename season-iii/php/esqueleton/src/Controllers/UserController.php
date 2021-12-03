<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Exception;
use stdClass;
use \Firebase\JWT\JWT;
define ('KEY', "parcialProgIII2020");
class UserController
{

    public function getAllPedidos(Request $request, Response $response, $args)
    {
        $pedido = Usuario::get();

        $response->getBody()->write(json_encode($pedido));
        return $response;
    }


    public function register(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $user = new Usuario;
        $pass = base64_encode($req['password']);
        $resp = new stdClass;
        $resp->date = date('Y-m-d  H:m:s');
        try {
            if(strlen($req['password']) < 4) throw new Exception('Password demasiado corta');
            $user->username = $req['username'];
            $user->password = $pass;
            $user->mail = $req['email'];
            $user->tipo = $req['tipo'];
            
            $user->save();

            $resp->data = $user;
        } catch (\Throwable $th) {
            $resp->status = 500;
            $resp->message = $th->getMessage();
        }

        $response->getBody()->write(json_encode($resp));
        return $response;
    }


    public function login(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $mail = $req['mail'];
        $pass = $req['password'];
        $usr = $this->userIsRegistered($mail, $pass);
        $resp = new stdClass;
        $resp->date = date('Y-m-d H:m:s');
         
        try {
            if ($usr) {
                $payload = array(
                    "iat" => 1356999524,
                    "nbf" => 1357000000,
                    "id" => $usr->id,
                    "username" => $usr->username,
                    "mail" => $usr->mail,
                    "tipo" => $usr->tipo
                );
                $jwt = JWT::encode($payload, KEY);
                

                $resp->access_token = $jwt;
            }
            else
                throw new Exception("Usuario Inexistente. Por favor revise los datos");
        } catch (\Throwable $th) {
            $resp->message = $th->getMessage();
        }


        $response->getBody()->write(json_encode($resp));
        return $response;
    }


    private function userIsRegistered($mail, $password)
    {
        $user = Usuario::find($mail);
        $usr = null;
            $pass = base64_decode($user->password);
            if ($password == $pass) {
                $usr = $user;
            }
        
        return $usr;
    }

    public function typeUser($id)
    {
        return Usuario::find($id)->type_user;
    }

    public function verifyUser(Request $request, Response $response, $args)
    {   
        $asd = $this->typeUser($args['id']);
        $response->getBody()->write(json_encode($asd));
        return $response;
    }
}
