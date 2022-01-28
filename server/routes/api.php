<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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


Route::prefix('server')->group(function () {
    
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/resetPassword', [UserController::class, 'resetPassword']);
    Route::get('/users', [UserController::class, 'index']);

    Route::group(['middleware' => 'auth:sanctum'],function() {	

        Route::post('/logout', [UserController::class, 'logout']);
        
        Route::post('/fileUpload', [UserController::class, 'fileUpload']);
        // Route::get('/dashboard',[AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    });
    
});