import React, { useState } from 'react'

function ReadyIcon ({ status, markingItemReady, onClick }) {

  const [color, setcolor] = useState('rgba(0, 0, 0, 0.2)')

  return (
    <i
      className={`fa ${markingItemReady ? 'fa-refresh fa-pulse' : `fa-check${status === 'R' ? '-circle' : ''}`}`}
      onMouseEnter={(e) => setcolor('black')}
      onMouseLeave={(e) => setcolor('rgba(0, 0, 0, 0.2)')}
      style={status === 'R' ? 
        { color: 'rgb(0, 141, 69)' }
        : { color: markingItemReady ? 'black' : color, cursor: 'pointer' }}
      onClick={onClick}
    />
  )
}

export { ReadyIcon }
