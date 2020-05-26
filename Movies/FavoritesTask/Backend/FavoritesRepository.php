<?php

namespace App\Repositories;

use App\Models\Favorites;

/**
 * Class FavoritesRepository
 * @package App\Repositories
 */
class FavoritesRepository extends CoreRepository
{
    /**
     * @return string
     */
    protected function getModelClass(): string
    {
        return Favorites::class;
    }

    /**
     * @param int $id
     * @return Favorites|null
     */
    public function findById(int $id):? Favorites
    {
        $favorites = $this->getNewBuilder()->find($id);

        return $favorites;
    }

    /**
     * @param int $userId
     * @param int $movieId
     * @return bool
     */
    public function isFavorites(int $userId, int $movieId): bool
    {
        return $this
            ->getNewBuilder()
            ->where('user_id', $userId)
            ->where('movie_id', $movieId)
            ->whereNull('deleted_at')
            ->exists();
    }

    /**
     * @param $attributes
     * @return Favorites
     */
    public function store($attributes): Favorites
    {
        $favorites = $this->getNewBuilder()->create($attributes);

        return $favorites;
    }

    /**
     * @param int $userId
     * @param int $movieId
     * @return int
     */
    public function delete(int $userId, int $movieId): int
    {
        return $this
            ->getNewBuilder()
            ->where('user_id', $userId)
            ->where('movie_id', $movieId)
            ->delete();
    }
}
