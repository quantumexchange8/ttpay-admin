<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    //
    public function merchant()
    {

        $merchant = auth()->user();

        $data = [
            'status' => 200,
            'merchant' => $merchant
        ];

        return response()->json($data, 200);
    }
}
