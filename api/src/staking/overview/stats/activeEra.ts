import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger } from '../../../utils';
import { getEraTimeLeft } from '../../support';

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

const ActiveEraStatBox = (eraLength: any, eraProgress: any, activeEra: number) => {
  try {
    const eraTimeLeft = getEraTimeLeft(eraLength, eraProgress);
    const eraState = {
      label: 'Active Era',
        stat: {
          activeEra: activeEra,
          eraTimeLeft: eraTimeLeft,
        },
      };
      return eraState;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
  
export default ActiveEraStatBox;