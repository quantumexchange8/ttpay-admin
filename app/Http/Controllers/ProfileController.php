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
        $userProfile = Auth::user();

        return Inertia::render('Profile/Edit', [
            'userProfile' => $userProfile,
            'profile_photo' => $userProfile->getFirstMediaUrl('profile_photo'),
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

    public function uploadPhoto(Request $request)
    {
        
        $user = Auth::user();
        $profile = $user->getFirstMediaUrl('profile_photo');
        
        if($request->hasFile('profile_photo')) {
            if($profile == "" ) {
                
                $user->addMedia($request->profile_photo)->toMediaCollection('profile_photo');

            } else {
                $user->clearMediaCollection('profile_photo');
                $user->addMedia($request->profile_photo)->toMediaCollection('profile_photo');

            }
        };


        return redirect()->back()->with('success', 'successfull approved');
    }
}
