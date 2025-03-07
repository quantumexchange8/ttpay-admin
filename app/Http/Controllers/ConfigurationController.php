<?php

namespace App\Http\Controllers;

use App\Exports\Trc20AddressExport;
use App\Http\Requests\EditNewRequest;
use App\Http\Requests\EditPayoutRequest;
use App\Http\Requests\EditTrc20Request;
use Illuminate\Http\Request;
use App\Models\RateProfile;
use Inertia\Inertia;
use App\Http\Requests\NewRateProfileRequest;
use App\Http\Requests\PayoutRequest;
use App\Http\Requests\Trc20AddressRequest;
use App\Models\Merchant;
use App\Models\MerchantWallet;
use App\Models\PayoutConfig;
use App\Models\Transaction;
use App\Models\WalletAddress;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class ConfigurationController extends Controller
{
    //
    public function rateProfile()
    {
        return Inertia::render('Configuration/RateProfile/RateProfile');
    }

    public function getRateProfile()
    {
        $rate = RateProfile::get();

        return response()->json($rate);
    }

    public function storeRateProfile(NewRateProfileRequest $request)
    {
        // dd($request->all());
        $newRate = RateProfile::create([
            'name' => $request->name,
            'deposit_fee' => $request->deposit_fee,
            'withdrawal_fee' => $request->withdrawal_fee,
        ]);

        return redirect()->back()->with('toast', 'Rate profile created successfully!');
    }

    public function EditRateProfile(EditNewRequest $request)
    {

        $rateprofile = RateProfile::find($request->id);

        $rateprofile->update([
            'name' => $request->name,
            'deposit_fee' => $request->deposit_fee,
            'withdrawal_fee' => $request->withdrawal_fee,
        ]);

        return redirect()->back()->with('toast', 'Rate profile updated successfully!');
    }

    public function DeleteRateProfile(Request $request)
    {

        $rateprofile = RateProfile::find($request->id);

        if($rateprofile->merchant_id == null) {
            // dd($request->all());
            $rateprofile->delete();

            return redirect()->back()->with('success', 'Rate profile updated successfully!');
        } else {

            return redirect()->back()->with('error', 'Rate cannot be delete!');
        }

    }

    public function trc20address()
    {
        return Inertia::render('Configuration/Trc20/Trc20');
    }

    public function getTrc20Address(Request $request)
    {
        $trc20Addresses = WalletAddress::query();

        if ($request->exportCsv == "true") {
            return Excel::download(new Trc20AddressExport($trc20Addresses), Carbon::now() . '-Trc20-Address.xlsx');
        }

        $datas = $trc20Addresses->where('wallet_type', 'trc-20')->latest()->get();

        return response()->json($datas);
    }

    public function getBep20Address(Request $request)
    {
        $bep20Addresses = WalletAddress::query();

        if ($request->exportCsv == "true") {
            return Excel::download(new Trc20AddressExport($bep20Addresses), Carbon::now() . '-Bep20-Address.xlsx');
        }

        $datas = $bep20Addresses->where('wallet_type', 'bep-20')->latest()->get();

        return response()->json($datas);
    }

    public function storeTrc20Address(Trc20AddressRequest $request)
    {
        $newTrc20Address = WalletAddress::create([
            'name' => $request->name,
            'wallet_type' => $request->wallet_type,
            'token_address' => $request->token_address,
        ]);

        return redirect()->back()->with('toast', 'Trc-20 Address successfully created!');
    }

    public function editAddress(EditTrc20Request $request)
    {

        $trc20Addresses = WalletAddress::find($request->id);

        $trc20Addresses->update([
            'name' => $request->name,
            'wallet_type' => $request->wallet_type,
            'token_address' => $request->token_address,
        ]);

        return redirect()->back()->with('toast', 'Trc20 address updated successfully!');
    }

    public function DeleteAddress(Request $request)
    {

        $trc20Address = WalletAddress::find($request->id);

        $trc20Address->delete();

        return redirect()->back()->with('success', 'Rate profile updated successfully!');
    }

    public function payoutConfig()
    {

        $merchants = Merchant::where('status', 'Active')->whereNull('bin')->get();

        return Inertia::render('Configuration/Payout/PayoutConfiguration', [
            'merchants' => $merchants,
        ]);
    }

    public function storePayout(PayoutRequest $request)
    {

        $secretKey = Str::random(50);

        $payout = PayoutConfig::create([
            'name' => $request->name,
            'merchant_id' => $request->merchant_id,
            'live_paymentUrl' => $request->live_paymentUrl,
            'appId' => $request->appId,
            'returnUrl' => $request->returnUrl,
            'callBackUrl' => $request->callbackUrl,
            'secret_key' => $secretKey,
            'payment_method' => $request->wallet_type,
            'diff_amount' => $request->diff_amount,
            'api_key' => $request->api_key,
        ]);

        return redirect()->back()->with('toast', 'Payout successfully created!');
    }

    public function getPayoutConfig()
    {
        $payout = PayoutConfig::get();

        return response()->json($payout);
    }

    public function edit_payout(EditPayoutRequest $request)
    {

        $payout = PayoutConfig::find($request->id);
        
        $payout->update([
            'name' => $request->name,
            'live_paymentUrl' => $request->live_paymentUrl,
            'appId' => $request->appId,
            'payment_method' => $request->wallet_type,
            'returnUrl' => $request->returnUrl,
            'callBackUrl' => $request->callBackUrl,
            'diff_amount' => $request->diff_amount,
            'api_key' => $request->api_key,
        ]);

        return redirect()->back()->with('toast', 'Payout successfully updated!');
    }

    public function delete_payout(Request $request)
    {

        $payout = PayoutConfig::find($request->id);

        $payout->delete();

        return redirect()->back()->with('toast', 'Payout successfully deleted!');
    }

    public function freezeListing()
    {

        $total_freezing = Transaction::where('status', 'freeze')->count();
        $total_freezing_amount = Transaction::where('status', 'freeze')->sum('total_amount');

        return Inertia::render('Configuration/Freeze/FreezeListing', [
            'total_freezing' => $total_freezing,
            'total_freezing_amount' => $total_freezing_amount,
        ]);
    }

    public function getFreezeTransaction()
    {

        $freeze = Transaction::where('status', 'freeze')->with(['merchant:id,name,role_id'])->get();

        $freeze->each(function ($merchant) {
            $merchant->merchant->profile_photo = $merchant->merchant->getFirstMediaUrl('profile_photo');
        });

        return response()->json($freeze);
    }

    public function unfreezeTransaction(Request $request)
    {
        
        $freeze = Transaction::find($request->id);
        $merchant = MerchantWallet::where('merchant_id', $request->merchant_id)->first();

        $freeze->update([
            'status' => 'processing',
            'transaction_date' => now(),
            'handle_by' => Auth::user()->id,
        ]);

        $merchant->update([
            'freezing_amount' => $merchant->freezing_amount -= $freeze->total_amount
        ]);

        return redirect()->back()->with('toast', 'successful unfroze!');
    }
}
