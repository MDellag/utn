<?php

namespace DB;
use \PDO;

class DAO{

    private $_connectionString;
    private $_dbName;
    private $_user;
    private $_password;
    private $_dao;

    public function __construct($dbname, $user = 'root', $password = '')
    {   
        $this->_dbName = $dbname;
        $this->_user = $user;
        $this->_password = $password;
        $this->_connectionString = 'mysql:host=localhost; dbname=' . $this->_dbName ;
    }


    private function connectDatabase(){
        try {
            $this->_dao = new PDO($this->_connectionString, $this->_user, $this->_password);
            return true;
        } catch (\Throwable $th) {
            echo 'Could not connect Database';
            return false;
        }
    }

    public function queryRunner($queryString, $method = 'GET'){
        
        if ($this->connectDatabase()) {
          
            switch($method){
                case 'GET': 
                    try {
                        $data = $this->_dao->query($queryString);
                        return $data->fetchAll(PDO::FETCH_OBJ);
                    } catch (\Throwable $th) {
                        echo 'error at Get';
                    } break;

                case 'POST':
                    try {
                        $this->_dao->query($queryString);
                    } catch (\Throwable $th) {
                       echo "error at Post";
                    } break;
            }
        }  

    }


}