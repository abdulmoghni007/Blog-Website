<?php

namespace App\Services;

class UserService
{
    public static function login()
    {
        self::validateFormData();
        $username = $_POST['username'];
        $password = md5($_POST['password']);

        $query = "SELECT user_id FROM users WHERE (username = :username OR email = :username) AND password = :password";
        $user = DB->first($query, ["username" => $username, "password" => $password]);
        if (!$user) {
            return response(["message" => "Username or Password incorrect"], 400);
        }
        $token = self::generateToken();
        $query = "UPDATE users SET token = :token WHERE user_id = :id";
        DB->update($query, ["token" => $token, "id" => $user["user_id"]]);
        return response(["message" => "Login Success", "token" => $token,"validator"=>"true"], 200);
    }

    public static function register()
    {
        self::validateRegisterFormData();
        $username = $_POST['username'];
        $email = $_POST['email'];
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $password = md5($_POST['password']);

        $query = "SELECT * FROM users WHERE username = :username OR email = :email ";
        $user = DB->first($query, ["username" => $username, "email" => $email]);
        if ($user) {
            return response(["message" => "User already Existed"], 400);
        }
        $query = "INSERT INTO users (username, password,email,first_name,last_name)
VALUES (:username, :password,:email,:first_name,:last_name)";
        $user = DB->insert($query, ["username" => $username, "password" => $password, "email" => $email, "first_name" => $first_name, "last_name" => $last_name]);
        return response(["message" => "Register Successful","validator"=>"true"], 200);


    }

    public static function logout()
    {
        $username = Auth->user()["username"];
        $query = "UPDATE users SET token ='' WHERE username=:username;";
        $update=DB->update($query,["username" => $username]);
        if($update){
             return response(["message"=>"User logout Successfully"],201);
        }
        return response(["message"=>"Un-intended thing happen"],400);
    }

    public static function getUser(){
        $username = Auth->user()["username"];
        if($username){
            return response(["message"=>$username,"validator"=>"true"],201);
        }
        return response(["message"=>"Go Back home do not try to mischieve"],400);
    }
    public static function deleteUser()
    {
        $username = $_POST['username'];
        $query = "SELECT id FROM users WHERE username = :username";
        $user = DB->delete($query, ["username" => $username]);
        if ($user) {
            $query = "DELETE FROM users WHERE username = :username ";
            $user = DB->delete($query, ["username" => $username]);
            if ($user) {
                return response(["message" => "User Deleted Successfully"], 200);
            }
            return response(["message" => "User not Deleted"], 400);
        }
        return response(["message" => "User not found"], 400);


    }

    public
    static function generateToken()
    {
        $token = bin2hex(random_bytes(32));
        $query = "SELECT user_id FROM users WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if ($user) {
            return self::generateToken();
        }
        return $token;
    }

    public
    static function validateToken()
    {
        $token = $_POST['token'];
        $query = "SELECT * FROM users WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["message" => "Token is invalid"], 400);
        }
        Auth->setUser($user);
    }

    public
    static function validateFormData()
    {
        if (!isset($_POST['username']) || !isset($_POST['password'])) {
            response(["message" => "Username & Password is required"], 400);
        }
    }

    public static function validateRegisterFormData()
    {
        if (!isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['first_name']) || !isset($_POST['last_name'])) {
            response(["message" => "Some thing in form not filled"], 400);
        }

        $password = $_POST['password'];

        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/';


        if (!preg_match($pattern, $password)) {
            response(["message" => "Please enter valid password"], 400);
        }

        $email = $_POST['email'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            response(["message" => "Please enter valid email"], 400);
        }

    }


}
