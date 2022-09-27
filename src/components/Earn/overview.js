import React, { useEffect, useState } from 'react'
import { Row, Col, Tooltip } from 'antd'
import { Card } from '../../globalComponents'
import sel from '../../assets/sel-icon.svg'
import { useEraTimeLeft } from '../../hooks/useEraTimeLeft'
import { useStaking } from '../../context/StakingContext'
import { useBalance } from '../../context/BalanceContext'
import moment from 'moment'
import ActiveEraGraph from '../Staking/ActiveEraGraph'
import BondGraph from '../Staking/BondGraph'

const OverviewStaking = () => {
  const eraTimeLeft = useEraTimeLeft()
  const { staking, sessionEra, getNominationsStatus, getBondOptions } =
    useStaking()
  const [activeNominations, setActiveNominations] = useState([])
  const [timeleft, setTimeleft] = useState('')
  const { ledgers, bondedAccounts } = useBalance()
  const { freeToBond, totalUnlocking, totalUnlocked } = getBondOptions()

  useEffect(() => {
    const _nominations = getNominationsStatus()
    const _activeNominations =
      _nominations.length > 0
        ? _nominations.filter((i) => i.status === 'Active')
        : []
    setActiveNominations(_activeNominations)
  }, [getNominationsStatus])

  useEffect(() => {
    // format era time left
    const _timeleft = moment.duration(eraTimeLeft * 1000, 'milliseconds')
    const __timeleft = `${_timeleft.hours()}:${_timeleft.minutes()}:${_timeleft.seconds()}`
    setTimeleft(__timeleft)
  }, [eraTimeLeft])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={8}>
              <Card.Auto>
                <h2 className="portfolio-overall">
                  {activeNominations.length}
                </h2>
                <p>Active Nominator</p>
              </Card.Auto>
            </Col>
            <Col span={8}>
              <Card.Auto>
                <h2 className="portfolio-overall">
                  {staking?.minNominatorBond} CDM
                </h2>
                <p>Minimum Active Bond</p>
              </Card.Auto>
            </Col>
            <Col span={8}>
              <Card.Auto>
                <Row gutter={[8, 8]} align="middle">
                  <Col>
                    <Tooltip title={timeleft} color="#03A9F4" key="#03A9F4">
                      <div />
                      <ActiveEraGraph
                        value={sessionEra.eraProgress}
                        value2={sessionEra.eraLength - sessionEra.eraProgress}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <h2 className="portfolio-overall">
                      {staking?.activeEra.index}
                    </h2>
                    <p>Active Era</p>
                  </Col>
                </Row>
              </Card.Auto>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Card.Auto>
            <h1>Balance</h1>
            <br />
            <div className="staking-overview">
              <Row gutter={[12, 12]}>
                <Col>
                  <img src={sel} alt="" height={90} />
                </Col>
                <Col>
                  <p>Available </p>
                  <h1 className="portfolio-money">24000.00 SEL</h1>
                  <p className="portfolio-equalto">≈ 1.000111 BTC</p>
                </Col>
              </Row>
              <BondGraph
                active={ledgers.active}
                unlocking={totalUnlocking}
                unlocked={totalUnlocked}
                free={freeToBond}
                inactive={!bondedAccounts}
              />
            </div>
          </Card.Auto>
        </Col>
      </Row>
    </>
  )
}

export default OverviewStaking
