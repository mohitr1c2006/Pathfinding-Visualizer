import React from 'react'
import '../styles/grid.css'

// ============================================
// CELL COMPONENT
// ============================================

// Renders a single cell in the grid
// Receives all data and functions via props from Grid.jsx

function Cell({ node, onMouseDown, onMouseEnter, onMouseUp }) {

  // Destructure the node object for easy access
  const { row, col, state } = node

  // Get the CSS class based on cell state
  // This is what gives each cell its color
  function getCellClass() {
    if (state === 'start') return 'cell cell-start'
    if (state === 'end') return 'cell cell-end'
    if (state === 'wall') return 'cell cell-wall'
    if (state === 'visited') return 'cell cell-visited'
    if (state === 'path') return 'cell cell-path'
    return 'cell cell-empty'
  }

  return (
    <div
      className={getCellClass()}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  )
}

export default Cell