<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;



class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create();
        
        foreach (range(1,10) as $value) {
            DB::table('users')->insert([
                'firstname' => $faker->name,
                'lastname' => $faker->lastname,
                // 'email' => Str::random(10).'@gmail.com',
                'email' => $faker->email,
                'phone' => Str::random(10),
                'password' => Hash::make('password'),
            ]);
          
        }
        
    }
}
