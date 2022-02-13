<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class uploadAccess extends Model
{
    use HasFactory;
    protected $fillable = [
        'uploaderId', 'downloaderId', 'uploadId'  
    ];
}
