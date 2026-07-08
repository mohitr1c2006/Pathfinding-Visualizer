// ============================================
// A* SEARCH ALGORITHM
// ============================================

// A* is like Dijkstra but SMARTER
// It uses a heuristic (estimate) to guide
// the search toward the end node
// Instead of exploring in all directions equally
// it focuses on the most promising direction

// Formula:
// fScore = gScore + heuristic
// gScore  = actual cost from start to current node
// heuristic = estimated cost from current to end (Manhattan Distance)
// fScore  = total estimated cost of path through current node

// GUARANTEES shortest path if heuristic never overestimates
// Manhattan Distance never overestimates on a grid = admissible

// Time Complexity:  O((V + E) log V)
// Space Complexity: O(V)
// V = number of vertices (nodes)
// E = number of edges (connections)

import PriorityQueue from '../utils/priorityQueue.js'
import { manhattanDistance } from '../utils/heuristics.js'

export function astar(grid, start, end) {

  // List of nodes visited in order
  // This is what we animate (blue cells)
  const visited = []

  // Get actual start and end nodes from grid
  const startNode = grid[start.row][start.col]
  const endNode = grid[end.row][end.col]

  // Set start node scores
  // gScore = 0 because we are already here
  // fScore = 0 + heuristic from start to end
  startNode.gScore = 0
  startNode.fScore = manhattanDistance(startNode, endNode)

  // Create priority queue and add start node
  // Priority = fScore (lowest fScore processed first)
  const pq = new PriorityQueue()
  pq.enqueue(startNode, startNode.fScore)

  // Keep going until priority queue is empty
  while (!pq.isEmpty()) {

    // Get node with LOWEST fScore first
    const currentNode = pq.dequeue()

    // Skip if already visited
    if (currentNode.isVisited) continue

    // Skip walls
    if (currentNode.isWall) continue

    // If fScore is Infinity we are trapped
    if (currentNode.fScore === Infinity) break

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

      // Calculate gScore through current node
      // All edges in our grid have weight 1
      const tentativeGScore = currentNode.gScore + 1

      // If we found a better path to this neighbor
      if (tentativeGScore < neighbor.gScore) {

        // Update neighbor scores
        neighbor.gScore = tentativeGScore
        neighbor.fScore = tentativeGScore + manhattanDistance(neighbor, endNode)

        // Remember where we came from
        neighbor.previousNode = currentNode

        // Add to priority queue with fScore as priority
        pq.enqueue(neighbor, neighbor.fScore)
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