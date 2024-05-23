<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_id' => 'required|string',
            'password' => 'required|string',
        ])->setAttributeNames([
            'role_id' => trans('public.ID'),
            'password' => trans('public.Password'),
        ]);

        if (!$validator->passes()){
            return response()->json([
                'status' => 'fail',
                'error' => $validator->errors()->toArray()
            ]);
        } else {
            $credentials = $request->only('role_id', 'password');

            $token = auth()->guard('api')->attempt($credentials);

            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ], 401);
            }

            $user = auth()->guard('api')->user();
            if (!$user->email_verified_at) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email is not verified.',
                ], 401);
            }

            $user_data = [
                'name' => $user->name,
                'email_verified' => Carbon::parse($user->email_verified_at)->format('Y-m-d h:m:s'),
            ];

            return response()->json([
                'status' => 'success',
                'user' => $user_data,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }
    }
}
