<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppUserPremium extends Migration
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
            'order_id' => [
            	'type'		=> 'BIGINT',
            	'unsigned'	=> true,
            	'null'		=> false
            ],
            'expired_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
            ],
            'created_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
            ],
            'updated_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
            ]
    	]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_user_premium');
	}
	public function down()
	{
		$this->forge->dropTable('app_user_premium');
	}
}