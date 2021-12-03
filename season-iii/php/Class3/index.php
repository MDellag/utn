<?php 
include '../Class2/Ejercicio17/ej17.php';

$file = 'archivo.txt';
$modo = 'r';
$listaAutos = array();

$archivo = fopen($file, $modo);


while (!feof($archivo)) {
    $linea = fgets($archivo);

    $datos = explode('*', $linea);

    if (count($datos) >= 1) {
        $nuevoAuto = new Auto($datos[0], $datos[1], $datos[2]);
        array_push($listaAutos, $nuevoAuto);
    }
}


$close = fclose($archivo);


//print_r($listaAutos);


$json = json_encode($listaAutos);


echo $json;

