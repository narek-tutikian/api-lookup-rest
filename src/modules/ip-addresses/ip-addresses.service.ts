import fetch from 'node-fetch';
import ipAddressesError from "./ip-addresses.error";
import {IpAddressRepository} from "../../repositories/ip-address.repository";
const ipwhoisBaseUrl = process.env.ipwhoisBaseUrl || 'http://ipwho.is'
export class IpAddressesService {
  static async getIpAddress(ip: string) {
    let ipLookup = await IpAddressRepository.find(ip);
    if (!ipLookup) {
      ipLookup = await this.fetchIpInfo(ip)
      await IpAddressRepository.storeLookup(ipLookup)
    }

    return ipLookup
  }


  static async fetchIpInfo(ip: string){
    try {
      const res = await fetch(`${ipwhoisBaseUrl}/${ip}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw await res.json();
      }
      return await res.json();
    } catch (e: any) {
      console.log(e)
      throw ipAddressesError.ipLookupFailed();
    }
  };
}
