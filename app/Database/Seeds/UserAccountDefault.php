<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserAccountDefault extends Seeder
{
	public function run()
	{
		$data_admin = [
			'id' => rand(),
			'name' => 'Admin',
			'email' => 'admin@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'admin',
			'type' => '5',
			'bio' => 'bio admin',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_admin);
		$data_premium_1 = [
			'id' => rand(),
			'name' => 'Premium 1',
			'email' => 'premium1@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'premium',
			'type' => '1',
			'bio' => 'bio premium',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_premium_1);
		$data_premium_2 = [
			'id' => rand(),
			'name' => 'Premium 2',
			'email' => 'premium2@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'premium',
			'type' => '2',
			'bio' => 'bio premium',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_premium_2);
		$data_premium_3 = [
			'id' => rand(),
			'name' => 'Premium 3',
			'email' => 'premium3@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'premium',
			'type' => '3',
			'bio' => 'bio premium',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_premium_3);
		$data_premium_4 = [
			'id' => rand(),
			'name' => 'Premium 4',
			'email' => 'premium4@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'premium',
			'type' => '4',
			'bio' => 'bio premium',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_premium_4);
		$data_free = [
			'id' => rand(),
			'name' => 'Free',
			'email' => 'free@gmail.com',
			'password' => password_hash('12345678', PASSWORD_BCRYPT),
			'born' => date('Y-m-d'),
			'gender' => 'male',
			'location' => 'Indonesia',
			'role' => 'user',
			'type' => '0',
			'bio' => 'bio free',
			'avatar' => '',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_user')->insert($data_free);
	}
}
