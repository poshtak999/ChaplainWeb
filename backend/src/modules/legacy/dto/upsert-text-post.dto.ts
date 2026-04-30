import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertTextPostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
