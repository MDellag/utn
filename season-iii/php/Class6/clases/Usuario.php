<?php

namespace Clases;

class Usuario
{

    private $_email;
    private $_typeUser;
    private $_password;

    public function __construct($mail, $password, $typeUser)
    {
        $this->_email = $mail;
        $this->_password = base64_encode($password);
        $this->_typeUser = $typeUser;
    }
}
