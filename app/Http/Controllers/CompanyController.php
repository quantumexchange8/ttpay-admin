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

    public function getCompanyEarning(Request $request)
    {

        $merchant = Merchant::query()
                ->with(['merchantWallet']);
                // ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                //     $startDate = $request->input('startDate');
                //     $endDate = $request->input('endDate');
                //     $query->whereBetween('transaction_date', [$startDate, $endDate]);
                // });

        $datas = $merchant->get();

        return response()->json($datas);
    }
}
