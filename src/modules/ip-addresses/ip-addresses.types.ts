export type IpAddressType = {
  ip: string;
  success: boolean;
  type: 'IPv4' | 'IPv6';
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  regionCode: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: FlagType;
  connection: ConnectionType;
  timezone: TimezoneType;
  currency: CurrencyType;
  security: SecurityType;
};

export type FlagType = {
  img: string;
  emoji: string;
  emoji_unicode: string;
};

export type ConnectionType = {
  asn: number;
  org: string;
  isp: string;
  domain: string;
};
export type TimezoneType = {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number;
  utc: string;
  current_time: Date;
};
export type CurrencyType = {
  name: string;
  code: string;
  symbol: string;
  plural: string;
  exchange_rate: number;
};

export type SecurityType = {
  anonymous: boolean;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  hosting: boolean;
};
