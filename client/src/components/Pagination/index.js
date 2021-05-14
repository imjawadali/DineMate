import React from 'react'

import './styles.css'

function Pagination({ currentIndex, mappingCounts, totalCounts, perPageCounts, onClick  }) {
  return (
    <div className="Pagination">
      {mappingCounts.map((value, index) => {
        return <p className={`PaginationCounts ${currentIndex === index + 1 ? 'PaginationActive' : null}`}
          onClick={() => onClick(index + 1)}>
          {index + 1}
        </p>
      })}
      <p className="PaginationTotal">{(currentIndex * perPageCounts) - perPageCounts + 1}-{currentIndex === mappingCounts.length ? totalCounts : (currentIndex * perPageCounts)}</p>
      <p className="PaginationTotal" style={{ color: 'black' }}>/ {totalCounts}</p>
    </div>
  )
}

export { Pagination }
