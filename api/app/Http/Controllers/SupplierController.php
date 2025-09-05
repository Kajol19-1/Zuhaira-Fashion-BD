<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   final public function index(Request $request)
    {
    
        $suppliers = (new Supplier())->getSupplierList($request->all());
        return SupplierListResource::collection($suppliers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
       $supplier = (new Supplier())->prepareData($request->all(), auth());
       $address = (new Address())->prepareData($request->all());
        if($request->has ('logo')){
            $name =Str::slug($supplier['name']. now());
            $supplier['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::IMAGE_UPLOAD_PATH,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_HEIGHT,
                Supplier::THUMB_IMAGE_UPLOAD_PATH,
                Supplier::LOGO_THUMB_WIDTH,
                Supplier::LOGO_THUMB_HEIGHT
            );
        }

        // When data insert in multiple table then we use try and catch

        try{
            DB::beginTransaction();
             $supplier = Supplier::create($supplier);
             $supplier->address()->create($address);
             DB::commit();
              return response()->json(['msg'=>'Supplier added Successfully', 'cls'=>'success']);

        }catch (\Throwable $e){
            if(isset($supplier['logo']))
            {
                 ImageManager::deletePhoto( Supplier::IMAGE_UPLOAD_PATH , $supplier['logo']);
                 ImageManager::deletePhoto( Supplier::THUMB_IMAGE_UPLOAD_PATH , $supplier['logo']);
            }
           
            info('SUPPLIER_STORE_FAILED', ['supplier' => $supplier, 'address' => $address, 'exception' => $e]);
            DB::rollBack();
              return response()->json(['msg'=>'Something is goning wrong', 'cls'=>'warning', 'flag'=>'true']);
        }
       
        
    }

    /**
     * Display the specified resource.
     */
    final public function show(Supplier $supplier)
    {
        $supplier->load('address');
        return new SupplierEditResource($supplier);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
       $supplier_data = (new Supplier())->prepareData($request->all(), auth());
       $address_data = (new Address())->prepareData($request->all());
        if($request->has ('logo')){
            $name =Str::slug($supplier_data['name']. now());
            $supplier_data['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::IMAGE_UPLOAD_PATH,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_HEIGHT,
                Supplier::THUMB_IMAGE_UPLOAD_PATH,
                Supplier::LOGO_THUMB_WIDTH,
                Supplier::LOGO_THUMB_HEIGHT,
                $supplier->logo
            );
        }

        // When data insert in multiple table then we use try and catch

        try{
            DB::beginTransaction();
             $supplier_data = $supplier->update($supplier_data);
             $supplier->address()->update($address_data);
             DB::commit();
              return response()->json(['msg'=>'Supplier updated Successfully', 'cls'=>'success']);

        }catch (\Throwable $e){
            info('SUPPLIER_STORE_FAILED', ['supplier' => $supplier_data, 'address' => $address_data, 'exception' => $e]);
            DB::rollBack();
              return response()->json(['msg'=>'Something is goning wrong', 'cls'=>'warning', 'flag'=>'true']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
   final public function destroy(Supplier $supplier)
    {
         if(!empty($supplier->logo))
            {
                 ImageManager::deletePhoto( Supplier::IMAGE_UPLOAD_PATH , $supplier['logo']);
                 ImageManager::deletePhoto( Supplier::THUMB_IMAGE_UPLOAD_PATH , $supplier['logo']);
            }
        (new Address())->deleteAddressBySupplierId($supplier);
        $supplier->delete();
        return response()->json(['msg'=>'Supplier deleted Successfully', 'cls'=>'warning']);
    }

    
}
