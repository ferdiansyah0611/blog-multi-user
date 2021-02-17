<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppVerificationCode extends Migration
{
	public function up()
    {
    	$this->forge->addField([
            'id' => [
            	'type'             => 'BIGINT',
            	'unsigned'         => true,
            	'auto_increment'   => true,
            ],
            'user_id' => [
            	'type'		=> 'BIGINT',
            	'unsigned'	=> true,
            	'null'		=> false
            ],
            'code' => [
            	'type'		=> 'BIGINT',
            	'unsigned'	=> true,
            	'null'		=> false
            ],
            'verified_at' => [
                'type'			=> 'date',
            	'null'			=> true,
            ],
            'created_at' => [
            	'type'			=> 'date',
            	'null'			=> true,
            ],
            'updated_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
            ]
    	]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_verification_code');
	}
	public function down()
	{
		$this->forge->dropTable('app_verification_code');
	}
}
