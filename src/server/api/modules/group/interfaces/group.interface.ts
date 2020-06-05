import { Year } from '../../year/interfaces/year.interface';
import { Resource } from '../../../../common/interfaces/resource.interface';
import { Alliance } from '../../alliance/interfaces/alliance.interface';
import { Profile } from '../../profile/interfaces/profile.interface';

interface GroupBasics extends Resource {
  year: Year;
  alliance: Alliance;
  name: string;
  profile: Profile;
}

export type Group = GroupRequired;

export type GroupOptional = GroupBasics;

export type GroupRequired = GroupOptional;
