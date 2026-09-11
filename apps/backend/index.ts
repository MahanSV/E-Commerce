import app from '#webhost/app.ts';
import env from '#substructure/env.ts';

const { port } = env;

// connect to db
const server = app.listen(port, () => {
  console.info(`Listening to port ${port}`);
});

const exitHandler = (): void => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any): void => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
