import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateteUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  displayName?: string;

  @Expose()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Expose()
  @IsString()
  @Length(8, 256)
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value ? value.trim().replace(/\s+/g, '') : value,
  )
  password?: string;
}
