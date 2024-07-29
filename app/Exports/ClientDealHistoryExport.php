<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClientDealHistoryExport implements FromCollection, WithHeadings
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
                'client_name' => $data->client_name,
                'client_email' => $data->client_email,
                'transaction_type' => $data->transaction_type,
                'transaction_id' => $data->tt_txn,
                'transaction_number' => $data->transaction_number,
                'from_wallet' => $data->from_wallet,
                'to_wallet' => $data->to_wallet,
                'txID' => $data->txID ?? '-',
                'txn_amount' => $data->txn_amount,
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
            'Client Name',
            'Client Email',
            'Transaction Type',
            'Transaction ID',
            'Transaction Number',
            'From Wallet',
            'To Wallet',
            'TxID',
            'Amount',
            'Total Amount',
            'Transaction Date',
            'Status',
            'Description',
        ];
    }
}
