import * as fs from 'fs/promises';
import * as path from 'path';
import { IpAddressType } from '../modules/ip-addresses/ip-addresses.types';
const ipLookupsDbPath = path.resolve(__dirname, 'ipLookupsDb.json');

export class IpAddressRepository {
  static lookups: { [ip: string]: IpAddressType };
  static find(ip: string): IpAddressType | undefined {
    try {
      this.loadLookupsFromDb();
      if (!this.lookups) {
        return;
      }
      const storedLookup = this.lookups[ip];
      if (!storedLookup) {
        return;
      }
      return storedLookup;
    } catch (error) {
      console.log(error);
    }
  }

  static async storeLookup(newLookupDate: IpAddressType) {
    this.loadLookupsFromDb();
    let lookupCache = this.lookups;
    if (!lookupCache) {
      lookupCache = {};
    }
    lookupCache[newLookupDate.ip] = newLookupDate;
    await fs.writeFile(ipLookupsDbPath, JSON.stringify(lookupCache, null, 2));
  }

  static loadLookupsFromDb() {
    try {
      const cachedIpLookups = require(ipLookupsDbPath);
      if (!cachedIpLookups) {
        return;
      }
      this.lookups = cachedIpLookups;
    } catch (error) {
      console.log(error);
    }
  }
}
