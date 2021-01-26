<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppUserReport extends Migration
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
            'user_report_id' => [
            	'type'		=> 'BIGINT',
            	'unsigned'	=> true,
            	'null'		=> false
            ],
            'category' => [
                'type'         => 'VARCHAR',
                'constraint'  => '255',
                'null' => false,
            ],
            'description' => [
                  'type'         => 'LONGTEXT',
                  'null'         => false,
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
        $this->forge->createTable('app_user_report');
	}
	public function down()
	{
		$this->forge->dropTable('app_user_report');
	}
}
