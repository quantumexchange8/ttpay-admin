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
        Schema::create('merchant_email_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('merchant_id');
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_id');
            $table->string('deposit_amount');
            $table->string('date_time');
            $table->string('client_usdt');
            $table->string('usdt_receive');
            $table->string('txid');
            $table->string('photo');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_email_contents');
    }
};
