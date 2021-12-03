<?php

$numPow = pow(2,8);

function cuatroPrimerosNumPow()
{
   for ($i=1; $i <= 4 ; $i++) { 
       
    echo  pow($i, 1) . " - " . pow($i, 2) . " - " . pow($i, 3) . " - " . pow($i, 4);
   } 
}

echo $numPow;