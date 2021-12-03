<?php

$vect = array();

$vect[1]=90;
$vect[30]=7;
$vect['e']=99;
$vect['hola']='mundo';


foreach ($vect as $key) {
    print("\n". $key);
}