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

    //TOPICS
    $router->get('/topics', 'TopicController@index');
    $router->post('/topics', 'TopicController@store');
    $router->put('/topics/{topic}', 'TopicController@update');
    $router->get('/topics/{topic}', 'TopicController@show');
    $router->delete('/topics/{topic}', 'TopicController@delete');

    //FUNCTIONARIES
    $router->get('/functionaries', 'FunctionaryController@index');
    $router->post('/functionaries', 'FunctionaryController@store');
    $router->put('/functionaries/{functionary}', 'FunctionaryController@update');
    $router->get('/functionaries/{functionary}', 'FunctionaryController@show');
    $router->delete('/functionaries/{functionary}', 'FunctionaryController@delete');

    //AGENCIES
    $router->get('/agencies', 'AgencyController@index');
    $router->post('/agencies', 'AgencyController@store');
    $router->put('/agencies/{agency}', 'AgencyController@update');
    $router->get('/agencies/{agency}', 'AgencyController@show');
    $router->delete('/agencies/{agency}', 'AgencyController@delete');

    //TOPICS
    $router->get('/types', 'TypeController@index');
    $router->post('/types', 'TypeController@store');
    $router->put('/types/{type}', 'TypeController@update');
    $router->get('/types/{type}', 'TypeController@show');
    $router->delete('/types/{type}', 'TypeController@delete');

    //WAYS
    $router->get('/ways', 'WayController@index');
    $router->post('/ways', 'WayController@store');
    $router->put('/ways/{way}', 'WayController@update');
    $router->get('/ways/{way}', 'WayController@show');
    $router->delete('/ways/{way}', 'WayController@delete');

    //STATUS
    $router->get('/statuses', 'StatusController@index');
    $router->post('/statuses', 'StatusController@store');
    $router->put('/statuses/{status}', 'StatusController@update');
    $router->get('/statuses/{status}', 'StatusController@show');
    $router->delete('/statuses/{status}', 'StatusController@delete');

    //REASON TYPES
    $router->get('/reason_types', 'ReasonTypeController@index');
    $router->post('/reason_types', 'ReasonTypeController@store');
    $router->put('/reason_types/{reason_type}', 'ReasonTypeController@update');
    $router->get('/reason_types/{reason_type}', 'ReasonTypeController@show');
    $router->delete('/reason_types/{reason_type}', 'ReasonTypeController@delete');

});
