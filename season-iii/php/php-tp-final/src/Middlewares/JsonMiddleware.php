<?php
namespace App\Middlewares;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class JsonMiddleware {

    public function __invoke(Request $request, RequestHandler $handler)
    {
        $response = $handler->handle($request);
        // $existingContent = (string) $response->getBody();

        // $response = new Response();
        $response = $response->withHeader('Content-type', 'application/json;charset=utf-8');

        return $response;
    }
}