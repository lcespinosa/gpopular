<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReasonType extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    public function replies(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Reply::class);
    }
}
