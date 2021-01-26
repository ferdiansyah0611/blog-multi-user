<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppArticleFavorite extends Migration
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
            'article_id' => [
            	'type'		=> 'BIGINT',
            	'unsigned'	=> true,
            	'null'		=> false
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
        $this->forge->createTable('app_article_favorite');
	}
	public function down()
	{
		$this->forge->dropTable('app_article_favorite');
	}
}
