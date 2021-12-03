<?php

$result = 0;
$aux = 0;

//  $arr = array(1,2,3,4);

for ($i = 0; $result + $i <= 1000; $i++) {

    $result += $i;
    $aux = $i;
}

echo "<br> $result-$aux";


