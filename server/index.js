const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // You can change this to your desired port number

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

// Helper function to get neighbors of a cell
// const getNeighbors = (grid, row, col) => {
//   const neighbors = [];
//   if (row > 0 && grid[row - 1][col] !== -1) neighbors.push({ row: row - 1, col });
//   if (row < grid.length - 1 && grid[row + 1][col] !== -1) neighbors.push({ row: row + 1, col });
//   if (col > 0 && grid[row][col - 1] !== -1) neighbors.push({ row, col: col - 1 });
//   if (col < grid[0].length - 1 && grid[row][col + 1] !== -1) neighbors.push({ row, col: col + 1 });
//   return neighbors;
// };

// // Dijkstra's algorithm implementation to find shortest path between start and end points
// const dijkstra = (grid, start, end) => {
//   const rows = grid.length;
//   const cols = grid[0].length;
//   const dist = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Infinity));
//   const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
//   const prev = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));

//   const startRow = start.row;
//   const startCol = start.col;
//   const endRow = end.row;
//   const endCol = end.col;

//   dist[startRow][startCol] = 0;

//   const queue = [{ row: startRow, col: startCol }];

//   while (queue.length > 0) {
//     queue.sort((a, b) => dist[a.row][a.col] - dist[b.row][b.col]);
//     const current = queue.shift();
//     if (visited[current.row][current.col]) continue;
//     visited[current.row][current.col] = true;

//     if (current.row === endRow && current.col === endCol) break;

//     const neighbors = getNeighbors(grid, current.row, current.col);
//     for (const neighbor of neighbors) {
//       const { row, col } = neighbor;
//       const altDist = dist[current.row][current.col] + 1; // Assuming each step has a cost of 1 (you can change this if needed)
//       if (altDist < dist[row][col]) {
//         dist[row][col] = altDist;
//         prev[row][col] = current;
//         queue.push({ row, col });
//       }
//     }
//   }

//   // Reconstruct the path
//   const path = [];
//   let current = { row: endRow, col: endCol };
//   while (current) {
//     path.unshift(current);
//     current = prev[current.row][current.col];
//   }

//   return path;
// };
// function dijkstra(grid, start, end) {
//     const numRows = grid.length;
//     const numCols = grid[0].length;
//     const distances = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => Infinity));
//     const visited = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false));
//     const pq = new PriorityQueue();
  
//     const isValidCell = (row, col) => {
//       return row >= 0 && row < numRows && col >= 0 && col < numCols;
//     };
  
//     distances[start.row][start.col] = 0;
//     pq.enqueue(start, 0);
  
//     while (!pq.isEmpty()) {
//       const { element: current } = pq.dequeue();
  
//       if (visited[current.row][current.col]) continue;
//       visited[current.row][current.col] = true;
  
//       // Define possible directions including diagonal neighbors
//       const directions = [
//         { row: -1, col: 0 }, // Up
//         { row: 1, col: 0 }, // Down
//         { row: 0, col: -1 }, // Left
//         { row: 0, col: 1 }, // Right
//         { row: -1, col: -1 }, // Diagonal: Top-Left
//         { row: -1, col: 1 }, // Diagonal: Top-Right
//         { row: 1, col: -1 }, // Diagonal: Bottom-Left
//         { row: 1, col: 1 }, // Diagonal: Bottom-Right
//       ];
  
//       for (const direction of directions) {
//         const newRow = current.row + direction.row;
//         const newCol = current.col + direction.col;
  
//         if (!isValidCell(newRow, newCol) || visited[newRow][newCol]) continue;
  
//         const newDistance = distances[current.row][current.col] + Math.abs(grid[newRow][newCol] - grid[current.row][current.col]);
  
//         if (newDistance < distances[newRow][newCol]) {
//           distances[newRow][newCol] = newDistance;
//           pq.enqueue({ row: newRow, col: newCol }, newDistance);
//         }
//       }
//     }
  
//     return distances[end.row][end.col];
//   }

const getNeighbors = (grid, row, col) => {
    const neighbors = [];
    const numRows = grid.length;
    const numCols = grid[0].length;
  
    // Define possible directions including diagonal neighbors
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }, // Right
      { row: -1, col: -1 }, // Diagonal: Top-Left
      { row: -1, col: 1 }, // Diagonal: Top-Right
      { row: 1, col: -1 }, // Diagonal: Bottom-Left
      { row: 1, col: 1 }, // Diagonal: Bottom-Right
    ];
  
    for (const direction of directions) {
      const newRow = row + direction.row;
      const newCol = col + direction.col;
  
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && grid[newRow][newCol] !== -1) {
        neighbors.push({ row: newRow, col: newCol });
      }
    }
  
    return neighbors;
  };
  
  // Dijkstra's algorithm implementation to find shortest path between start and end points
  const dijkstra = (grid, start, end) => {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const dist = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => Infinity));
    const visited = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false));
    const prev = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => null));
  
    const startRow = start.row;
    const startCol = start.col;
    const endRow = end.row;
    const endCol = end.col;
  
    dist[startRow][startCol] = 0;
  
    const queue = [{ row: startRow, col: startCol }];
  
    while (queue.length > 0) {
      queue.sort((a, b) => dist[a.row][a.col] - dist[b.row][b.col]);
      const current = queue.shift();
      if (visited[current.row][current.col]) continue;
      visited[current.row][current.col] = true;
  
      if (current.row === endRow && current.col === endCol) break;
  
      const neighbors = getNeighbors(grid, current.row, current.col);
      for (const neighbor of neighbors) {
        const { row, col } = neighbor;
        const altDist = dist[current.row][current.col] + Math.abs(grid[row][col] - grid[current.row][current.col]); // Assuming each step has a cost equal to the absolute difference of cell values
        if (altDist < dist[row][col]) {
          dist[row][col] = altDist;
          prev[row][col] = current;
          queue.push({ row, col });
        }
      }
    }
  
    // Reconstruct the path
    const path = [];
    let current = { row: endRow, col: endCol };
    while (current) {
      path.unshift(current);
      current = prev[current.row][current.col];
    }
  
    return path;
  };
  


// POST endpoint to handle the grid processing
app.post('/api/process', (req, res) => {
  // Get the grid, algorithm, start, and end points from the request body
  const { gridArray, algorithm, startingpoint, endingpoint } = req.body;

  // Process the grid using the selected algorithm
  let processedData;
  if (algorithm === 'Dijkstra') {
    const start = startingpoint;
    const end = endingpoint;
    const path = dijkstra(gridArray, start, end);
    if (path.length === 0) {
      // No path found, set all indexes to -1
      processedData = gridArray.map(row => row.map(cell => (cell === -1 ? -1 : 0)));
      console.log(processedData)
    } else {
      // Path found, symbolize the path with 1 and other boxes with 0
      processedData = gridArray.map((row, rowIndex) => row.map((cell, colIndex) => (path.find(p => p.row === rowIndex && p.col === colIndex) ? 1 : 0)));
      console.log(processedData)
      console.log("arre yarr");
    }
  } 
  else {
    // Handle other algorithms here (add their implementations similar to Dijkstra's)
    processedData = gridArray.map(row => row.map(cell => 0)); // Default to all 0 if algorithm is not specified or not implemented
  }

  res.json({ message: 'Success', data: processedData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
