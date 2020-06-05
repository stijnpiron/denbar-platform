import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressCreateRequestDto } from './address-create.request.dto';

export class UserCreateRequestDto {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsOptional()
  @ValidateNested()
  public address: AddressCreateRequestDto;
}
