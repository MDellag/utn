<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Empleado;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Symfony\Component\Console\Descriptor\JsonDescriptor;
use Exception;
use stdClass;

class EmpleadoController
{

    public function getAll(Request $request, Response $response, $args)
    {
        $rta = Empleado::get();

        $response->getBody()->write(json_encode($rta));
        return $response;
    }

    public function getActiveEmployees(Request $request, Response $response, $args)
    {
        $rta = Empleado::where('dropDate', null)->get();

        $response->getBody()->write(json_encode($rta));
        return $response;
    }

    public function getOneEmployee(Request $request, Response $response, $args)
    {   
        $resp = new stdClass;
        try {
            if (!$this->existsEmployee($args['dni'])) throw new Exception("No existe el Empleado");
            $rta = Empleado::find($args['dni']);;

            $resp->status = 200;
            $resp->data = $rta;
        } catch (\Throwable $th) {
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }

    public function addEmployee(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $date =  date('Y-m-d');
        $empleado = new Empleado;
        $rta = new stdClass();
        $rta->date = $date;

        try {
            if (!$this->dniIsValid($req['dni'])) throw new Exception("Dni no cumple con requisitos");
            if ($this->existsEmployee($req['dni'])) throw new Exception("Empleado ya registrado. Verifique los datos");


            $empleado->name = $req['name'];
            $empleado->lastname = $req['lastname'];
            $empleado->dni = $req['dni'];
            $empleado->creationDate = $date;
            $empleado->id_puesto = $req['id_puesto'];

            $empleado->save();
            $rta->data = $empleado;
        } catch (\Throwable $th) {
            $rta->status = '500 server Internal Error';
            $rta->message = $th->getMessage();
        }


        $response->getBody()->write(json_encode($rta));
        return $response;
    }

    public function updateEmployee(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $resp = new stdClass;

        try {
            if (!$this->existsEmployee($args['dni'])) throw new Exception("No existe el Empleado");

            $empl = Empleado::find($args['dni']);

            $empl->name = $req['name'];
            $empl->lastname = $req['lastname'];
            $empl->save();


            $resp->status = 200;
            $resp->data = $empl;
        } catch (\Throwable $th) {
            $resp->status = '500 server Internal Error';
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }

    public function dropEmployee(Request $request, Response $response, $args)
    {
        $req = $request->getParsedBody();
        $resp = new stdClass;
        $date = Date('Y-m-d');

        try {
            if (!$this->existsEmployee($args['dni'])) throw new Exception("No existe el Empleado");

            $empl = Empleado::find($args['dni']);

            $empl->dropDate = $date;
            $empl->save();


            $resp->status = 200;
            $resp->data = $empl;
            $resp->message = "Empleado dado de baja";
        } catch (\Throwable $th) {
            $resp->status = '500 server Internal Error';
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }

    private function dniIsValid($dni)
    {
        return strlen((string)$dni) == 8;
    }

    private function existsEmployee($dni)
    {
        $employee = Empleado::find($dni);
        if ($employee) return true;
        else return false;
    }

    public static function getIDEmployees(){
        $empl = Empleado::select('idEmpleado')->where('dropDate', null)->get();
        $empl = json_decode($empl);
        $keyRand = array_rand($empl);
        return $empl[$keyRand];
    }
}
