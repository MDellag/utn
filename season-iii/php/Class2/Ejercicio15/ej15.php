<?php

class FigurasGeo{

    private $_color;
    private $_perimetro;
    private $_superficie;

    public function __construct($color, $perimetro, $superficie)
    {
        $this->_color = $color;
        $this->_perimetro = $perimetro;
        $this->_superficie = $superficie;
    }

    public function Get_Color()
    {
        return $this->_color;
    }

    public function Set_Color($value)
    {
        $this->_color = $value;
    }

    public function __toString(){
        print("Color: %s \n". $this->_color);
        print("Per: %i \n" .$this->_perimetro);
        print("Sup: %i \n" .$this->_superficie);
    }

}