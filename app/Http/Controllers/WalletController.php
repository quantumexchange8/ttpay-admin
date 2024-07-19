<?php

namespace App\Http\Controllers;

use App\Models\MerchantWallet;
use App\Models\RateProfile;
use App\Models\Transaction;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WalletController extends Controller
{
    public function merchantWallet()
    {

        $merchant = auth()->user();

        $merchantWallet = MerchantWallet::where('merchant_id', $merchant->id)->first();
        $transaction = Transaction::where('merchant_id', $merchant->id)
                    ->where('transaction_type', 'deposit')
                    ->where('status', 'success')
                    ->count();

        $data = [
            'merchant_id' => $merchant->id,
            'merchant_wallet' => $merchantWallet->merchant_wallet,
            'gross_deposit' => $merchantWallet->gross_deposit,
            'gross_withdrawal' => $merchantWallet->gross_withdrawal,
            'net_deposit' => $merchantWallet->net_deposit,
            'net_withdrawal' => $merchantWallet->net_withdrawal,
            'total_deposit_fee' => $merchantWallet->deposit_fee,
            'total_withdrawal_fee' => $merchantWallet->withdrawal_fee,
            'total_deposit_number' => $transaction,
            'total_freezing_amount' => $merchantWallet->freezing_amount,
        ];

        return response()->json($data, 200);
    }

    public function merchantWithdrawal(Request $request)
    {
        $merchant = auth()->user();

        $merchantWallet = MerchantWallet::where('merchant_id', $merchant->id)->first();
        $wallet_balance = $merchantWallet->net_deposit; // balance wallet amount

        $withdrawalAmount = $request->withdraw_amount; // request amount
        $withdrawalAddress = $request->wallet_address; // request amount
        
        if ($withdrawalAmount >= 100) {

            if ($wallet_balance >= $withdrawalAmount) {
                $total_payout = $withdrawalAmount;

                $credentials = $request->only('password');

                if (!Hash::check($credentials['password'], $merchant->password)) {
                    return response()->json([
                        'message' => 'Invalid password',
                        'status' => 'failed',
                    ], 200);
                } else {
                    $transaction = Transaction::create([
                        'merchant_id' => $merchant->id,
                        'transaction_type' => 'withdrawal',
                        'to_wallet' => $withdrawalAddress,
                        'amount' => $total_payout,
                        'total_amount' => $total_payout,
                        'tt_txn' => RunningNumberService::getID('transaction'),
                        'payment_method' => 'manual',
                        'status' => 'pending',
                    ]);

                    return response()->json([
                        'message' => 'successfull submitted request',
                        'status' => 'pending',
                        'transaction_id' => $transaction->tt_txn,
                        'date_time' => $transaction->created_at,
                        'amount' => $transaction->amount,
                        'usdt_address' => $transaction->to_wallet,
                    ], 200);
                }
            } else {
                return response()->json([
                    'message' => 'Insufficient balance',
                ], 200);
            }

        } else {

            return response()->json([
                'message' => 'minimum withdrawwal amount $100 usdt',
                'status' => 'failed',
            ], 200);

        }


    }
}
