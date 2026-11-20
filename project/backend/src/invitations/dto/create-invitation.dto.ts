import { IsString, IsArray, IsOptional, Length } from 'class-validator';

export class CreateInvitationDto {
  @IsOptional()
  @IsString()
  @Length(3, 16)
  code?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nameUr?: string;

  @IsArray()
  @IsString({ each: true })
  events: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  noteUr?: string;
}
