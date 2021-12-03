<?php


$array = array();
$suma = 0;

for ($i = 0; $i < 5; $i++) {

    $array[$i] = rand(0, 10);
    $suma += $array[$i];
}


var_dump($array);
echo "<br/>El promedio es: " . $suma / 5;
