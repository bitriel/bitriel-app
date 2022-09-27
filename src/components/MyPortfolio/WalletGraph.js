import React, { useEffect, useState, useContext } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Card } from '../../globalComponents'
import sel from '../../assets/tokens/sel.png'
import busd from '../../assets/tokens/busd.png'
import usdt from '../../assets/tokens/usdt.png'
import dai from '../../assets/tokens/dai.png'
import eth from '../../assets/tokens/eth.png'
import bnb from '../../assets/tokens/bnb.png'
import { ethers } from 'ethers'
import { AccountContext } from '../../context/AccountContext'

ChartJS.register(ArcElement, Tooltip, Legend)

const WalletGraph = () => {
  const { account: accountContext } = useContext(AccountContext)
  const [account, setAccount] = useState(accountContext)
  const [balance, setBalance] = useState([])
  const [loading, setLoading] = useState(false)

  const tokens = [
    { title: 'SEL', value: '12000', icon: sel },
    { title: 'BUSD', value: '1000', icon: busd },
    { title: 'DAI', value: '200', icon: dai },
    { title: 'USDT', value: '2000', icon: usdt },
    { title: 'ETH', value: '8000', icon: eth },
    { title: 'BNB', value: '3000', icon: bnb },
  ]

  const newLabels = []
  const tokenValues = []
  const result = tokens.filter((item) => newLabels.push(item.title))
  const vaules = tokens.filter((item) => tokenValues.push(item.value))

  const data = {
    labels: newLabels,
    datasets: [
      {
        label: '# of Votes',
        data: tokenValues,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const noData = {
    labels: ['No assets'],
    datasets: [
      {
        label: '# of Votes',
        data: [1],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  useEffect(() => {
    if (!account) return
    async function getBalance() {
      const tokenABI = ['function balanceOf(address) view returns (uint)']
      const provider = ethers.getDefaultProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545/',
      )
      setLoading(true)
      await Promise.all(
        tokens.map(
          (i) => new ethers.Contract(i.tokenAddress, tokenABI, provider),
        ),
      )
        .then(async ([BUSD, DAI, USDT, ETH]) => {
          await Promise.all([
            BUSD.balanceOf(account),
            DAI.balanceOf(account),
            USDT.balanceOf(account),
            ETH.balanceOf(account),
            provider.getBalance(account),
          ]).then(([BUSD, DAI, USDT, ETH, BNB]) => {
            const data = [
              { title: 'BUSD', value: BUSD._hex, icon: busd },
              { title: 'DAI', value: DAI._hex, icon: dai },
              { title: 'USDT', value: USDT._hex, icon: usdt },
              { title: 'ETH', value: ETH._hex, icon: eth },
              { title: 'BNB', value: BNB._hex, icon: bnb },
            ]
            setBalance(data)
            setLoading(false)
          })
        })
        .catch(() => {
          setLoading(false)
        })
    }
    getBalance()
  }, [account])

  return (
    <Card.Auto>
      <div className="graph-container">
        {account ? (
          <Doughnut data={data} />
        ) : (
          <>
            <div className="nodata">
              <center>
                <p>No Assets</p>
              </center>
            </div>
            <Doughnut data={noData} />
          </>
        )}
      </div>
      {/* <div className="home-buttons-options-container">
        {visible ? <VisibleToken /> : <InVisibleToken />}
      </div> */}
    </Card.Auto>
  )
}

export default WalletGraph
