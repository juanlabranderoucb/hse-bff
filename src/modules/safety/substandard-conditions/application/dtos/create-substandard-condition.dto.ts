import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSubstandardConditionDto {
  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(16)
  @Transform(({ value }: { value: string }) =>
    value ? value.toString().trim() : value,
  )
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(16)
  @Transform(({ value }: { value: string }) =>
    value ? value.toString().trim() : value,
  )
  location: string;
}
