<?php

function ejercicio13($palabra, $max)
{
    if(strlen($palabra) <= $max && ( $palabra == "Programacion"  or $palabra == "Parcial" or $palabra == "Recuperatorio" ))
    {
        return 1;
    }
    else{
        return 0;
    }
} 
//esto no anda

echo ejercicio13("Programacion", 20);
echo ejercicio13("asd", 20);
echo ejercicio13("Programacion", 4);

echo "<br/>";
echo strcmp("caac", "caac");