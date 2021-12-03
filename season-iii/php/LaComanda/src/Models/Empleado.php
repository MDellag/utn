<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Empleado extends Model
{
     protected $table = 'empleados';
     protected $primaryKey = 'dni';
    // public $incrementing = false;
    // protected $keyType = 'string';
    // public $timestamps = false;

    const CREATED_AT = 'creationDate';
    const UPDATED_AT = null;
    const LAST_UPDATE = null;
   
}


