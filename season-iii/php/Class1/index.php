<?php  //abre etiqueta
//include './funciones/funciones.php';

$variable = "name";
$flot = 432.32;
//send msg a lo print();
echo "ptm $variable";

//prueba de salto de linea
echo "<br>salto de linea $variable";

//otra manera de usar echo
printf("<br>float: %.2f", $flot);

//el STRLEN(var); devuelve una longitud de texto
echo "<br>", strlen($variable); //salto de linea y print

//delcaracion de un array en php
$array = array(1, 2, 5);
// esto es solo un salto de linea
echo "<br>";
//imprimir por pantalla el array
var_dump($array);

//esto esta en la carpeta funciones
    //saludar("asd");
    //saludar("wqwe");
