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
        Route::get('/rate_profile', [ConfigurationController::class, 'rate_profile'])->name('configuration.rate_profile');
        Route::post('/add_rate_profile', [ConfigurationController::class, 'storeRateProfile'])->name('configuration.add_rate_profile');
        Route::get('/getRateProfile', [ConfigurationController::class, 'getRateProfile'])->name('configuration.getRateProfile');
        Route::post('/edit_rate_profile', [ConfigurationController::class, 'EditRateProfile'])->name('configuration.edit_rate_profile');
        Route::post('/delete_rate_profile', [ConfigurationController::class, 'DeleteRateProfile'])->name('configuration.delete_rate_profile');
     });

     /**
     * ==============================
     *           OTHERS
     * ==============================
     */


});

require __DIR__.'/auth.php';
