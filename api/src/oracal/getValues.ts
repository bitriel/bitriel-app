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


export const getValue = async (nodeProvider: NodeProviderType, token: string,) => {
  try {
    const provider = nodeProvider.getProvider();
    const value = await provider.api.query.selendraOracle.values({ Token: token });
    return value.toString() ? value.toString() : '{"value": 0, "timestamp": 0}'
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);   
  }
}