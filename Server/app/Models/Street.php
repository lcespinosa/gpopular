<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Street extends Model
{
    protected $fillable = [
        'name',
        'code',

        'first_between_id',
        'second_between_id',
        'cpopular_id',
    ];

    public function cpopular(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(CPopular::class, 'cpopular_id');
    }

    public function addresses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Address::class)
            ->where('active', true);
    }

    public function first_between_street(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(self::class, 'first_between_id');
    }

    public function second_between_street(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(self::class, 'second_between_id');
    }
}
