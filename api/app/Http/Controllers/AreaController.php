<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Http\Requests\StoreAreaRequest;
use App\Http\Requests\UpdateAreaRequest;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(int $district_id)
    {
        $areas = (new Area())->getAreaByDistrictId($district_id);
        return response()->json($areas);
    }

    
}
