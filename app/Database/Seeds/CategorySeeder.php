<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class CategorySeeder extends Seeder
{
	public function run()
	{
		$data = [
			'id' => '56',
			'name' => 'Technology',
			'description' => 'Description Technology',
			'created_by' => '8624378',
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];
		$this->db->table('app_category')->insert($data);
	}
}
