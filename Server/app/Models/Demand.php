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
        'is_anonymous',

        'type_id',
        'way_id',
        'demand_case_id',
        'topic_id',
    ];

    protected $casts = [
        'reception_date'    => 'datetime:d-m-Y',
    ];

//    protected $appends = ['expand'];

    public function topic(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Topic::class);
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

    public function getExpandAttribute()
    {
        return count($this->replies) > 0;
    }
}
