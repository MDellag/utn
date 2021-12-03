<?php

echo "Today is " . date("Y/m/d") . "<br/>";
echo "Today is " . date("d-m") . "<br/>";    //marca la fecha se puede poner asi o como arriba, no importa el orden
echo "Today is " . date("l") . "<br/>";  //marca el dia que es hoy por nombre ej":Domingo

echo "<br>The time is " . date("h:i:sa") . "<br/>"; //la 'a' muestra pm o am 'i' son minutos 's' segundos
echo "The time is " . date("H:i:s") . "<br/><br/>";  // H muestra 24hs format y 'h' 12hs format


date_default_timezone_set("America/Argentina/Buenos_Aires"); //setea la zona horaria, quiere decir que tambn modifica la hora a aquella zona
echo "thetime is " . date("H:i:s") . "<br/><br/>";


$e = mktime(11, 14, 54, 8, 12, 2014);     //Crea una hora en especifico (se puede usar para controlar si la hora es X hacer tal cosa..)
// Ar    gumentos = mktime(hour,min,seg,month,day,year)
echo "Created date is " . date("Y-m-d H:i:s", $e);


$d = strtotime("10:30pm April 15 2014");  //Crea una fecha y hora desde un String (usa la funcion strtotime()..)
$f = strtotime("17:33 April 15
 2014");
echo "<br/>Created date is " . date("Y-m-d h:i:sa", $d);
echo "<br/>Created date is " . date("Y-m-d H:i:s", $f);
