import React from 'react'

const colors = ['rgba(255, 0, 0, 0.5)', 'rgb(245, 222, 179)', 'lightgreen']

function ServiceQueItem({ id, type, tableNumber, text, onClick }) {
  return (
    <div className="DashboardGridItem" key={id}
      style={{ backgroundColor: colors[type || 0] || 'rgba(255, 0, 0, 0.5)', margin: '20px 0px' }}
      onClick={onClick}
    >
      <i className="fa fa-times-circle"
        style={{
          display: 'block',
          float: 'right',
          position: 'absolute',
          top: 5,
          right: 5
        }}
        onClick={() => null}
      />
      <p className="DashboardGridItemText">Table {tableNumber} - {text}</p>
    </div>
  )
}

export { ServiceQueItem }
