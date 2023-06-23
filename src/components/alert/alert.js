import React from 'react'

export default function Alert(props) {
  return (
    <div data-testid="alert" className={'alert ' + props.alertType}>
        {props.alertType.includes('error') ? 'Error' : 'Success'}
    </div>
  )
}
