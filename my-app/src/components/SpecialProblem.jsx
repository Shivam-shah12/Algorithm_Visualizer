import React from "react";
import img1 from '../assets/otherProblems.png';

const SpecialProblem = () => {
  return (
    <div className="flex flex-row w-full min-h-screen">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center w-1/2 ">
        <img
          src={img1}
          alt="Image"
          className="w-[70%]  h-[70%] object-contain"
        />
      </div>

      {/* Right side */}
      <div className="flex flex-col justify-center items-center bg-black text-white w-1/2 h-full">
        <h1 className="text-4xl font-bold mb-4">N-Queen Problem</h1>
        <div
          className="bg-black p-4 rounded overflow-y-auto"
          style={{ maxHeight: "calc(100vh)" }}
        >
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari, and Opera */
              .overflow-y-auto::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <pre className="text-white text-sm">
            {`
function isSafe(board, row, col, N) {
  // Check for queens in the same column
  for (let i = 0; i < row; i++) {
    if (board[i][col]) {
      return false;
    }
  }

  // Check for queens in the left diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return false;
    }
  }

  // Check for queens in the right diagonal
  for (let i = row, j = col; i >= 0 && j < N; i--, j++) {
    if (board[i][j]) {
      return false;
    }
  }

  return true;
}

function solveNQueensUtil(board, row, N, result) {
  if (row === N) {
    // Base case: All queens are placed successfully, store the solution
    const solution = board.map((row) => row.slice());
    result.push(solution);
    return;
  }

  for (let col = 0; col < N; col++) {
    if (isSafe(board, row, col, N)) {
      board[row][col] = 1;

      // Recur to place the remaining queens
      solveNQueensUtil(board, row + 1, N, result);

      // Backtrack and remove the queen from the current cell
      board[row][col] = 0;
    }
  }
}

function solveNQueens(n) {
  const board = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const result = [];

  solveNQueensUtil(board, 0, n, result);

  return result;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SpecialProblem;
