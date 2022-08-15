import { Col, Row, Spin, Avatar } from 'antd'
import { Card } from 'globalComponents'
import { useFetchBalanceSEL } from '../hooks/useFetchBalanceSEL'
import { useSubstrateState } from '../context/SubstrateContext'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import iconSwitch from 'assets/icons/switch.svg'
import ButtonConnect from './AccountSelector/ButtonConnect'

const address = (addr) => (addr ? addr.address : '')

export default function WalletMenu({ children }) {
  const { currentAccount, api } = useSubstrateState()
  const [state] = useFetchBalanceSEL(address(currentAccount), 'Selendra', api)

  let avatar = createAvatar(style, {
    seed: address(currentAccount),
    dataUri: true,
    size: 64,
    backgroundColor: 'rgba(243, 119, 71, 0.21)',
    scale: 80,
  })

  return (
    <div>
      <Row gutter={(24, 24)}>
        <Col span={18}>
          <Card.Auto>
            <h4 style={{ wordBreak: 'break-all' }}>
              <Avatar src={avatar} size={40} />
              &nbsp; &nbsp; &nbsp;
              {address(currentAccount)
                ? address(currentAccount)
                : 'Please Create Selendra Wallet'}
            </h4>
          </Card.Auto>
          <br />
          <Card>{children}</Card>
        </Col>
        <Col span={6}>
          <Card.Auto>
            <Row gutter={[8, 8]} align="middle">
              {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <div
                  className={`wallet-tabs ${
                    pathname === '/wallet/send' && 'wallet-tabs-active'
                  }`}
                >
                  <Link to="/wallet/send">
                    <img src={send} alt="" height={50} />
                    <p>Send</p>
                  </Link>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <div
                  className={`wallet-tabs ${
                    pathname === '/wallet/receive' && 'wallet-tabs-active'
                  }`}
                >
                  <Link to="/wallet/receive">
                    <img src={receive} alt="" height={50} />
                    <p>Recieve</p>
                  </Link>
                </div>
              </Col> */}
              <Col span={24}>
                <ButtonConnect
                  className="home-create-wallet"
                  icon={iconSwitch}
                  title="Switch Account"
                />
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {state.loading ? (
                    <Spin />
                  ) : (
                    <div>
                      <h1>
                        {state.freeBalance} <span>CDM</span>
                      </h1>
                      <p>Available</p>
                    </div>
                  )}
                </Row>
              </Col>
              <Col span={24}>
                <Row justify="center">
                  {state.loading ? (
                    <Spin />
                  ) : (
                    <div>
                      <h1>
                        {state.freeBalance} <span>CDM</span>
                      </h1>
                      <p>Total</p>
                    </div>
                  )}
                </Row>
              </Col>
            </Row>
          </Card.Auto>
        </Col>
      </Row>
    </div>
  )
}
