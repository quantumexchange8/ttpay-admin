<?php

namespace App\Http\Requests;

use App\Models\Merchant;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MerchantRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'manager_name' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:8'],
            'rate_profile' => ['required'],
            'url' => ['required'],
            'email_receiving' => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'name',
            'manager_name' => 'manager name',
            'email' => 'email',
            'phone' => 'phone',
            'rate_profile' => 'rate profile',
            'url' => 'url',
            'email_receiving' => 'email receiving',
        ];
    }
}
