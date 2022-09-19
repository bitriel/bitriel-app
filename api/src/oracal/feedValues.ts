import type { KeyringPair } from '@polkadot/keyring/types';
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

export const feedValues = async (nodeProvider: NodeProviderType, pairs: KeyringPair, token: string, price: number) => {
  try {
    const provider = nodeProvider.getProvider();
    return new Promise((resolve) => {
      provider.api.tx.selendraOracle
        .feedValues([[{ Token: token }, price]])
        .signAndSend(pairs, (result: any) => {
          if (result.status.isFinalized || result.status.isInBlock) {
            resolve(undefined);
          }
        });
    });
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);   
  }
}

