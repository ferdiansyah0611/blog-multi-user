<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppCategory extends Migration
{
    public function up()
    {
    	$this->forge->addField([
            'id' => [
            	'type'             => 'BIGINT',
            	'constraint'       => 5,
            	'unsigned'         => true,
            	'auto_increment'   => true,
            ],
            'name' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' => false,
            ],
            'description' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '255',
               	'null' => false,
            ],
            'created_by' => [
            	'type'             => 'BIGINT',
            	'unsigned'         => true,
            	'null' => false,
            ],
            'created_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
                'default' => '1991-01-01 00:00'
            ],
            'updated_at' => [
            	'type'			=> 'timestamp',
            	'null'			=> true,
                'default' => '1991-01-01 00:00'
            ]
    	]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_category');
	}
	public function down()
	{
		$this->forge->dropTable('app_category');
	}
}
