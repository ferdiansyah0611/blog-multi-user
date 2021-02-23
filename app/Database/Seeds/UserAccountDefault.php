<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserAccountDefault extends Seeder
{
	public function run()
	{
		$data_admin = [
			'id' => '8624378',
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => '8624378',
            'code' => '1203040340',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_admin);

		$id1 = rand();
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => $id1,
            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_premium_1);

		$id2 = rand();
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => $id2,
            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_premium_2);

		$id3 = rand();
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => $id3,
            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_premium_3);

		$id4 = rand();
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => $id4,
            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_premium_4);

		$idfree = rand();
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
		$this->db->table('app_verification_code')->insert([
            'id' => rand(),
            'user_id' => $idfree,
            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
		$this->db->table('app_user')->insert($data_free);
	}
}
