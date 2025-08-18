<?php

namespace App\Manager;
use Intervention\Image\Facades\Image;

class ImageManager{

    public const DEFAULT_IMAGE ='images/default.webp';

    public static function uploadImage(string $name, int $width, int $height, string $path, string $file)
    {
        $image_file_name = $name.'.webp';
        Image::make($file)->fit($width, $height)->save(public_path($path).$image_file_name, quality:50, format:'webp' );
        return $image_file_name;
    }

    final public static function deletePhoto(string $path, string $img)
    {
        $path = public_path($path).$img;
        if($img != '' && file_exists($path)){
            unlink($path);
        }

    }

   final public static function prepareImageUrl(string $path, string|null $image)
    {
        $url=url($path.$image);
        if(empty($image)){
            $url=url(self::DEFAULT_IMAGE);
        }
        return $url;
    }
}
?>