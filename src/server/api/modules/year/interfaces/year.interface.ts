import { Resource } from '../../../../common/interfaces/resource.interface';

interface YearBasics extends Resource {
  year: number;
}

export type Year = YearBasics;
