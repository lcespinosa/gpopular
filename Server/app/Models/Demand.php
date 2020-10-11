<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    protected $fillable = [
        'page',
        'number',
        'expedient',
        'reception_date',
        'content',
        'is_demand',

        'type_id',
        'way_id',
        'demand_case_id',
    ];

    protected $casts = [
        'reception_date'    => 'datetime: d-m-Y',
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

    public function demand_case(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(DemandCase::class);
    }

    public function replies(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Reply::class);
    }

    public function accepted_replies(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Reply::class)
            ->latest()
            ->where('accepted', true);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
