<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use DB;

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
            
            // $user = User::where('email', $request->email)->first();

            $user = User::select('*')
                        ->where('email', '=', $request->email)
                        ->orWhere('phone', $request->email)
                        ->first();
           
            if (! $user || ! Hash::check($request->password, $user->password)) {
               
                $response = [
                    'message' => 'The provided credentials are incorrect.',
                    'status' => false,
                ];
        
                return response($response, 200);
            }
            
            $token = $user->createToken($user->email)->plainTextToken;

            $response = [
                'user' => $user->email,
                'message' => 'logged in',
                'token' => $token,
                'status' => true,
            ];
    
            return response($response, 201);
        }        

    }

    function register(Request $request) {

        $validated = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required',
        ]);

        $user = DB::table('users')
                        ->where('email', '=', $request->email)
                        ->orWhere('phone', $request->phone)
                        ->first();

        // $user = User::where('email', $request->email)->first();

        if(empty($user)) {

            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);

            $response = [
                        'user' => $user,
                        'message' => 'Successfully Registered',
                        'token' => null,
                        'status' => true,
                    ];
            
            return response($response, 200);

        } else {

            $response = [                
                'message' => 'Data already Registered',
                'token' => null,
                'status' => false,
            ];
    
            return response($response, 200);

        }        

    }

    function logout() {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'],200);
    }
}
