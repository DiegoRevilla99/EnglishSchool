import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsNumber()
  parentId: number;
}
