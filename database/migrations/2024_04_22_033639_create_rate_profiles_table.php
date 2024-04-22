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
        Schema::create('rate_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('deposit_fee');
            $table->string('withdrawal_fee');
            $table->unsignedBigInteger('merchant_id')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rate_profiles');
    }
};
