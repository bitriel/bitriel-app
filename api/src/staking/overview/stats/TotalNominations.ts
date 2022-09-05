import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, nodeProvider } from '../../../utils';
import BN from 'bn.js';

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

const TotalNominatorsStatBox = async () => {
  try {
    await nodeProvider.initializeProviders();

    const [totalNominators, maxNominatorsCount] = await Promise.all([
      nodeProvider.getProvider().api.query.staking.counterForNominators(),
      nodeProvider.getProvider().api.query.staking.maxNominatorsCount(),
    ]);

    const totalNominatorsState = {
      label: 'Total Nominators',
        stat: {
          totalNominators: new BN(totalNominators.toString()),
          maxNominatorsCount: maxNominatorsCount.isSome ? new BN(maxNominatorsCount.toString()) :  new BN(0),
        },
      };
      return totalNominatorsState;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default TotalNominatorsStatBox;