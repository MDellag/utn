<?php

namespace App\Controllers;

use App\Models\Inscripcion;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Materia;
use Exception;
use stdClass;
use \Firebase\JWT\JWT;
use Illuminate\Database\Eloquent\JsonEncodingException;

define ('KEY', "parcialProgIII2020");

class InscripcionController
{

  

    public function getMateriaIndicada(Request $request, Response $response, $args)
    {
        
        $header = getallheaders();
        $materia = Inscripcion::where('id', $args['idMateria'])->get();
        
        $resp = new stdClass;
        $resp->date = date('Y-m-d  H:m:s');
        try {
            $token = JWT::decode($header['token'], KEY, array('HS256'));

            if($token->tipo == "admin" || $token->tipo == "profesor"){
                $resp->data = $materia;
            }
            else
                throw new Exception('Tipo de Usuario incorrecto');

        } catch (\Throwable $th) {
            $resp->status = 500;
            $resp->message = $th->getMessage();
        }

        $response->getBody()->write(json_encode($resp));
        return $response;
    }


   
    public function inscripcion(Request $request, Response $response, $args)
    {   
        $header = getallheaders();
        

        $resp = new stdClass;
        $resp->date = date('Y-m-d  H:m:s');
        try {
            $token = JWT::decode($header['token'], KEY, array('HS256'));
            $materia = Materia::find($args['idMateria']);
            
            $materia->cupos = $materia->cupos --;
            $materia->save();

            $inscripcion = new Inscripcion;
            $inscripcion->idAlumno = $token->id;
            $inscripcion->idMateria = $materia->id;
            $inscripcion->save();
            $resp->data = $inscripcion;

        } catch (\Throwable $th) {
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }


    public function asignarNotas(Request $request, Response $response, $args)
    {         
        $resp = new stdClass;
        $resp->date = date('Y-m-d  H:m:s');
        $req = $request->getParsedBody();
        try {
            $inscripcion = Inscripcion::where('idMateria', $args['idMateria'])->get();
            $insc = null;
            
            foreach ($inscripcion as $value) {
                
                if($value->idAlumno == $req['idAlumno']){
                    $insc = $value;
                }
            }
            
            if(!$insc) throw new Exception('El Alumno o materia no existe');

            $inscrip = Inscripcion::find($insc->id);
            $inscrip->notas = $req['nota'];
            $inscrip->save();
            $resp->message = "success";

        } catch (\Throwable $th) {
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }


    public function verNotasDeMateria(Request $request, Response $response, $args)
    {         
        $resp = new stdClass;
        $resp->date = date('Y-m-d  H:m:s');

        try {
            $inscripcion = Inscripcion::select('idAlumno', 'notas')->where('idMateria', $args['idMateria'])->get();
            
            $resp->message = "success";
            
            $resp->data = $inscripcion;
        } catch (\Throwable $th) {
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }
}
