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
    $router->get('/agencies/{agency}/topics', 'AgencyController@topics');
    $router->get('/agencies/{agency}/functionaries', 'AgencyController@functionaries');
    $router->delete('/agencies/{agency}', 'AgencyController@delete');

    //TYPES
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
    $router->get('/results', 'ResultController@index');
    $router->post('/results', 'ResultController@store');
    $router->put('/results/{result}', 'ResultController@update');
    $router->get('/results/{result}', 'ResultController@show');
    $router->delete('/results/{result}', 'ResultController@delete');

    //REASON TYPES
    $router->get('/reason_types', 'ReasonTypeController@index');
    $router->post('/reason_types', 'ReasonTypeController@store');
    $router->put('/reason_types/{reason_type}', 'ReasonTypeController@update');
    $router->get('/reason_types/{reason_type}', 'ReasonTypeController@show');
    $router->delete('/reason_types/{reason_type}', 'ReasonTypeController@delete');

    //DEMAND CASES
    $router->get('/demand_cases', 'DemandCaseController@index');
    $router->post('/demand_cases', 'DemandCaseController@store');
    $router->put('/demand_cases/{demand_case}', 'DemandCaseController@update');
    $router->get('/demand_cases/{demand_case}', 'DemandCaseController@show');
    $router->delete('/demand_cases/{demand_case}', 'DemandCaseController@delete');

});

$router->group([

    'prefix' => 'localization'

], function () use ($router) {

    //C POPULARS
    $router->get('/cpopulars', 'CPopularController@index');
    $router->post('/cpopulars', 'CPopularController@store');
    $router->put('/cpopulars/{cpopular}', 'CPopularController@update');
    $router->get('/cpopulars/{cpopular}', 'CPopularController@show');
    $router->get('/cpopulars/{cpopular}/streets', 'CPopularController@streets');
    $router->delete('/cpopulars/{cpopular}', 'CPopularController@delete');

    //STREETS
    $router->get('/streets', 'StreetController@index');
    $router->post('/streets', 'StreetController@store');
    $router->put('/streets/{street}', 'StreetController@update');
    $router->get('/streets/{street}', 'StreetController@show');
    $router->get('/streets/{street}/contacts', 'StreetController@contacts');
    $router->delete('/streets/{street}', 'StreetController@delete');

    //CONTACTS
    $router->get('/contacts', 'ContactController@index');
    $router->post('/contacts', 'ContactController@store');
    $router->put('/contacts/{contact}', 'ContactController@update');
    $router->get('/contacts/{contact}', 'ContactController@show');
    $router->delete('/contacts/{contact}', 'ContactController@delete');
    $router->get('/anonymous', 'ContactController@anonymous');

    //ADDRESSES
    $router->get('/addresses', 'AddressController@index');
    $router->post('/addresses', 'AddressController@store');
    $router->put('/addresses/{address}', 'AddressController@update');
    $router->get('/addresses/{address}', 'AddressController@show');
    $router->delete('/addresses/{address}', 'AddressController@delete');

});

$router->group([

    'prefix' => 'management'

], function () use ($router) {

    //DEMANDS
    $router->get('/demands', 'DemandController@index');
    $router->post('/demands', 'DemandController@store');
    $router->put('/demands/{demand}', 'DemandController@update');
    $router->get('/demands/{demand}', 'DemandController@show');
    $router->get('/demands/{demand}/replies', 'DemandController@replies');
    $router->delete('/demands/{demand}', 'DemandController@delete');

    //REPLIES
    $router->get('/replies', 'ReplyController@index');
    $router->post('/replies', 'ReplyController@store');
    $router->put('/replies/{reply}', 'ReplyController@update');
    $router->get('/replies/{reply}', 'ReplyController@show');
    $router->delete('/replies/{reply}', 'ReplyController@delete');

});
