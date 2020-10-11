<?php


namespace App\Imports;


use App\Models\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;

class TypesImport implements ToModel
{

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row)
    {
        $str = ucfirst(Str::lower(trim($row[0])));
        $model = Type::firstOrCreate([
            'name'  => $str,
            'code'  => Str::snake($str),
        ]);
        return $model;
    }
}
