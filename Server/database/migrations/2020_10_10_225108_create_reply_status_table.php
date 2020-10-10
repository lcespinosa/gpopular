<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReplyStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reply_status', function (Blueprint $table) {
            $table->id();
            $table->text('description');

            $table->foreignId('status_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('functionary_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('reply_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reply_status');
    }
}
