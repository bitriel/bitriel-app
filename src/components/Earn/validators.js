import React from 'react'
import { Space, Table } from 'antd'
import { CryptoAvatar, Card } from '../../globalComponents'
import validators from './data/validator.json'

export const Validators = () => {
  const columns = [
    // {
    //   title: '',
    //   dataIndex: 'validator_address',
    //   key: 'validator_name',
    //   render: (validator_address) => {
    //     return <CryptoAvatar addrees={validator_address} />
    //   },
    // },
    {
      title: 'Validators',
      dataIndex: 'validator_name',
      key: 'validator_name',
      render: (validator_name, record) => {
        return (
          <>
            <Space>
              <CryptoAvatar addrees={record.validator_address} />
              <p>{record.validator_name}</p>
            </Space>
          </>
        )
      },
    },
    {
      title: 'Total Stake',
      dataIndex: 'total_stake',
      key: 'total_stake',
    },
    {
      title: 'COMM',
      dataIndex: 'commision',
      key: 'commision',
    },

    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Return',
      dataIndex: 'APY',
      key: 'APY',
    },
  ]

  return (
    <>
      <Card>
        <Table
          columns={columns}
          dataSource={validators}
          bordered={false}
          pagination={{ pageSize: 12 }}
        />
      </Card>
    </>
  )
}
