<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; 

class Product extends Model
{
    use HasFactory;
   
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'cost',
        'price',
        'stock',
        'discount_fixed',
        'status',
        'discount_percent',
        'discount_start',
        'discount_end',
        'description',
        'brand_id',
        'country_id',
        'sub_category_id',
        'supplier_id',
        'created_by_id',
        'updated_by_id',
        'category_id',

    ];

    final public function storeProduct(array $input, int $auth_id)
    {
        return self::create( $this->prepareData($input, $auth_id));
    }


    private function prepareData(array $input , int $auth_id)
    {
        return ['brand_id'         =>  $input['brand_id'] ?? 0,
                'category_id'      =>  $input['category_id'] ?? 0,
                'country_id'       =>  $input['country_id'] ?? 0,
                'sub_category_id'  =>  $input['sub_category_id'] ?? 0,
                'supplier_id'      =>  $input['supplier_id'] ?? 0,
                'created_by_id'    => $auth_id,
                'updated_by_id'    =>  $auth_id,
                'cost'             =>  $input['cost'] ?? 0,
                'description'      =>  $input['description'] ?? '',
                'discount_end'     =>  $input['discount_end'] ?? null,
                'discount_fixed'   =>  $input['discount_fixed'] ?? 0,
                'discount_percent' =>  $input['discount_percent'] ?? 0,
                'discount_start'   =>  $input['discount_start'] ?? null,
                'name'             =>  $input['name'] ?? '',
                'price'            =>  $input['price'] ?? 0,
                'sku'              =>  $input['sku'] ?? '',
                'slug'              => $input['slug'] ? Str::slug($input['slug']) : '',
                'status'           =>  $input['status'] ?? 0,
                'stock'            =>  $input['stock'] ?? 0,
        ];
    }

            public const STATUS_ACTIVE = 1;
            public const STATUS_INACTIVE = 0;

    final public function getProductById($id)
    {
        return self::query()->findOrFail($id);
    }

    final public function getProductList($input)
    {
        $per_page = $input['per_page'] ?? 10;

        $query = self::query()->with([

            'category:id,name',
            'sub_category:id,name',
            'brand:id,name',
            'country:id,name',
            'supplier:id,name,phone',
            'created_by:id,name',
            'updated_by:id,name',
            'primary_photo',
            'product_attributes',
            'product_attributes.attributes',
            'product_attributes.attribute_value',
        ]);
         if (!empty($input['search']) ){
          $query->where('name', 'like', '%'. $input['search'].'%')
                ->orWhere('phone', 'like', '%'. $input['search'].'%')
                ->orWhere('email', 'like', '%'. $input['search'].'%');
        }
         if (!empty($input['order_by']) ){
          $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }

        return $query->paginate($per_page);
    }  

    final public function category()
    {
        return $this->belongsTo(Category::class);
    }

    final public function sub_category()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    final public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    final public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    final public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    final public function created_by()
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }
    
    final public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    final public function primary_photo()
    {
        return $this->hasOne(ProductPhoto::class)->where('is_primary', 1);
    } 

     final public function product_attributes()
    {
        return $this->hasMany(ProductAttribute::class);
    } 


}
