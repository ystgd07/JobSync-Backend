import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    private readonly logger;
    constructor(searchService: SearchService);
    testEndpoint(query: any): {
        success: boolean;
        message: string;
        receivedQuery: any;
        decodedExperiences: string;
    };
    getJobsByCategory(query: any): Promise<any>;
    getSimpleJobsByCategory(): Promise<any>;
    getJobsByPathCategory(categories: string, limit?: string, experiences?: string): Promise<any>;
}
