<?php


namespace App\Imports;


use App\Models\DemandCase;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class CasesImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = trim($row[0]);
        $model = DemandCase::firstOrCreate([
            'name'  => $str,
            'code'  => Str::snake($str),
        ]);
        return $model;
    }
}
