<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApproveTransactionRequest extends FormRequest
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
            'usdt_address' => ['required'],
            'txID' => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'usdt_address' => 'USDT Address',
            'txID' => 'TXID',
        ];
    }
}
