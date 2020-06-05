import { Resource } from '../../../common/interfaces/resource.interface';

interface ProfileBasics extends Resource {
  name: string;
}

export type Profile = ProfileRequired;

export type ProfileOptional = ProfileBasics;

export type ProfileRequired = ProfileOptional;
