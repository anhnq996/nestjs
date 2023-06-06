// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
