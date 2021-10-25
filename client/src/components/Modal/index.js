import React from 'react'

import './styles.css'

function Modal ({ display, width, height, children }) {
  return (
    <div className="modal" style={{ display: display || 'none' }}>
      <div className="modal-content"
        style={{
          width: width || '80%',
          height: height || ''
        }}
      >
        {children}
      </div>
    </div>
  )
}

export { Modal }