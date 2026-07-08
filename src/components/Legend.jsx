import React from 'react'

// ============================================
// LEGEND COMPONENT
// ============================================

// Shows the color key for all cell types
// No props needed — this never changes

function Legend() {

  // All legend items in one array
  // Makes it easy to add/remove items later
  const legendItems = [
    { label: 'Start Node',    color: '#00b300' },
    { label: 'End Node',      color: '#ff0000' },
    { label: 'Wall',          color: '#2c2c2a' },
    { label: 'Empty Cell',    color: '#ffffff' },
    { label: 'Visited Node',  color: '#378ADD' },
    { label: 'Frontier Node', color: '#EF9F27' },
    { label: 'Final Path',    color: '#7F77DD' },
  ]

  return (
    <div className="legend-container">

      {/* ---- Title ---- */}
      <h2 className="legend-title">Legend</h2>

      {/* ---- Legend Items ---- */}
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">

          {/* Color box */}
          <div
            className="legend-color-box"
            style={{ backgroundColor: item.color }}
          />

          {/* Label */}
          <span className="legend-label">{item.label}</span>

        </div>
      ))}

    </div>
  )
}

export default Legend