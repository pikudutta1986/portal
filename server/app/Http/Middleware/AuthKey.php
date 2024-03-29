<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use DB;

class AuthKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // $token = \Request::header('App-Token');
        $token = $request->header('App-Token');
               
        if ($token_details = DB::table('personal_access_tokens')->where('token',$token)->first())
        {            
                // Auth::login($user);
                return $next($request);
        }
        
        $response = [
                'message' => 'Invalid Token',
                'status' => false,
        ];
        return response($response, 400);
    }
}
