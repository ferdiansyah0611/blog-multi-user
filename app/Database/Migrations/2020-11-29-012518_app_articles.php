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
                'type'             => 'VARCHAR',
                'constraint'       => '100',
                'null'             => true,
            ],
            'content' => [
                'type'             => 'LONGTEXT',
                'null'             => true,
            ],
            'description' => [
                'type'             => 'VARCHAR',
                'constraint'   => '255',
                'null'             => true,
            ],
            'image' => [
                'type'             => 'VARCHAR',
                'constraint'       => '255',
                'null' => true,
            ],
            'status' => [
                'type'             => 'VARCHAR',
                'constraint'       => '100',
                'null' => true,
            ],
            'views' => [
                'type'             => 'VARCHAR',
                'constraint'   => '255',
                'null' => true,
            ],
            'created_at' => [
                'type'             => 'TIMESTAMP',
                'null'             => true,
                'default' => '1991-01-01 00:00'
            ],
            'updated_at' => [
                'type'             => 'TIMESTAMP',
                'null'             => true,
                'default' => '1991-01-01 00:00'
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
