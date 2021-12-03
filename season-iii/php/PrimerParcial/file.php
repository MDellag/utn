<?php

class Files
{
    


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