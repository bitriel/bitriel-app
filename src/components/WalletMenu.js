import { Col, Row, Spin, Avatar } from 'antd'
import { Card } from 'globalComponents'
import { useFetchBalanceSEL } from '../hooks/useFetchBalanceSEL'
import { useSubstrateState, useSubstrate } from '../context/SubstrateContext'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import iconSwitch from 'assets/icons/switch.svg'
import wallet from 'assets/icons/wallet.svg'
import ButtonConnect from './AccountSelector/ButtonConnect'
import ModalSelectAccount from './AccountSelector/ModalSelectAccount'
import { useState, useEffect } from 'react'
import { useAccounts } from '../hooks/useAccounts'

const address = (addr) => (addr ? addr.address : '')

export default function WalletMenu({ children }) {
  const { allAccounts } = useAccounts()
  const { currentAccount, api } = useSubstrateState()
  const {
    setCurrentAccount,
    state: { keyring },
  } = useSubstrate()
  const [state] = useFetchBalanceSEL(address(currentAccount), 'Selendra', api)
  const [modal, setModal] = useState(false)
  const [keyringOptions, setKeyringOptions] = useState([])

  let avatar = createAvatar(style, {
    seed: address(currentAccount),
    dataUri: true,
    size: 64,
    backgroundColor: 'rgba(243, 119, 71, 0.21)',
    scale: 80,
  })

  //===getting keyring =======

  useEffect(() => {
    // Get the list of accounts
    const keyringOptions = allAccounts.map((account) => ({
      key: account,
      value: account,
      icon: 'user',
    }))

    setKeyringOptions(keyringOptions)
  }, [allAccounts])

  return (
    <div>
      <Row gutter={(24, 24)}>
        <Col xs={24} sm={24} md={16} lg={16} xl={18} xxl={18}>
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
        <Col xs={0} sm={0} md={8} lg={8} xl={6} xxl={6}>
          <Card.Auto>
            <Row gutter={[8, 8]} align="middle">
              <Col span={24} onClick={() => setModal(true)}>
                {keyringOptions.length > 1 ? (
                  <ButtonConnect
                    className="home-create-wallet"
                    icon={iconSwitch}
                    title="Switch Account"
                  />
                ) : (
                  <ButtonConnect
                    className="home-create-wallet"
                    icon={wallet}
                    title="Current Account"
                  />
                )}
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
      <ModalSelectAccount
        accounts={keyringOptions}
        keyring={keyring}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        visible={modal}
        setVisible={setModal}
      />
    </div>
  )
}
