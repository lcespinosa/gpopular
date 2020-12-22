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
            $table->date('reception_date');
            $table->text('content');
            $table->boolean('is_anonymous')->default(false);

            $table->foreignId('type_id')->default(1)
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('way_id')->default(1)
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('demand_case_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('contact_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('topic_id')
                ->constrained()
                ->cascadeOnDelete();

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
        Schema::dropIfExists('demands');
    }
}
