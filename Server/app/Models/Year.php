<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    protected $fillable = [
        'name',
        'code'
    ];

    public function quarters(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Quarter::class);
    }
}
