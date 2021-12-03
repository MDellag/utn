<?php



$array = array();


for ($i = 1; count($array) < 10; $i++) {
  
    if (($i % 2) == 1) {
        $array[count($array)] = $i;
    }   
}

//print($array[0] . "\n");
print_r($array);

//print(count($array));


for ($i=0; $i < count($array); $i++) { 
    echo "<br/>". $array[$i] . " - <br/>";
}