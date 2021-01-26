<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppArticles extends Migration
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
            'category_id' => [
                'type'             => 'BIGINT',
                'unsigned'         => true,
                'null'             => false
            ],
            'title' => [
               	'type'      	   => 'VARCHAR',
               	'constraint'	   => '100',
               	'null'             => false,
            ],
            'content' => [
               	'type'	           => 'LONGTEXT',
               	'null'	           => false,
            ],
            'description' => [
                'type'             => 'VARCHAR',
                'null'             => false,
            ],
            'image' => [
                'type'             => 'VARCHAR',
                'constraint'       => '255',
                'null' => false,
            ],
            'status' => [
                'type'             => 'VARCHAR',
                'constraint'       => '100',
                'null' => false,
            ],
            'views' => [
                'type'             => 'BIGINT',
                'null' => true,
            ],
            'created_at' => [
            	'type'	           => 'timestamp',
            	'null'	           => true,
            ],
            'updated_at' => [
            	'type'	           => 'timestamp',
            	'null'	           => true,
            ]
		]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('app_article');
	}
	public function down()
	{
		$this->forge->dropTable('app_article');
	}
}
