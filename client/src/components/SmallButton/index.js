import React from 'react'
import { useDispatch } from 'react-redux'

import { customisedAction } from '../../redux/actions'
import { SET_TOAST } from '../../constants'

import './styles.css'

function SmallButton ({ onClick, text, style, disabled, disabledAction, children }) {
  
  const dispatch = useDispatch()

  return (
    <div>
      {disabled ?
        <button 
          className="SmallButton"
          onClick={disabledAction ? disabledAction : () => dispatch(customisedAction(SET_TOAST, { message: 'Button is disable!', type: 'warning'}))}
          style={{ backgroundColor: 'rgba(62, 161, 117, 0.3)', borderColor: 'rgba(62, 161, 117, 0.3)', ...style }}>
          <p className="SmallButtonText" style={{ color: 'white' }}>{text} {children}</p>
        </button>
        : <button 
          className="SmallButton"
          style={style || {}}
          onClick={onClick}>
          <p className="SmallButtonText">{text} {children}</p>
        </button>
      }
    </div>
  )
}

export { SmallButton }
