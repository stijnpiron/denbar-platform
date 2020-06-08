import mongooseMorgan from 'mongoose-morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import util from 'util';
import YAML from 'yaml';
import path from 'path';
import { stringContainsElementOfArray } from './common/utils';
import { Controller } from './common/interfaces/controller.interface';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

export class App {
  public app: express.Application;
  private basePath = '/api';
  private readFile = util.promisify(fs.readFile);
  private mongoConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}/${process.env.MONGO_DB}`;

  constructor(controllers: Controller[]) {
    console.info('Initializing server...');
    this.app = express();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeLogging();
    this.connectToTheDatabase();
    this.initializeControllers(controllers);
    this.initializeClient();
    this.initializeErrorHandling();
    this.listen();
  }

  public getExpressInstance(): Application {
    return this.app;
  }

  public async listen(): Promise<void> {
    this.app.listen(process.env.PORT, () => {
      if (!process.env.TESTRUN) console.info(`Server listening on http port ${process.env.PORT}`);
    });
  }

  private async initializeLogging(): Promise<void> {
    if (!process.env.TESTRUN)
      this.app.use(
        process.env.NODE_ENV !== 'development'
          ? mongooseMorgan(
              {
                connectionString: this.mongoConnectionString,
                collection: process.env.LOG_MORGAN,
              },
              {
                skip: (req: express.Request, _res: express.Response) => stringContainsElementOfArray(req.originalUrl, ['/api/swagger']),
              },
              ':method :status : :url : :response-time[digits]ms/:total-time[digits]ms :res[content-length]B -- :remote-addr - \
            :remote-user -- ":referrer" ":user-agent" HTTP/:http-version -- :req[cookie]'
            )
          : loggerMiddleware(['/swagger'])
      );
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  initializeClient(): void {
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static('src/client/build'));

      this.app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'src', 'client', 'build', 'index.html'));
      });
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private async initializeSwagger(): Promise<void> {
    try {
      const [swaggerDocument] = await Promise.all([this.readFile('./openapi.reference.yml')]);
      const swaggerDocumentation = YAML.parse(swaggerDocument.toString());

      this.app.use(`${this.basePath}/swagger`, swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
    } catch (err) {
      if (!process.env.TESTRUN) console.warn('Unable to generate Swagger documentation', err);
    }
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(`${this.basePath}`, controller.router);
    });
  }

  private connectToTheDatabase(): void {
    mongoose.connect(this.mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}
