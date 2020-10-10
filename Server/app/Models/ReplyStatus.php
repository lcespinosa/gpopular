<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReplyStatus extends Model
{
    protected $fillable = [
        'description',

        'status_id',
        'functionary_id',
        'reply_id',
    ];

    public function reply(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Reply::class);
    }

    public function status(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    public function functionary(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Functionary::class);
    }
}
