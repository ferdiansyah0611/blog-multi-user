<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserFakerSeeder extends Seeder
{
	public function run()
	{
		$faker = \Faker\Factory::create();
		for ($i = 0; $i < 100; $i++) {
			$id = rand();
			$gender = $faker->randomElement(['male', 'female']);
			$data = [
				'id' => $id,
				'name' => $faker->name($gender),
				'email' => $faker->email,
				'password' => password_hash('12345678', PASSWORD_BCRYPT),
				'born' => $faker->date('Y-m-d', 'now'),
				'gender' => $gender,
				'location' => 'Indonesia',
				'role' => 'user',
				'type' => '0',
				'bio' => 'bio',
				'avatar' => '',
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
			$this->db->table('app_user')->insert($data);

			$app_verification_code = [
	            'id' => rand(),
	            'user_id' => $id,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			];
			$this->db->table('app_verification_code')->insert($app_verification_code);
		}
	}
}
