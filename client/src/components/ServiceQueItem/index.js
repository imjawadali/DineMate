import React from 'react'

const colors = ['rgba(255, 0, 0, 0.5)', 'rgb(245, 222, 179)', 'lightgreen']

function ServiceQueItem({ type, tableNumber, text, onClick }) {
  return (
    <div className="DashboardGridItem"
      style={{ backgroundColor: colors[type || 0] || 'rgba(255, 0, 0, 0.5)', margin: '20px 0px' }}
      onClick={onClick}
    >
      <p className="DashboardGridItemText">Table {tableNumber} - {text}</p>
    </div>
  )
}

export { ServiceQueItem }
