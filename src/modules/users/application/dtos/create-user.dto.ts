import { Expose, Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(1, 256)
  @Transform(({ value }: { value: string }) =>
    value ? value.toString().trim() : value,
  )
  userName: string;

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
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(8, 256)
  @Transform(({ value }: { value: string }) =>
    value ? value.trim().replace(/\s+/g, '') : value,
  )
  password: string;
}
