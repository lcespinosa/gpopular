<?php


namespace App\Imports;


use App\Models\Result;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class ResultsImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = ucfirst(Str::lower(trim($row[0])));
        
        $model = Result::firstOrCreate([
            'name'  => $str,
            'code'  => next_id(Result::class),
        ]);
        return $model;
    }
}
