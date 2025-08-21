<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImageManager;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   Final public function index(Request $request )
    {
      $categories = (new Category())-> getAllCategories($request->all()) ;
      return CategoryListResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = $request->except('photo');
        $category['slug']=Str::slug($request->input('slug'));
        
        $category['user_id'] = auth()->id();

        if($request->has('photo')){
           $category['photo'] = $this->processImageUpload($request->input('photo'),  $category['slug']);
        }
        (new Category())->storeCategory($category);
        return response()->json(['msg'=>'Category Created Successfully', 'cls'=>'success']);

    }

    /**
     * Display the specified resource.
     */
    final public function show(Category $category)
    {
        return new CategoryEditResource($category);
    }

    
    /**
     * Update the specified resource in storage.
     */
    final public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category_data = $request->except('photo');
        $category_data['slug']=Str::slug($request->input('slug'));
        if($request->has('photo')){

             $category_data['photo']= $this->processImageUpload( $request->input('photo').$category_data['slug'], $category->photo);

        }
       $category->update($category_data);
        return response()->json(['msg'=>'Category updated Successfully', 'cls'=>'success']);

    }

    /**
     * Remove the specified resource from storage.
     */
    final public function destroy(Category $category)
    {
        if(!empty($category->photo)){
           ImageManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $category->photo);
           ImageManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $category->photo);
        }
        $category->delete();
         return response()->json(['msg'=>'Category deleted Successfully', 'cls'=>'warning']);

    }

    final public function get_category_list()
    {
        $categories = (new Category())->getCategoryIdAndName();
        return response()->json($categories);
    }


    private function processImageUpload(string $file, string $name, string|null $existing_photo = null){
    
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $path = Category::IMAGE_UPLOAD_PATH;
            $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;


            if(!empty($existing_photo))
                {
                    ImageManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $existing_photo);
                    ImageManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
                }

          $photo_name = ImageManager::uploadImage($name, $width, $height, $path, $file);
          ImageManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);
          return  $photo_name;
        }

}
