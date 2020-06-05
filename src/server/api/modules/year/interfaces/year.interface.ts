import { Resource } from '../../../../common/interfaces/resource.interface';

export interface YearBasics extends Resource {
  year: number;
}

export type Year = YearBasics;

export type YearOptional = YearBasics;

export type YearRequired = YearOptional;
