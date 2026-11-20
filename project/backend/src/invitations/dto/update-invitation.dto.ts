import { IsString, IsArray, IsOptional, Length } from 'class-validator';

export class UpdateInvitationDto {
  @IsOptional()
  @IsString()
  @Length(3, 16)
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nameUr?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  events?: string[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  noteUr?: string;
}
