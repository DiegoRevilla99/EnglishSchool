import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateUnitDto } from 'src/app/units/dto/create-unit.dto';

import { FileType } from 'src/common/types/Lesson';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  teacherFiles: FileType[];

  @IsArray()
  @IsOptional()
  teacherLinks: string[];

  @IsArray()
  @IsOptional()
  studentFiles: FileType[];

  @IsArray()
  @IsOptional()
  studentLinks: string[];

  @IsString()
  @IsNotEmpty()
  teacherNotes: string;

  @IsString()
  @IsNotEmpty()
  studentNotes: string;

  @IsNumber()
  @IsNotEmpty()
  fromSessionNumber: number;

  @IsNumber()
  @IsNotEmpty()
  toSessionNumber: number;

  unit: number;
}
