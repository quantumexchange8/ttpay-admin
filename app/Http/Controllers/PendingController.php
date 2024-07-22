<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApproveTransactionRequest;
use App\Models\MerchantWallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PendingController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('General/Pending/Pending');
    }

    public function getPendingTransaction()
    {

        $pendingTransaction = Transaction::whereNull('client_id')
                            ->where('transaction_type', 'withdrawal')
                            ->with(['merchant:id,role_id,name'])
                            ->where('status', 'pending')
                            ->latest()
                            ->get();

        return response()->json($pendingTransaction);
    }

    public function approvePendingTransaction(ApproveTransactionRequest $request)
    {

        $transaction = Transaction::find($request->id);

        $amount = $transaction->total_amount;

        $transaction->update([
            'from_wallet' => $request->usdt_address,
            'txID' => $request->txID,
            'description' => $request->description ?? null,
            'transaction_date' => now(),
            'status' => 'success',
            'handle_by' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success', 'successfull approved');
    }

    public function rejectPendingTransaction(Request $request)
    {

        $transaction = Transaction::find($request->id);
        $merchant = MerchantWallet::where('merchant_id', $request->merchant_id)->first();

        $transaction->update([
            'status' => 'rejected',
            'description' => $request->description ?? null,
            'handle_by' => Auth::user()->id,
            'transaction_date' => now(),
        ]);

        $merchant->update([
            'net_deposit' => $merchant->net_deposit + $transaction->total_amount
        ]);

        return redirect()->back()->with('success', 'successfull approved');
    }

    public function freezePendingTransaction(Request $request)
    {

        $transaction = Transaction::find($request->id);
        $merchant = MerchantWallet::where('merchant_id', $request->merchant_id)->first();

        $transaction->update([
            'status' => 'freeze',
            'description' => $request->description ?? null,
            'handle_by' => Auth::user()->id,
            'transaction_date' => now(),
        ]);

        $merchant->update([
            'freezing_amount' => $merchant->freezing_amount += $transaction->total_amount
        ]);

        return redirect()->back()->with('success', 'successfull approved');
    }
}
