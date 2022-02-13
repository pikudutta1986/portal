<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\upload;
use App\Models\uploadAccess;
use Illuminate\Support\Facades\Hash;
use DB;
use Illuminate\Support\Str;

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

           
            $token_data = DB::table('personal_access_tokens')->insertGetId([
                'tokenable_type' => 'App\Models\User',
                'tokenable_id' => $user->id,
                'name' => $user->email,
                'token' => Str::random(32),
                'abilities' => '[*]',
                'last_used_at' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);

            $token_details = DB::table('personal_access_tokens')->where('id',$token_data)->first();
            
            // $token = $user->createToken($user->email)->plainTextToken;

            $response = [
                'id' => $user->id,
                'type' => $user->userType,
                'user' => $user->email,
                'message' => 'logged in',
                'token' => $token_details->token,
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
            'regions' => 'required',
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

    function logout(Request $request) {

        // $user = request()->user();
        // auth()->user()->tokens()->delete();
        // $request->user()->currentAccessToken()->delete();
        // $accessToken = auth()->user()->token();
        // $token= $request->user()->tokens->find($accessToken);
        // $request->user()->currentAccessToken()->delete();
        $token = $request->header('App-Token');
        $res = DB::table('personal_access_tokens')->where('token', $token)->delete();
        return response()->json(['message' => 'Successfully logged out','status' => $res],200);
    }

    function resetPassword(Request $request) {

        $validated = $request->validate([           
            'email' => 'required',
        ]);

        if($validated) {

            $user = User::where('email', $request->email)->first();
            if (!$user) {
               
                $response = [
                    'message' => 'The provided credentials are incorrect.',
                    'status' => false,
                ];
        
                return response($response, 200);
            } else {
                $to = $user->email;
                $subject = "Password Reset Link";
                $txt = "Hello world!";
                $headers = "From: admin@portal.com" . "\r\n" .
                "CC: demo@portal.com";

                mail($to,$subject,$txt,$headers);
                $response = [
                    'message' => 'Email sent successfully.',
                    'status' => true,
                ];
        
                return response($response, 201);
            }

        }


    }

    function fileUpload(Request $request) {


        echo "<pre>";
       
        $userId = $request->input('userId');      
       
        echo $userId;    
        
        echo "<br>";

        if($request->hasFile('file')){
        
            foreach ($request->files as $file) {
                
                //get file name with extenstion
               echo $fileNameWithExt = $file->getClientOriginalName();
               echo"<br>";
    
                //get just filename
                echo $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
                echo"<br>";
    
                //get extension
                echo $extension = $file->getClientOriginalExtension();
                echo"<br>";
    
                //file to store
                echo $fileNameToStore = $fileName.'_'.time().'.'.$extension;
                echo"<br>";
    
                //upload to store
                // $path = $file->storeAs('${your_storage_path}', $fileNameToStore);
    
                
            }    
            
        }

        // $tmp_name = $_FILES['upload']['tmp_name'];
        // $filename = $_FILES['upload']['name'];
        // $target_file = $target_path.$filename;
        // $num = $_POST['num'];
        // $num_chunks = $_POST['num_chunks'];

        // move_uploaded_file($tmp_name, $target_file.$num);

        // // count ammount of uploaded chunks
        // $chunksUploaded = 0;
        // for ($i = 1; i <= $num; $i++) {
        //     if ( file_exists( $target_file.$i ) ) {
        //         ++$chunksUploaded;
        //     }
        // }

        // // and THAT's what you were asking for
        // // when this triggers - that means your chunks are uploaded
        // if ($chunksUploaded === $num_chunks) {

        //     /* here you can reassemble chunks together */
        //     for ($i = 1; $i <= $num_chunks; $i++) {

        //     $file = fopen($target_file.$i, 'rb');
        //     $buff = fread($file, 2097152);
        //     fclose($file);

        //     $final = fopen($target_file, 'ab');
        //     $write = fwrite($final, $buff);
        //     fclose($final);

        //     unlink($target_file.$i);
        //     }
        // }


        // return response()->json(['message' => $res],200);

    }

    function getDownloderByRegion(Request $request) {

        $validated = $request->validate([           
            'id' => 'required',
        ]);

        if($validated) { 
            
            $user = User::where('id', $request->id)->first();

            $data = DB::table('users')
                                ->where('users.userType', '!=', $user->userType)
                                ->join('regions', 'users.regions', '=', 'regions.id')
                                ->where('users.regions', '=', $user->regions)
                                ->select('users.*')
                                ->get();
            $response = [
                'id' => $user->id,
                'region' => (int)$user->regions,
                'message' => $data,
                'status' => true,
            ];
    
            return response($response, 201);
        }

        

    }

    function uploadFilesToDb(Request $request) {

        $validated = $request->validate([
            'user_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'size' => 'required',
            // 'type' => 'required',
            'bucket' => 'required',
            // 'key' => 'required',
            'location' => 'required',
        ]);

        $res = DB::table('uploads')->insertGetId([
            'user_id' => (int)$request->user_id,
            'name' => $request->name,
            'description' => $request->description,
            'size' => $request->size,
            'type' => $request->type,
            'bucket' => $request->bucket,
            'key' => $request->key,
            'etag' => 'null',
            'location' => $request->location,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),

        ]);

        $response = [
                    'message' => 'Successfully Stored',
                    'id' => $res,
                    'status' => true,
                ];
        
        return response($response, 200);

    }

    function transfer(Request $request) {

        $validated = $request->validate([
            'downloaderids' => 'required',
            'uploaderId' => 'required',            
        ]);

        $uploadDetails = upload::where('user_id', (int)$request->uploaderId)->first();

        if(!empty($uploadDetails->id)) {

            foreach ($request->downloaderids as $downloaderId) {

                $uploadAccessDetails = uploadAccess::where([
                    'uploaderId' => (int)$request->uploaderId,
                    'downloaderId' => (int)$downloaderId,
                ])->first();

                if(empty($uploadAccessDetails->id)) {

                    $user = uploadAccess::create([
                        'uploaderId' => (int)$request->uploaderId,
                        'downloaderId' => (int)$downloaderId,
                        'uploadId' => (int)$uploadDetails->id,
                    ]);

                }
                
            }

            $uploadAccessDetails = uploadAccess::where('uploaderId', (int)$request->uploaderId)->get();
    
            $response = [
                'message' => $uploadAccessDetails,
                'status' => true,
            ];
    
            return response($response, 200);
            
        }
        
    }

    function getDownloadList(Request $request) {

        $validated = $request->validate([           
            'user_id' => 'required',
        ]);

        if($validated) { 
            
            $userAccessDetails = uploadAccess::where('downloaderId', $request->user_id)->first();
            $downloadDetails = upload::where('id', $userAccessDetails->uploadId)->get();
           
            $response = [
                'id' => $request->user_id,
                'message' => $downloadDetails,
                'status' => true,
            ];
    
            return response($response, 201);
        }

        

    }


}
