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
        Schema::create('merchant_wallets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('merchant_id');
            $table->string('merchant_wallet')->nullable(); //wallet no
            $table->decimal('deposit_balance', 13, 2)->default(0);
            $table->decimal('gross_deposit', 13, 2)->default(0);
            $table->decimal('gross_withdrawal', 13, 2)->default(0);
            $table->decimal('net_deposit', 13, 2)->default(0);
            $table->decimal('net_withdrawal', 13, 2)->default(0);
            $table->decimal('freezing_amount', 13, 2)->default(0);
            $table->string('type')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_wallets');
    }
};
