<?php

namespace App\Middlewares;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;
use App\Controllers\UserController;
use \Firebase\JWT\JWT;
use App\Models\User;
use stdClass;

// use Psr\Http\Message\ResponseInterface as Response;
define ('KEY2', "tpProgIII2020");
class AuthMiddleware
{   
    /**
     * Example middleware invokable class
     *
     * @param  ServerRequest  $request PSR-7 request
     * @param  RequestHandler $handler PSR-15 request handler
     *
     * @return Response
     */

     private $_typeuser;
     public function __construct($type_user)
     {
         $this->_typeuser = $type_user;
     }

    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $headers = getallheaders();
        $token = $headers['token'];

        $jwt = JWT::decode($token, KEY2, array('HS256'));

        $usr = User::find($jwt->id);

        if ($usr->type_user == $this->_typeuser) {

            $response = $handler->handle($request);
            $existingContent = (string) $response->getBody();
            $resp = new Response();
            $resp->getBody()->write($existingContent);
            return $resp;

        } else {
            $response = new Response();
            $resp = new stdClass;

            $resp->date = 
            $response->getBody()->write("Tipo de Usuario de Usuario Invalido");
            // throw new \Slim\Exception\HttpForbiddenException($request);
            return $response->withStatus(403);
        }
    }
}
