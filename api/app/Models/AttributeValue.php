<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'attribute_id', 'status', 'user_id'];
    
    
    final public function user()
    {
        return $this->belongsTo(User::class);
    }
}
