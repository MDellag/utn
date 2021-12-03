<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath('/php/Class7');

$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Entro al Get");
    return $response;
});

$app->post('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Entro al Post");
    return $response;
});


/* $app->group('/petete', function (Request $request, Response $response, $args) {
    $app->post('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write("Entro al Post");
        return $response;
    });
}); */

$app->run();
