<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('building', 25)->nullable();
            $table->string('apartment', 25)->nullable();
            $table->string('number', 25)->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->foreignId('street_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('contact_id')
                ->constrained()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}