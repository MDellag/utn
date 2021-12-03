<form method="GET">
  <input type="text" name="someName">
  //The Name Attribute will be put into the _GET inside of php 
  <input type="submit" value="Submit"> 
 </form>

<?php


$operador = '+';
$num1 = 12;
$num2 = 43;
$resultado;

switch ($operador) {
    case '+':
        $resultado = $num1 + $num2;
        break;
    
     case '-':
        $resultado = $num1 - $num2;
     break;
     case '/':
        $resultado = $num1 / $num2;   
     break;

     case '*':
        $resultado = $num1 * $num2;
     break;
}


echo "<br/>El Resultado es: $resultado";
?>