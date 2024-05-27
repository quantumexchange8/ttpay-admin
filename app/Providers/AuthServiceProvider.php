<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Providers\RoleIdUserProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('role_id', function ($app, array $config) {
            return new RoleIdUserProvider($app['hash'], $config['model']);
        });
    }
}
