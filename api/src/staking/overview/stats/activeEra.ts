import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, getAPI } from '../../../utils';
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

const ActiveEraStatBox = async () => {
  try {
    const api = await getAPI();

    const [session] = await Promise.all([
      api.derive.session.progress()
    ]);

    await api.disconnect().catch((error: any) => {
      logger.error(
        `API disconnect error: ${JSON.stringify(error)}`,
      );
      Sentry.captureException(error);
    });

    const eraTimeLeft = getEraTimeLeft(session.eraLength, session.eraProgress);
    const eraState = {
      label: 'Active Era',
        stat: {
          activeEra: session.activeEra.toNumber(),
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