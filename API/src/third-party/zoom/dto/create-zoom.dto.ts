import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateZoomDto {
  @ApiProperty()
  @IsNotEmpty()
  forEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  forZoomId: string;

  @ApiProperty()
  @IsNotEmpty()
  invitedEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  duration: string;
}
