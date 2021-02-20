<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
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

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
