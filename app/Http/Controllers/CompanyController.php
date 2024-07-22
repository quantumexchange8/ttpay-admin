<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\MerchantWallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function companyEarning()
    {

        $totalMerchant = Merchant::count();
        $totalDeposit = MerchantWallet::sum('total_deposit');
        $totalWithdrawal = MerchantWallet::sum('total_withdrawal');
        $totalFee = MerchantWallet::sum('total_fee');

        return Inertia::render('Others/CompanyEarning', [
            'totalMerchant' => $totalMerchant,
            'totalDeposit' => $totalDeposit,
            'totalWithdrawal' => $totalWithdrawal,
            'totalFee' => $totalFee,
        ]);
    }

    public function getCompanyEarning()
    {

        $merchant = Merchant::with(['merchantWallet'])->get();

        return response()->json($merchant);
    }
}
