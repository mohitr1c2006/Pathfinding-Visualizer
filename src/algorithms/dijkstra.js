// ============================================
// DIJKSTRA'S ALGORITHM
// ============================================

// Dijkstra explores nodes in order of their
// distance from the start node
// Always processes the CLOSEST node first
// GUARANTEES the shortest path

// Time Complexity:  O((V + E) log V)
// Space Complexity: O(V)
// V = number of vertices (nodes)
// E = number of edges (connections)

import PriorityQueue from '../utils/priorityQueue.js'

export function dijkstra(grid, start, end) {

  // List of nodes visited in order
  // This is what we animate (blue cells)
  const visited = []

  // Get actual start and end nodes from grid
  const startNode = grid[start.row][start.col]
  const endNode = grid[end.row][end.col]

  // Set start node distance to 0
  // All other nodes start at Infinity
  startNode.distance = 0

  // Create priority queue and add start node
  // Priority = distance from start
  const pq = new PriorityQueue()
  pq.enqueue(startNode, 0)

  // Keep going until priority queue is empty
  while (!pq.isEmpty()) {

    // Get node with SMALLEST distance first
    const currentNode = pq.dequeue()

    // Skip if already visited
    if (currentNode.isVisited) continue

    // Skip walls
    if (currentNode.isWall) continue

    // If shortest distance is Infinity
    // means we are trapped and cannot reach end
    if (currentNode.distance === Infinity) break

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

      // Skip walls
      if (neighbor.isWall) continue

      // Calculate new distance through current node
      // In our grid all edges have weight of 1
      const newDistance = currentNode.distance + 1

      // If we found a shorter path to neighbor
      // update its distance and previous node
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance
        neighbor.previousNode = currentNode

        // Add neighbor to priority queue
        // with updated distance as priority
        pq.enqueue(neighbor, newDistance)
      }
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