import { IsNotEmpty, IsString } from 'class-validator';
import { CreateLevelDto } from 'src/app/levels/dto/create-level.dto';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  level: CreateLevelDto;
}
