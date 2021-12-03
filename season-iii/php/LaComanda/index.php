<?php


use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;
use App\Middlewares\JsonMiddleware;
use App\Middlewares\AuthMiddleware;
use \App\Controllers\EmpleadoController;
use \App\Controllers\PedidoController;
use \App\Controllers\UserController;
use Config\Database;


require __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');
date_default_timezone_set("America/Argentina/Buenos_Aires");

$conn = new Database;
$app = AppFactory::create();
$app->setBasePath('/php/LaComanda');

$app->addErrorMiddleware(true, false, false);
$app->addBodyParsingMiddleware(); //Este se encarga de parsear los Json del Body Request. Si no, no podriamos enviar Json.



$app->group('/users', function (RouteCollectorProxy $group) {
    $group->post('/register[/]', UserController::class . ":register");
    
    $group->post('/login[/]', UserController::class . ":login");

    $group->get('/verify/:id[/]', UserController::class . ":verifyUser");

})->add(new JsonMiddleware);;


$app->group('/empleados', function (RouteCollectorProxy $group) {
    $group->get('[/]', EmpleadoController::class . ":getActiveEmployees");
    
    $group->get('/all[/]', EmpleadoController::class . ":getAll");

    $group->get('/{dni}', EmpleadoController::class . ":getOneEmployee");
    
    $group->post('[/]', EmpleadoController::class . ":addEmployee");

    $group->put('/{dni}', EmpleadoController::class . ":updateEmployee");

    $group->delete('/{dni}', EmpleadoController::class . ":dropEmployee");
})->add(new AuthMiddleware(2))->add(new JsonMiddleware);


$app->group('/pedidos', function (RouteCollectorProxy $group) {
    $group->get('[/]', PedidoController::class . ":getActiveEmployees");
    
    $group->get('/all[/]', PedidoController::class . ":getAllPedidos");

    $group->get('/{code}', PedidoController::class . ":getPedidoByCode");
    
    $group->post('[/]', PedidoController::class . ":addPedido");

    $group->put('/{dni}', PedidoController::class . ":updateEmployee");

    $group->delete('/{dni}', PedidoController::class . ":dropEmployee");
})->add(new AuthMiddleware(2))->add(new JsonMiddleware);

$app->run();
