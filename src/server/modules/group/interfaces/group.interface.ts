import { Resource } from '../../../common/interfaces/resource.interface';
import { Year } from '../../../modules/year/interfaces/year.interface';
import { Alliance } from '../../../modules/alliance/interfaces/alliance.interface';
import { Profile } from '../../../modules/profile/interfaces/profile.interface';

interface GroupBasics extends Resource {
  year: Year;
  alliance: Alliance;
  name: string;
  profile: Profile;
}

export type Group = GroupRequired;

export type GroupOptional = GroupBasics;

export type GroupRequired = GroupOptional;
