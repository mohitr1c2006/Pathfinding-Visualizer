import React from 'react'
import Cell from './Cell.jsx'
import '../styles/grid.css'

// ============================================
// GRID COMPONENT
// ============================================

// Renders the entire 20x20 grid
// Gets the grid data and mouse handlers from App.jsx via props

function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
  return (
    <div className="grid-container">
      {/* Loop through each row */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">

          {/* Loop through each cell in the row */}
          {row.map((node, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              node={node}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          ))}

        </div>
      ))}
    </div>
  )
}

export default Grid