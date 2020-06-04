import { Resource } from './../../common/interfaces/resource.interface';

interface AllianceBasics extends Resource {
  name: string;
}

export type Alliance = AllianceBasics;
