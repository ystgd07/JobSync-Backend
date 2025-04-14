import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    private readonly logger;
    constructor(searchService: SearchService);
    testEndpoint(): {
        success: boolean;
        message: string;
    };
    getJobsByCategory(query: any): Promise<any>;
    getSimpleJobsByCategory(): Promise<any>;
    getJobsByPathCategory(categories: string, limit?: string): Promise<any>;
}
