<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    public const IMAGE_UPLOAD_PATH = 'images/uploads/brand/';
    public const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/brand_thumb/';
    public const STATUS_ACTIVE = 1;

    
    protected $fillable = ['name', 'slug','serial', 'status','description', 'logo', 'user_id'];

     final public function storeBrand(array $input)
    {
      return  self::query()->create($input);
    }

    final public function getAllBrands(array $input)
    {

        $per_page = $input['per_page'] ?? 10;
        $query =self::query();
        if (!empty($input['search']) ){
          $query->where('name', 'like', '%'. $input['search'].'%');
        }
        if (!empty($input['order_by']) ){
          $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }
    final public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function getBrandNameAndId()
    {
      return self::query()->select('id', 'name')->where('status', self::STATUS_ACTIVE)->get();
    }

}
