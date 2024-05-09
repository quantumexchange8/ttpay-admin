<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'name' => ['required'],
            'token_address' => ['required'],
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
