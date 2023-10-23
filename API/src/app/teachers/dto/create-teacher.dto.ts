import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { CreateUserDto } from 'src/app/users/dto/create-user.dto';

import { ISchedule } from 'src/common/types/Schedule';

export class CreateTeacherDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @ApiProperty()
  @IsString()
  @Length(7, 8)
  @IsNotEmpty()
  license: string;

  @ApiProperty()
  @IsNotEmpty()
  schedule: ISchedule[];

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  levels: number[];
}
