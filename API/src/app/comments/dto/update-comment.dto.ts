import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
