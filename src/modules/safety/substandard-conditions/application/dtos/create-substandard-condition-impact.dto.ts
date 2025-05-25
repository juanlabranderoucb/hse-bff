import { Expose, Transform } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSubstandardConditionImpactDto {
  @Expose()
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  substandardConditionReportId: number;

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
