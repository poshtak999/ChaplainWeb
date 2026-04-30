import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpsertPtsrPostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsArray()
  sections!: unknown[];
}
