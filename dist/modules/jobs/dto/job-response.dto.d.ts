export declare class JobDto {
    id: number;
    source: string;
    externalId: string;
    title: string;
    company: string;
    location: string;
    annualFrom: number;
    annualTo: number;
    detailUrl: string;
    dueTime: Date;
    postedDate: Date;
    status: string;
}
export declare class JobPaginatedResponseDto {
    jobs: JobDto[];
    nextCursor: string | null;
    hasNextPage: boolean;
}
