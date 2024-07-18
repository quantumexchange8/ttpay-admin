<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditTrc20Request extends FormRequest
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
            'name' => [
                'required',
                Rule::unique('wallet_addresses')->ignore($this->id),
            ],
            'token_address' => [
                'required',
                Rule::unique('wallet_addresses')->ignore($this->id),
            ],
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
