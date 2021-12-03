<?php

$colores = array('azul', 'rojo', 'verde', 'negro');
$marcas = array('bic', 'pen', 'berretin');
$trazos = array('fino', 'grueso');
$precios = array(10, 15, 20, 50, 99);

$lapiceras;

for ($i=0; $i < 3; $i++) { 
    $lapiceras[$i] = [
        'color' => $colores[rand(0,3)],
        'marca' => $marcas[rand(0,2)],
        'trazo' => $trazos[rand(0,1)],
        'precio' => $precios[rand(0,4)]
    ];
}

for ($i=0; $i < count($lapiceras) ; $i++) { 
    echo $lapiceras[$i]['color']. " - ". $lapiceras[$i]['marca'] . " - ";
    echo $lapiceras[$i]['trazo']. " - ". $lapiceras[$i]['precio'];
    print("\n");
}