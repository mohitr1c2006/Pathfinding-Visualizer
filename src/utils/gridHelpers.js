// ============================================
// CREATE INITIAL GRID
// ============================================

// Creates a 20x20 grid of node objects
export function createInitialGrid(start, end) {
  const grid = []

  for (let row = 0; row < 20; row++) {
    const currentRow = []

    for (let col = 0; col < 20; col++) {
      currentRow.push(createNode(row, col, start, end))
    }

    grid.push(currentRow)
  }

  return grid
}

// ============================================
// CREATE SINGLE NODE
// ============================================

// Creates one cell object with all its properties
function createNode(row, col, start, end) {
  return {
    row,                                              // row position
    col,                                              // col position
    isStart: row === start.row && col === start.col,  // is this the start node?
    isEnd: row === end.row && col === end.col,        // is this the end node?
    isWall: false,                                    // is this a wall?
    state: getInitialState(row, col, start, end),     // visual state of cell
    distance: Infinity,                               // used by Dijkstra
    gScore: Infinity,                                 // used by A* (cost from start)
    fScore: Infinity,                                 // used by A* (gScore + heuristic)
    previousNode: null,                               // used to reconstruct path
  }
}

// ============================================
// GET INITIAL STATE
// ============================================

// Returns the starting visual state of a cell
function getInitialState(row, col, start, end) {
  if (row === start.row && col === start.col) return 'start'
  if (row === end.row && col === end.col) return 'end'
  return 'empty'
}

// ============================================
// TOGGLE WALL
// ============================================

// Adds or removes a wall on a cell
// Returns a brand new grid (never mutates original)
export function toggleWall(grid, row, col, start, end) {
  const node = grid[row][col]

  // Do not allow walls on start or end nodes
  if (node.isStart || node.isEnd) return grid

  // Deep copy the entire grid
  const newGrid = grid.map(r => r.map(cell => ({ ...cell })))

  // Toggle the wall on the clicked cell
  const clickedNode = newGrid[row][col]
  clickedNode.isWall = !clickedNode.isWall
  clickedNode.state = clickedNode.isWall ? 'wall' : 'empty'

  return newGrid
}

// ============================================
// CLEAR VISITED AND PATH
// ============================================

// Clears visited and path colors before re-running algorithm
// Keeps walls intact
export function clearVisitedAndPath(grid) {
  return grid.map(row =>
    row.map(cell => {
      // Only reset visited and path cells
      if (cell.state === 'visited' || cell.state === 'path') {
        return {
          ...cell,
          state: 'empty',
          distance: Infinity,
          gScore: Infinity,
          fScore: Infinity,
          previousNode: null,
        }
      }
      // Reset scores on all other cells too (for re-running)
      return {
        ...cell,
        distance: Infinity,
        gScore: Infinity,
        fScore: Infinity,
        previousNode: null,
      }
    })
  )
}