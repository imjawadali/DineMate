import React from 'react'

import './styles.css'

function DashboardBatches({ text, iconName, onClick }) {
  return (
    <div className="DashboardBatch" 
      onClick={onClick}>
      <i className={`${iconName || 'fa-user'} fa-5x DashboardBatchIcon`} />
      <p>{text}</p>
    </div>
  )
}

export { DashboardBatches }
