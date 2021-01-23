import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_TOAST } from '../../constants'

import './styles.css'

function SmallButton ({ onClick, text, style, light, lightAction, iconLeft, iconRight }) {
  
  const dispatch = useDispatch()

  return (
    <div>
      {light ?
        <button 
          className="SmallButton"
          onClick={lightAction ? lightAction : () => dispatch(customisedAction(SET_TOAST, { message: 'Button is disable!', type: 'warning'}))}
          style={{ backgroundColor: 'rgba(62, 161, 117, 0.3)', borderColor: 'rgba(62, 161, 117, 0.3)', ...style }}>
          {iconLeft && <p className="SmallButtonText" style={{ color: 'white', paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="SmallButtonText" style={{ color: 'white' }}>{text}</p>
          {iconRight && <p className="SmallButtonText" style={{ color: 'white', paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
        : <button 
          className="SmallButton"
          style={style || {}}
          onClick={onClick}>
          {iconLeft && <p className="SmallButtonText" style={{ paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="SmallButtonText">{text}</p>
          {iconRight && <p className="SmallButtonText" style={{ paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
      }
    </div>
  )
}

export { SmallButton }
