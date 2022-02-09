<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::prefix('server')->group(function () {
    
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/resetPassword', [UserController::class, 'resetPassword']);
    Route::get('/regions', [RegionController::class, 'index']);
    

    Route::group(['middleware' => 'AuthKey'],function() {	
        
        Route::get('/users', [UserController::class, 'index']);

        Route::post('/logout', [UserController::class, 'logout']);
        Route::post('/regionStore', [RegionController::class, 'store']);
        
        Route::post('/fileUpload', [UserController::class, 'fileUpload']);
        Route::post('/getDownloderByRegion', [UserController::class, 'getDownloderByRegion']);        
        Route::post('/uploadFilesToDb', [UserController::class, 'uploadFilesToDb']);
        
    
    });
    // Route::group(['middleware' => 'auth:sanctum'],function() {	
       
    //     Route::post('/logout', [UserController::class, 'logout']);
    
    // });
    
// });