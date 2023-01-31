import {
  Controller,
  Get,
  Middlewares,
  NoSecurity,
  Path,
  Route,
  Tags,
} from 'tsoa';
import IpAddressesValidation from "./ip-addresses.validation";
import {IpAddressesService} from "./ip-addresses.service";

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
  async postSeedDeviceData(
    @Path('ip') ip: string,
  ) {
    await IpAddressesService.getIpAddress(ip);
  }
}
