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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->string('transaction_type');
            $table->string('from_wallet');
            $table->string('to_wallet');
            $table->string('txID')->nullable();
            $table->string('amount');
            $table->string('fee');
            $table->string('transaction_number');
            $table->string('payment_method');
            $table->string('status');
            $table->string('description')->nullable();
            $table->string('handle_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
