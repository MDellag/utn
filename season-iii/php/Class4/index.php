<?php
include '../Class3/files.php';


$path = $_SERVER['PATH_INFO'];  //primero se ejecuta esto antes que cualquier otro $_SERVER[''];
$method = $_SERVER['REQUEST_METHOD'];

//$asd = LoadFile('./Class3/archivo.txt');

//print_r(LoadFile('./Class3/archivo.txt'));

$arr = array('asdasd', 'dqweq');
$id=0;

function IncrementId($array)
{
    return count($array) +1;
}

echo IncrementId($arr);

echo $path;
switch($path){

    case '/lala':
        switch($method){
            case 'GET': 
                echo "entro.. al get de /lala";
        }

    case '/turu':
        switch ($method) {
            case 'POST':
                echo "entro al post de /turu";
                break;
        }    
}
