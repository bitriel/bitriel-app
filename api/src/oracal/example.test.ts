import { createTestPairs } from '@polkadot/keyring/testingPairs';
import { config, logger } from '../utils';
import { nodeProvider } from '../utils';
import { feedValues } from './feedValues';


/// import keypart from menonic
// import { Keyring } from '@polkadot/api';
// const keyring = new Keyring({ type: 'sr25519' });
// // Some mnemonic phrase
// const PHRASE = 'entire material egg meadow latin bargain dutch coral blood melt acoustic thought';
// // Add an account, straight mnemonic
// const newPair = keyring.addFromUri(PHRASE);
// test keypair alice/bob/

const testPairs = createTestPairs();
const aclice = testPairs.alice;

const testOracle = async () => {
  await feedValues(nodeProvider, aclice, 'SEL', 240_000_000_000);
};

Promise.resolve()
  .then(async () => {
    await nodeProvider.initializeProviders();
  })
  .then(testOracle)
  .then(async () => {
    await nodeProvider.closeProviders();
    logger.info('Finished');
    process.exit();
  })
