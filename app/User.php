<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function buffer(){
        return $this->hasMany('App\Models\Card', 'user_id', 'id')->where('stage','buffer');
    }

    public function working(){
        return $this->hasMany('App\Models\Card', 'user_id', 'id')->where('stage','working');
    }

    public function done(){
        return $this->hasMany('App\Models\Card', 'user_id', 'id')->where('stage','done');
    }

    public function archived(){
        return $this->hasMany('App\Models\Card', 'user_id', 'id')->onlyTrashed();
    }
}
