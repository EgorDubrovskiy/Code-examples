<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class FavoritesPolicy
 * @package App\Policies
 */
class FavoritesPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $authUser
     * @param int $favoritesOwnerId
     * @return bool
     */
    public function view(User $authUser, int $favoritesOwnerId): bool
    {
        return $authUser->id === $favoritesOwnerId;
    }

    /**
     * @param User $authUser
     * @param int $favoritesOwnerId
     * @return bool
     */
    public function create(User $authUser, int $favoritesOwnerId): bool
    {
        return $authUser->id === $favoritesOwnerId;
    }

    /**
     * @param User $authUser
     * @param int $favoritesOwnerId
     * @return bool
     */
    public function delete(User $authUser, int $favoritesOwnerId): bool
    {
        return $authUser->id === $favoritesOwnerId;
    }
}
