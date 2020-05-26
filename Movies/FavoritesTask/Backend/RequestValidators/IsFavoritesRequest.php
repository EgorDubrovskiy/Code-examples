<?php

namespace App\Http\Requests\Favorites;

use App\Http\Requests\BaseRequest;

/**
 * Class IsFavoritesRequest
 * @package App\Http\Requests\Favorites
 */
class IsFavoritesRequest extends BaseRequest
{
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|integer|exists:users,id',
            'movie_id' => 'required|integer',
        ];
    }
}
