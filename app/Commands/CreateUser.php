<?php

namespace App\Commands;

use CodeIgniter\CLI\CLI;
use CodeIgniter\CLI\BaseCommand;

class CreateUser extends BaseCommand
{
	
	/**
	 * The group the command is lumped under
	 * when listing commands.
	 *
	 * @var string
	 */
	protected $group = 'CodeIgniter';

	/**
	 * The Command's name
	 *
	 * @var string
	 */
	protected $name = 'user:create';

	/**
	 * The Command's short description
	 *
	 * @var string
	 */
	protected $description = 'Create the new users';

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
	protected $arguments = ['name'];

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
		$db = \Config\Database::connect();
		$db->table('app_user')->insert([
			'id' => rand(),
			'name' => $params[0],
            'email' => $params[1],
            'password' => $params[2],
            'born' => $params[3],
            'gender' => $params[4],
            'location' => $params[5],
            'role' => $params[6],
            'type' => $params[7],
            'avatar' => null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
		]);
		CLI::write(CLI::color('Successfully create the new user.', 'yellow'));
	}

}
