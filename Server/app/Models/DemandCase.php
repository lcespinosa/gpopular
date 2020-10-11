<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandCase extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    public function demands(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Demand::class);
    }
}
