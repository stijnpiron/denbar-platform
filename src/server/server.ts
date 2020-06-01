import 'dotenv/config';
import validateEnv from './common/utils/validateEnv';
import ApiController from './modules/api/api.controller';
import AuthenticationController from './modules/authentication/authentication.controller';
import App from './app';

validateEnv();

const app = new App([new ApiController(), new AuthenticationController()]);

export default app;
