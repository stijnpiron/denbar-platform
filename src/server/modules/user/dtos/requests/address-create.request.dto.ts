import { IsString } from 'class-validator';

export class AddressCreateRequestDto {
  @IsString()
  public street: string;
  @IsString()
  public city: string;
  @IsString()
  public country: string;
}
