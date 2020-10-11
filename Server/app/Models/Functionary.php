<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Functionary extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'nick',
        'phones',
        'is_relevant',
        'occupation',
    ];

    protected $casts = [
        'phones'    => 'array',
        'is_relevant'   => 'boolean',
    ];

    public function agency(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    public function replies_statuses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ReplyStatus::class, 'functionary_id');
    }
}
