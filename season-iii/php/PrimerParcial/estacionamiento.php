<?php
    include_once './file.php';

class Estacionamiento{

    private $_precioHora;
    private $_precioEstadia;
    private $_precioMensual;

    public function __construct($hora = 1, $estadia = 1, $mensual = 1)
    {
        $this->_precioEstadia = $estadia;
        $this->_precioHora = $hora;
        $this->_precioMensual = $mensual;
    }



    public function SaveOnFile(){

        $tarifa = new stdClass();

        $tarifa->hora = $this->_precioHora;
        $tarifa->estadia = $this->_precioEstadia;
        $tarifa->mensual = $this->_precioMensual;
        
        Files::guardarJSON('./listaPrecios.json', $tarifa);
    }


    public static function ordenarYMostrar(){
        $array = Files::getArrayJSON('./autos.json');
        $aux = array(); 

        for ($i=0; $i < count($array)-1; $i++) { 
            
            for ($a=$i+1; $a < count($array); $a++) { 
                
                if($array[$i]->tipo > $array[$a]->tipo){
                    
                    $aux = $array[$i];
                    $array[$i] = $array[$a];
                    $array[$a] = $aux;
                   
                }
            }
        }

        echo json_encode($array);
    }

    public static function totalRecaudado($fecha1, $fecha2){

        $lista = FIles::getArrayJSON('./autos.json');
        $valor = 0;

        for ($i=0; $i < count($lista); $i++) { 
            
            if($lista[$i]->fecha >= $fecha1 && $lista[$i]->fecha <= $fecha2)
            {
                $valor += $lista[$i]->tipo;
            }
        }

        echo json_encode($valor);
    }
}
