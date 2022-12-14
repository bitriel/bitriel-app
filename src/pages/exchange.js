import develop from '../assets/develop.svg'
import LayoutComponent from '../components/Layout'

export default function Exchange() {
  return (
    <LayoutComponent>
      <center style={{ marginTop: '40px' }}>
        <img src={develop} alt="" width="320" />
        <h2
          style={{
            color: '#03A9F4',
            fontSize: '20px',
            fontWeight: '600',
            marginTop: '16px',
          }}
        >
          Under Development
        </h2>
      </center>
    </LayoutComponent>
  )
}
