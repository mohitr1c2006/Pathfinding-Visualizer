// ============================================
// BREADTH FIRST SEARCH (BFS)
// ============================================

// BFS explores nodes level by level
// Like ripples in a pond spreading outward
// GUARANTEES the shortest path on unweighted grids

// Time Complexity:  O(V + E)
// Space Complexity: O(V)
// V = number of vertices (nodes)
// E = number of edges (connections)

export function bfs(grid, start, end) {

  // List of nodes visited in order
  // This is what we animate (blue cells)
  const visited = []

  // Queue — First In First Out (FIFO)
  // We process nodes in the order we find them
  const queue = []

  // Get the actual start node object from grid
  const startNode = grid[start.row][start.col]
  const endNode = grid[end.row][end.col]

  // Mark start node as visited and add to queue
  startNode.isVisited = true
  queue.push(startNode)

  // Keep going until queue is empty
  while (queue.length > 0) {

    // Take the FIRST node from the queue (FIFO)
    const currentNode = queue.shift()

    // Skip walls
    if (currentNode.isWall) continue

    // If we reached the end node we are done
    if (currentNode === endNode) break

    // Add current node to visited list
    visited.push(currentNode)

    // Get all valid neighbors of current node
    const neighbors = getNeighbors(currentNode, grid)

    // Process each neighbor
    for (const neighbor of neighbors) {

      // Skip if already visited
      if (neighbor.isVisited) continue

      // Mark as visited so we don't visit again
      neighbor.isVisited = true

      // Remember where we came from
      // This lets us reconstruct the path later
      neighbor.previousNode = currentNode

      // Add to queue to process later
      queue.push(neighbor)
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
// using previousNode links we set during search
function reconstructPath(endNode) {
  const path = []
  let currentNode = endNode

  // Keep going until we reach start node
  // Start node has no previousNode so loop stops
  while (currentNode !== null) {
    path.unshift(currentNode)
    currentNode = currentNode.previousNode
  }

  // If path only contains end node
  // it means no path was found
  if (path.length === 1) return []

  return path
}