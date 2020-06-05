import { PeriodRequired } from '../../interfaces/period.interface';

export interface PeriodCreateRequestDto extends PeriodRequired {
  createdAt: Date;
}
