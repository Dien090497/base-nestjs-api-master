import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsPositive } from 'class-validator';

export class GetRequestParam {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  limit?: number = 11;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  sortfield?: string = 'id';

  @IsIn(['DESC', 'ASC'])
  @IsOptional()
  sortby?: 'ASC' | 'DESC' = 'DESC';
}
