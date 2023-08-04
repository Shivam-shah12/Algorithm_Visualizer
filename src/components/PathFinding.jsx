import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PathFindingPage = () => {
  const [rows, setRows] = useState();
  const [cols, setCols] = useState();
  const [algorithm, setAlgorithm] = useState('Dijkstra');
  const [selectedPoints, setSelectedPoints] = useState({ start: null, end: null });
  const [obstacleMode, setObstacleMode] = useState(false);
  const [grid, setGrid] = useState([]);

  const startValue = 1;
  const endValue = 1;
  const obstacleValue = -1;

  useEffect(() => {
    if (rows && cols) {
      // Initialize the grid with all values set to 0 (empty cells)
      const initialGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
      setGrid(initialGrid);
    }
  }, [rows, cols]);

  const handleResetAll=async()=>{
    setRows(0);
    setCols(0);
   setGrid([]);
  }

  const handleProcessClick = async () => {
    // Set obstacleMode to false
    setObstacleMode(false);

    try {
      // Make the API call using Axios
      console.log(grid);
      console.log(algorithm)
      console.log(selectedPoints.start);
      console.log(selectedPoints.end);
      const response = await axios.post(`http://localhost:5000/api/process`, {
        gridArray: grid,
        algorithm,
        startingpoint: selectedPoints.start,
        endingpoint: selectedPoints.end,
      });

      // Handle the response data here
      if (response) {
        // If the response contains a valid 2D array
        const backendGridArray = response.data.data;

        const newGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));

        // Update the newGrid with the values from the backendGridArray
        for (let i = 0; i < backendGridArray.length; i++) {
            for (let j = 0; j < backendGridArray[i].length; j++) {
              const value = backendGridArray[i][j];
              // Do something with the value
              if(value===1)
              {
                newGrid[i][j]=1;
              }
              else{
                newGrid[i][j]=0;
              }
            }
          }
        console.log(backendGridArray);
        // Update the grid state with the newGrid
        console.log(newGrid)
        setGrid(newGrid);
      } else {
        // If the response indicates no valid path, handle accordingly
        console.log('No valid path found.');
        console.log(response.data);
        // You can choose to set the grid back to its initial state or display an error message to the user
        const initialGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
        setGrid(initialGrid);
      }
    } catch (error) {
      // Handle errors here (if needed)
      console.error('Error:', error);
    }
  };

  const handleGridClick = (rowIndex, colIndex) => {
    if (!selectedPoints.start) {
      // If start point is not selected, set it as start point
      setSelectedPoints({ ...selectedPoints, start: { row: rowIndex, col: colIndex }, end: null });

      // Update the grid cell to 1 (black)
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? startValue : cell))
      );
      setGrid(newGrid);
    } else if (!selectedPoints.end) {
      // If end point is not selected, set it as end point
      setSelectedPoints({ ...selectedPoints, end: { row: rowIndex, col: colIndex } });

      // Update the grid cell to 1 (black)
      const newGrid = grid.map((row, rIndex) =>
        row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? endValue : cell))
      );
      setGrid(newGrid);
    } else {
      // If both start and end points are already selected, reset the selection
      setSelectedPoints({ start: null, end: null });
    }
  };

  const handleGridMouseEnter = (rowIndex, colIndex) => {
    if (obstacleMode) {
      if (!selectedPoints.start || (selectedPoints.start.row !== rowIndex || selectedPoints.start.col !== colIndex)) {
        if (!selectedPoints.end || (selectedPoints.end.row !== rowIndex || selectedPoints.end.col !== colIndex)) {
          // Set the cell as an obstacle
          const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? obstacleValue : cell))
          );
          setGrid(newGrid);
        }
      }
    }
  };

  const resetGrid = () => {
    // Reset the grid and remove obstacles (set all values to 0)
    const newGrid = grid.map(row => row.map(cell => (cell === obstacleValue ? 0 : cell)));
    setGrid(newGrid);
  };

  useEffect(() => {
    if (!obstacleMode) {
      resetGrid();
    }
  }, [obstacleMode]);

  return (
    <div className="flex h-screen">
      {/* First Part (60% width) */}
      <div className="flex-1 bg-gray-200">
        {/* Grid */}
        <div className="flex justify-center items-center h-full">
          <div className="grid gap-1 bg-white border-2 border-gray-300" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 border border-gray-500 ${
                    selectedPoints.start?.row === rowIndex && selectedPoints.start?.col === colIndex
                      ? 'bg-black'
                      : selectedPoints.end?.row === rowIndex && selectedPoints.end?.col === colIndex
                      ? 'bg-black'
                      : cell === obstacleValue
                      ? 'bg-yellow-300'
                      : cell === 1
                      ? 'bg-black'
                      : 'bg-white'
                  }`}
                  onClick={() => handleGridClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleGridMouseEnter(rowIndex, colIndex)}
                ></div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Second Part (40% width) */}
      <div className="flex-1 flex-col bg-gray-300">
        <div className="flex flex-col h-full my-8 items-center">
          <div className="w-full mt-4 flex p-4 flex-col " >
          <label htmlFor="row" className="font-bold text-primaryBlack text-xl w-full">
              For Making Grid , You have to select No. of Rows and Columns
            </label>
            <div className='w-3/5 mx-auto flex justify-around my-5'>
            <label htmlFor="row" className="font-bold text-black text-xl w-[150px]">
               Black: 1
            </label>
            <label htmlFor="row" className="font-bold text-black text-xl w-[150px]">
               Yellow: -1
            </label>
            <label htmlFor="row" className="font-bold text-black text-xl w-[150px]">
               white: 0
            </label>
            </div>
            

          </div>
          {/* Input section */}
          <div className="w-3/4 mt-4 flex justify-around items-center">
            <label htmlFor="row" className="font-bold text-black text-2xl w-[150px]">
              Rows :
            </label>
            <input
              type="number"
              name="row"
              className="w-[60%] p-2 border rounded"
              placeholder="Enter number of rows"
              value={rows}
              onChange={e => setRows(parseInt(e.target.value > 15 ? 15 : e.target.value))}
            />
          </div>
          <div className="w-3/4 mt-4 flex justify-around items-center">
            <label htmlFor="col" className="font-bold text-black text-2xl w-[150px]">
              Cols :
            </label>
            <input
              type="number"
              name="col"
              className="w-[60%] p-2 border rounded"
              placeholder="Enter number of columns"
              value={cols}
              onChange={e => setCols(parseInt(e.target.value > 15 ? 15 : e.target.value))}
            />
          </div>
          <hr />

          {/* Algorithm selection */}
          <div className="w-3/4 mt-4 flex justify-around items-center">
            <label htmlFor="algorithm" className="font-bold text-black text-2xl w-[150px]">
              Algorithm:
            </label>
            <select
              name="algorithm"
              className="w-[60%] p-2 border rounded"
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
            >
              <option value="Dijkstra">Dijkstra</option>
            </select>
          </div>

          {/* Obstacle button */}
          <div className="w-3/4 mt-4 flex flex-col items-center">
            <button
              className={`mt-4 p-2 ${obstacleMode ? 'bg-yellow-300' : 'bg-blue-500'} text-white rounded`}
              onClick={() => setObstacleMode(!obstacleMode)}
            >
              {obstacleMode ? 'Obstacle Mode ON' : 'Obstacle Mode OFF'}
            </button>
          </div>

          {/* Selected Points */}
          <div className="w-3/4 mt-4 flex flex-col items-center">
            <div>
              {selectedPoints.start && (
                <p className="font-bold">
                  Start Point: Row {selectedPoints.start.row}, Col {selectedPoints.start.col}
                </p>
              )}
              {selectedPoints.end && (
                <p className="font-bold">
                  End Point: Row {selectedPoints.end.row}, Col {selectedPoints.end.col}
                </p>
              )}
              {!selectedPoints.start && !selectedPoints.end && <p>No points selected.</p>}
            </div>
          </div>

          {/* Process button */}
          {selectedPoints.start && selectedPoints.end && (
            <div className='flex justify-between w-[20%]'>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleProcessClick}>
              Process
            </button>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleResetAll}>
              Reset
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathFindingPage;





