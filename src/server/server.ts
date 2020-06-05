import { YearController } from './modules/year/year.controller';
import { UserController } from './modules/user/user.controller';
import { ProfileController } from './modules/profile/profile.controller';
import { PeriodController } from './modules/period/period.controller';
import { OrderController } from './modules/order/order.controller';
import { GroupController } from './modules/group/group.controller';
import { AllianceController } from './modules/alliance/alliance.controller';
import { ProductController } from './modules/product/product.controller';
import 'dotenv/config';
import { validateEnv } from './common/utils/validateEnv';
import { ApiController } from './modules/api/api.controller';
import { AuthenticationController } from './modules/authentication/authentication.controller';
import { App } from './app';

validateEnv();

export const server = new App([
  new AllianceController(),
  new ApiController(),
  new AuthenticationController(),
  new GroupController(),
  new OrderController(),
  new PeriodController(),
  new ProductController(),
  new ProfileController(),
  new UserController(),
  new YearController(),
]);
