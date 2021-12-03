<?php


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;
use \App\Controllers\EmpleadoController;
use \Entities\Pedido;


require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');
date_default_timezone_set("America/Argentina/Buenos_Aires");


$app = AppFactory::create();
$app->setBasePath('/php/LaComandaT');

$app->addErrorMiddleware(true, false, false);
$app->addBodyParsingMiddleware(); //Este se encarga de parsear los Json del Body Request. Si no, no podriamos enviar Json.


$app->get('/', function (Request $request, Response $response, $args) {

    $json = new stdClass();
    $json->status = 200;
    $json->method = 'GET';
    $json = json_encode($json);
    $response->getBody()->write($json);
    return $response;
});


$app->group('/users', function (RouteCollectorProxy $group) {
    $group->get('/{id}[/]', function (Request $req, Response $res, $args) {

        $bod = json_encode($args);
        $res->getBody()->write($bod);
        return $res;
    });

});


$app->group('/empleados', function (RouteCollectorProxy $group) {
    $group->get('[/]', EmpleadoController::class . ":getAll");
    
    $group->post('[/]', EmpleadoController::class . ":addOne");
    
    $group->get('/{id}', EmpleadoController::class . ":getOne");

    $group->put('/{id}', EmpleadoController::class . ":updateOne");

    $group->delete('/{id}', EmpleadoController::class . ":deleteOne");
});


$app->group('/pedidos', function (RouteCollectorProxy $group) {

    $group->get('/', function (Request $req, Response $res, $args) {

        $response = Pedido::obtenerPedidos();
        $res->getBody()->write(json_encode($response));
        return $res;
    });

    $group->post('/', function (Request $req, Response $res, $args) {

        $bod = $req->getParsedBody();
        $randID = Empleado::GetIdEmpleadoRandom();
        $pedido = new Pedido($bod['orden'], $randID ,$bod['id_mesa'], Pedido::GenerateCode(), );
        // $pedido->ordenarPedido();
        $res->getBody()->write(json_encode($pedido->_pedidoInfo));
        return $res;
    });
});

$app->run();
