import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  paypalId: string;

  @IsDateString()
  @IsNotEmpty()
  start: string;

  @IsDateString()
  @IsNotEmpty()
  expiration: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsNumber()
  @IsNotEmpty()
  planId: number;
}
