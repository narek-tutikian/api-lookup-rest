export type IpAddressType = {
  ip: string;
  success: boolean;
  type: "IPv4" | "IPv6";
  continent: string;
  continentCde: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  latitude: number;
  longitude: number;
  isEu: boolean;
  postal: string;
  callingCode: string;
  capital: string;
  borders: string;
  flag: FlagType,
  connection: ConnectionType;
  timezone: TimezoneType ;
  currency: CurrencyType;
  security: SecurityType;
}

export type FlagType = {
  img: string;
  emoji: string;
  emojiUnicode: string;
}

export type ConnectionType = {
  asn: number;
  org: string;
  isp: string;
  domain: string;
}
export type TimezoneType = {
  id: string;
  abbr: string;
  is_dst: boolean,
  offset: number,
  utc: string;
  currentTime: Date
}
export type CurrencyType = {
  name: string;
  code: string;
  symbol: string;
  plural: string;
  exchangeRate: number;
}

export type SecurityType = {
  anonymous: boolean;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  hosting: boolean;
}
