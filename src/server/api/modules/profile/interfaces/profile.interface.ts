import { Resource } from '../../../../common/interfaces/resource.interface';

export interface ProfileBasics extends Resource {
  name: string;
}

export type Profile = ProfileBasics;

export type ProfileOptional = ProfileBasics;

export type ProfileRequired = ProfileOptional;
