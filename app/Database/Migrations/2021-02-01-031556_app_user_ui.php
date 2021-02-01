<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppUserUi extends Migration
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
            'user_id' => [
            	'type'             => 'BIGINT',
            	'unsigned'         => true,
            	'null'             => false
            ],
            'navbar-bg' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'navbar-txt' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'sidebar-bg' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'sidebar-txt' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'sidebar-cover' => [
               'type'            => 'VARCHAR',
               'constraint'      => '255',
               'null'            => false,
            ],
            'footer-bg' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'footer-status' => [
               'type'      	   => 'VARCHAR',
               'constraint'	   => '100',
               'null'            => false,
            ],
            'profil-cover' => [
               'type'            => 'VARCHAR',
               'constraint'      => '255',
               'null'            => false,
            ],
            'created_at' => [
            	'type'	         => 'timestamp',
            	'null'	         => true,
            ],
            'updated_at' => [
            	'type'	         => 'timestamp',
            	'null'	         => true,
            ]
		]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_user_ui');
	}
	public function down()
	{
		$this->forge->dropTable('app_user_ui');
	}
}
