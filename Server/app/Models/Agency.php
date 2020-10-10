<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'phones',
    ];

    protected $casts = [
        'phones'    => 'array'
    ];

    public function functionaries(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Functionary::class);
    }

    public function topics(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Topic::class);
    }
}
