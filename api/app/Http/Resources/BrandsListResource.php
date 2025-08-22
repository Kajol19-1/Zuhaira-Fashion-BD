<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Manager\ImageManager;
use App\Models\Brand;

class BrandsListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
   final public function toArray(Request $request): array
    {
         return [
            'id'=>$this->id,
             'name'=>$this->name,
             'slug'=>$this->slug,
             'description'=>$this->description,
             'serial'=>$this->serial,
             'status'=>$this->status ==1 ? 'Active' : 'Inactive',
             'photo'=>ImageManager::prepareImageUrl(Brand::THUMB_IMAGE_UPLOAD_PATH, $this->logo),
             'photo_full'=>ImageManager::prepareImageUrl(Brand::IMAGE_UPLOAD_PATH, $this->logo),
             'created_by'=>$this->user?->name,
             'created_at'=>$this->created_at->toDayDateTimeString(),
              'updated_at'=>$this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString():'Not updated yet',

        ];
    }
}
