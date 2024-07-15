<?php

namespace App\Http\Requests;

use App\Models\WalletAddress;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Trc20AddressRequest extends FormRequest
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
            'name' => ['required', Rule::unique(WalletAddress::class)],
            'token_address' => ['required', Rule::unique(WalletAddress::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Wallet name',
            'token_address' => 'Token Address',
        ];
    }
}
