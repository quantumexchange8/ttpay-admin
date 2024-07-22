<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\MerchantController;
use App\Http\Controllers\api\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
    Route::post('refresh', 'refresh')->middleware('auth:sanctum');
});

Route::group(["middleware" => ["auth:sanctum"]], function() {
    Route::get('merchant', [MerchantController::class, 'merchant']);
    Route::post('profile', [MerchantController::class, 'profile']);
    Route::get('merchant_rate', [MerchantController::class, 'merchantRate']);

    Route::get('transaction', [TransactionController::class, 'transaction']);
    Route::get('merchant_wallet', [WalletController::class, 'merchantWallet']);
    Route::post('withdrawal', [WalletController::class, 'merchantWithdrawal']);
    
});

Route::post('onesignal', [TransactionController::class, 'onesignal']);

