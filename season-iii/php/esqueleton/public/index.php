<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;
use Config\Database;
use App\Controllers\UserController;
use App\Controllers\MateriaController;
use App\Controllers\inscripcionController;
use App\Middlewares\JsonMiddleware;
use App\Middlewares\AuthMiddleware;

require __DIR__ . '/../vendor/autoload.php';

$conn = new Database;

$app = AppFactory::create();
$app->setBasePath('/php/esqueleton/public');
$app->addBodyParsingMiddleware();

$app->group('/users', function (RouteCollectorProxy $group) {

    $group->post('[/]', UserController::class . ":register");
    
    $group->post('/login[/]', UserController::class . ":login");

})->add(new JsonMiddleware);

$app->group('/materia', function (RouteCollectorProxy $group) {

    $group->post('[/]', MateriaController::class . ":addMateria")->add(new AuthMiddleware("admin"));

    $group->get('[/]', MateriaController::class . ":getMaterias");

})->add(new JsonMiddleware);


$app->post('/inscripcion/{idMateria}[/]', inscripcionController::class . ":inscripcion")->add(new AuthMiddleware('alumno'));

$app->get('/inscripcion/{idMateria}[/]', inscripcionController::class . ":getMateriaIndicada")->add(new JsonMiddleware);

$app->get('/notas/{idMateria}[/]', inscripcionController::class . ":verNotasDeMateria")->add(new JsonMiddleware);

$app->put('/notas/{idMateria}[/]', inscripcionController::class . ":asignarNotas")->add(new AuthMiddleware('profesor'))->add(new JsonMiddleware);



$app->run();
