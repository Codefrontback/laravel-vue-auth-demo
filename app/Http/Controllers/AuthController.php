<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function postRegister(RegisterRequest $request)
    {
        $user = new User();

        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $user->save();

        return response()->json([

            'success' => true
        ]);
    }

    public function postLogin(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $token = null;

        try {
            if (!$token = \JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'errors' => [
                        'message' => [
                            'Either Email or Password Invalid'
                        ]
                    ],
                ]);
            }
        } catch (\JWTAuthException $e) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'message' => [
                        'Either Email or Password Invalid'
                    ]
                ],
            ]);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        $user = Auth::user();

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'user' => $user,
            'token_type' => 'bearer',
        ]);
    }

    public function logout()
    {
        \JWTAuth::invalidate(\JWTAuth::getToken());
        return response()->json([
            'success' => true
        ]);
    }

    public function postSocialLogin(Request $request)
    {
        $existingUser = User::where('email', $request->only('email'))->first();
        $token = null;

        if($existingUser) {

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => \JWTAuth::fromUser($existingUser),
                    'user' => $existingUser,
                    'login' => true,
                ]
            ]);
        }else{

            $user = new User();
            $user->name = $request->get('name');
            $user->email = $request->get('email');
            $user->password = '';
            $user->save();

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => \JWTAuth::fromUser($user),
                    'user' => $user,
                    'login' => true,
                ]
            ]);

        }
    }
}
