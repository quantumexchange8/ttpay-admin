<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\MerchantController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/components/buttons', function () {
    return Inertia::render('Components/Buttons');
})->middleware(['auth', 'verified'])->name('components.buttons');

Route::middleware('auth', 'verified')->group(function () {

    /**
     * ==============================
     *           General
     * ==============================
     */

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/pending', [PendingController::class, 'index'])->name('pending');


    /**
     * ==============================
     *           MERCHANT
     * ==============================
     */
    Route::prefix('merchant')->group(function () {
        // CREATE MERCHANT
        Route::get('/create-merchant', [MerchantController::class, 'createMerchant'])->name('merchant.create-merchant');
        Route::post('/store-merchant', [MerchantController::class, 'storeMerchant'])->name('merchant.store-merchant');
        Route::post('/step1Validate-merchant', [MerchantController::class, 'step1Validate'])->name('merchant.step1Validate-merchant');
        Route::post('/step2Validate-merchant', [MerchantController::class, 'step2Validate'])->name('merchant.step2Validate-merchant');

        // MERCHANT LISTING
        Route::get('/merchant-listing', [MerchantController::class, 'merchantListing'])->name('merchant.merchant-listing');
        Route::get('/getMerchantListing', [MerchantController::class, 'getMerchantListing'])->name('merchant.getMerchantListing');
        Route::post('/updateStatus', [MerchantController::class, 'updateStatus'])->name('merchant.updateStatus');
        Route::post('/updateWalletAddress', [MerchantController::class, 'updateWalletAddress'])->name('merchant.updateWalletAddress');
        Route::post('/deleteWalletAddress', [MerchantController::class, 'deleteWalletAddress'])->name('merchant.deleteWalletAddress');
        Route::post('/deleteBin', [MerchantController::class, 'deleteMerchant'])->name('merchant.deleteBin');
        Route::post('/updateMerchant', [MerchantController::class, 'updateMerchant'])->name('merchant.updateMerchant');
    
        // MERCHANT BIN
        Route::get('/merchant-bin', [MerchantController::class, 'merchantBin'])->name('merchant.merchant-bin');
        Route::get('/getMerchantBin', [MerchantController::class, 'getMerchantBin'])->name('merchant.getMerchantBin');
        Route::post('/recoverMerchant', [MerchantController::class, 'recoverMerchant'])->name('merchant.recoverMerchant');
        Route::post('/removeMerchant', [MerchantController::class, 'removeMerchant'])->name('merchant.removeMerchant');

    });


     /**
     * ==============================
     *           SUB-ADMIN
     * ==============================
     */



     /**
     * ==============================
     *           CONFIGURATION
     * ==============================
     */

     Route::prefix('configuration')->group(function () {

        // RATE PROFILE
        Route::get('/rate_profile', [ConfigurationController::class, 'rateProfile'])->name('configuration.rate_profile');
        Route::post('/add_rate_profile', [ConfigurationController::class, 'storeRateProfile'])->name('configuration.add_rate_profile');
        Route::get('/getRateProfile', [ConfigurationController::class, 'getRateProfile'])->name('configuration.getRateProfile');
        Route::post('/edit_rate_profile', [ConfigurationController::class, 'EditRateProfile'])->name('configuration.edit_rate_profile');
        Route::post('/delete_rate_profile', [ConfigurationController::class, 'DeleteRateProfile'])->name('configuration.delete_rate_profile');

        // FREEZING LISTING


        // TRC 20 ADDRESS
        Route::get('/trc20-address', [ConfigurationController::class, 'trc20address'])->name('configuration.trc20-address');
        Route::get('/getTrc20Address', [ConfigurationController::class, 'getTrc20Address'])->name('configuration.getTrc20Address');
        Route::post('/add_trc20_address', [ConfigurationController::class, 'storeTrc20Address'])->name('configuration.add_trc20_address');
        Route::post('/edit_trc20_address', [ConfigurationController::class, 'editAddress'])->name('configuration.edit_trc20_address');
        Route::post('/delete_trc20_address', [ConfigurationController::class, 'DeleteAddress'])->name('configuration.delete_trc20_address');

     });


     /**
     * ==============================
     *           PROFILE
     * ==============================
     */
    Route::prefix('profile')->group(function () {
        Route::get('/profile', [ProfileController::class, 'profile'])->name('profile.profile');
        // Route::post('/update_profile', [ProfileController::class, 'updateProfile'])->name('profile.update_profile');
    });


     /**
     * ==============================
     *           OTHERS
     * ==============================
     */


});

require __DIR__.'/auth.php';
