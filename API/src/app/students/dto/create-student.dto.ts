import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from 'src/app/users/dto/create-user.dto';

export class CreateStudentDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  level: string;
}
