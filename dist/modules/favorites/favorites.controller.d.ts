import { FavoritesService } from './favorites.service';
import { CreateFavoriteJobDto } from './dto/favorite-job.dto';
interface RequestWithUser extends Request {
    user: {
        id: number;
        email: string;
        role?: string;
    };
}
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    addFavorite(req: RequestWithUser, createFavoriteDto: CreateFavoriteJobDto): Promise<import("./entities/favorite-job.entity").FavoriteJob>;
    removeFavorite(req: RequestWithUser, id: number): Promise<{
        success: boolean;
    }>;
    getFavorites(req: RequestWithUser): Promise<import("./entities/favorite-job.entity").FavoriteJob[]>;
    checkFavorite(req: RequestWithUser, jobId: number): Promise<{
        isFavorite: boolean;
    }>;
}
export {};
