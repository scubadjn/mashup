import express from 'express';
import external from './external';
import { logger, ServerError, ClientError, createCtx } from './lib';
import mashup from './mashup';

(async (): Promise<void> => {
  try {
    const app = express();
    const { PORT } = process.env;
    const ctx = createCtx();

    app.set('json spaces', 2);

    // TODO implement healthcheck in production
    app.use('/health', (_, res) => {
      res.status(200).json({ status: 'UP' });
    });

    app.get('/v1/mashup/:mbid', async (req, res) => {
      try {
        // TODO implement request/reponse logging
        const { mbid } = req.params;
        const start = + new Date();
        logger.log(`[FETCHING] - ${mbid}`)
        const data = await mashup(ctx, external, mbid, req.query.refetch !== undefined);
        logger.log(`[${+new Date() - start} ms] - DONE`)
        res.json(data);
      } catch (e: unknown | ClientError | ServerError | Error) {
        if (e instanceof ClientError) {
          res.status(e.status).send(e.message);
        } else if (e instanceof ServerError) {
          res.status(500).send('Internal Server Error');
        } else {
          res.status(500).send('Internal Server Error')
        }
      }
    });

    app.listen(PORT, () => {
      logger.info('\x1b[34m', 'Mashup runs @', '\x1b[33m', `http://localhost:${PORT}`, '\x1b[37m');
    });
  }
  catch {
    process.exit(0);
  }
})();