<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DealHistoryController extends Controller
{
    public function client()
    {

        return Inertia::render('General/DealHistory/Client/Client');
    }

    public function merchant()
    {

        return Inertia::render('General/DealHistory/Merchant/Merchant');
    }

    public function getMasterMerchant()
    {

        $transaction = Transaction::whereNull('client_id')
                    ->whereIn('status', ['success', 'rejected'])
                    ->with(['merchant:id,name,role_id'])
                    ->get();

        return response()->json($transaction);
    }

    public function getMerchantClient()
    {
     
        $transaction = Transaction::where('transaction_type', 'deposit')
                    ->with(['merchant:id,name,role_id'])
                    ->get();

        return response()->json($transaction);
    }
}
