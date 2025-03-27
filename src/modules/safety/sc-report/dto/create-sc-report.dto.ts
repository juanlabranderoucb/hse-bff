import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateScReportDto {
  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(16)
  @Transform(({ value }: { value: string }) =>
    value ? value.toString().trim() : value,
  )
  description: string;
}
