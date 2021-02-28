<?php

namespace App\Commands;

use CodeIgniter\CLI\CLI;
use CodeIgniter\CLI\BaseCommand;

class AppInstall extends BaseCommand
{
	
	/**
	 * The group the command is lumped under
	 * when listing commands.
	 *
	 * @var string
	 */
	protected $group = 'App';

	/**
	 * The Command's name
	 *
	 * @var string
	 */
	protected $name = 'app:install';

	/**
	 * The Command's short description
	 *
	 * @var string
	 */
	protected $description = 'Install the new app';

	/**
	 * The Command's usage
	 *
	 * @var string
	 */
	protected $usage = 'command:name [arguments] [options]';

	/**
	 * The Command's arguments.
	 *
	 * @var array
	 */
	protected $arguments = [];

	/**
	 * The Command's options.
	 *
	 * @var array
	 */
	protected $options = [];
	
	/**
	 * Actually execute a command.
	 *
	 * @param array $params
	 */
	public function run(array $params)
	{
		CLI::write('Start Install...', 'light_blue');
		$db = getenv('database.default.database');
		$forge = \Config\Database::forge();
		$forge->createDatabase($db, TRUE);
		command('migrate');
		command('db:seed UserAccountDefault');
		command('db:seed CategorySeeder');
		command('db:seed ArticleSeeder');
		command('db:seed UserFakerSeeder');
		CLI::write('Install successfully...', 'light_blue');
	}

}
