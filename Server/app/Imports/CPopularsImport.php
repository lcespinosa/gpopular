<?php


namespace App\Imports;


use App\Models\CPopular;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class CPopularsImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = ucfirst(Str::lower(trim($row[0])));
        
        $model = CPopular::firstOrCreate([
            'name'  => $str,
            'code'  => next_id(CPopular::class),
        ]);
        return $model;
    }
}
