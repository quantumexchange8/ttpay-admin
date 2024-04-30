<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('manager_name');
            $table->string('email')->unique()->nullable();
            $table->string('dial_code', 50)->nullable();
            $table->string('phone')->unique();
            $table->string('url')->nullable();
            $table->string('deposit_type');
            $table->string('api_key')->nullable();
            $table->string('security_pin')->nullable();
            $table->string('rate_id');
            $table->string('refresh_time');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
