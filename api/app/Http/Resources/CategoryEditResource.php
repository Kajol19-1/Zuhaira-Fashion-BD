<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Category;

class CategoryEditResource extends JsonResource
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
            'status'        => $this->status,
            'photo_preview' => ImageManager::prepareImageUrl(Category::THUMB_IMAGE_UPLOAD_PATH, $this->photo),

        ];
    }
}
