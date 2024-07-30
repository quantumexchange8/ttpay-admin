<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\RateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MerchantController extends Controller
{
    //
    public function merchant()
    {

        $user = auth()->user();
        $merchant = Merchant::find($user->id);

        $data = [
            'merchant' => $merchant,
            'profile_photo' => $merchant->getFirstMediaUrl('profile_photo'),
        ];

        return response()->json($data, 200);
    }

    public function profile(Request $request)
    {

        $user = auth()->user();

        $merchant = Merchant::find($user->id);

        if ($request->hasFile('profile_photo')) {
            $merchant->clearMediaCollection('profile_photo');
            $merchant->addMedia($request->profile_photo)->toMediaCollection('profile_photo');

            return response()->json([
                'message' => 'successfull uploaded',
            ], 200);
        } else {
            return response()->json([
                'message' => 'no image uploaded',
            ], 200);
        }
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
