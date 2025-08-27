<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Http\Requests\StoreDistrictRequest;
use App\Http\Requests\UpdateDistrictRequest;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    final public function index(int $division_id)
    {
        $districts = (new District())->getDistrictDivisionId($division_id);
        return response()->json($districts);
    }

}
