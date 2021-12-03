<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Materia;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Exception;
use stdClass;
use \Firebase\JWT\JWT;
define ('KEY', "parcialProgIII2020");
class MateriaController
{

   


    public function addMateria(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $materia = new Materia;
        // $header = getallheaders();
        // $token = JWT::decode($header['token'], KEY, array('HS256'));
        
        $resp = new stdClass();
        $resp->date = date('Y-m-d  H:m:s');
        try {
            if($req['cuatrimestre']>4) throw new Exception('El valor del cuatrimestre es mayor');

            $materia->nombre = $req['materias'];
            $materia->cuatrimestre = $req['cuatrimestre'];
            $materia->cupos = $req['cupos'];

            $materia->save();
            $resp->data = $materia;
        } catch (\Throwable $th) {
            $resp->status = 500;
            $resp->message = $th->getMessage();
        }

        $response->getBody()->write(json_encode($resp));
        return $response;
    }

    public function getMaterias(Request $request, Response $response, $args)
    {        
        $resp = new stdClass();
        $resp->date = date('Y-m-d  H:m:s');
        try {
            $materia = Materia::get();

            $resp->data = $materia;
        } catch (\Throwable $th) {
            $resp->status = 500;
            $resp->message = $th->getMessage();
        }

        $response->getBody()->write(json_encode($resp));
        return $response;
    }
  
}
