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
            ],
            'email' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' => false,
            ],
            'password' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '255',
               	'null' => false,
            ],
            'born' => [
               	'type'	=> 'DATE',
               	'null'	=> false,
            ],
            'gender' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null'			=> false,
            ],
            'location' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> false,
            ],
            'role' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> false,
            ],
            'type' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> false,
            ],
            'bio' => [
                  'type'         => 'VARCHAR',
                  'constraint'   => '255',
                  'null'         => true,
            ],
            'avatar' => [
               	'type'      	=> 'VARCHAR',
               	'constraint'	=> '100',
               	'null' 			=> false,
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
        $this->forge->createTable('app_user');
	}
	public function down()
	{
		$this->forge->dropTable('app_user');
	}
}
