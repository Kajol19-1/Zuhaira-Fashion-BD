<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use Illuminate\Support\Str;
use App\Manager\ImageManager;
use App\Http\Resources\SubCategoryListResource;
use App\Http\Resources\SubCategoryEditResource;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(Request $request)
    {
        $categories = (new SubCategory())-> getAllSubCategories($request->all()) ;
        return SubCategoryListResource::collection($categories);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    final public function store(StoreSubCategoryRequest $request)
    {
        $sub_category = $request->except('photo');
        $sub_category['slug']=Str::slug($request->input('slug'));
        
        $sub_category['user_id'] = auth()->id();

        if($request->has('photo')){
           $sub_category['photo'] = $this->processImageUpload($request->input('photo'),  $sub_category['slug']);
        }
        (new SubCategory())->storeSubCategory($sub_category);
        return response()->json(['msg'=>'Sub Category Created Successfully', 'cls'=>'success']);

    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
          return new SubCategoryEditResource($subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    final public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        $sub_category_data = $request->except('photo');
        $sub_category_data['slug']=Str::slug($request->input('slug'));
        if($request->has('photo')){

             $sub_category_data['photo']= $this->processImageUpload( $request->input('photo').$sub_category_data['slug'], $subCategory->photo);

        }
       $subCategory->update($sub_category_data);
        return response()->json(['msg'=>'Sub Category updated Successfully', 'cls'=>'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        if(!empty($subCategory->photo)){
           ImageManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH, $subCategory->photo);
           ImageManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $subCategory->photo);
        }
        $subCategory->delete();
         return response()->json(['msg'=>'Sub category deleted Successfully', 'cls'=>'warning']);
    }

     private function processImageUpload(string $file, string $name, string|null $existing_photo = null){
    
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $path = SubCategory::IMAGE_UPLOAD_PATH;
            $path_thumb = SubCategory::THUMB_IMAGE_UPLOAD_PATH;


            if(!empty($existing_photo))
                {
                    ImageManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH, $existing_photo);
                    ImageManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
                }

          $photo_name = ImageManager::uploadImage($name, $width, $height, $path, $file);
          ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
          return  $photo_name;
        }
}
