import React from 'react'

import './styles.css'

function DashboardBatches({ text, iconName, onClick }) {
  return (
    <div className="DashboardBatch">
      <i className={`${iconName || 'fa-user'} fa-5x`} 
        onClick={onClick}/>
      <p>{text}</p>
    </div>
  )
}

export { DashboardBatches }
