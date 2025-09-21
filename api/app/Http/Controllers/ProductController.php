<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductListResource;
use App\Models\ProductAttribute;
use App\Models\ProductSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(Request $request)
    {
      $products = (new Product())->getProductList($request);
       return ProductListResource::collection($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
    
        try{
              DB::beginTransaction();
            $product= ( new Product())->storeProduct($request->all(), auth()->id()); 
                if($request->has('attributes')){
                     (new ProductAttribute())->storeAttributeData($request->input('attributes'), $product);
                }

                if($request->has('specifications')){
                   (new ProductSpecification())->storeProductSpecification($request->input('specifications'), $product);
                }

                DB::commit();

        return response()->json(['msg'=>'Product Saved successfully', 'cls'=>'success', 'product_id'=>$product->id]);


        }catch(\Throwable $e){
            info('PRODUCT_SAVE_FAILED',['data'=>$request->all(), 'error'=>$e->getMessage()]);
            DB::rollBack();
            return response()->json(['msg'=>$e->getMessage(), 'cls'=>'warwing']);

        }
     
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
