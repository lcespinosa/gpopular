<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'name',
        'code',
        'has_resources',

        'agency_id'
    ];

    protected $casts = [
        'has_resources' => 'boolean'
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}
