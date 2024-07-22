<?php

namespace App\Http\Requests;

use App\Models\RateProfile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditNewRequest extends FormRequest
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
                Rule::unique('rate_profiles')->ignore($this->id)
            ],
            'deposit_fee' => ['required'],
            'withdrawal_fee' => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Rate Profile Name',
            'deposit_fee' => 'Deposit Fee',
            'withdrawal_fee' => 'Withdrawal Fee',
        ];
    }
}
