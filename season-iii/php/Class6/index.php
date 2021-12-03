<?php
header('Content-Type: application/json');
require __DIR__ . '/vendor/autoload.php'; //este es el encargado de autolodear todo desde el composer.json

// include "./database/Sql.php";
use Clases\Usuario;
use DB\DAO;

$usuario = new Usuario("asd", "adwqe", "adm");


$sqlCon = new DAO("clasesql");

$getDao = "SELECT * FROM alumnos";
$insert = "INSERT INTO alumnos (apellido, nombre, dni) VALUES ('yty', 'pol', 2425)";
$update = "UPDATE alumnos set dni = 42334863 where id = '5' ";

// $sqlCon->queryRunner($insert);

echo json_encode($sqlCon->queryRunner($getDao));









/*  Codigo de Referencia
    // echo "cantidad de filas" . $query->rowCount() . "";

    $alumnos = $query->fetchAll(PDO::FETCH_OBJ); // te devuelve un array con 2 resultados.. si le agregamos ese parametro, trae bien todo
    //Buscar los diferentes tipos de PDO::Fetch

    while($fila = $query->fetch(PDO::FETCH_OBJ)){
        //este while no funca..
        echo json_encode($fila);
        echo "As";
    }
 */




