<?php

function LoadFile($file, $mode = 'r'){
    
    $aux = array();

    $archivo = fopen($file, $mode);

    while (!feof($archivo)) {
        $linea = fgets($archivo);

      //  $datos = explode('-', $linea);
      //  if (count($datos) >= 1) {        
         array_push($aux, $linea);
        
    }
    $close = fclose($archivo);

    return $aux;
}