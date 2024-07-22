<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerchantWallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'merchant_wallet',
        'net_deposit',
        'deposit_fee',
        'withdrawal_fee',
        'freezing_amount',
        'total_deposit',
        'total_withdrawal',
        'total_fee',
    ];
}
