import mongooseMorgan from 'mongoose-morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import util from 'util';
import YAML from 'yaml';
import { stringContainsElementOfArray, timeDiff } from './common/utils';
import { Controller } from './common/interfaces/controller.interface';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { loggerMiddleware } from './common/middlewares/logger.middleware';

export class App {
  private initializeTime = 0;
  public app: express.Application;
  private basePath = '/api';
  private readFile = util.promisify(fs.readFile);
  private mongoConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}/${process.env.MONGO_DB}`;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeSwagger();
    this.initializeLogging();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.listen();
  }

  public getExpressInstance(): Application {
    return this.app;
  }

  public async listen(): Promise<void> {
    const startTime = new Date();

    this.app.listen(process.env.PORT, () => {
      const endTime = new Date();
      if (!process.env.TESTRUN) console.info(`--- server listening (${timeDiff(startTime, endTime)}ms)`);
      if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
      if (!process.env.TESTRUN) console.info(`--- server initialized in ${this.initializeTime}ms`);
      if (!process.env.TESTRUN) console.info(`Server listening on https port ${process.env.PORT}`);
    });
  }

  private async initializeLogging(): Promise<void> {
    if (!process.env.TESTRUN) {
      const startTime = new Date();

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
      const endTime = new Date();

      if (!process.env.TESTRUN) console.info(`--- logging up and running (${timeDiff(startTime, endTime)}ms)`);
      if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
    }
  }

  private initializeMiddlewares(): void {
    const startTime = new Date();
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    const endTime = new Date();

    if (!process.env.TESTRUN) console.info(`--- middlewares up and running (${timeDiff(startTime, endTime)}ms)`);
    if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
  }

  private initializeErrorHandling(): void {
    const startTime = new Date();
    this.app.use(errorMiddleware);
    const endTime = new Date();

    if (!process.env.TESTRUN) console.info(`--- error handling up and running (${timeDiff(startTime, endTime)}ms)`);
    if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
  }

  private async initializeSwagger(): Promise<void> {
    try {
      const startTime = new Date();

      const [swaggerDocument] = await Promise.all([this.readFile('./openapi.reference.yml')]);
      const swaggerDocumentation = YAML.parse(swaggerDocument.toString());

      this.app.use(`${this.basePath}/swagger`, swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
      const endTime = new Date();

      if (!process.env.TESTRUN) console.info(`--- swagger up and running (${timeDiff(startTime, endTime)}ms)`);
      if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
    } catch (err) {
      if (!process.env.TESTRUN) console.warn('--- unable to generate Swagger documentation', err);
    }
  }

  private initializeControllers(controllers: Controller[]): void {
    const startTime = new Date();

    controllers.forEach((controller) => {
      this.app.use(`${this.basePath}`, controller.router);
    });
    const endTime = new Date();

    if (!process.env.TESTRUN) console.info(`--- controllers initialized (${timeDiff(startTime, endTime)}ms)`);
    if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
  }

  private connectToTheDatabase(): void {
    const startTime = new Date();

    mongoose.connect(this.mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const endTime = new Date();
    if (!process.env.TESTRUN) console.info(`--- database connected (${timeDiff(startTime, endTime)}ms)`);
    if (!process.env.TESTRUN) this.initializeTime += timeDiff(startTime, endTime);
  }
}
