<?php


namespace App\Imports;


use App\Models\Way;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class WaysImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = ucfirst(Str::lower(trim($row[0])));
        
        $model = Way::firstOrCreate([
            'name'  => $str,
            'code'  => next_id(Way::class),
        ]);
        return $model;
    }
}
