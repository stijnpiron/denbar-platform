import { ProductController } from './api/modules/product/product.controller';
import 'dotenv/config';
import { validateEnv } from './common/utils/validateEnv';
import { ApiController } from './api/common/api/api.controller';
import { AuthenticationController } from './api/common/authentication/authentication.controller';
import { App } from './app';

validateEnv();

export const server = new App([new ApiController(), new AuthenticationController(), new ProductController()]);
