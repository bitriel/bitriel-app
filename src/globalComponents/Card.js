import { Card as AntCard } from 'antd'

export default function Card({ children, ...restProps }) {
  return (
    <AntCard {...restProps} className="funan-card">
      <div className="funan-sub-card">{children}</div>
    </AntCard>
  )
}

Card.Auto = function CardAuto({ children, ...restProps }) {
  return (
    <AntCard {...restProps} className="funan-card-auto">
      <div className="funan-sub-card">{children}</div>
    </AntCard>
  )
}
