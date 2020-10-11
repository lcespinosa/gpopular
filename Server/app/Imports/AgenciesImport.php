<?php


namespace App\Imports;


use App\Models\Agency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class AgenciesImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = trim($row[0]);
        $model = Agency::firstOrCreate([
            'name'  => $str,
            'code'  => Str::snake($str),
        ]);
        return $model;
    }
}
