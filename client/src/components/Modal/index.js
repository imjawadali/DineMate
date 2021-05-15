import React from 'react'

import './styles.css'

function Modal ({ display, width, children }) {
  return (
    <div className="modal" style={{ display: display || 'none' }}>
      <div className="modal-content"
        style={{
          width: width || '80%'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export { Modal }