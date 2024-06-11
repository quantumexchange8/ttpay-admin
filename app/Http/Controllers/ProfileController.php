<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's profile information.
     */

     public function profile()
     {
         $userProfile = Auth::user();

         return Inertia::render('Profile/Profile', [
            'userProfile' => $userProfile
         ]);
     }
     
     public function updateProfile(ProfileUpdateRequest $request)
    {
        $userProfile = User::find($request->id);
        $userProfile->update([
            'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email,
        ]);
        
        return redirect()->back()->with('toast', 'User profile updated successfully!');
        
    }

// return Inertia::render('/Profile/Profile');
}// return response()->json(['message' => 'Profile updated successfully', 'user' => $userProfile]);
