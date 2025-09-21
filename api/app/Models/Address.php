<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['address', 'addressable_id', 'addressable_type', 'area_id', 'district_id', 'division_id', 'status', 'type', 'landmark'];

    const STATUS_ACTIVE =1;
    const STATUS_INACTIVE =0;

    const SUPPLIER_ADDRESS = 1;
    const CUSTOMER_PERMANENT_ADDRESS = 2;
    const CUSTOMER_PRESENT_ADDRESS = 3;


    final public function prepareData(array $input)
    {
        $address['address']         = $input['address'] ?? '';
        $address['area_id']         = $input['area_id'] ?? '';
        $address['district_id']     = $input['district_id'] ?? '';
        $address['division_id']     = $input['division_id'] ?? '';
        $address['landmark']        = $input['landmark'] ?? '';
        $address['status']          = self::STATUS_ACTIVE;
        $address['type']            =  self::SUPPLIER_ADDRESS;

        return $address;
    }

    final public function addressable()
    {
        return $this->morphTo();
    }

    final public function division()
    {
        return $this->belongsTo(Division::class);
    }

    final public function district()
    {
        return $this->belongsTo(District::class);
    }

    final public function area()
    {
        return $this->belongsTo(Area::class);
    }

    final public function deleteAddressBySupplierId(Supplier $supplier)
    {
        return $supplier->address()->delete();
    }

    final public function deleteAddressByShopId(Shop $shop)
    {
        return $shop->address()->delete();
    }
}
