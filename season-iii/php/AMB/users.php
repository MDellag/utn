<?php

include_once './Files/Files.php';
require __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;

class user{

    public $_mail;
    public $_user;
    public $_pass;
    

    public function __construct($mail, $user, $pass)
    {
        $this->_mail = $mail;
        $this->_user = $user;
        $this->_pass = base64_encode($pass);
     
    }



    public function SaveUserOnFile(){

        $usuario = new stdClass();

        $usuario->mail = $this->_mail;
        $usuario->username = $this->_user;
        $usuario->password = $this->_pass;
        
        Files::guardarJSON('./usersRegistered.json', $usuario);
    }


    public static function AuthenticateUserLogIn($username, $password){

        $jsonUsers = Files::getArrayJSON('./usersRegistered.json');
        $bol = null;
        for ($i=0; $i < count($jsonUsers) ; $i++) { 

            $pass2 = base64_decode($jsonUsers[$i]->password);
            if($username == $jsonUsers[$i]->username && $password == $pass2)
            {
                $bol = true; 
            }
           
        }

        if($bol){
            return true;
        }
        else
            return false;
        
    }

    public static function getUser($user){
        $usersfile = Files::getArrayJSON('./usersRegistered.json');
        $pass = null;
        for ($i=0; $i < count($usersfile); $i++) { 
            
            if ($usersfile[$i]->username == $user) {
                $pass = base64_decode($usersfile[$i]->password);
            break;
            }
        }

        return $pass;
    }

    public static function tokenFile($user){

        $payload = array(
            "iat" => 1356999524,
            "nbf" => 1357000000,
            "email" => $user->username,
            "type" => $user->type
        );

        $jwt = JWT::encode($payload, $user->password);

        Files::guardarJSON('./tokens.json', $jwt);
    }

   /* public static function decodeToken($token){
        $jsonFile = Files::getArrayJSON('./tokens.json');
        $arr = new stdClass();
        for ($i=0; $i < count($jsonFile) ; $i++) { 
            
            if($jsonFile[0]== $token){
                $arr = JWT::decode($jsonFile[$i]);
                
            break;
            }
        } 
        
        return $arr;
    }*/

    public function __toString()
    {   
        $js = new stdClass();

        $js->mail = $this->_mail;
        $js->user = $this->_user;
        $js->password = $this->_pass;

       // return json_encode($this->jsonPersona);
        return json_encode($js);
    }

}