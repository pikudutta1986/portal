<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

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
        $token = $request->header('APP_KEY');
        // if($token != 'ABCD') {
        //     // return response('key not found', 401)
        //     //       ->header('Content-Type', 'text/plain');
        //     return response()->json(['message' => 'Key Not Found'],401);
        // }        
        return $next($request);
    }
}
