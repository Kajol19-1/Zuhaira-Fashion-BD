<?php

namespace App\Http\Controllers;

use App\Models\AttributeValue;
use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use Dotenv\Parser\Value;

class AttributeValueController extends Controller
{
 
    /**
     * Store a newly created resource in storage.
     */
    final public function store(StoreAttributeValueRequest $request)
    {
        $value_data = $request->all();
        $value_data['user_id'] = auth()->id();
        AttributeValue::create($value_data);
        return response()->json(['msg'=>'Value created successfully', 'cls'=>'success']);
    
    }


    /**
     * Update the specified resource in storage.
     */
    final public function update(UpdateAttributeValueRequest $request, AttributeValue $value)
    {
        $value_data = $request->all();
        $value->update($value_data);
        return response()->json(['msg'=>'Value updated successfully', 'cls'=>'success']);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    final public function destroy(AttributeValue $value)
    {
        $value->delete();
        return response()->json(['msg'=>'Value deleted successfully', 'cls'=>'warning']);

    }
}
