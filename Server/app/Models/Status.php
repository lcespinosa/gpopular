<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    public function replies_statuses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ReplyStatus::class, 'status_id');
    }
}
