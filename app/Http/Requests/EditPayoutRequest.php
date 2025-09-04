<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditPayoutRequest extends FormRequest
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
            'name' => ['required'],
            'live_paymentUrl' => ['required'],
            'appId' => ['required'],
            'returnUrl' => ['required'],
            'callBackUrl' => ['required'],
            'diff_amount' => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Payout Name',
            'live_paymentUrl' => 'Url',
            'appId' => 'App ID',
            'returnUrl' => 'Return Url',
            'callBackUrl' => 'Callback Url',
            'diff_amount' => 'Different Amount',
        ];
    }
}
