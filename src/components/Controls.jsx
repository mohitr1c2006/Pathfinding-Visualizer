import React from 'react'
import '../styles/controls.css'

function Controls({
  algorithm,
  setAlgorithm,
  onRun,
  onPause,
  onResume,
  onReset,
  isRunning,
  isPaused,
}) {
  return (
    <div className="controls-container">

      <div className="controls-group">
        <label className="controls-label">Algorithm</label>
        <select
          className="controls-select"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
        >
          <option value="bfs">Breadth First Search</option>
          <option value="dfs">Depth First Search</option>
          <option value="dijkstra">Dijkstra's Algorithm</option>
          <option value="astar">A* Search</option>
        </select>
      </div>

      <div className="controls-group">
        <button
          className="btn btn-run"
          onClick={onRun}
          disabled={isRunning && !isPaused}
        >
          ▶ Run
        </button>

        {isRunning && !isPaused && (
          <button className="btn btn-pause" onClick={onPause}>
            ⏸ Pause
          </button>
        )}

        {isPaused && (
          <button className="btn btn-resume" onClick={onResume}>
            ⏵ Resume
          </button>
        )}

        <button className="btn btn-reset" onClick={onReset}>
          ↺ Reset
        </button>
      </div>

    </div>
  )
}

export default Controls