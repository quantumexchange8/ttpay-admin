<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DealHistoryController extends Controller
{
    public function master_merchants()
    {
        $transactions = Transaction::where('client_id',null) -> get();
        return Inertia::render('General/DealHistory/Master/MasterMerchants', [
            'transaction' => $transactions,
        ]);
    }

    public function getMasterDealHistory()
    {
        $clients = Transaction::where('client_id', '!=', null)->where('transaction_type', '=', 'deposit')->with(['merchant'])->get();
        
        return response()->json($clients);
    
    }

    public function merchants_clients(Transaction $request)
    {
        $transactions = Transaction::where('client_id',null) -> get();
        return Inertia::render('General/DealHistory/Client/MerchantsClients', [
            'transaction' => $transactions,
        ]);
    }

    public function getClientDeposit()
    {
        $clients = Transaction::where('client_id', '!=', null)->where('transaction_type', '=', 'deposit')->with(['merchant'])->get();
        
        return response()->json($clients);
    
    }

    public function getClientWithdrawal()
    {
        $clients = Transaction::where('client_id', '!=', null)->where('transaction_type', '=', 'withdrawal')->with(['merchant'])->get();
        
        return response()->json($clients);
    }
}
