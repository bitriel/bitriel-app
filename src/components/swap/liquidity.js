import React, { useState } from 'react'
import { Form, Segmented, Select } from 'antd'
import { Card } from '../../globalComponents'

const { Option } = Select

export const Liquidity = () => {
  const [value, setValue] = useState('Add Liquidity')
  return (
    <>
      <Segmented
        options={['Add Liquidity', 'Withdraw']}
        value={value}
        onChange={setValue}
      />
      <div className="liquidity-container">
        <Card>
          <h1>Add Liquidity</h1>
          <p>Add liquidity to a pool and get the tokens of the pair.</p>
          <Form layout="vertical">
            <Form.Item label="Select pair">
              <Select className="funan-selectMedium" defaultValue="test">
                <Option value="test">Test</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}
