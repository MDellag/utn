<?php

include_once './file.php';

class User{

    private $_email;
    private $_typeUser;
    private $_password;

    public function __construct($mail, $password, $typeUser)
    {
        $this->_email = $mail;
        $this->_password = base64_encode($password);
        $this->_typeUser = $typeUser;
    }


    public function SaveUserOnFile(){

        $usuario = new stdClass();

        $usuario->email = $this->_email;
        $usuario->typeUser = $this->_typeUser;
        $usuario->password = $this->_password;
        
        Files::guardarJSON('./usersRegistered.json', $usuario);
    }


    public static function ValidarUsuarioRegistrado($email){

        $array = Files::getArrayJSON('./usersRegistered.json');
        $bolean = false;
        for ($i=0; $i < count($array) ; $i++) { 
            
            if ($array[$i]->email == $email) {
                $bolean = true;
            break;
            }
        }
        return $bolean;
    }

    public static function returnUser($email){
        $array = Files::getArrayJSON('./usersRegistered.json');
        $user = null;
        for ($i=0; $i < count($array) ; $i++) { 
            
            if ($array[$i]->email == $email) {
                $user = $array[$i];
            break;
            }
        }
        return $user;
    }

    public function __toString()
    {   
        $js = new stdClass();

        $js->email = $this->_email;
        $js->typeUser = $this->_typeUser;
        $js->password = $this->_password;

        return json_encode($js);
    }


    public static function verificarUserRegistered($mail){
        $array = Files::getArrayJSON('./usersRegistered.json');
        $bool = false;
        for ($i=0; $i < count($array) ; $i++) { 
            
            if ($array[$i]->email == $mail) {
                $bool = true;
                 break;
            }
        }
        return $bool;
    }


    public static function ResponseWrongToken($dateNow, $message = "Error on Authentication")
    {
        $response = new stdClass();
        $response->date = $dateNow;
        $response->Message = $message;
        $response = json_encode($response);
        echo $response;
    }
}