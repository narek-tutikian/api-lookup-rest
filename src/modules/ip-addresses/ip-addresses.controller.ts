import {
  Controller,
  Get,
  Middlewares,
  NoSecurity,
  Path,
  Route,
  Tags,
  Delete,
  SuccessResponse,
} from 'tsoa';
import IpAddressesValidation from './ip-addresses.validation';
import { IpAddressesService } from './ip-addresses.service';
import { GetIpLookupDto } from './dtos/get-ip-lookup.dto';

@Route('ip-addresses')
@Tags('ipAddress')
@NoSecurity()
export class ipAddressesController extends Controller {
  /**
   *
   * Get information related to Ip address
   */
  @Get('/{ip}')
  @Middlewares(IpAddressesValidation.validateGetIpAddress)
  @NoSecurity()
  async getApiLookup(@Path('ip') ip: string): Promise<GetIpLookupDto> {
    return await IpAddressesService.getIpAddress(ip);
  }

  /**
   *
   * Get information related to Ip address
   */
  @Delete('/{ip}')
  @Middlewares(IpAddressesValidation.validateGetIpAddress)
  @SuccessResponse(200, 'success')
  @NoSecurity()
  async deleteApiLookup(@Path('ip') ip: string): Promise<void> {
    await IpAddressesService.deleteLookup(ip);
  }
}
