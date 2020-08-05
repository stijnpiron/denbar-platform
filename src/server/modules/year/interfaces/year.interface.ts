import { Resource } from '../../../common/interfaces/resource.interface';

interface YearBasics extends Resource {
  year: number;
}

export type Year = YearRequired;

export type YearOptional = YearBasics;

export type YearRequired = YearOptional;
