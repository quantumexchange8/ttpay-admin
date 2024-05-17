<?php

namespace App\Http\Controllers;

use App\Models\RateProfile;
use App\Models\WalletAddress;
use App\Models\Country;
use App\Models\Merchant;
use App\Models\MerchantEmail;
use App\Models\MerchantEmailContent;
use App\Models\MerchantWalletAdrress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchantController extends Controller
{
    //
    public function createMerchant()
    {

        $formattedCountries = Country::whereIn('id', [132, 102, 101, 45, 240, 199])->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
                'dial_code' => '+' . $country->phone_code,
            ];
        });
        $phoneCodes = Country::pluck('phone_code', 'name');

        $rateProfiles = RateProfile::where('merchant_id', null)->get();

        $trc20Addressess = WalletAddress::get();

        // dd($trc20Addressess);

        return Inertia::render('Merchant/CreateMerchant/CreateMerchant', [
            'rateProfiles' => $rateProfiles,
            'trc20Addressess' => $trc20Addressess,
            'phoneCodes' => $formattedCountries,
        ]);
    }

    public function storeMerchant(Request $request)
    {

        dd($request->all());


        $rateProfiles = RateProfile::find($request->rate_profile);
        
        $merchant = Merchant::create([
            'name' => $request->merchant_name,
            'manager_name' => $request->manager_name,
            'email' => $request->merchant_email,
            'dial_code' => $request->dial_code,
            'phone' => $request->dial_code . $request->phone_number,
            'url' => $request->url,
            'rate_id' => $rateProfiles->id,
            'refresh_time' => $request->auto_refresh,
            'deposit_type' => $request->approval_mode,
        ]);

        // for wallet address
        foreach ($request->wallet_address as $addressId) {
            $merchantWalletAddress = MerchantWalletAdrress::create([
                'merchant_id' => $merchant->id,
                'wallet_address_id' => $addressId,
            ]);
        }

        $merchantEmail = MerchantEmail::create([
            'email' => $request->email_receiving,
            'merchant_id' => $merchant->id,
        ]);

        if ($request->emailOptional != null) {
            foreach ($request->emailOptional as $emailOpt) {
                $merchantEmailOpt = MerchantEmail::create([
                    'email' => $emailOpt,
                    'merchant_id' => $merchant->id,
                ]);
            }
        }



        $emailContent = MerchantEmailContent::create([
            'merchant_id' => $merchant->id,
            'client_name' => $request->client_name,
            'client_email' => $request->client_email,
            'client_id' => $request->client_id,
            'deposit_amount' => $request->deposit_amount,
            'date_time' => $request->data_time,
            'client_usdt' => $request->client_usdt_address,
            'usdt_receive' => $request->usdt_address_receiving,
            'txid' => $request->show_txid,
            'photo' => $request->photo_uploaded,
        ]);



        return redirect()->back();
    }
}
