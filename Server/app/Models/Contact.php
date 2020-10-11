<?php

namespace App\Models;

use App\Scopes\NotAnonymous;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'phones',
        'anonymous',
    ];

    protected $casts = [
        'phones'    => 'array',
        'anonymous' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new NotAnonymous());

    }

    public function address(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Address::class)
            ->latest()
            ->where('active', true);
    }

    public function demands(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Demand::class);
    }
}
