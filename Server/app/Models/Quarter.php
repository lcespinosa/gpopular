<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quarter extends Model
{
    protected $fillable = [
        'name',
        'code',
        'quarter',
        'year_id',
    ];

    public function year(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Year::class);
    }

    public function demands(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Demand::class);
    }
}
