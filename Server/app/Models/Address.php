<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'building',
        'apartment',
        'number',

        'active',

        'street_id',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function street()
    {
        return $this->belongsTo(Street::class);
    }
}
