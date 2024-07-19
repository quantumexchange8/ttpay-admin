<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\RateProfile;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    //
    public function merchant()
    {

        $merchant = auth()->user();

        $data = [
            'merchant' => $merchant
        ];

        return response()->json($data, 200);
    }

    public function merchantRate()
    {

        $merchant = auth()->user();

        $rate_profile = RateProfile::find($merchant->rate_id);

        $data = [
            'rate_profile' => $rate_profile
        ];

        return response()->json($data, 200);
    }
}
