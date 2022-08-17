import React from 'react'
import { Row, Col, Collapse } from 'antd'
import { Card, CryptoAvatar, Button } from '../../globalComponents'
import sel from '../../assets/sel-icon.svg'
import data from './data/validator.json'
import { CaretRightOutlined } from '@ant-design/icons'

const { Panel } = Collapse

export const Staking = () => {
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card.Auto>
            <h1>Overview</h1>
            <br />
            <div className="staking-overview">
              <Row gutter={[12, 12]}>
                <Col>
                  <img src={sel} alt="" height={90} />
                </Col>
                <Col>
                  <p>Available to Stake</p>
                  <h1 className="portfolio-money">24000.00 SEL</h1>
                  <p className="portfolio-equalto">≈ 1.000111 BTC</p>
                </Col>
              </Row>
              <Row gutter={[12, 12]}>
                <Col>
                  <img src={sel} alt="" height={90} />
                </Col>
                <Col>
                  <p>Total Locked</p>
                  <h1 className="portfolio-money">124000.00 SEL</h1>
                  <p className="portfolio-equalto">≈ 2.000111 BTC</p>
                </Col>
              </Row>
            </div>
          </Card.Auto>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {data.map((validator, index) => {
              const {
                validator_name,
                validator_address,
                APY,
                commision,
                is_staking,
                earned,
                locked,
                total_stake,
                owner_stake,
                other_stake,
                members,
              } = validator

              const MoreDtails = () => (
                <Card.Auto reverse>
                  <Row justify="space-between">
                    <Col>
                      <p>Total Locked</p>
                    </Col>
                    <Col>
                      <h4>{locked}</h4>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>
                      <p>Earn</p>
                    </Col>
                    <Col>
                      <h4>{earned}</h4>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>
                      <p>Total Staked</p>
                    </Col>
                    <Col>
                      <h4>{total_stake}</h4>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>
                      <p>Onwer Stake</p>
                    </Col>
                    <Col>
                      <h4>{owner_stake}</h4>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>
                      <p>Others</p>
                    </Col>
                    <Col>
                      <h4>{other_stake}</h4>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col>
                      <p>Members</p>
                    </Col>
                    <Col>
                      <h4>{members}</h4>
                    </Col>
                  </Row>
                </Card.Auto>
              )

              return (
                <>
                  <Col span={12}>
                    <Card key={index}>
                      <div className="portfolio-staking-token">
                        <div>
                          <CryptoAvatar addrees={validator_address} />
                          <span className="portfolio-validator-name">
                            {validator_name}
                          </span>
                        </div>
                        {is_staking ? (
                          <div className="is-staking-container">
                            <i className="ri-auction-fill is-staking"></i>
                          </div>
                        ) : (
                          <p>Validator</p>
                        )}
                      </div>
                      <br />
                      <Card.Auto reverse>
                        <Row justify="space-between">
                          <Col>
                            <p>Return</p>
                          </Col>
                          <Col>
                            <h4>{APY}</h4>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>
                            <p>Commision</p>
                          </Col>
                          <Col>
                            <h4>{commision}</h4>
                          </Col>
                        </Row>
                      </Card.Auto>
                      <br />
                      <Card.Auto reverse>
                        <Row justify="space-between">
                          <Col>
                            <p>Eearn</p>
                          </Col>
                          <Col>
                            <h4>{earned}</h4>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>
                            <p>Locked</p>
                          </Col>
                          <Col>
                            <h4>{locked}</h4>
                          </Col>
                        </Row>
                      </Card.Auto>
                      <br />
                      {is_staking ? (
                        <Button.Primary block medium>
                          UnStake
                        </Button.Primary>
                      ) : (
                        <Button.Primary block medium>
                          Stake
                        </Button.Primary>
                      )}
                      <div>
                        <Collapse
                          bordered={false}
                          expandIcon={({ isActive }) => (
                            <>
                              <span>
                                {isActive ? 'Hide' : 'Details'} &nbsp;
                              </span>
                              <CaretRightOutlined
                                rotate={isActive ? 270 : 90}
                              />
                            </>
                          )}
                          className="site-collapse-custom-collapse"
                        >
                          <Panel
                            key={index}
                            className="site-collapse-custom-panel"
                          >
                            <MoreDtails />
                          </Panel>
                        </Collapse>
                      </div>
                    </Card>
                  </Col>
                </>
              )
            })}
          </Row>
        </Col>
      </Row>
    </>
  )
}
