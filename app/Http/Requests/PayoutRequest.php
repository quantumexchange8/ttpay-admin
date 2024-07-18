<?php

namespace App\Http\Requests;

use App\Models\PayoutConfig;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PayoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', Rule::unique(PayoutConfig::class)],
            'merchant_id' => ['required', Rule::unique(PayoutConfig::class)],
            'live_paymentUrl' => ['required', Rule::unique(PayoutConfig::class)],
            'appId' => ['required', Rule::unique(PayoutConfig::class)],
            'returnUrl' => ['required'],
            'callbackUrl' => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Payout Name',
            'merchant_id' => 'Merchant',
            'live_paymentUrl' => 'Url',
            'appId' => 'App ID',
            'returnUrl' => 'Return Url',
            'callbackUrl' => 'Callback Url',
        ];
    }
}
