import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsDateString()
  @IsNotEmpty()
  sessionDate: string;

  @IsOptional()
  @IsBoolean()
  isFirst: boolean;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsNumber()
  @IsNotEmpty()
  sessionNumber: number;

  @IsNumber()
  @IsNotEmpty()
  availableCredits: number;
}
