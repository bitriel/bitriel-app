import 'dotenv/config';

const toNumber = (defaultValue: number, value?: string): number => {
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

const defaultNodeUrls = [
  'ws://127.0.0.1:9944',
];

export default {
  nodeUrls: process.env.NODE_PROVIDER_URLS ? JSON.parse(process.env.NODE_PROVIDER_URLS) as string[] : defaultNodeUrls,
  sentryDns: process.env.SENTRY_DNS || '',
  expected_block_time:  toNumber(6000, process.env.EXPECTED_BLOCK_TIME),
}
