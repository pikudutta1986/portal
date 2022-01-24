<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function index() {

        return User::all();

    }

    function login(Request $request) {

        $validated = $request->validate([           
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validated) {
            
            $user = User::where('email', $request->email)->first();
           
            if (! $user || ! Hash::check($request->password, $user->password)) {
               
                $response = [
                    'message' => 'The provided credentials are incorrect.',
                ];
        
                return response($response, 200);
            }
        
            $token = $user->createToken('myToken')->plainTextToken;

            $response = [
                'user' => $user,
                'message' => 'logged in',
                'token' => $token
            ];
    
            return response($response, 201);
        }

        // return $response = [
        //             'user' => $request->all(),
        //             'message' => 'logged in',
        //             'token' => 'token'
        //         ];

    }

    function register(Request $request) {

        $validated = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required',
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('myToken')->plainTextToken;

        $response = [
            'user' => $user,
            'message' => 'Successfully Registered',
            'token' => $token
        ];

        return response($response, 201);

    }

    function logout() {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'],200);
    }
}
