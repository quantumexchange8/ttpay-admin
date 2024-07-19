<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    //

    public function transaction() 
    {
        $merchant = auth()->user();

        $transaction = Transaction::where('merchant_id', $merchant->id)->whereNotNull('client_id')->get();

        $data = [
            'status' => 200,
            'transaction' => $transaction
        ];

        return response()->json($data, 200);
    }

    public function onesignal(Request $request)
    {

        $datas = $request->all();

        $data = [
            'datas' => $datas,
        ];

        return response()->json($datas, 200);
    }
}
