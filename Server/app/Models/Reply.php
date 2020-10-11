<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = [
        'description',
        'accepted',
        'send_date',
        'reply_date',

        'reason_type_id',
        'result_id',
        'functionary_id',
    ];

    protected $casts = [
        'send_date' => 'datetime: d-m-Y',
        'reply_date' => 'datetime: d-m-Y',
        'accepted'  => 'boolean',
    ];

    public function reason_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ReasonType::class);
    }

    public function demand(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }

    public function functionary(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Functionary::class);
    }

    public function result(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Result::class);
    }
}
