<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSpecification extends Model
{
    use HasFactory;
    protected $fillable = ['product_id', 'name', 'value'];

    public function storeProductSpecification(array $input, Product $product)
    {
        $specification_data = $this->prepareSpecificationData($input, $product);
        foreach($specification_data as $specification){
            self::create($specification);
        }
        
    }

     final public function prepareSpecificationData(array $input, Product $product)
    {
        $specification_data = [];
        foreach($input as $key=>$value){
            $data['product_id'] =$product->id;
            $data['name'] =$value['name'];
            $data['value'] =$value['value'];
            $specification_data[] = $data;
        }

        return $specification_data;
    }
}
