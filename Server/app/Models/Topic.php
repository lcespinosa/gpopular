<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'name',
        'code',
        'has_resources',
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function demands()
    {
        return $this->belongsToMany(Demand::class);
    }
}
