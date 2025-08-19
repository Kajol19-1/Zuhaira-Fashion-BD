<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  public const IMAGE_UPLOAD_PATH = 'images/uploads/category/';
  public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/category_thumb/';
    use HasFactory;

    protected $fillable = ['name', 'slug','serial', 'status','description', 'photo', 'user_id'];

  Final public function storeCategory(array $input)
    {
      return  self::query()->create($input);
    }
    final public function getAllCategories()
    {
        return self::query()->with('user:id,name')->orderBy('serial', 'asc')->paginate(5);
    }
    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
