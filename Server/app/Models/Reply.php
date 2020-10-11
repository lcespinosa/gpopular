<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = [
        'send_date',
        'reply_date',
    ];

    protected $casts = [
        'send_date' => 'datetime: d-m-Y',
        'reply_date' => 'datetime: d-m-Y',
    ];

    public function reason_type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ReasonType::class);
    }

    public function demand(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Demand::class);
    }

    public function replies_statuses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ReplyStatus::class, 'reply_id');
    }

    public function reply_status(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ReplyStatus::class, 'reply_id')
            ->latest();
    }

    public function reply_status_finished(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ReplyStatus::class, 'reply_id')
            ->latest()
            ->where('finished', true);
    }
}
