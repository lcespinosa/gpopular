<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFunctionariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('functionaries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30);
            $table->string('last_name', 50)->nullable();
            $table->string('nick', 25)->nullable();
            $table->json('phones')->nullable();
            $table->boolean('is_relevant')->default(false);
            $table->string('occupation')->nullable();

            $table->foreignId('agency_id')
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
        Schema::dropIfExists('functionaries');
    }
}
