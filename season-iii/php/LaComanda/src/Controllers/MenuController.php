<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Models\Menu;
use Illuminate\Database\Eloquent\JsonEncodingException;
use Exception;
use stdClass;

class PedidoController
{
    public function getAllPedidos(Request $request, Response $response, $args)
    {
        $menu = Menu::get();

        $response->getBody()->write(json_encode($menu));
        return $response;
    }
}
