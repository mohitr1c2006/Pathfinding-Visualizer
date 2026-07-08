// ============================================
// DEPTH FIRST SEARCH (DFS)
// ============================================

// DFS explores as far as possible in one direction
// before backtracking and trying another direction
// Like solving a maze by always turning left first
// DOES NOT guarantee the shortest path

// Time Complexity:  O(V + E)
// Space Complexity: O(V)
// V = number of vertices (nodes)
// E = number of edges (connections)

export function dfs(grid, start, end) {

  // List of nodes visited in order
  // This is what we animate (blue cells)
  const visited = []

  // Stack — Last In First Out (LIFO)
  // This is what makes DFS go DEEP first
  const stack = []

  // Get the actual start and end node from grid
  const startNode = grid[start.row][start.col]
  const endNode = grid[end.row][end.col]

  // Add start node to stack
  stack.push(startNode)

  // Keep going until stack is empty
  while (stack.length > 0) {

    // Take the LAST node from stack (LIFO)
    const currentNode = stack.pop()

    // Skip if already visited
    if (currentNode.isVisited) continue

    // Skip walls
    if (currentNode.isWall) continue

    // Mark current node as visited
    currentNode.isVisited = true

    // Add to visited list for animation
    visited.push(currentNode)

    // If we reached end node we are done
    if (currentNode === endNode) break

    // Get all valid neighbors
    const neighbors = getNeighbors(currentNode, grid)

    // Process each neighbor
    for (const neighbor of neighbors) {

      // Skip already visited neighbors
      if (neighbor.isVisited) continue

      // Remember where we came from
      // Used for path reconstruction later
      neighbor.previousNode = currentNode

      // Add neighbor to stack
      stack.push(neighbor)
    }
  }

  // Reconstruct the final path
  const path = reconstructPath(endNode)

  return { visited, path }
}

// ============================================
// GET NEIGHBORS
// ============================================

// Returns valid Up, Down, Left, Right neighbors
function getNeighbors(node, grid) {
  const neighbors = []
  const { row, col } = node
  const numRows = grid.length
  const numCols = grid[0].length

  // Up
  if (row > 0) neighbors.push(grid[row - 1][col])

  // Down
  if (row < numRows - 1) neighbors.push(grid[row + 1][col])

  // Left
  if (col > 0) neighbors.push(grid[row][col - 1])

  // Right
  if (col < numCols - 1) neighbors.push(grid[row][col + 1])

  return neighbors
}

// ============================================
// RECONSTRUCT PATH
// ============================================

// Walks backwards from end node to start node
// using previousNode links set during search
function reconstructPath(endNode) {
  const path = []
  let currentNode = endNode

  // Follow previousNode links back to start
  while (currentNode !== null) {
    path.unshift(currentNode)
    currentNode = currentNode.previousNode
  }

  // If path only has one node no path was found
  if (path.length === 1) return []

  return path
}