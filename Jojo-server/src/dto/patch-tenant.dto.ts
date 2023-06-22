import { IsNumber, IsNumberString } from 'class-validator';

export class AddTenantInputDto {
  @IsNumber()
  property_id: number;
  @IsNumber()
  tenant_id: number;
}
