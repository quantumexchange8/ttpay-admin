<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayoutConfig extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'merchant_id',
        'name',
        'test_paymentUrl',
        'live_paymentUrl',
        'appId',
        'returnUrl',
        'callBackUrl',
        'secret_key',
        'payment_method',
        'show_from_wallet',
        'show_to_wallet',
        'show_txid',
        'show_amount',
        'show_acc_no',
    ];
}
