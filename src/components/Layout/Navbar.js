import React from 'react'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountContext'
import { Link } from 'react-router-dom'
import Button from '../../globalComponents/Button'

const Navbar = () => {
  const { account } = useContext(AccountContext)

  return (
    <>
      <div className="connect-evm">
        {account ? (
          <Button.GradientBorder medium>Connected</Button.GradientBorder>
        ) : (
          <Link to="/connect">
            <Button.GradientBorder medium>Connect EVM</Button.GradientBorder>
          </Link>
        )}
      </div>
    </>
  )
}

export default Navbar
