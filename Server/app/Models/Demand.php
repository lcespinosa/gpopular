<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    protected $fillable = [
        'page',
        'number',
        'expedient',
        'content',

        'type_id',
        'way_id',
    ];

    public function topics(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Topic::class);
    }

    public function type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function way(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Way::class);
    }

    public function reply(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Reply::class);
    }
}
