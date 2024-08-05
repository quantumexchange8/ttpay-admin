<?php

namespace App\Http\Controllers;

use App\Exports\ClientDealHistoryExport;
use App\Exports\MerchantDealHistoryExport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

    public function getMasterMerchant(Request $request)
    {
        
        $transaction = Transaction::query()
                    ->when($request->amount_min != null, function ($query) use ($request) {
                        $amount_min = $request->input('amount_min');
                        if ($amount_min > 0) {
                            $query->where('total_amount', '>=', $amount_min);
                        }
                    })
                    ->when($request->amount_max != null, function ($query) use ($request) {
                        $amount_max = $request->input('amount_max');
                        $query->where('total_amount', '<=', $amount_max);
                    })
                    ->when($request->fee_min != null, function ($query) use ($request) {
                        $fee_min = $request->input('fee_min');
                        if ($fee_min > 0) {
                            $query->where('fee', '>=', $fee_min);
                        }
                    })
                    ->when($request->fee_max != null, function ($query) use ($request) {
                        $fee_max = $request->input('fee_max');
                        $query->where('fee', '<=', $fee_max);
                    })
                    ->when($request->success === "true" && $request->reject === "false", function ($query) {
                        $query->where('status', 'success');
                    })
                    ->when($request->reject === "true" && $request->success === "false", function ($query) {
                        $query->where('status', 'rejected');
                    })
                    ->when(($request->success === "false" && $request->reject === "false") || ($request->success == true && $request->reject == true), function ($query) {
                        $query->whereIn('status', ['success', 'rejected']);
                    })
                    ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                        $startDate = $request->input('startDate');
                        $endDate = $request->input('endDate');
                        $query->whereBetween('transaction_date', [$startDate, $endDate]);
                    })
                    ->whereIn('status', ['success', 'rejected'])
                    ->whereNull('client_id')
                    ->with(['merchant:id,name,role_id']);
                    
                    if ($request->exportCsv == "true") {
                        return Excel::download(new MerchantDealHistoryExport($transaction), Carbon::now() . '-Merchant-deal-history.xlsx');
                    }

                    $datas = $transaction->latest()->get();

                    $datas->each(function ($merchant) {
                        $merchant->merchant->profile_photo = $merchant->merchant->getFirstMediaUrl('profile_photo');
                    });


        return response()->json($datas);
    }

    public function getMerchantClient(Request $request)
    {
     
        $transaction = Transaction::query()
                    ->when($request->amount_min != null, function ($query) use ($request) {
                        $amount_min = $request->input('amount_min');
                        if ($amount_min > 0) {
                            $query->where('txn_amount', '>=', $amount_min);
                        }
                    })
                    ->when($request->amount_max != null, function ($query) use ($request) {
                        $amount_max = $request->input('amount_max');
                        $query->where('txn_amount', '<=', $amount_max);
                    })
                    ->when($request->fee_min != null, function ($query) use ($request) {
                        $fee_min = $request->input('fee_min');
                        if ($fee_min > 0) {
                            $query->where('fee', '>=', $fee_min);
                        }
                    })
                    ->when($request->fee_max != null, function ($query) use ($request) {
                        $fee_max = $request->input('fee_max');
                        $query->where('fee', '<=', $fee_max);
                    })
                    ->when($request->success === "true" && $request->reject === "false", function ($query) {
                        $query->where('status', 'success');
                    })
                    ->when($request->reject === "true" && $request->success === "false", function ($query) {
                        $query->where('status', 'pending');
                    })
                    ->when(($request->success === "false" && $request->reject === "false") || ($request->success == true && $request->reject == true), function ($query) {
                        $query->whereIn('status', ['success', 'pending']);
                    })
                    ->when($request->startDate && $request->endDate, function ($query) use ($request) {
                        $startDate = $request->input('startDate');
                        $endDate = $request->input('endDate');
                        $query->whereBetween('transaction_date', [$startDate, $endDate]);
                    })
                    ->with(['merchant:id,name,role_id'])
                    ->whereNotNull('client_id');


                    if ($request->exportCsv == "true") {
                        return Excel::download(new ClientDealHistoryExport($transaction), Carbon::now() . '-Merchant-deal-history.xlsx');
                    }

                    $datas = $transaction->latest()->get();

                    $datas->each(function ($merchant) {
                        $merchant->merchant->profile_photo = $merchant->merchant->getFirstMediaUrl('profile_photo');
                    });

        return response()->json($datas);
    }
}
