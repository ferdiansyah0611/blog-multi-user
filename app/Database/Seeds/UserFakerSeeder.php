<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserFakerSeeder extends Seeder
{
	public function run()
	{
		$faker = \Faker\Factory::create('id_ID');
		for ($i = 0; $i < 1000; $i++) {
			$jk = $faker->randomElement(['pria', 'wanita']);
			if ($jk == "pria") {
				$gender = "male";
			} else {
				$gender = "female";
			}
			$data = [
				'id' => rand(),
				'name' => $faker->name($jk),
				'email' => $faker->email,
				'password' => password_hash('12345678', PASSWORD_BCRYPT),
				'born' => $faker->date('Y-m-d', 'now'),
				'gender' => $gender,
				'location' => $faker->address,
				'role' => 'user',
				'type' => '0',
				'bio' => 'bio',
				'avatar' => '',
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
			$this->db->table('app_user')->insert($data);
		}
	}
}
