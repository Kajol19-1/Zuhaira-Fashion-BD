<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Http\Resources\ShopEditResource;
use App\Http\Resources\ShopListResource;
use App\Models\Address;
use App\Manager\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shops = (new Shop())->getShopList($request->all());
        return ShopListResource::collection($shops);
    }

    /**
     * Store a newly created resource in storage.
     */
    final public function store(StoreShopRequest $request)
    {
        $shop = (new Shop())->prepareData($request->all(), auth());
       $address = (new Address())->prepareData($request->all());
        if($request->has ('logo')){
            $name =Str::slug($shop['name']. now());
            $shop['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::IMAGE_UPLOAD_PATH,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,
                Shop::THUMB_IMAGE_UPLOAD_PATH,
                Shop::LOGO_THUMB_WIDTH,
                Shop::LOGO_THUMB_HEIGHT
            );
        }

        // When data insert in multiple table then we use try and catch

        try{
            DB::beginTransaction();
             $shop = Shop::create($shop);
             $shop->address()->create($address);
             DB::commit();
              return response()->json(['msg'=>'Shop added Successfully', 'cls'=>'success']);

        }catch (\Throwable $e){
            if(isset($shop['logo']))
            {
                 ImageManager::deletePhoto( Shop::IMAGE_UPLOAD_PATH , $shop['logo']);
                 ImageManager::deletePhoto( Shop::THUMB_IMAGE_UPLOAD_PATH , $shop['logo']);
            }
           
            info('SUPPLIER_STORE_FAILED', ['shop' => $shop, 'address' => $address, 'exception' => $e]);
            DB::rollBack();
              return response()->json(['msg'=>'Something is goning wrong', 'cls'=>'warning', 'flag'=>'true']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
         $shop->load('address');
        return new ShopEditResource($shop);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopRequest $request, Shop $shop)
    {
         $shop_data = (new Shop())->prepareData($request->all(), auth());
       $address_data = (new Address())->prepareData($request->all());
        if($request->has ('logo')){
            $name =Str::slug($shop_data['name']. now());
            $shop_data['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::IMAGE_UPLOAD_PATH,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,
                Shop::THUMB_IMAGE_UPLOAD_PATH,
                Shop::LOGO_THUMB_WIDTH,
                Shop::LOGO_THUMB_HEIGHT,
                $shop->logo
            );
        }

        // When data insert in multiple table then we use try and catch

        try{
            DB::beginTransaction();
             $shop_data = $shop->update($shop_data);
             $shop->address()->update($address_data);
             DB::commit();
              return response()->json(['msg'=>'Shop updated Successfully', 'cls'=>'success']);

        }catch (\Throwable $e){
            info('SUPPLIER_STORE_FAILED', ['supplier' => $shop_data, 'address' => $address_data, 'exception' => $e]);
            DB::rollBack();
              return response()->json(['msg'=>'Something is goning wrong', 'cls'=>'warning', 'flag'=>'true']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
          if(!empty($shop->logo))
            {
                 ImageManager::deletePhoto( Shop::IMAGE_UPLOAD_PATH , $shop['logo']);
                 ImageManager::deletePhoto( Shop::THUMB_IMAGE_UPLOAD_PATH , $shop['logo']);
            }
        (new Address())->deleteAddressByShopId($shop);
        $shop->delete();
        return response()->json(['msg'=>'Shop deleted Successfully', 'cls'=>'warning']);
    }
}
