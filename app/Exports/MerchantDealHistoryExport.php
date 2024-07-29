<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class MerchantDealHistoryExport implements FromCollection, WithHeadings
{
    protected $transaction;

    public function __construct($transaction)
    {
        $this->transaction = $transaction;

    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection(): \Illuminate\Support\Collection
    {
        $records = $this->transaction->latest()->get();
        $result = array();
        foreach($records as $data){
            $result[] = array(
                'merchant' => $data->merchant->name,
                'role_id' => $data->merchant->role_id,
                'transaction_id' => $data->tt_txn,
                'from_wallet' => $data->from_wallet ?? '-',
                'to_wallet' => $data->to_wallet,
                'txID' => $data->txID ?? '-',
                'amount' => $data->amount,
                'fee' => $data->fee,
                'total_amount' => $data->total_amount,
                'transaction_date' => $data->transaction_date,
                'status' => $data->status,
                'description' => $data->description ?? '-',
            );
        }

        return collect($result);
    }

    public function headings(): array
    {
        return [
            'Merchant',
            'Role ID',
            'Transaction ID',
            'From Wallet',
            'To Wallet',
            'TxID',
            'Amount',
            'Fee',
            'Total Amount',
            'Transaction Date',
            'Status',
            'Description',
        ];
    }
}
