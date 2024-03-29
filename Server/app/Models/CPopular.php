<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CPopular extends Model
{
    protected $table = 'cpopulars';

    protected $fillable = [
        'name',
        'code',
    ];

    public function streets(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Street::class, 'cpopular_id');
    }
}
