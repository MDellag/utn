<?php


class Auto
{

    private $_color;
    private $_precio;
    private $_marca;
    private $_modelo;
    private $_fecha;


    // constructor de la clase  (el argumento $precio = null simula sobrecarga)
    public function __construct($marca, $modelo, $color, $precio = null, $fecha = null)
    {
        $this->_modelo = $modelo;
        $this->_color = $color;
        $this->_marca = $marca;
        $this->_precio = $precio;
        $this->_fecha = $fecha;
    }



    public function MostrarDatos()
    {
        echo "<br/>" . $this->_marca . "<br/>" . $this->_color . "<br/>" . $this->_precio . "<br/>" . $this->_fecha;
    }


    //metodo magico para el get
    public function __get($name)
    {
        if (property_exists($this, $name)) {
            return $this->$name;
        }
    }

    public function __set($name, $value)
    {
        $this->$name = $value;
    }


    //forma convencional de hacer los get
    /* public function get_color()
    {
        return $this->_color;
    }

    public function get_precio()
    {
        return $this->_precio;
    }*/

    public function AgregarImpuestos($impuesto)
    {
        if (is_numeric($impuesto)) {
            $this->_precio += $impuesto;
            return true;
        }
        return false;
    }

    public static function MostrarAuto($auto)
    {
        if (is_object($auto)) {
            echo "La marca es: " . $auto->_marca . "<br/>";
            echo "El modelo es: ". $auto->_modelo . "<br/>";
            echo "El color es: " . $auto->_color . "<br/>";

            if (isset($auto->_precio))
                echo "El precio es: $" . $auto->_precio . "<br/>";

            if (isset($auto->_fecha))
                echo "El año es: " . date("Y", $auto->_fecha) . "<br/>";
        }
    }

    public function __toString()
    {
        return $this->_marca;
    }
}
