import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_TOAST } from '../../constants'

import './styles.css'

function SmallButtonRed ({ onClick, text, style, light, lightAction, iconLeft, iconRight }) {
  
  const dispatch = useDispatch()

  return (
    <div>
      {light ?
        <button 
          className="SmallButtonRed"
          onClick={lightAction ? lightAction : () => dispatch(customisedAction(SET_TOAST, { message: 'Button is disable!', type: 'warning'}))}
          style={{ backgroundColor: 'rgba(62, 161, 117, 0.3)', borderColor: 'rgba(62, 161, 117, 0.3)', ...style }}>
          {iconLeft && <p className="SmallButtonRedText" style={{ color: 'white', paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="SmallButtonRedText" style={{ color: 'white' }}>{text}</p>
          {iconRight && <p className="SmallButtonRedText" style={{ color: 'white', paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
        : <button 
          className="SmallButtonRed"
          style={style || {}}
          onClick={onClick}>
          {iconLeft && <p className="SmallButtonRedText" style={{ paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="SmallButtonRedText">{text}</p>
          {iconRight && <p className="SmallButtonRedText" style={{ paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
      }
    </div>
  )
}

export { SmallButtonRed }
