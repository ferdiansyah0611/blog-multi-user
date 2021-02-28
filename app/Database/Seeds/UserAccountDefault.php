<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserAccountDefault extends Seeder
{
	public function run()
	{
		$id1 = rand();
		$id2 = rand();
		$id3 = rand();
		$id4 = rand();
		$idfree = rand();
		$data = [
			[
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
			],
			[
				'id' => $id1,
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
			],
			[
				'id' => $id2,
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
			],
			[
				'id' => $id3,
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
			],
			[
				'id' => $id4,
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
			],
			[
				'id' => $idfree,
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
			]
		];

		$this->db->table('app_user')->insertBatch($data);

		$app_verification_code = [
			[
	            'id' => rand(),
	            'user_id' => '8624378',
	            'code' => '1203040340',
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			],
			[
	            'id' => rand(),
	            'user_id' => $id1,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			],
			[
	            'id' => rand(),
	            'user_id' => $id2,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			],
			[
	            'id' => rand(),
	            'user_id' => $id3,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			],
			[
	            'id' => rand(),
	            'user_id' => $id4,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			],
			[
	            'id' => rand(),
	            'user_id' => $idfree,
	            'code' => base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000)),
	            'verified_at' => date('Y-m-d'),
	            'created_at' => date('Y-m-d H:i:s'),
	            'updated_at' => date('Y-m-d H:i:s')
			]
		];
		$this->db->table('app_verification_code')->insertBatch($app_verification_code);
	}
}
