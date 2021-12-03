<?php

/* 
    'r' = Read Only. Start at beginning of the file
    'r+' = Read/Write. Start at beggining of the file

    'w' = Write Only. Pisa el archivo, si no existe crea uno nuevo. Pointer at beginning
    'w+' = Write/Read. same as 'w'

    'a' = Write only. Pointer at end of file, creates a new file if doesnt exists
    'a+' = Read/Write. Preserves File content by Writing to the end of file.

    'x' = Write only. Creates a new File. Returns False and error if file exists
    'x+' = Write/Read. same as 'x'

    'c' = Write only. Opens the file; or create a new one if doesnt exists. Pointer at beginning
    'c+' = Read/Write. Same as 'c'
*/


class Files
{
    public $archivo;

    public static function escribirArhivo($archivo, $datos, $mode = 'a')
    {
        $file = fopen($archivo, $mode); //recibe nombre del archivo a abrir y modo de apertura devuelve entero
        fwrite($file, $datos);
        fclose($file) . '\n';
    }


    public static function leerArchivo($archivo, $mode = 'r', $delimiter = '-')
    {
        $file = fopen($archivo, $mode);

        $array = array();

        while (!feof($file)) {

            $rta = fgets($file);
            $explode = explode($delimiter, $rta);
            //var_dump($explode);
            if (count($explode)  >= 1) {
                array_push($array, $explode);
            }
        }

        fclose($file);
        return $array;
    }


    public static function getArrayJSON($archivo)
    {
        $file = fopen($archivo, 'a+');
        if(filesize($archivo)!=0)
        {
            $arrayString = fread($file, filesize($archivo));
            $arrayJSON = json_decode($arrayString);
            fclose($file);
            return $arrayJSON;
        }else{
            fclose($file);
            return NULL;
        }
    }

    public static function guardarJSON($archivo, $objeto, $mode = 'w')
    {
        $arrayJson= Files::getArrayJSON($archivo);
        if (is_null($arrayJson))
        {
            $arrayJson = array();
        }
        array_push($arrayJson, $objeto);
        $file = fopen($archivo, $mode);
        fwrite($file, json_encode($arrayJson));
        fclose($file);
        
    }

    public static function reemplazarJSON($archivo,$objeto)
    {
        $file = fopen($archivo, 'w');
        $rta = fwrite($file, json_encode($objeto));
        fclose($file);
        return $rta;
    }
    
    public static function leerJSONtxt($archivo, $mode = 'r')
    {
        $file = fopen($archivo, $mode);

        $rta = fgets($file);


        fclose($file);
        return $rta;
    }
}
