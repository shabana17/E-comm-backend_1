import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import morgan from 'morgan';
import * as process from 'process';
const PORT = process.env.PORT;
// const HOST: string = String(process.env.HOST || '0.0.0.0');

const appLoader = async (app: Express, router: any) => new Promise<any>(resolve => {
  const server: Server = createServer(app);
  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(express.json({
    limit: '10mb'
  }));
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(morgan('dev'));
  app.use('/', router);
  app.use((req, res) => {
    res
      .status(404)
      .send({
        success: false,
        data: undefined,
        message: 'the resource you are looking for is not found.'
      });
  });
  server.listen(PORT, () => {
    console.log('App is running');
    resolve(true);
  });
});

export { appLoader };
