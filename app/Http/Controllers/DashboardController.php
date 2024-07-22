<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function getPendingCount()
    {
        $countPending = Transaction::whereNull('client_id')
                ->where('transaction_type', 'withdrawal')
                ->with(['merchant:id,role_id,name'])
                ->where('status', 'pending')
                ->count();

        return response()->json($countPending);
    }
}
