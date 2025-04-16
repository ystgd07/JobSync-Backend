export declare class CreateFavoriteJobDto {
    jobId: number;
    notes?: string;
}
export declare class FavoriteJobResponseDto {
    id: number;
    jobId: number;
    notes?: string;
    status: string;
    createdAt: Date;
    job: {
        id: number;
        title: string;
        company: string;
        location?: string;
        annualFrom?: number;
        annualTo?: number;
        dueTime?: Date;
        position?: string;
    };
}
