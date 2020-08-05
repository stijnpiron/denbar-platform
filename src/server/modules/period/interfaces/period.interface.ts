import { Resource } from '../../../common/interfaces/resource.interface';

export type Period = PeriodRequired;

interface PeriodBasics extends Resource {
  name: string;
  startDate: Date;
  endDate: Date;
}

export type PeriodRequired = PeriodOptional;

export type PeriodOptional = PeriodBasics;
