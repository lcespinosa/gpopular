<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group([

    'prefix' => 'auth'

], function () use ($router) {

    $router->post('login', 'AuthController@login');
    $router->post('refresh', 'AuthController@refresh');

    $router->post('logout', 'UserController@logout');
    $router->post('profile', 'UserController@profile');
    $router->get('users/{id}', 'UserController@singleUser');
    $router->get('users', 'UserController@allUsers');

});

$router->group([

    'prefix' => 'nomenclature'

], function () use ($router) {

    $router->get('/topics', 'TopicController@index');
    $router->post('/topics', 'TopicController@store');
    $router->put('/topics/{topic}', 'TopicController@update');
    $router->get('/topics/{topic}', 'TopicController@show');
    $router->delete('/topics/{topic}', 'TopicController@delete');

});
