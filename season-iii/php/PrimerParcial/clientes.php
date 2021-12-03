<?php
    include_once './file.php';

class clientes{

    private $_patente;
    private $_fecha;
    private $_tipo;
    private $_email;

    public function __construct($patente, $fecha, $tipoEstadia, $email)
    {
        $this->_patente = $patente;
        $this->_fecha = $fecha;
        $this->_tipo = $tipoEstadia;
        $this->_email = $email;
    }



    public function SaveOnFile(){

        $cliente = new stdClass();

        $cliente->patente = $this->_patente;
        $cliente->fecha = $this->_fecha;
        $cliente->tipo = $this->_tipo;
        $cliente->email = $this->_email;
        
        Files::guardarJSON('./autos.json', $cliente);
    }

    public static function getMountByToken($email){
        $listaCl = Files::getArrayJSON('./autos.json');
        $client = null;
        for ($i=0; $i <  count($listaCl); $i++) { 
            
            if($listaCl[$i]->email == $email){
                $client = $listaCl[$i]->tipo;
            break;
            }
        }

        return $client;
    }


    
    public static function showClientByPatent($patente){
        $listaCl = Files::getArrayJSON('./autos.json');
      
        for ($i=0; $i <  count($listaCl); $i++) { 
            
            if($listaCl[$i]->patente == $patente){
                echo json_encode($listaCl[$i]);
            break;
            }
        } 
    }

    public function __toString()
    {   
        $js = new stdClass();

        $js->patente = $this->_patente;
        $js->fecha_egreso = $this->_fecha;
        $js->monto = $this->_tipo;
        $js->mail = $this->_email;

        return json_encode($js);
    }
    
}
