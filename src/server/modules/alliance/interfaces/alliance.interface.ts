import { Resource } from '../../../common/interfaces/resource.interface';

interface AllianceBasics extends Resource {
  name: string;
}

export type Alliance = AllianceRequired;

export type AllianceOptional = AllianceBasics;

export type AllianceRequired = AllianceOptional;
