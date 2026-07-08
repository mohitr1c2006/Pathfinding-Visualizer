// ============================================
// HEURISTICS
// ============================================

// A heuristic is an estimated cost from
// current node to the end node
// Used by A* to make smarter decisions

// ============================================
// MANHATTAN DISTANCE
// ============================================

// Formula: h = |x1 - x2| + |y1 - y2|
// Works perfectly for grids where you can only
// move Up, Down, Left, Right (no diagonals)

export function manhattanDistance(nodeA, nodeB) {
  const rowDifference = Math.abs(nodeA.row - nodeB.row)
  const colDifference = Math.abs(nodeA.col - nodeB.col)
  return rowDifference + colDifference
}