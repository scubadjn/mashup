import express from 'express';
import createExternal from './external';
import { logger, ServerError, ClientError } from './lib';

(async (): Promise<void> => {
  try {
    const app = express();
    const { PORT } = process.env;
    const external = createExternal();

    app.set('json spaces', 2)

    app.use('/health', (_, res) => {
      res.status(200).json({ status: 'UP' });
    });

    app.get('/v1/mashup/:mbid', async (req, res, next) => {
      try {
        logger.info(`[mbid]: ${req.params.mbid}`)
        const { mbid } = req.params;
        const start = + new Date();
        logger.info(`[FETCHING] - ${mbid}`)
        const data = 'hello world';
        logger.info(`[${+new Date() - start} ms] - DONE`)
        res.json(data);
      } catch (e: unknown | ServerError | Error) {
        if (e instanceof ServerError) {
          res.status(500).send(e.message);
        } else if (e instanceof ClientError) {
          res.status(e.status).send(e.message);
        } else {
          res.status(500).send('Internal Server Error')
        }
      }
    });

    app.listen(PORT, () => {
      logger.info("Server runs on Port", PORT);
    });
  }
  catch {
    process.exit(0);
  }
})();