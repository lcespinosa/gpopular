<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//         $this->call('UsersTableSeeder');
        Model::unguard();
        DB::table('users')->delete();
        Model::reguard();

        User::firstOrCreate([
            'name'      => 'Admin',
            'username'  => 'admin',
            'password'  => Hash::make('a'),
        ]);
    }
}
