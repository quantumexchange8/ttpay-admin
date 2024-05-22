<?php

namespace App\Http\Controllers;

use App\Models\RateProfile;
use App\Models\WalletAddress;
use App\Models\Country;
use App\Models\Merchant;
use App\Models\MerchantEmail;
use App\Models\MerchantEmailContent;
use App\Models\MerchantWallet;
use App\Models\MerchantWalletAdrress;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function step1Validate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:merchants,email',
            'name' => 'required|string|unique:merchants,name',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:8|unique:merchants,phone',
        ]);
    
        $errors = [];

        if ($validator->fails()) {
            if ($validator->errors()->has('email')) {
                $errors['email'] = 'Email already exists';
            }
            if ($validator->errors()->has('name')) {
                $errors['name'] = 'Merchant name already exists';
            }
            if ($validator->errors()->has('phone')) {
                $errors['phone'] = 'Phone number already exists';
            }
            return response()->json(['errors' => $errors], 200);
        }
    
        return response()->json(['errors' => null], 200);
    }

    public function step2Validate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_receiving' => 'required|string|email|unique:merchant_emails,email',
            'url' => 'required|string|unique:merchants,url',
        ]);
    
        $errors = [];

        if ($validator->fails()) {
            if ($validator->errors()->has('email_receiving')) {
                $errors['email_receiving'] = 'Email already exists';
            }
            if ($validator->errors()->has('url')) {
                $errors['url'] = 'URL already exists';
            }
            return response()->json(['errors' => $errors], 200);
        }
    
        return response()->json(['errors' => null], 200);
    }

    public function storeMerchant(Request $request)
    {

        $rateProfiles = RateProfile::find($request->rate_profile);
        
        $merchant = Merchant::create([
            'name' => $request->name,
            'manager_name' => $request->manager_name,
            'email' => $request->email,
            'dial_code' => $request->dial_code,
            'phone' => $request->dial_code . $request->phone,
            'url' => $request->url,
            'rate_id' => $rateProfiles->id,
            'refresh_time' => $request->auto_refresh,
            'deposit_type' => $request->approval_mode,
            'role_id' => RunningNumberService::getID('merchant'),
            'status' => 'Active',
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

        $merchantWallet = MerchantWallet::create([
            'merchant_id' => $merchant->id,
            'merchant_wallet' => RunningNumberService::getID('wallet_num')
        ]);



        return redirect()->back()->with('success', 'successfull created merchant');
    }
}
