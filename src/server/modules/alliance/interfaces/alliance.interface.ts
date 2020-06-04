import { Resource } from './../../../common/interfaces/resource.interface';

export interface AllianceBasics extends Resource {
  name: string;
}

export type Alliance = AllianceBasics;

export type AllianceOptional = AllianceBasics;

export type AllianceRequired = AllianceOptional;
