<?php namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AppComment extends Migration
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
                	'type'		=> 'BIGINT',
                	'unsigned'	=> true,
                	'null'		=> false
                ],
                'article_id' => [
                	'type'		=> 'BIGINT',
                	'unsigned'	=> true,
                	'null'		=> false
                ],
                'comment' => [
                   	'type' => 'LONGTEXT',
                   	'null' => false,
                ],
                'created_at' => [
                	'type' => 'timestamp',
                	'null' => true,
                ],
                'updated_at' => [
                	'type' => 'timestamp',
                	'null' => true,
                ]
    		]);
            $this->forge->addKey('id', true);
            $this->forge->createTable('app_comment');
    }
	public function down()
	{
		$this->forge->dropTable('app_comment');
	}
}
