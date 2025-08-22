<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Manager\ImageManager;
use App\Models\SubCategory;

class SubCategoryEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    final public function toArray(Request $request): array
    {
          return [
            'id'            => $this->id,
            'name'          => $this->name,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'serial'        => $this->serial,
            'category_id'        => $this->category_id,
            'status'        => $this->status,
            'photo_preview' => ImageManager::prepareImageUrl(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $this->photo),

        ];
    }
}
