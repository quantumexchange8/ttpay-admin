<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\RateProfile;

class NewRateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'name' => ['required', 'unique:' . RateProfile::class],
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
