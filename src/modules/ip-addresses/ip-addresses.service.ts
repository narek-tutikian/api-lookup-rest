import fetch from 'node-fetch';
import ipAddressesError from './ip-addresses.error';
import { IpAddressRepository } from '../../repositories/ip-address.repository';
import { GetIpLookupDto } from './dtos/get-ip-lookup.dto';
const ipwhoisBaseUrl = process.env.ipwhoisBaseUrl || 'http://ipwho.is';
export class IpAddressesService {
  static async getIpAddress(ip: string): Promise<GetIpLookupDto> {
    let ipLookup = await IpAddressRepository.find(ip);
    if (!ipLookup) {
      ipLookup = await this.fetchIpInfo(ip);
      if (ipLookup) {
        await IpAddressRepository.storeLookup(ipLookup);
      }
    }

    return ipLookup as GetIpLookupDto;
  }

  static async fetchIpInfo(ip: string) {
    try {
      const res = await fetch(`${ipwhoisBaseUrl}/${ip}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw await res.json();
      }
      return await res.json();
    } catch (e: any) {
      console.log(e);
      throw ipAddressesError.ipLookupFailed();
    }
  }

  static async deleteLookup(ip: string) {
    try {
      const isDeleted = await IpAddressRepository.delete(ip);
      if (!isDeleted) {
        throw new Error();
      }
    } catch (error) {
      throw ipAddressesError.noLookupToDelete();
    }
    return true;
  }
}
