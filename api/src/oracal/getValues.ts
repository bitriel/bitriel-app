import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, NodeProviderType } from '../utils';

Sentry.init({
  dsn: config.sentryDns,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
     root: global.__dirname,
    }),
  ],
});


export const getPrice = async (nodeProvider: NodeProviderType, token: string, price: number) => {
  try {
    const provider = nodeProvider.getProvider();
    const value = await provider.api.query.rawValues.account(address);
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);   
  }
}