<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model {

    protected $table = 'materias';
    // protected $primaryKey = 'nombre';
    
    protected $keyType = 'string';
    public $timestamps = false;

}