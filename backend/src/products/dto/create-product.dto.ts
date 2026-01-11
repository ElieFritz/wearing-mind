
import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum CollectionType {
  NEW_DROP = 'New Drop',
  LIMITED = 'Limited',
  ESSENTIALS = 'Essentials',
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsEnum(CollectionType)
  collectionType: CollectionType;

  @IsNumber()
  basePrice: number;

  @IsOptional()
  @IsNumber()
  promoPrice?: number;

  @IsString()
  descriptionShort: string;

  @IsString()
  descriptionLong: string;

  @IsOptional()
  techSpecs?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
