<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demands', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->string('number');
            $table->string('expedient')->nullable();
            $table->text('content')->nullable();
            $table->timestamps();

            $table->foreignId('type_id')
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('way_id')
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('contact_id')
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('topic_id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demands');
    }
}
