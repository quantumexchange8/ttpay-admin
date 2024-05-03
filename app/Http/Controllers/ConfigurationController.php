<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RateProfile;
use Inertia\Inertia;
use App\Http\Requests\NewRateProfileRequest;

class ConfigurationController extends Controller
{
    //
    public function rate_profile()
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
}
