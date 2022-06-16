<?php

use Illuminate\Database\Seeder;

class CardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cards')->insert([
            [
                'user_id'       => 1,
                'description'     =>'Agregar subtareas al kanban',
                'stage'         => 'buffer',
                'estimation_at' => date('Y-m-d')
            ],
            [
                'user_id'       => 1,
                'description'     =>'Testing Kanban',
                'stage'         => 'working',
                'estimation_at' => date('Y-m-d')
            ]
        ]);
    }
}
