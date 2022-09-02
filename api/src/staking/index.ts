import { config, logger } from '../utils';
import { activeEra } from './overview';

const StakingApi = async () => {
  const eraState = await activeEra()
   
  console.log(eraState)
};

Promise.resolve()
  .then(StakingApi)
  .then(async () => {
    logger.info('Finished');
    process.exit();
  })
  .catch(async (error) => {
    logger.error(error);
  });
