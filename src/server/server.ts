import { ProductController } from './modules/product/product.controller';
import 'dotenv/config';
import { validateEnv } from './common/utils/validateEnv';
import { ApiController } from './modules/api/api.controller';
import { AuthenticationController } from './modules/authentication/authentication.controller';
import { App } from './app';

validateEnv();

export const server = new App([new ApiController(), new AuthenticationController(), new ProductController()]);
