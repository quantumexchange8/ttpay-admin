<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('General/Pending/Pending');
    }
}
