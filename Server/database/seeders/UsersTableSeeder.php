<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('users')->delete();
        DB::table('contacts')->delete();
        Model::reguard();

        User::firstOrCreate([
            'name'      => 'Admin',
            'username'  => 'admin',
            'password'  => Hash::make('a'),
        ]);

        Contact::firstOrCreate([
            'name'          => 'Anonymous',
            'last_name'     => '',
            'phones'        => '',
            'anonymous'     => true,
        ]);
    }
}
