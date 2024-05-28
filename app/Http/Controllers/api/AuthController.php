<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('role_id', 'password');

        Log::info('Login attempt with credentials:', $credentials);

        // Validate the request data
        $validator = Validator::make($credentials, [
            'role_id' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'user' => null,
                'message' => 'Validation error',
                'status' => 'failed',
                'errors' => $validator->errors()
            ], 400);
        }

        // Find the merchant by role_id
        $merchant = Merchant::where('role_id', $credentials['role_id'])->first();

        if (!$merchant || !Hash::check($credentials['password'], $merchant->password)) {
            return response()->json([
                'user' => null,
                'message' => 'Invalid login details',
                'status' => 'failed',
            ], 200);
        }

        if ($merchant->status === 'Inactive') {
            return response()->json([
                'message' => 'This merchant is Inactive',
                'status' => 'failed',
            ], 200);
        }

        // Create a token for the authenticated merchant
        $token = $merchant->createToken('API Token')->plainTextToken;

        $user_loggedin = [
            'id' => $merchant->id,
            'role_id' => $merchant->role_id,
            'status' => 'loggedin',
            'token' => $token,
        ];

        return response()->json($user_loggedin, 200);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
            'status' => 'success',
        ], 200);
    }


    public function refresh(Request $request)
    {
        // Revoke the current token
        $user = $request->user();
        $user->currentAccessToken()->delete();

        // Generate a new token
        $newToken = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'token' => $newToken,
            'status' => 'success',
        ], 200);
    }
}
