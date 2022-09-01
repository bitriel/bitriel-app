export default {
  nodeUrls: process.env.NODE_PROVIDER_URLS ? process.env.NODE_PROVIDER_URLS : 'ws://0.0.0.0:9944',
  sentryDns: process.env.SENTRY_DNS || '',
};