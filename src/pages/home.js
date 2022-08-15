import { Row, Col } from 'antd'
import { Card } from 'globalComponents'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../context/AccountContext'
import { useAccounts } from '../hooks/useAccounts'
import Wallet from '../components/Wallet'
import AccountSelector from '../components/AccountSelector'

export default function Home() {
  const { allAccounts } = useAccounts()
  const { account: accountContext, isTrust } = useContext(AccountContext)
  const [account, setAccount] = useState(accountContext)
  const [keyringOptions, setKeyringOptions] = useState([])

  useEffect(() => {
    setAccount(accountContext)
  }, [accountContext])

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
      <Row gutter={24}>
        <Col span={12}>
          <AccountSelector keyringOptions={keyringOptions} />
        </Col>
        <Col span={12}>
          <div>
            {!account && keyringOptions.length === 0 && (
              <Card>
                <p>You don't have any wallet yet.</p>
              </Card>
            )}
            {/* Selendra wallet */}
            {keyringOptions.length > 0 &&
              keyringOptions.map((account, key) => (
                <Wallet key={key} account={account.value} type="Selendra" />
              ))}
            {/* Metamask wallet */}
            {account && (
              <Wallet
                account={account}
                type={isTrust ? 'Trust Wallet' : 'Metamask'}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}
