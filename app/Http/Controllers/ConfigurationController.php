<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RateProfile;
use Inertia\Inertia;
use App\Http\Requests\NewRateProfileRequest;
use App\Http\Requests\Trc20AddressRequest;
use App\Models\WalletAddress;

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

    public function EditRateProfile(NewRateProfileRequest $request)
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

    public function getTrc20Address()
    {
        $trc20Addresses = WalletAddress::get();

        return response()->json($trc20Addresses);
    }

    public function storeTrc20Address(Trc20AddressRequest $request)
    {
        $newTrc20Address = WalletAddress::create([
            'name' => $request->name,
            'token_address' => $request->token_address,
        ]);

        return redirect()->back()->with('toast', 'Trc-20 Address successfully created!');
    }

    public function editAddress(Trc20AddressRequest $request)
    {

        $trc20Addresses = WalletAddress::find($request->id);

        $trc20Addresses->update([
            'name' => $request->name,
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
}
