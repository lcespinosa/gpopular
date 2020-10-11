<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->boolean('accepted')->default(false);
            $table->date('send_date')->nullable();
            $table->date('reply_date')->nullable();

            $table->foreignId('reason_type_id')
            ->constrained()
            ->cascadeOnDelete();

            $table->foreignId('demand_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('functionary_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('result_id')
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
        Schema::dropIfExists('replies');
    }
}
