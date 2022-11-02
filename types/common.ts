export type IdType = string | number;
export type TagType = { id: IdType; label: string; p?: string };
export type CityType = {
  label: string;
  id: IdType;
  lat: number;
  lng: number;
  p: string;
  population: number;
};
export type EthnicType = {
  label: string;
  id: IdType;
};
export type TagListType = TagType[];
export type SearchValueType = { term?: string; tags?: TagListType };
export type NameType = {
  photo?: string;
  lastName: string;
  firstName: string;
  dob?: Date;
  cob?: number;
  cod?: number;
  e?: IdType;
  id: IdType;
};

export type RichNameType = NameType & {
  _cod?: CityType;
  _e?: EthnicType;
  _fn?: string;
};
