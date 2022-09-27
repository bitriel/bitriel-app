import { Row, Col } from 'antd'
import { useTheme } from 'next-themes'
import { Button } from 'globalComponents'
import { useState, useContext } from 'react'
import RestoreWallet from 'components/RestoreWallet'
import CreateWallet from 'components/CreateWallet'
import logoWhite from 'assets/BITRIEL.svg'
import bitrileLogo from 'assets/bitriel-logo.png'
import bitrileMockup from 'assets/bitriels.png'
import createWallet from 'assets/icons/create-wallet-white.svg'
import restoreWallet from 'assets/icons/restore-white.svg'
import androidWhite from 'assets/icons/android-white.svg'
import android from 'assets/icons/android.svg'
import appleWhite from 'assets/icons/apple-white.svg'
import apple from 'assets/icons/apple.svg'
import mobile from 'assets/bitriel-3.svg'
import selTransparent from 'assets/SEL-coin-transparent.png'
import { AccountContext } from '../context/AccountContext'
import ModalEVM from '../components/Wallet/ModalEVM'
import bitrielMarket from '../assets/bitriel-market-4.png'

export default function Index() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [createWalletVisible, setCreateWalletVisible] = useState(false)
  const { account } = useContext(AccountContext)
  const [connect, setConnect] = useState(false)

  const onVisible = () => {
    setVisible(!visible)
  }
  const handleCreateWalletVisible = () => {
    setCreateWalletVisible(!createWalletVisible)
  }

  const onConnect = () => {
    setConnect(true)
  }

  const onCancel = () => {
    setConnect(false)
  }

  // useEffect(() => {
  //   if(currentAccount) navigate('/home');
  // },[currentAccount, navigate]);

  return (
    <div className="index-wrapper">
      <div className="index-top-section">
        <div className="index-container">
          <img src={logoWhite} alt="" className="logo" />
          <Row>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <img src={selTransparent} alt="" className="coin-transparent" />
              <div className="welcome">
                <h4 className="welcome-sub-message">
                  Cross-chains digital wallet, decentralized exchange,
                  decentralized derivatives trading, launchpad, decentralized
                  investment and funding platform, and more.
                </h4>
                <div className="create-restore-buttons">
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
                      <Button.Third
                        large
                        block
                        onClick={handleCreateWalletVisible}
                      >
                        <img
                          src={createWallet}
                          style={{ color: '#FFF' }}
                          alt=""
                          className="create-wallet-img"
                        />
                        Create Wallet
                      </Button.Third>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
                      <Button.Third large block onClick={onVisible}>
                        <img
                          src={restoreWallet}
                          alt=""
                          className="create-wallet-img"
                        />
                        Restore Wallet
                      </Button.Third>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={8}>
                      {account ? (
                        <Button.GradientBorder
                          onClick={() => setConnect(true)}
                          medium
                        >
                          Disconnect
                        </Button.GradientBorder>
                      ) : (
                        <Button.Third large block onClick={onConnect}>
                          <img
                            src={createWallet}
                            style={{ color: '#FFF' }}
                            alt=""
                            className="create-wallet-img"
                          />
                          Connect EVM
                        </Button.Third>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <img src={mobile} alt="bitriel app" className="bitriel-mock-up" />
            </Col>
          </Row>
        </div>
      </div>

      <div className="index-container2">
        <div className="apps-section">
          <div className="apps-title-container">
            <div className="apps-title">
              <img
                src={bitrileLogo}
                alt="bitriel logo"
                height={40}
                style={{ marginRight: '20px' }}
              />
              <h1 className="welcome-message">Get started with Bitriel</h1>
            </div>
            <h3>
              The SELENDRA Bitriel Wallet has been created as a Progressive Web
              App (PWA) which is easy to launch on all platforms:{' '}
            </h3>
            <br />

            <Row gutter={[18, 18]} justify="space-between">
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Button.Accent medium block>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://play.google.com/store/search?q=bitriel&c=apps"
                  >
                    <img
                      src={theme === 'light' ? android : androidWhite}
                      alt=""
                      height="30px"
                    />
                    Android
                  </a>
                </Button.Accent>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Button.Accent medium block>
                  <img
                    src={theme === 'light' ? apple : appleWhite}
                    alt=""
                    height="30px"
                  />
                  IOS
                </Button.Accent>
              </Col>
            </Row>
          </div>

          <img
            src={bitrileMockup}
            alt="bitriel app"
            className="bitriels-apps"
          />
        </div>
      </div>

      <div className=" black-background">
        <div className="index-container ">
          <center>
            <h1 className="bitriel-market-place">MARKET</h1>
            <h1 className="market-title">Trade Crypto Decentralized</h1>
          </center>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={10}>
              <h4 className="welcome-sub-message-2">
                Explore trading, GameFi, and APX in the Bitriel ecosystem.
              </h4>
              <div class="container2">
                <a
                  href="https://market.bitriel.com/"
                  target="_blank"
                  rel="noreferrer"
                  class="btn"
                >
                  <svg width="277" height="62">
                    <defs>
                      <linearGradient id="grad1">
                        <stop offset="0%" stop-color="#FF8282" />
                        <stop offset="100%" stop-color="#E178ED" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="5"
                      y="5"
                      rx="25"
                      fill="none"
                      stroke="url(#grad1)"
                      width="266"
                      height="50"
                    ></rect>
                  </svg>

                  <span>trade here</span>
                </a>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} xxl={14}>
              <img src={bitrielMarket} alt="" className="bitriel-market-img" />
            </Col>
          </Row>
        </div>
      </div>

      <div className="index-container2">
        <Row className="index-footer" align="middle">
          <Col>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/selendrachain"
            >
              <i className="ri-facebook-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="http://t.me/selendrachainofficial/193"
            >
              <i className="ri-telegram-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/selendrachain"
            >
              <i className="ri-twitter-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://kh.linkedin.com/company/selendrachain"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://medium.com/selendra"
            >
              <i className="ri-medium-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/bitriel"
            >
              <i class="ri-github-fill"></i>
            </a>
          </Col>
          <Col>
            <p>2022 © Selendra, Blockchain</p>
          </Col>
        </Row>
      </div>

      <CreateWallet
        visible={createWalletVisible}
        setVisible={setCreateWalletVisible}
      />
      <RestoreWallet visible={visible} setVisible={setVisible} />
      <ModalEVM connect={connect} onCancel={onCancel} />
    </div>
  )
}
