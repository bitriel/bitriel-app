import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { config, logger, NodeProviderType } from '../../utils';
import { getEraTimeLeft } from '../support';
import BN from 'bn.js';

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

export const bondState = async (
    nodeProvider: NodeProviderType,
    address: string,
    activeEra: BN,
    freeAfterReserve: BN
) => {
  const staking = await nodeProvider.getProvider().api.derive.staking.account(address);
  const stakingLedger = JSON.parse(staking.stakingLedger.toString());

  const active = new BN(parseInt(stakingLedger['active'].toString()))
  const unlocking = stakingLedger['unlocking'];

  // free to unbond balance
  const freeToUnbond = active;

  // total amount actively unlocking
  let totalUnlocking = new BN(0);
  let totalUnlocked = new BN(0);

  for (const u of unlocking) {
    const { value, era } = u;

    if (activeEra > era) {
      totalUnlocked = totalUnlocked.add(new BN(parseInt(value).toString()));
    } else {
      totalUnlocking = totalUnlocking.add(new BN(parseInt(value).toString()));
    }
  }

  // free to bond balance
  const freeToBond = BN.max(
    freeAfterReserve.sub(active).sub(totalUnlocking).sub(totalUnlocked),
    new BN(0)
  );

  // total possible balance that can be bonded
  const totalPossibleBond = BN.max(
    freeAfterReserve.sub(totalUnlocking).sub(totalUnlocked),
    new BN(0)
  );

  return {
    freeToBond,
    freeToUnbond,
    totalUnlocking,
    totalUnlocked,
    totalPossibleBond,
    totalUnlockChuncks: unlocking.length,
  };

}

export const accountState = async (nodeProvider: NodeProviderType, address: string) => {
  try {
    const { data: { free, reserved, miscFrozen, feeFrozen } }  = await nodeProvider.getProvider().api.query.system.account(address);
    const existentialAmount = nodeProvider.getProvider().api.consts.balances.existentialDeposit;

    // amount of compulsary reserve balance
    const reserveFeeAmount = new BN(10).pow(new BN(config.networkDecimal)).div(new BN(4));

    // minimum reserve for submitting extrinsics
    const minReserve: BN = reserveFeeAmount.add(existentialAmount);

    let freeAfterReserve = new BN(free).sub(minReserve);
      freeAfterReserve = freeAfterReserve.lt(new BN(0))
        ? new BN(0)
        : freeAfterReserve;

    return {
      free,
      freeAfterReserve,
      reserved,
      miscFrozen,
      feeFrozen,   
      existentialAmount,
      reserveFeeAmount,
      minReserve
    }

  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};
