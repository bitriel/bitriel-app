import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger } from '../../../utils';

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

const TotalNominatorsStatBox = (totalNominators: number, maxNominatorsCount: number) => {
  try {
    const totalNominatorsState = {
      label: 'Total Nominators',
        stat: {
          activeEra: totalNominators,
          eraTimeLeft: maxNominatorsCount,
        },
      };
      return totalNominatorsState;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default TotalNominatorsStatBox;