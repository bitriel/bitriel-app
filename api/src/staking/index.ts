import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, promiseWithTimeout, nodeProvider } from '../utils';
import { activeEra } from './overview';

/* eslint "no-underscore-dangle": "off" */
Sentry.init({
  dsn: config.sentryDns,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
     root: global.__dirname,
    }),
  ],
});

const useNetworkMetrics = async () => {
  const [session] = await Promise.all([
    nodeProvider.getProvider().api.derive.session.progress()
  ]);

  const eraState = activeEra(session.eraLength, session.eraProgress, session.activeEra.toNumber())
   
  console.log(eraState)
};

Promise.resolve()
  .then(async () => {
    await nodeProvider.initializeProviders();
    logger.info('Removing unfinished blocks...');
  })
  .then(useNetworkMetrics)
  .then(async () => {
    await nodeProvider.closeProviders();
    logger.info('Finished');
    process.exit();
  })
  .catch(async (error) => {
    logger.error(error);
    Sentry.captureException(error);

    try {
      await promiseWithTimeout(nodeProvider.closeProviders(), 200, Error('Failed to close proivders!'));
    } catch (err) {
      Sentry.captureException(err);
    }

    logger.error('Finished');
    Sentry.close(2000).then(() => {
      process.exit(-1);
    });
  });
