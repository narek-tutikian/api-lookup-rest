import { IpAddressesService } from './ip-addresses.service';

describe('ip lookup service', () => {
  test('get ip lookup', async () => {
    const lookup = await IpAddressesService.getIpAddress('8.8.8.8');
    expect(lookup.success).toBe(true);
  });
  test('delete ip lookup', async () => {
    const ip = '8.8.8.8';
    await IpAddressesService.getIpAddress(ip);
    const isDeleted = await IpAddressesService.deleteLookup(ip);
    expect(isDeleted).toBe(true);
  });
});
