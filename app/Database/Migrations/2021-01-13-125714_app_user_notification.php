<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppUserNotification extends Migration
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
            'type' => [
                'type'         => 'VARCHAR',
                'constraint'  => '255',
                'null' => false,
            ],
            'type' => [
                'type'         => 'VARCHAR',
                'constraint'  => '255',
                'null' => false,
            ],
            'status' => [
                'type'         => 'VARCHAR',
                'constraint'  => '255',
                'null' => false,
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
        $this->forge->createTable('app_user_notification');
	}
	public function down()
	{
		$this->forge->dropTable('app_user_notification');
	}
}
