import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_TOAST } from '../../constants'

import './styles.css'

function Button ({ onClick, text, style, light, lightAction, iconLeft, iconRight }) {
  
  const dispatch = useDispatch()

  return (
    <div>
      {light ?
        <button 
          className="Button"
          onClick={lightAction ? lightAction : () => dispatch(customisedAction(SET_TOAST, { message: 'Button is disable!', type: 'warning'}))}
          style={{ backgroundColor: '#b5c9bf', borderColor: '#b5c9bf', ...style }}>
          {iconLeft && <p className="ButtonText" style={{ color: 'white', paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="ButtonText" style={{ color: 'white' }}>{text}</p>
          {iconRight && <p className="ButtonText" style={{ color: 'white', paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
        : <button 
          className="Button"
          style={style || {}}
          onClick={onClick}>
          {iconLeft && <p className="ButtonText" style={{ paddingRight: '5px' }}>{iconLeft}</p>}
          <p className="ButtonText">{text}</p>
          {iconRight && <p className="ButtonText" style={{ paddingLeft: '5px' }}>{iconRight}</p>}
        </button>
      }
    </div>
  )
}

export { Button }
