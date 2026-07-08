# 🔍 Pathfinding Visualizer

An interactive pathfinding algorithm visualizer built with **React** and **Vite**.
Watch BFS, DFS, Dijkstra, and A* algorithms come to life on a 20×20 grid in real time.

---

## 🌐 Live Demo
👉 [Click here to try it live](https://pathfinding-visualizer-xi-wine.vercel.app/) 

---

## 📸 Preview

> Draw walls, pick an algorithm, hit Run and watch it go!

---

## ✨ Features

- 🟢 **Interactive 20×20 grid** — click or drag to draw/erase walls
- ▶️ **Play, Pause, Resume, Reset** animation controls
- 📊 **Live statistics** — nodes visited, path length, execution time
- 🎨 **Color-coded visualization** — visited nodes, frontier, final path
- 📖 **Algorithm info panel** — time/space complexity for each algorithm
- ⚡ **4 algorithms** implemented from scratch in vanilla JavaScript

---

## 🧠 Algorithms

| Algorithm | Shortest Path | Data Structure | Time Complexity |
|---|---|---|---|
| Breadth First Search (BFS) | ✅ Yes (unweighted) | Queue | O(V + E) |
| Depth First Search (DFS) | ❌ No | Stack | O(V + E) |
| Dijkstra's Algorithm | ✅ Yes (weighted) | Priority Queue | O((V + E) log V) |
| A* Search | ✅ Yes (weighted) | Priority Queue + Heuristic | O((V + E) log V) |

> A* uses **Manhattan Distance** as its heuristic:
> `h = |x1 - x2| + |y1 - y2|`

---

## 🎨 Color Legend

| Color | Meaning |
|---|---|
| 🟢 Green | Start Node |
| 🔴 Red | End Node |
| ⬛ Dark | Wall |
| ⬜ White | Empty Cell |
| 🔵 Blue | Visited Node |
| 🟡 Yellow | Frontier Node |
| 🟣 Purple | Final Path |

---

## 🛠️ Tech Stack

- **React 18** — function components, hooks
- **Vite** — fast dev server and build tool
- **JavaScript ES6+** — all algorithm logic
- **CSS3** — animations, flexbox layout
- **HTML5** — single page app

### React Concepts Used
- `useState` — managing grid, algorithm, stats state
- `useRef` — storing animation timer without re-renders
- `useEffect` — cleanup on unmount
- `useCallback` — optimizing mouse drag handlers

### Data Structures Used
- 2D Array — grid representation
- Queue — BFS
- Stack — DFS
- Min Heap Priority Queue — Dijkstra and A*

---

## 📁 Project Structure
```text
src/
├── algorithms/
│   ├── bfs.js
│   ├── dfs.js
│   ├── dijkstra.js
│   └── astar.js
├── components/
│   ├── Grid.jsx
│   ├── Cell.jsx
│   ├── Controls.jsx
│   ├── StatsPanel.jsx
│   └── Legend.jsx
├── utils/
│   ├── gridHelpers.js
│   ├── priorityQueue.js
│   └── heuristics.js
├── styles/
│   ├── app.css
│   ├── grid.css
│   └── controls.css
├── App.jsx
└── main.jsx

---

## 🎮 How to Use

1. **Draw walls** — click or drag on the grid
2. **Select algorithm** — use the dropdown menu
3. **Run** — click the Run button to start visualization
4. **Pause/Resume** — pause mid-animation and resume anytime
5. **Reset** — clear everything and start fresh

---

## 📚 What I Learned

- Implementing BFS, DFS, Dijkstra and A* from scratch
- How priority queues (min heaps) work internally
- Manhattan distance heuristic and why A* is faster than Dijkstra
- React state management with useState, useRef, useEffect
- Immutable state updates with array spread operator
- CSS animations and keyframes for smooth visual effects
- Clean component architecture with prop-based data flow

---

## 🔮 Future Improvements

- [ ] Add maze generation algorithms
- [ ] Add diagonal movement support
- [ ] Add animation speed control
- [ ] Add weighted cells
- [ ] Make it mobile responsive

---

## 👨‍💻 Author

**Mohit**
- GitHub: [@mohitr1c2006](https://github.com/mohitr1c2006)

---
