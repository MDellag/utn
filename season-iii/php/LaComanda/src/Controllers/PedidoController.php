<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Pedido;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Exception;
use stdClass;

Class PedidoController{

    public function getAllPedidos(Request $request, Response $response, $args)
    {
        $pedido = Pedido::get();

        $response->getBody()->write(json_encode($pedido));
        return $response;
    }
    
    public function getPedidoByCode(Request $request, Response $response, $args)
    {   
        
        $res = new stdClass;
        $date = date('Y-m-d H:m:s');
        $res->date = $date;
        try {
            if(!$this->codeExists($args['code'])) throw new Exception('No Existe el Pedido');
            $pedido = Pedido::find($args['code']);
            $res->status = 200;
            $res->data= $pedido;
        } catch (\Throwable $th) {
            $res->status = 500;
            $res->message= $th->getMessage();
        }

        $response->getBody()->write(json_encode($res));
        return $response;
    }

    public function addPedido(Request $request, Response $response, $args)
    {
        $pedido = new Pedido;
        $req = $request->getParsedBody();
        $resp = new stdClass();
        $date = date('Y-m-d');
        $hour = date('H:m:s');
        $code = $this->generateCode();

        $idEmpleado =  EmpleadoController::getIDEmployees();
        
        try {
            $orden = implode("-", $req['orden']);
            $pedido->orden = $orden;
            $pedido->idEmpleado = $idEmpleado->idEmpleado;
            $pedido->idMesa = $req['id_mesa'];
            $pedido->codigo = $code;
            $pedido->hora = $hour;
            $pedido->date = $date;
            $pedido->status = 'solicitado'; 
            $pedido->precio = 760;
            
            $pedido->save();
           
            $resp->status = 200; 
            $resp->data = $pedido;
        } catch (\Throwable $th) {
            $resp->status = 500;
            $resp->message = $th->getMessage();
        }
        $response->getBody()->write(json_encode($resp));
        return $response;
    }


    private function codeExists($code)
    {
        $pedido = Pedido::find($code);
        if($pedido) return true;
        else return false;
    }


    
    private function generateCode()
    {   
        $str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $a = substr(str_shuffle($str), 0, 5);
        return $a;
    }

}