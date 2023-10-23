import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(99999)
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @Min(1)
  @Max(99999)
  @IsNotEmpty()
  credits: number;

  @IsString()
  @IsNotEmpty()
  paypalId: string;
}
