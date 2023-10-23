import { ApiProperty } from '@nestjs/swagger';

export class ZoomRequest {
  @ApiProperty()
  role: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  meet: string;
}

export class ZoomResponse {
  signature: string;
}
