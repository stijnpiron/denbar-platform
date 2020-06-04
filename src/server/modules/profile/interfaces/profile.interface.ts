import { Resource } from './../../../common/interfaces/resource.interface';

type ProfileBasics = Resource;

export interface Profile extends ProfileBasics {
  name: string;
}
