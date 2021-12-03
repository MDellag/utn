<?php


$num1 = 111;
$num2 = 655;
$num3 = 658;



$min = min($num1, $num2, $num3);
$max = max($num1, $num2, $num3);

if ($num1 > $min && $num1 < $max) {
    echo "$num1 is on the Middle of $min and $max";
} elseif ($num2 > $min && $num2 < $max) {
    echo "$num2 is on the Middle of $min and $max";
} elseif ($num3 > $min && $num1 < $max) {
    echo "$num3 is on the Middle of $min and $max";
}
