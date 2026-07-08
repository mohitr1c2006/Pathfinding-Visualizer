// ============================================
// PRIORITY QUEUE (MIN HEAP)
// ============================================

// A Priority Queue always gives you the item
// with the LOWEST priority value first
// Used by Dijkstra and A* to always process
// the most promising node next

class PriorityQueue {

  constructor() {
    // Internal array that stores all items
    this.heap = []
  }

  // ---- Check if queue is empty ----
  isEmpty() {
    return this.heap.length === 0
  }

  // ---- Add a new item to the queue ----
  enqueue(node, priority) {
    // Push new item to end of heap
    this.heap.push({ node, priority })

    // Move it up to its correct position
    this.bubbleUp()
  }

  // ---- Remove and return the item with lowest priority ----
  dequeue() {
    // The item with lowest priority is always at index 0
    const min = this.heap[0]

    // Move last item to front
    const last = this.heap.pop()

    // If heap is not empty put last item at front
    // and move it down to correct position
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.bubbleDown()
    }

    return min.node
  }

  // ---- Move newly added item UP to correct position ----
  bubbleUp() {
    let index = this.heap.length - 1

    while (index > 0) {
      // Find parent index
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]
      const current = this.heap[index]

      // If parent priority is smaller or equal we are done
      if (parent.priority <= current.priority) break

      // Swap parent and current
      this.heap[parentIndex] = current
      this.heap[index] = parent

      // Move up to parent index
      index = parentIndex
    }
  }

  // ---- Move item at front DOWN to correct position ----
  bubbleDown() {
    let index = 0
    const length = this.heap.length

    while (true) {
      // Find left and right child indexes
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2
      let smallest = index

      // Check if left child is smaller
      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildIndex
      }

      // Check if right child is smaller
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildIndex
      }

      // If smallest is still current index we are done
      if (smallest === index) break

      // Swap current with smallest child
      const temp = this.heap[smallest]
      this.heap[smallest] = this.heap[index]
      this.heap[index] = temp

      // Move down to smallest child index
      index = smallest
    }
  }
}

export default PriorityQueue