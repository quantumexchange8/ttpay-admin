<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class Trc20AddressExport implements FromCollection
{
    protected $trc20Address;

    public function __construct($trc20Address)
    {
        $this->trc20Address = $trc20Address;

    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection(): \Illuminate\Support\Collection
    {
        $records = $this->trc20Address->get();
        $result = array();
        foreach($records as $data){
            $result[] = array(
                'wallet_name' => $data->name,
                'token_address' => $data->token_address,
            );
        }

        return collect($result);
    }

    public function headings(): array
    {
        return [
            'Wallet Name',
            'Wallet Address',
        ];
    }
}
