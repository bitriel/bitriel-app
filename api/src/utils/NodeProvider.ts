import * as Sentry from '@sentry/node';
import '@polkadot/api-augment';
import { options } from "@selendra/api";
const { ApiPromise, WsProvider } = require("@polkadot/api");
import logger from './logger';
import APP_CONFIG from './config'

Sentry.init({
  dsn: APP_CONFIG.sentryDns,
  tracesSampleRate: 1.0,
});

export const getAPI = async (): Promise<typeof ApiPromise> => {
  let api;
  logger.debug(`Connecting to ${APP_CONFIG.nodeUrls}`);
  const provider = new WsProvider(APP_CONFIG.nodeUrls);

  provider.on('disconnected', () =>
    logger.error(
      `Got disconnected from provider ${APP_CONFIG.nodeUrls}`,
    ),
  );
  provider.on('error', (error: any) => logger.error(`Got error from provider: ${error}!`));

  api = new ApiPromise(options({ provider }));

  api.on('disconnected', () => logger.error('Got disconnected from API!'));
  api.on('error', (error: any) => logger.error(`Got error from API: ${error}`),
  );

  await api.isReady;
  return api;
};

export const isNodeSynced = async (
  api: typeof ApiPromise,
): Promise<boolean> => {
  let node;
  try {
    node = await api.rpc.system.health();
  } catch (error) {
    logger.error("Can't query node status");
    Sentry.captureException(error);
  }
  if (node && node.isSyncing.eq(false)) {
    logger.debug('Node is synced!');
    return true;
  }
  logger.debug('Node is NOT synced!');
  return false;
};