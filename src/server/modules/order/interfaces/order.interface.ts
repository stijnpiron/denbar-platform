import { OrderPayment } from './order-payment.interface';
import { Group } from '../../group/interfaces/group.interface';
import { User } from '../../user/interfaces/user.interface';
import { OrderLine } from './order-line.interface';
import { OrderStatus } from './../enums/order-status.enum';
import { Resource } from '../../../common/interfaces/resource.interface';
import { Year } from '../../year/interfaces/year.interface';
import { Period } from '../../period/interfaces/period.interface';

export type Order = OrderRequired;

interface OrderBasics extends Resource {
  reference: string;
  user: User;
  info: {
    group: Group;
    year: Year;
    period: Period;
  };
  statusInfo: {
    orderDate: Date;
    inProgressDate: Date;
    collectedDate: Date;
    pickedUpDate: Date;
    deliveredDate: Date;
    paymentDate: Date;
    closedDate: Date;
  };
  status: OrderStatus;
  lines: OrderLine[];
  paymentInfo: OrderPayment;
  remarks: string[];
}

export type OrderRequired = OrderOptional;

export type OrderOptional = OrderBasics;
