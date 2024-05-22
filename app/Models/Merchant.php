<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchant extends Model
{
    use HasFactory, SoftDeletes;

    // const $deposit_type = [
    //     ( 0 === Manual)
    //     ( 1 === Auto)
    // ];

    protected $fillable = [
        'name',
        'manager_name',
        'email',
        'dial_code',
        'phone',
        'url',
        'deposit_type',
        'api_key',
        'security_pin',
        'rate_id',
        'refresh_time',
        'role_id',
        'status',
    ];
}
