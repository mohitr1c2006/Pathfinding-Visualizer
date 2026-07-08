import React from 'react'

function StatsPanel({ algorithm, stats }) {

  // Safety check — if stats is not passed yet show zeros
  const safeStats = stats || {
    nodesVisited: 0,
    pathLength: 0,
    executionTime: 0,
    totalSteps: 0,
  }

  function getAlgorithmName() {
    if (algorithm === 'bfs') return 'Breadth First Search'
    if (algorithm === 'dfs') return 'Depth First Search'
    if (algorithm === 'dijkstra') return "Dijkstra's Algorithm"
    if (algorithm === 'astar') return 'A* Search'
    return algorithm
  }

  function getComplexity() {
    if (algorithm === 'bfs') return {
      time: 'O(V + E)',
      space: 'O(V)',
      description: 'Guarantees shortest path. Explores level by level.',
    }
    if (algorithm === 'dfs') return {
      time: 'O(V + E)',
      space: 'O(V)',
      description: 'Does not guarantee shortest path. Goes deep first.',
    }
    if (algorithm === 'dijkstra') return {
      time: 'O((V + E) log V)',
      space: 'O(V)',
      description: 'Guarantees shortest path. Uses priority queue.',
    }
    if (algorithm === 'astar') return {
      time: 'O((V + E) log V)',
      space: 'O(V)',
      description: 'Fastest. Uses heuristic to guide search toward goal.',
    }
    return { time: '-', space: '-', description: '-' }
  }

  const complexity = getComplexity()

  return (
    <div className="stats-panel">
      <h2 className="stats-title">Statistics</h2>

      <div className="stats-row">
        <span className="stats-label">Algorithm</span>
        <span className="stats-value">{getAlgorithmName()}</span>
      </div>

      <div className="stats-row">
        <span className="stats-label">Nodes Visited</span>
        <span className="stats-value">{safeStats.nodesVisited}</span>
      </div>

      <div className="stats-row">
        <span className="stats-label">Path Length</span>
        <span className="stats-value">{safeStats.pathLength}</span>
      </div>

      <div className="stats-row">
        <span className="stats-label">Execution Time</span>
        <span className="stats-value">{safeStats.executionTime} ms</span>
      </div>

      <div className="stats-row">
        <span className="stats-label">Total Steps</span>
        <span className="stats-value">{safeStats.totalSteps}</span>
      </div>

      <hr className="stats-divider" />

      <h3 className="stats-subtitle">Complexity</h3>

      <div className="stats-row">
        <span className="stats-label">Time</span>
        <span className="stats-value stats-complexity">{complexity.time}</span>
      </div>

      <div className="stats-row">
        <span className="stats-label">Space</span>
        <span className="stats-value stats-complexity">{complexity.space}</span>
      </div>

      <hr className="stats-divider" />

      <h3 className="stats-subtitle">About</h3>
      <p className="stats-description">{complexity.description}</p>
    </div>
  )
}

export default StatsPanel