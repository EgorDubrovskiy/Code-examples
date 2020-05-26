<?php

namespace App\Http\Controllers\Movies;

use App\Http\Requests\Favorites\IsFavoritesRequest;
use App\Http\Requests\Favorites\FavoritesRequest;
use App\Models\Favorites;
use App\Repositories\FavoritesRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Auth\Access\AuthorizationException;

/**
 * Class UserFavoritesController
 * @package App\Http\Controllers\Movies
 */
class UserFavoritesController extends BaseController
{
    /** @var FavoritesRepository */
    protected $favoritesRepository;

    /**
     * UserFavoritesController constructor.
     * @param FavoritesRepository $favoritesRepository
     */
    public function __construct(FavoritesRepository $favoritesRepository)
    {
        parent::__construct();

        $this->favoritesRepository = $favoritesRepository;
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $favorites = $this->favoritesRepository->findById($id);

        return $this->baseResponse($favorites);
    }

    /**
     * @param IsFavoritesRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function isFavorites(IsFavoritesRequest $request): JsonResponse
    {
        $requestData = $request->validated();
        $userId = $requestData['user_id'];
        $movieId = $requestData['movie_id'];

        $this->authorize('view', [Favorites::class, $userId]);

        $isFavorites = $this->favoritesRepository->isFavorites($userId, $movieId);

        return $this->baseResponse($isFavorites);
    }

    /**
     * @param FavoritesRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(FavoritesRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $userId = $validated['user_id'];

        $this->authorize('create', [Favorites::class, $userId]);

        $favorites = $this->favoritesRepository->store($validated);

        return $this->baseResponse($favorites);
    }

    /**
     * @param FavoritesRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(FavoritesRequest $request): JsonResponse
    {
        $requestData = $request->validated();
        $userId = $requestData['user_id'];
        $movieId = $requestData['movie_id'];

        $this->authorize('delete', [Favorites::class, $userId]);

        $this->favoritesRepository->delete($userId, $movieId);

        return $this->baseResponse();
    }
}
