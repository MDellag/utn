<?php


function esPar($numero){

    if($numero % 2 == 0)
    {
        return true;
    }else{
        return false;
    }
}

function esImpar($numero)
{
    return !esPar($numero);
}

print( esPar(8));
print( esImpar(9));
print( esPar(5));
print( esImpar(10));