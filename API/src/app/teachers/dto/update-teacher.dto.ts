import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;
}
