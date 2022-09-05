import { config, logger } from '../utils';
import { activeEra, TotalNominations } from './overview';

const StakingApi = async () => {
  const eraState = await activeEra();
  const totalNomState = await TotalNominations();

  console.log(totalNomState)
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
