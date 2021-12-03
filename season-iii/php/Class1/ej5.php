<?php



/*$numero = new NumberFormatter("es", NumberFormatter::SPELLOUT);

echo $numero->format(152);*/

$num = rand(1,50);

$format = new \NumberFormatter('es', \NumberFormatter::SPELLOUT);

echo ("El numero es: $num y se escribe: ". $format->format($num));

echo "<br/>";

$num=rand(20,60);
$formateado=new NumberFormatter('es', NumberFormatter::SPELLOUT);
echo ("El numero es : $num y se escribe:". $formateado->format($num));