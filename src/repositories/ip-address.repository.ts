import * as fs from 'fs/promises';
import * as path from "path";
import fsPromise from "fs/promises";
const ipLookupsDbPath = path.resolve(__dirname, 'ipLookupsDb.json')

export class IpAddressRepository {
  static lookups: { [x: string]: any; };
  static find(ip: string){
    try {
      this.loadLookupsFromDb();
      if(!this.lookups){
        return;
      }
      const storedLookup = this.lookups[ip];
      if (!storedLookup) {
        return;
      }
      return storedLookup;
    } catch (error) {
      console.log(error)
    }
  }

  static async storeLookup(newLookupDate: any) {
    this.loadLookupsFromDb();
    let lookupCache = this.lookups;
    if (!lookupCache){
      lookupCache = {}
    }
    // @ts-ignore
    lookupCache[newLookupDate.ip] = newLookupDate;
    await fs.writeFile(
      ipLookupsDbPath,
      JSON.stringify(lookupCache, null, 2)
    )

  }

  static loadLookupsFromDb() {
    try {
      const cachedIpLookups = require(ipLookupsDbPath);
      if(!cachedIpLookups){
        return;
      }
      this.lookups = cachedIpLookups;
    } catch (error) {
      console.log(error)
    }
  }
}
