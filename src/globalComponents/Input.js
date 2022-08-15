import { Input as AntInput } from 'antd'
import { InputNumber as AntInputNumber } from 'antd'

export default function Input({ children, ...restProps }) {
  return <div {...restProps}>{children}</div>
}

Input.Text = function InputText({ medium, ...restProps }) {
  return (
    <AntInput
      {...restProps}
      className={`
        funan-input
        ${medium && 'funan-inputMedium'}
      `}
    />
  )
}
Input.Number = function InputNumber({ medium, ...restProps }) {
  return (
    <AntInputNumber
      {...restProps}
      className={`
        funan-inputNumber
        ${medium && 'funan-inputMediumNumber'}
      `}
    />
  )
}

Input.Password = function InputPassword({ medium, ...restProps }) {
  return (
    <AntInput.Password
      {...restProps}
      className={`
        funan-inputPassword
        ${medium && 'funan-inputPassword-medium'}
      `}
    />
  )
}

Input.TextArea = function InputTextArea({ ...restProps }) {
  return (
    <AntInput.TextArea
      {...restProps}
      className={`
        funan-inputArea
      `}
    />
  )
}
