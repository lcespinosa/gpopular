<?php

namespace App\Models;

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
        'phones'    => 'array'
    ];

    public function address(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Address::class)
            ->latest()
            ->where('active', true);
    }
}
