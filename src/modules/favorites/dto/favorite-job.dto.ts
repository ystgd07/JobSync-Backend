import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteJobDto {
  @ApiProperty({ description: '공고 ID' })
  @IsNumber()
  jobId: number;

  @ApiProperty({ description: '메모 (선택사항)', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class FavoriteJobResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  jobId: number;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
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
