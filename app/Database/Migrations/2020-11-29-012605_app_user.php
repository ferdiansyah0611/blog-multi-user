<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppUser extends Migration
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
                  'default' => ''
            ],
            'email' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' => false,
                  'default' => ''
            ],
            'password' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '255',
               	'null' => false,
                  'default' => ''
            ],
            'born' => [
               	'type'	=> 'DATE',
               	'null'	=> false,
            ],
            'gender' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null'			=> true,
            ],
            'location' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> true,
            ],
            'role' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> true,
            ],
            'type' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> true,
            ],
            'bio' => [
                  'type'         => 'VARCHAR',
                  'constraint'   => '255',
                  'null'         => true,
            ],
            'avatar' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> true,
            ],
            'created_at' => [
            	'type'			=> 'TIMESTAMP',
            	'null'			=> true,
               'default' => '1991-01-01 00:00'
            ],
            'updated_at' => [
            	'type'			=> 'TIMESTAMP',
            	'null'			=> true,
               'default' => '1991-01-01 00:00'
            ]
		]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_user');
	}
	public function down()
	{
		$this->forge->dropTable('app_user');
	}
}
