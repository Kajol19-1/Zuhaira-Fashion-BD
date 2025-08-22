<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use Illuminate\Support\Str;
use App\Manager\ImageManager;
use Illuminate\Http\Request;
use App\Http\Resources\BrandsListResource;
use App\Http\Resources\BrandEditResource;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(Request $request)
    {
         $categories = (new Brand())-> getAllBrands($request->all()) ;
         return BrandsListResource::collection($categories);
    }


    /**
     * Store a newly created resource in storage.
     */
   final public function store(StoreBrandRequest $request)
    {
         $brand = $request->except('logo');
        $brand['slug']=Str::slug($request->input('slug'));
        
        $brand['user_id'] = auth()->id();

        if($request->has('logo')){
           $brand['logo'] = $this->processImageUpload($request->input('logo'),  $brand['slug']);
        }
        (new Brand())->storeBrand($brand);
        return response()->json(['msg'=>'Brand Created Successfully', 'cls'=>'success']);

    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandEditResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
          $brand_data = $request->except('logo');
        $brand_data['slug']=Str::slug($request->input('slug'));
        if($request->has('logo')){

             $brand_data['logo']= $this->processImageUpload( $request->input('logo').$brand_data['slug'], $brand->logo);

        }
       $brand->update($brand_data);
        return response()->json(['msg'=>'Brand updated Successfully', 'cls'=>'success']);

    }
    

    /**
     * Remove the specified resource from storage.
     */
final public function destroy(Brand $brand)
    {
        if(!empty($brand->logo)){
           ImageManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH, $brand->logo);
           ImageManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH, $brand->logo);
        }
        $brand->delete();
         return response()->json(['msg'=>'Brand deleted Successfully', 'cls'=>'warning']);

    }

     private function processImageUpload(string $file, string $name, string|null $existing_photo = null){
    
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $path = Brand::IMAGE_UPLOAD_PATH;
            $path_thumb = Brand::THUMB_IMAGE_UPLOAD_PATH;


            if(!empty($existing_photo))
                {
                    ImageManager::deletePhoto(Brand::IMAGE_UPLOAD_PATH, $existing_photo);
                    ImageManager::deletePhoto(Brand::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
                }

                $photo_name = ImageManager::uploadImage($name, $width, $height, $path, $file);
                ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
                return  $photo_name;
        }
}
