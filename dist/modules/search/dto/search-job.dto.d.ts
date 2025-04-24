export declare enum JobCategory {
    FRONTEND = "frontend",
    BACKEND = "backend",
    MOBILE = "mobile",
    DEVOPS = "devops",
    DATA = "data",
    SECURITY = "security",
    FULLSTACK = "fullstack"
}
export declare enum Region {
    SEOUL = "\uC11C\uC6B8",
    GYEONGGI = "\uACBD\uAE30",
    INCHEON = "\uC778\uCC9C",
    BUSAN = "\uBD80\uC0B0",
    DAEJEON = "\uB300\uC804",
    DAEGU = "\uB300\uAD6C",
    GWANGJU = "\uAD11\uC8FC",
    OTHER = "\uAE30\uD0C0"
}
export declare class JobDto {
    id: number;
    source: string;
    externalId: string;
    title: string;
    company: string;
    location?: string;
    position?: string;
    annualFrom?: number;
    annualTo?: number;
    detailUrl?: string;
    dueTime?: Date;
    status: string;
}
export declare class SearchJobDto {
    categories?: string[];
    regions?: string[];
    annualExperience?: number;
    cursor?: string;
    limit?: number;
}
export declare class SearchResponseDto {
    jobs: JobDto[];
    nextCursor: string | null;
    hasNextPage: boolean;
    totalCount: number;
    categoryCounts: Record<string, number>;
    regionCounts: Record<string, number>;
}
