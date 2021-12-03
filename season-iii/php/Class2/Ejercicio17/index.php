<?php
require_once './ej17.php';

 $time = mktime(17,23,44,03,30,2019);
 $auto = new Auto("Audi", "GrisObscuro", 300000,$time);

//metodo estatico de la clase AUTO
//Auto::MostrarAuto($auto);


$marca = $_GET['marca'];
$color = $_GET['color'];
$precio = null;

if(isset($_GET['precio']))
{
    $precio = $_GET['precio'];
}

$auto2 = new Auto($marca, $color, $precio, $time);

 $method = $_SERVER['REQUEST_METHOD'];
 //$path_info = $_SERVER['PATH_INFO'];


 switch($method){

    case 'POST': //Agrega recursos
        echo "es un Post";
    break;

    case 'GET':
     @   Auto::MostrarAuto($auto2);
    break;

    case 'PUT':
        echo "Esto es un maldito PUT";
    break;
 }