<?php
include_once './Files/Files.php';

class Persona
{

    public $name;
    public $lastname;
    public $dni;
    public $id; 
   // public $jsonPersona;

    public function __construct($id, $dni, $name = '', $lastname = '')
    {
        $this->name = $name;
        $this->lastname = $lastname;
        $this->dni = $dni;
        $this->id = $id; 

        //JSON object create
      /*  $this->jsonPersona->id = $id;
        $this->jsonPersona->name = $name;
        $this->jsonPersona->lastname = $lastname;
        $this->jsonPersona->dni = $dni;*/
    }


    public function __get($name)
    {
        if(property_exists($this, $name))
        {
            return $this->$name;
        }
    }

    public function __set($name, $value)
    {
        if(property_exists($this, $name)){
            $this->$name = $value;
        }
    }

    

    public static function deletePerson($id){
        $arr = Files::getArrayJSON('./users.json');
        for ($i=0; $i < count($arr); $i++) { 
            
            if ($arr[$i]->id == $id) {
            
                $arr2 = array_splice($arr, $i);
                $arr3 = array_splice($arr2, 1);
                $arr = array_merge($arr, $arr3);
                Files::reemplazarJSON('./users.json',$arr);
               
                break;
            }
        }
    }

    public static function setIdPersona(){

        Persona::ordenamientoPorID();

        $array = Files::getArrayJSON('./users.json');
        $position = count($array) + 1;

        for ($i=0; $i < count($array); $i++) { 
            if ($array[$i]->id != $i + 1) {
                $position = $i + 1;
            break;
            }
        }
        return $position;

    }


    private static function ordenamientoPorID(){
        $array = Files::getArrayJSON('./users.json');
        $aux = array(); 

        for ($i=0; $i < count($array)-1; $i++) { 
            
            for ($a=$i+1; $a < count($array); $a++) { 
                
                if($array[$i]->id > $array[$a]->id){
                    
                    $aux = $array[$i];
                    $array[$i] = $array[$a];
                    $array[$a] = $aux;
                   
                }
            }
        }

        Files::reemplazarJSON('./users.json', $array);
    }

    public static function updatePerson($id, $name, $lastname, $dni)
    {
        $arr = Files::getArrayJSON('./users.json');
        for($i=0; $i < count($arr); $i++) { 
           
            if ($arr[$i]->id == $id) {
               $arr[$i]->name = $name;
               $arr[$i]->lastname = $lastname;
               $arr[$i]->dni = $dni;
                
            break;
            }
        }

        Files::reemplazarJSON('./users.json', $arr);

    }


    public function __toString()
    {   
        $js = array();

        $js['id'] = $this->id;
        $js['name'] = $this->name;
        $js['lastname'] = $this->lastname;
        $js['dni'] = $this->dni;

       // return json_encode($this->jsonPersona);
        return json_encode($js);
    }

}
