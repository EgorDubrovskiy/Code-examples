<?php

namespace App\Http\Requests\Favorites;

use App\Http\Requests\BaseRequest;

/**
 * Class FavoritesRequest
 * @package App\Http\Requests\Favorites
 */
class FavoritesRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        $rules = [];

        switch ($this->method()) {
            case 'POST':
                $rules = [
                    'user_id' => 'required|integer|exists:users,id',
                    'movie_id' => "required|integer|unique:user_favorites,movie_id,NULL,id,user_id,$this->user_id,deleted_at,NULL",
                ];
            break;
            case 'DELETE':
                $rules = [
                    'user_id' => 'required|integer|exists:users,id',
                    'movie_id' => "required|integer|exists:user_favorites,movie_id,user_id,$this->user_id,deleted_at,NULL",
                ];
            break;
        }

        return $rules;
    }
}
