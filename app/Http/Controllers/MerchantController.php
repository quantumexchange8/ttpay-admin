<?php

namespace App\Http\Controllers;

use App\Http\Requests\MerchantRequest;
use App\Models\RateProfile;
use App\Models\WalletAddress;
use App\Models\Country;
use App\Models\Merchant;
use App\Models\MerchantEmail;
use App\Models\MerchantEmailContent;
use App\Models\MerchantWallet;
use App\Models\MerchantWalletAdrress;
use App\Models\RefreshOption;
use App\Models\User;
use App\Notifications\MerchantNotification;
use App\Services\RunningNumberService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
        
        $refreshOptions = RefreshOption::get();

        // dd($trc20Addressess);

        return Inertia::render('Merchant/CreateMerchant/CreateMerchant', [
            'rateProfiles' => $rateProfiles,
            'trc20Addressess' => $trc20Addressess,
            'phoneCodes' => $formattedCountries,
            'refreshOptions' => $refreshOptions,
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

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $ramdomPass = substr(str_shuffle($characters), 0, 8);
        
        $merchant = Merchant::create([
            'name' => $request->name,
            'manager_name' => $request->manager_name,
            'email' => $request->email,
            'password' => Hash::make($ramdomPass),
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
            'status' => 1,
        ]);

        if ($request->emailOptional != null) {
            foreach ($request->emailOptional as $emailOpt) {
                $merchantEmailOpt = MerchantEmail::create([
                    'email' => $emailOpt,
                    'merchant_id' => $merchant->id,
                    'status' => 0,
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


        Notification::route('mail', $request->email)
        ->notify(new MerchantNotification($request->name, $ramdomPass, $merchant->role_id));


        return redirect()->back()->with('success', 'successfull created merchant');
    }

    public function merchantListing()
    {

        $formattedCountries = Country::whereIn('id', [132, 102, 101, 45, 240, 199])->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
                'dial_code' => '+' . $country->phone_code,
            ];
        });

        $rateProfiles = RateProfile::where('merchant_id', null)->get();

        $walletAddress = WalletAddress::get();

        return Inertia::render('Merchant/MerchantListing/MerchantListing', [
            'phoneCodes' => $formattedCountries,
            'rateProfiles' => $rateProfiles,
            'walletAddress' => $walletAddress,
        ]);
    }

    public function getMerchantListing()
    {

        $merchantListing = Merchant::where('bin', null)->with(['merchantWallet', 'merchantWalletAddress', 'merchantWalletAddress.walletAddress', 'merchantEmailContent', 'merchantEmail' ])->get();

        return response()->json($merchantListing);
    }

    public function updateStatus(Request $request)
    {

        $merchant = Merchant::find($request->id);

        $merchant->status = $request->status;

        $merchant->save();

        return redirect()->back()->with('success');
    }

    public function deleteWalletAddress(Request $request)
    {
        // dd($request->all());
        // $merchantWalletAddress = MerchantWalletAdrress::find($request->id);
        // $merchantWalletAddress->delete();

        return redirect()->back()->with('success');
    }

    public function deleteMerchant(Request $request)
    {

        $merchant = Merchant::find($request->id);

        $now = Carbon::now();

        $merchant->update([
            'bin' => $now,
            'status' => 'Inactive',
            'handle_by' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success');
    }

    public function merchantBin()
    {

        return Inertia::render('Merchant/MerchantBin/MerchantBin');
    }

    public function getMerchantBin()
    {

        $merchantBin = Merchant::whereNotNull('bin')->with(['user'])->get();
        
        return response()->json($merchantBin);
    }

    public function recoverMerchant(Request $request)
    {

        // dd($request->all());

        $merchant = Merchant::find($request->id);

        $merchant->update([
            'bin' => null,
            'handle_by' => Auth::user()->id,
        ]);

        return redirect()->back()->with('success');
    }

    public function removeMerchant(Request $request)
    {

        $merchant = Merchant::find($request->id);

        $merchant->delete();

        return redirect()->back()->with('success');
    }

    public function updateWalletAddress(Request $request)
    {

        // dd($request->all());
        $merchant = Merchant::find($request->id);
        

        return redirect()->back()->with('success');
    }

    public function updateMerchant(MerchantRequest $request)
    {

        
        $merchant = Merchant::find($request->id);
        $merchant_email = MerchantEmail::where('merchant_id', $request->id)->get();
        
        foreach ($merchant_email as $merchantMail) {
            dd($merchantMail);
        }

        if ($merchant->name != $request->name) {

           
            $merchant->update([
                'name' => $request->name
            ]);
        }

        $merchant->manager_name = $request->manager_name;
        $merchant->email = $request->manager_name;
        $merchant->dial_code = $request->dial_code;
        $merchant->phone = $request->phone;
        $merchant->rate_profile = $request->rate_profile;
        $merchant->url = $request->url;
        $merchant->refresh_time = $request->auto_refresh;
        $merchant->deposit_type = $request->approval_mode;
        $merchant->save();


        return redirect()->back()->with('success');
    }
}
