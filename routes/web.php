<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\ConfigurationController;
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
     *           OTHERS
     * ==============================
     */


});

require __DIR__.'/auth.php';
