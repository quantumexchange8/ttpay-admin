<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\MerchantWallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

    public function index()
    {

        $pendingWithdrawal = Transaction::where('transaction_type', 'withdrawal')
                        ->where('status', 'processing')
                        ->sum('total_amount');

        $totalMerchant = Merchant::count();

        $total_freezing = Transaction::where('transaction_type', 'withdrawal')
                        ->where('status', 'freeze')
                        ->count();

        $total_freezing_amount = Transaction::where('transaction_type', 'withdrawal')
                        ->where('status', 'freeze')
                        ->sum('total_amount');

        $topMerchants = MerchantWallet::with(['merchant:id,name,role_id'])
                        ->orderBy('gross_deposit', 'desc')
                        ->take(10)
                        ->get()
                        ->map(function ($wallet) {
                            $merchant = $wallet->merchant;
                            $merchant->first_media_url = $merchant->getFirstMediaUrl('profile_photo'); // Adjust 'default' to your media collection name
                            return $wallet;
                        });

        return Inertia::render('Dashboard', [
            'pendingWithdrawal' => $pendingWithdrawal,
            'totalMerchant' => $totalMerchant,
            'total_freezing' => $total_freezing,
            'total_freezing_amount' => $total_freezing_amount,
            'topMerchants' => $topMerchants,
        ]);
    }

    public function getPendingCount()
    {
        $countPending = Transaction::whereNull('client_id')
                ->where('transaction_type', 'withdrawal')
                ->with(['merchant:id,role_id,name'])
                ->where('status', 'processing')
                ->count();

        return response()->json($countPending);
    }

    public function getMonthlyMerchantDeposit(Request $request)
    {

        $transactions = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'deposit')
            ->whereNull('client_id')
            ->get();

        $gross_deposit = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'deposit')
            ->whereNull('client_id')
            ->sum('amount');

        $fee_charges = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'deposit')
            ->whereNull('client_id')
            ->sum('fee');

        $net_balance = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'deposit')
            ->whereNull('client_id')
            ->sum('total_amount');

        return response()->json([
            'transactions' => $transactions,
            'gross_deposit' => $gross_deposit,
            'fee_charges' => $fee_charges,
            'net_balance' => $net_balance,
        ]);
    }

    public function getMonthlyMerchantWithdrawal(Request $request)
    {

        $transactions = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'withdrawal')
            ->whereNull('client_id')
            ->get();

        $gross_deposit = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'withdrawal')
            ->whereNull('client_id')
            ->sum('amount');

        $fee_charges = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'withdrawal')
            ->whereNull('client_id')
            ->sum('fee');

        $net_balance = Transaction::query()
            ->when($request->filled('month'), function ($query) use ($request) {
                $month = $request->input('month');
                $year = $request->input('year');
                $query->whereYear('created_at', $year)
                    ->whereMonth('created_at', $month);
            })
            ->where('status', 'success')
            ->where('transaction_type', 'withdrawal')
            ->whereNull('client_id')
            ->sum('total_amount');

        return response()->json([
            'transactions' => $transactions,
            'gross_deposit' => $gross_deposit,
            'fee_charges' => $fee_charges,
            'net_balance' => $net_balance,
        ]);
    }

    public function getMedia(Request $request)
    {
        $user = Auth::user();

        $media = $user->getFirstMediaUrl('profile_photo');

        return response()->json([
            'mediaUrl' => $media,
        ]);
    }
}
