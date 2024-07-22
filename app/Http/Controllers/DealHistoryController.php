<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DealHistoryController extends Controller
{
    public function client()
    {

        return Inertia::render('General/DealHistory/Client/Client');
    }
}
