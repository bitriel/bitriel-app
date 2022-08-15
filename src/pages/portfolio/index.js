import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import Send from './send'
import Receive from './receive'
import MyPortfolio from './my-portfolio'
import { useNavigate } from 'react-router-dom'

const { TabPane } = Tabs

const Portfolio = () => {
  //=========state ========
  const [visible, setVisible] = useState(true)
  let navigate = useNavigate()

  const onVisible = () => {
    setVisible(true)
  }
  const inVisible = () => {
    setVisible(false)
  }

  useEffect(() => {
    navigate('/portfolio')
  }, [navigate])

  return (
    <Tabs defaultActiveKey="/selendra">
      <TabPane tab="Selendra" key="/selendra">
        <MyPortfolio
          visible={visible}
          onVisible={onVisible}
          inVisible={inVisible}
        />
      </TabPane>
      <TabPane tab="Send" key="/send">
        <Send />
      </TabPane>
      <TabPane tab="Received" key="/recieved">
        <Receive />
      </TabPane>
    </Tabs>
  )
}

export default Portfolio
