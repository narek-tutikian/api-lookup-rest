import * as fs from 'fs/promises';
import * as path from 'path';
import {
  IpAddressType,
  IpLookupEntityType,
} from '../modules/ip-addresses/ip-addresses.types';
const ipLookupsDbPath = path.resolve(__dirname, 'ipLookupsDb.json');

export class IpAddressRepository {
  static lookups: IpLookupEntityType;
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

  static async storeLookup(newLookupDate: IpAddressType): Promise<boolean> {
    this.loadLookupsFromDb();
    let lookupCache = this.lookups;
    if (!lookupCache) {
      lookupCache = {};
    }
    lookupCache[newLookupDate.ip] = newLookupDate;
    await this.writeToDb(lookupCache);
    return true;
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

  static async delete(ip: string): Promise<boolean> {
    this.loadLookupsFromDb();
    if (!this.lookups) {
      return false;
    }
    try {
      if (!this.lookups[ip]) {
        return false;
      }
      delete this.lookups[ip];
      await this.writeToDb(this.lookups);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  static async writeToDb(ipLookupEntity: IpLookupEntityType): Promise<void> {
    await fs.writeFile(
      ipLookupsDbPath,
      JSON.stringify(ipLookupEntity, null, 2)
    );
  }
}
