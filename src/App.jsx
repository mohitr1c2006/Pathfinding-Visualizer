import React, { useState, useCallback, useRef, useEffect } from 'react'
import Grid from './components/Grid.jsx'
import Controls from './components/Controls.jsx'
import StatsPanel from './components/StatsPanel.jsx'
import Legend from './components/Legend.jsx'
import { createInitialGrid, toggleWall, clearVisitedAndPath } from './utils/gridHelpers.js'
import { bfs } from './algorithms/bfs.js'
import { dfs } from './algorithms/dfs.js'
import { dijkstra } from './algorithms/dijkstra.js'
import { astar } from './algorithms/astar.js'

// Fixed start and end positions
const START = { row: 10, col: 3 }
const END = { row: 10, col: 16 }

function App() {

  // ============================================
  // STATE
  // ============================================

  // The 2D grid array
  const [grid, setGrid] = useState(() => createInitialGrid(START, END))

  // Is mouse button held down (for drag to draw walls)
  const [mouseDown, setMouseDown] = useState(false)

  // Which algorithm is selected in dropdown
  const [algorithm, setAlgorithm] = useState('bfs')

  // Stats shown in StatsPanel
  const [stats, setStats] = useState({
    nodesVisited: 0,
    pathLength: 0,
    executionTime: 0,
    totalSteps: 0,
  })

  // Is animation currently running
  const [isRunning, setIsRunning] = useState(false)

  // Is animation currently paused
  const [isPaused, setIsPaused] = useState(false)

  // ============================================
  // REFS
  // ============================================

  // Stores the setInterval ID so we can clear it anytime
  const timerRef = useRef(null)

  // Stores current step index in animation
  const stepIndexRef = useRef(0)

  // Stores all animation steps (visited + path nodes)
  const allStepsRef = useRef([])

  // ============================================
  // EFFECT — cleanup timer when app unmounts
  // ============================================

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  // ============================================
  // ANIMATION FUNCTIONS
  // ============================================

  // Paint one cell at a time on the grid
  function playFromStep(startIndex) {
    clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      const index = stepIndexRef.current

      // If we have gone through all steps stop the animation
      if (index >= allStepsRef.current.length) {
        clearInterval(timerRef.current)
        setIsRunning(false)
        setIsPaused(false)
        return
      }

      const step = allStepsRef.current[index]

      // Update that one cell in the grid
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })))
        newGrid[step.row][step.col].state = step.state
        return newGrid
      })

      // Move to next step
      stepIndexRef.current = index + 1

    }, 30)
  }

  // Start playing animation
  function play(visited, path) {
    // Combine visited steps and path steps together
    const visitedSteps = visited.map(node => ({
      row: node.row,
      col: node.col,
      state: 'visited'
    }))

    const pathSteps = path.map(node => ({
      row: node.row,
      col: node.col,
      state: 'path'
    }))

    allStepsRef.current = [...visitedSteps, ...pathSteps]
    stepIndexRef.current = 0

    setIsRunning(true)
    setIsPaused(false)
    playFromStep(0)
  }

  // Pause animation
  function pause() {
    clearInterval(timerRef.current)
    setIsRunning(false)
    setIsPaused(true)
  }

  // Resume animation from where it paused
  function resume() {
    if (!isPaused) return
    setIsRunning(true)
    setIsPaused(false)
    playFromStep(stepIndexRef.current)
  }

  // Reset everything
  function resetAll() {
    clearInterval(timerRef.current)
    stepIndexRef.current = 0
    allStepsRef.current = []
    setIsRunning(false)
    setIsPaused(false)
    setGrid(createInitialGrid(START, END))
    setStats({
      nodesVisited: 0,
      pathLength: 0,
      executionTime: 0,
      totalSteps: 0,
    })
  }

  // ============================================
  // MOUSE HANDLERS
  // ============================================

  const handleMouseDown = useCallback((row, col) => {
    if (isRunning) return
    const newGrid = toggleWall(grid, row, col, START, END)
    setGrid(newGrid)
    setMouseDown(true)
  }, [grid, isRunning])

  const handleMouseEnter = useCallback((row, col) => {
    if (!mouseDown || isRunning) return
    const newGrid = toggleWall(grid, row, col, START, END)
    setGrid(newGrid)
  }, [grid, mouseDown, isRunning])

  const handleMouseUp = useCallback(() => {
    setMouseDown(false)
  }, [])

  // ============================================
  // RUN ALGORITHM
  // ============================================

  function runAlgorithm() {
    if (isRunning) return

    // Clear previous animation colors but keep walls
    const cleanGrid = clearVisitedAndPath(grid)
    setGrid(cleanGrid)

    // Measure how long algorithm takes
    const startTime = performance.now()

    let result
    if (algorithm === 'bfs') result = bfs(cleanGrid, START, END)
    if (algorithm === 'dfs') result = dfs(cleanGrid, START, END)
    if (algorithm === 'dijkstra') result = dijkstra(cleanGrid, START, END)
    if (algorithm === 'astar') result = astar(cleanGrid, START, END)

    const endTime = performance.now()

    // Update stats panel
    setStats({
      nodesVisited: result.visited.length,
      pathLength: result.path.length,
      executionTime: (endTime - startTime).toFixed(2),
      totalSteps: result.visited.length + result.path.length,
    })

    // Start animation
    play(result.visited, result.path)
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app-container">
      <h1 className="app-title">Pathfinding Visualizer</h1>

      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        onRun={runAlgorithm}
        onPause={pause}
        onResume={resume}
        onReset={resetAll}
        isRunning={isRunning}
        isPaused={isPaused}
      />

      <div className="app-body">
        <Grid
          grid={grid}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
        <div className="app-sidebar">
          <StatsPanel algorithm={algorithm} stats={stats} />
          <Legend />
        </div>
      </div>
    </div>
  )
}

export default App