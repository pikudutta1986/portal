<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use DB;
use Illuminate\Support\Str;
use DateTime;

class AccountController extends Controller
{
    function refer(Request $request) {

        $validated = $request->validate([
            'email' => 'required',
            'userId' => 'required|email',           
        ]);

        if($validated) {

            $token = Str::random(32);

            $generatedLink = "http://206.189.231.209/#/vendor/signUp?referralId=$request->userId&token=$token"; 
            
            $baseUrl = url('');
            $referLink = url("#/vendor/signUp?referralId={$request->userId}&token={$token}");
            
            $link = $baseUrl.'/'.$referLink;
            
            $user = Account::create([
                        'referralId' => $request->userId,
                        'token' => $token,
                        'status' => 1,                        
                    ]);

            $to = $request->email;
            $subject = "Auto Generated Link For Registration on Portal";

            $message = "
                    <html>
                    <head>
                    <title>HTML email</title>
                    </head>
                    <body>
                    <p>This email contains HTML Tags!</p>
                    <table>
                    <tr>
                    <th></th>
                    </tr>
                    <tr>
                    <td>{$generatedLink}</td>
                    </tr>
                    </table>
                    </body>
                    </html>
                ";

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headers .= 'From: <support@tucoportal.com>' . "\r\n";
            $headers .= 'Cc: admin@tucoportal.com' . "\r\n";

            mail($to,$subject,$message,$headers);

            $response = [
                'link' => $generatedLink,               
                'message' => 'Link Generated For'.''.$to ,
                'token' => null,
                'status' => true,
            ];
    
            return response($response, 201);

        }

    }

    function checkTokenForRegister(Request $request) {

        $validated = $request->validate([
            'userId' => 'required',
            'token' => 'required',           
        ]);

        if($validated) {           

            $data = Account::where([
                                    'referralId' => (int)$request->userId,
                                    'token' => $request->token,
                                    'status' => 1
                                ])->first();
            if(empty($data)) {

                $msg = 'Invalid Token';
                $status = false;
                $res = [];

            } else {

                $creationTime = date("Y-m-d H:i:s A", strtotime($data->created_at));

                $expiredTime = date('Y-m-d H:i:s A', strtotime($creationTime . ' + 12 hours'));

                $currenttime = date("Y-m-d H:i:s A");                               

                if($currenttime < $expiredTime) {                   
                    
                    $res = $data;
                    $msg = 'success';
                    $status = true;                  

                } else {
                    $res = [];
                    $msg = 'Token Expired on '.$expiredTime;
                    $status = false;

                }
                
            }

            $response = [
                'res' => $res,
                'message' => $msg,
                'status' => $status,
            ];
    
            return response($response, 201);

        }

    }

    function referalRegister(Request $request) {

        $validated = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'regions' => 'required',
            'password' => 'required',
        ]);

        $user = DB::table('users')
                        ->where('email', '=', $request->email)
                        ->orWhere('phone', $request->phone)
                        ->first();

        if(empty($user)) {          

            $data = Account::where([
                                'token' => $request->token,
                                'status' => 1
                            ])->update(['status' => $request->refererralId]);
            

            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'phone' => $request->phone,
                'regions' => (int)$request->regions,
                'userType' => $request->userType,
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
}
