import React from 'react'
import { Tabs, Form, Select, Space, Slider, Row, Col } from 'antd'
import { Card } from '../../globalComponents'
import swap from '../../assets/sidebar-icons/transfer.svg'
import { Button, Input } from '../../globalComponents'
import busd from '../../assets/tokens/busd.png'
import usdt from '../../assets/tokens/usdt.png'
import dai from '../../assets/tokens/dai.png'
import eth from '../../assets/tokens/eth.png'
import bnb from '../../assets/tokens/bnb.png'
import sel from '../../assets/tokens/sel.png'
import { Liquidity } from '../../components/swap/liquidity'

const { TabPane } = Tabs
const { Option } = Select

const Swap = () => {
  const formatter = (value) => `${value}%`

  // ----sample of tokens ----
  const tokens = [
    { title: 'SEL', value: '12000', icon: sel },
    { title: 'BUSD', value: '1000', icon: busd },
    { title: 'DAI', value: '200', icon: dai },
    { title: 'USDT', value: '2000', icon: usdt },
    { title: 'ETH', value: '8000', icon: eth },
    { title: 'BNB', value: '3000', icon: bnb },
  ]

  const payWith = (
    <Select
      style={{
        width: 110,
      }}
      defaultValue={tokens[0].title}
    >
      {tokens.map((data) => (
        <Option value={data.title}>
          <Space>
            <div>
              <img src={data.icon} alt="" height={30} />
            </div>
            <div> {data.title}</div>
          </Space>
        </Option>
      ))}
    </Select>
  )

  const receivedWith = (
    <Select
      style={{
        width: 110,
      }}
      defaultValue={tokens[1].title}
    >
      {tokens.map((data) => (
        <Option value={data.title}>
          <Space>
            <div>
              <img src={data.icon} alt="" height={30} />
            </div>
            <div> {data.title}</div>
          </Space>
        </Option>
      ))}
    </Select>
  )

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Swap" key="/swap">
        <Card>
          <div className="swap-form-container">
            <Form layout="vertical">
              <Form.Item
                name="pay"
                label="Pay with"
                rules={[
                  {
                    required: true,
                    message: 'Fill the amount!',
                  },
                ]}
              >
                <Input.Number
                  medium
                  addonAfter={payWith}
                  defaultValue={0}
                  min={0}
                />
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={18}>
                    <Slider
                      className="token-slider-amount"
                      // value={(decimal * 100) / balance}
                      tipFormatter={formatter}
                      // onChange={slidToNumber}
                      marks={{
                        0: '0',
                        25: '25%',
                        50: '50%',
                        75: '75%',
                        100: {
                          style: {
                            color: '#f50',
                          },
                          label: <strong>MAX</strong>,
                        },
                      }}
                    />
                  </Col>
                  <Col span={6}>
                    <p>Balnace: 12000 SEL</p>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <center>
                  <img src={swap} alt="" className="swap-icon" />
                </center>
              </Form.Item>
              <Form.Item
                name="received"
                label="Recieved"
                rules={[
                  {
                    required: true,
                    message: 'Fill the amount!',
                  },
                ]}
              >
                <Input.Number
                  medium
                  addonAfter={receivedWith}
                  defaultValue={0}
                  min={0}
                  disabled
                />
              </Form.Item>
              <Form.Item className="swap-button">
                <Button.Primary block medium>
                  SWAP
                </Button.Primary>
              </Form.Item>
              <p className="swap-rates">1 SEL ~ 0.00301 BUSD</p>
            </Form>
          </div>
        </Card>
      </TabPane>
      <TabPane tab="Liquidity" key="/liquidity">
        {/* <Liquidity /> */}
      </TabPane>
    </Tabs>
  )
}

export default Swap
