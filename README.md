## Project CI4 React Blog Multiuser

Is an application for registered blog users with several great features and templates.

## Installation

1. Cloning Project

2. Change file env
```bash
rename copy-env .env
```
3. Edit file env

Change the database with your database server, uncomment premium.type, midtrans and email

4. Key generate
```bash
php spark key:generate
```
5. Install composer
```bash
composer install
```
6. Install in one action (Include migrate & dbseed)

```bash
php spark app:install
```

## Account Faker Login
- email: admin@gmail.com, pw: 12345678
- email: premium1@gmail.com, pw: 12345678
- email: premium2@gmail.com, pw: 12345678
- email: premium3@gmail.com, pw: 12345678
- email: free@gmail.com, pw: 12345678

## Usage

```bash
php spark serve
```
## List API
```php
<?php
$routes->group('api', function($routes)
{
	$routes->get('verified-email', 'AuthController::verifiedcode');
	$routes->get('reset-code', 'AuthController::resetcode');
	$routes->post('login', 'AuthController::login');
	$routes->post('register', 'AuthController::register');
	$routes->post('contact-us', 'AuthController::sendcontactus');
    $routes->add('list', 'Admin\Users::list');
	$routes->resource('article', ['controller' => 'ArticleController']);
	$routes->resource('article-subscribe', ['controller' => 'ArticleSubscribe']);
	$routes->resource('article-viewer', ['controller' => 'ArticleViewerController']);
	$routes->resource('article-favorite', ['controller' => 'ArticleFavoriteController']);
	$routes->resource('article-share', ['controller' => 'ArticleShareController']);
	$routes->resource('user', ['controller' => 'UserController']);
	$routes->resource('user-report', ['controller' => 'UserReportController']);
	$routes->resource('user-notification', ['controller' => 'UserNotificationController']);
	$routes->resource('user-ui', ['controller' => 'UserUiController']);
	$routes->resource('comment', ['controller' => 'CommentController']);
	$routes->resource('category', ['controller' => 'CategoryController']);
	$routes->get('dashboard/(:num)', 'UserController::dashboard/$1');
	$routes->get('usrfile/(:num)/(:any)', 'FileController::index/$1/$2');
	$routes->post('upload-usrfile', 'FileController::upload');
	$routes->get('search/article', 'ArticleController::search');
	$routes->get('search/category', 'CategoryController::search');
	$routes->get('search/comment', 'CommentController::search');
	$routes->get('search/user', 'UserController::search');
	$routes->get('article-category/(:num)', 'ArticleController::category/$1');
	$routes->get('storage', 'FileController::storage');
	$routes->get('storage/usage', 'FileController::usage');
	$routes->get('valid', 'AuthController::valid');
	$routes->get('pay/status/(:num)', 'PaymentController::status/$1');
	$routes->get('pay/approve/(:num)', 'PaymentController::approve/$1');
	$routes->get('pay/cancel/(:num)', 'PaymentController::cancel/$1');
	$routes->get('pay/expire/(:num)', 'PaymentController::expire/$1');
	$routes->get('pay/check/(:num)', 'PaymentController::check/$1');
	$routes->get('pay', 'PaymentController::pay');
	$routes->post('pay', 'PaymentController::index');
	$routes->get('pay/me', 'PaymentController::me');
	$routes->get('price', 'PaymentController::price');
	$routes->post('user-ui/update/(:num)', 'UserUiController::update/$1');
	$routes->post('users/update/(:num)', 'UserController::update/$1');
});
?>
```

## Development
On first time or installation, Your mut be write:
```bash
npm install
```
Command for development
```bash
npm run build
```
Command for production
```bash
npm run production
```
## Library Frontend
- react@17.0.1
- react-dom@17.0.1
- react-router-dom@5.2.0
- materializecss@1.0.0-rc.2
- jquery@3.5.1
- axios@^0.21.1
- dropzone@^5.7.2
- sweetalert2@10.13.3
- tinymce@5.6.2
- vanilla-lazyload@17.3.0
- googlechart
## Library Backend
- codeigniter@4.0.4
- fakerphp/faker@1.13
- Midtrans
- Firebase/JWT

## Server Requirements

PHP version 7.2 or higher is required, with the following extensions installed:


- [intl](http://php.net/manual/en/intl.requirements.php)
- [libcurl](http://php.net/manual/en/curl.requirements.php) if you plan to use the HTTP\CURLRequest library
- [mbstring](http://php.net/manual/en/mbstring.installation.php)

Additionally, make sure that the following extensions are enabled in your PHP:

- json (enabled by default - don't turn it off)
- xml (enabled by default - don't turn it off)
- [mysqlnd](http://php.net/manual/en/mysqlnd.install.php)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.