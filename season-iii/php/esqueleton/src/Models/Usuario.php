<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model {

    protected $table = 'usuarios';
    protected $primaryKey = 'mail';
    // public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    /* const CREATED_AT = 'createDate';
    const UPDATED_AT = 'updateDate';
    const LAST_UPDATE = 'lastUpdate'; */
}