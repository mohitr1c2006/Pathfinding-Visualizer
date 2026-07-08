# 🔍 Pathfinding Visualizer

An interactive **Pathfinding Algorithm Visualizer** built with **React** and **Vite**. Visualize how different graph search algorithms explore a grid and find the shortest path in real time.

---

## 🌐 Live Demo

🚀 **Try it here:**  
https://pathfinding-visualizer-xi-wine.vercel.app/

---

## ✨ Features

- 🟢 Interactive **20×20 grid**
- 🖱️ Click or drag to draw/erase walls
- ▶️ Play, Pause, Resume, and Reset animations
- 📊 Live statistics
  - Nodes visited
  - Path length
  - Execution time
- 🎨 Color-coded visualization
- 📖 Algorithm information panel
- ⚡ Four pathfinding algorithms implemented from scratch

---

## 🧠 Algorithms Implemented

| Algorithm | Shortest Path | Data Structure | Time Complexity |
|------------|---------------|----------------|-----------------|
| Breadth First Search (BFS) | ✅ | Queue | O(V + E) |
| Depth First Search (DFS) | ❌ | Stack | O(V + E) |
| Dijkstra's Algorithm | ✅ | Priority Queue | O((V + E) log V) |
| A* Search | ✅ | Priority Queue + Heuristic | O((V + E) log V) |

**A* Heuristic**

```text
h = |x1 - x2| + |y1 - y2|
```

Uses **Manhattan Distance**.

---

## 🎨 Color Legend

| Color | Meaning |
|--------|---------|
| 🟢 Green | Start Node |
| 🔴 Red | End Node |
| ⬛ Black | Wall |
| ⬜ White | Empty Cell |
| 🔵 Blue | Visited Node |
| 🟡 Yellow | Frontier |
| 🟣 Purple | Final Path |

---

## 🛠️ Tech Stack

- React 18
- Vite
- JavaScript (ES6+)
- CSS3
- HTML5

### React Concepts

- useState
- useEffect
- useRef
- useCallback

### Data Structures

- 2D Array
- Queue
- Stack
- Min Heap Priority Queue

---

## 📁 Project Structure

```text
src/
├── algorithms/
│   ├── bfs.js
│   ├── dfs.js
│   ├── dijkstra.js
│   └── astar.js
│
├── components/
│   ├── Cell.jsx
│   ├── Controls.jsx
│   ├── Grid.jsx
│   ├── Legend.jsx
│   └── StatsPanel.jsx
│
├── styles/
│   ├── app.css
│   ├── controls.css
│   └── grid.css
│
├── utils/
│   ├── gridHelpers.js
│   ├── heuristics.js
│   └── priorityQueue.js
│
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/mohitr1c2006/Pathfinding-Visualizer.git
```

### Navigate into the project

```bash
cd Pathfinding-Visualizer
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🎮 How to Use

1. Draw walls by clicking or dragging.
2. Select a pathfinding algorithm.
3. Click **Run**.
4. Pause or resume the animation.
5. Reset the grid whenever needed.

---

## 📚 What I Learned

- Graph traversal algorithms
- BFS, DFS, Dijkstra, and A*
- Priority Queue (Min Heap) implementation
- Manhattan Distance heuristic
- React Hooks
- Component-based architecture
- Immutable state updates
- CSS animations

---

## 🔮 Future Improvements

- [ ] Maze generation
- [ ] Weighted cells
- [ ] Mobile responsiveness

---

## 👨‍💻 Author

**Mohit Raghuwanshi**

GitHub: https://github.com/mohitr1c2006

---
