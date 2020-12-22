<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModel1sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('model1s', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('total_topics');
            $table->unsignedInteger('total_cases');
            $table->unsignedInteger('total_closed_cases');
            $table->unsignedInteger('total_opened_cases');
            $table->json('totals_by_case_type');
            $table->json('totals_by_way_type');

            $table->foreignId('quarter_id')
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
        Schema::dropIfExists('model1s');
    }
}
