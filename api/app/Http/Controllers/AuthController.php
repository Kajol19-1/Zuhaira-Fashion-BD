<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
   final public function login(AuthRequest $requrst)
    {
        $user = (new User())->getUserByEmailOrPhone($requrst->all());

        if($user && Hash::check($requrst->input('password'), $user->password)){
            $user_data['token'] = $user->createToken('$user->email')->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['phone'] = $user->phone;
            $user_data['photo'] = $user->photo;
            $user_data['email'] = $user->email;
            $user_data['role_id'] = $user->role_id;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['The Provided credencials are incorrect']
        ]);
    }

    final public function logout()
    {
     
        auth()->user()->tokens()->delete();
        return response()->json(['msg'=>'You have successfully logged out']);
    }
}
