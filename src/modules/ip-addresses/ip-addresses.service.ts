import fetch from 'node-fetch';
import ipAddressesError from "./ip-addresses.error";
const ipwhoisBaseUrl = process.env.ipwhoisBaseUrl || 'http://ipwho.is'
export class IpAddressesService {
  static async getIpAddress(ip: string){
    const ipResponse = await this.fetchIpInfo(ip)
    console.log(ipResponse);
    return {}
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
