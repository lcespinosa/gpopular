<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStreetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('streets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('code', 50)->unique();

            $table->foreignId('cpopular_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedBigInteger('first_between_id')->nullable();
            $table->foreign('first_between_id')
                ->references('id')
                ->on('streets')
                ->nullOnDelete();

            $table->unsignedBigInteger('second_between_id')->nullable();
            $table->foreign('second_between_id')
                ->references('id')
                ->on('streets')
                ->nullOnDelete();

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
        Schema::dropIfExists('streets');
    }
}
