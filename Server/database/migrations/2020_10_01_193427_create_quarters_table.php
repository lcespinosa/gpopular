<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuartersTable extends Migration
{
    public function up()
    {
        Schema::create('quarters', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->string('code', 10)->unique();
            $table->integer('quarter');

            $table->foreignId('year_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quarters');
    }
}
