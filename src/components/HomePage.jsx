// src/components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/graph_image.jpg';
import img2 from '../assets/sorting_image.gif';
import img3 from '../assets/otherProblems.png';

const Homepage = () => {
  return (
    // bg-[#A8A196]
    <div className="min-h-screen bg-lightWhite">
      <nav className="bg-primaryBlack p-4">
        <div className="flex justify-center items-center">
          <div className="space-x-12 flex items-center">
            <div>
            <a href="/page1" className="text-white hover:text-[#F31559]">
              Path Finding
            </a>
            </div>
            <div>
            <a href="/page2" className="text-white hover:text-[#F31559]">
              Sorting
            </a>
            </div>
            <div>
            <a href="/page3" className="text-white hover:text-[#F31559]">
              Famous Problem
            </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-semibold mb-4 ">Welcome to Algo_Visualizer!</h1>
        <p className="text-gray-700">
        Algo_Visualizer is an interactive online platform that visualizes algorithms from code.
                    Currently these include Sorting, Pathfind  Algorithms like Dijiktra.
                    More Algorithms will be coming soon!!
        </p>
      </main>

      <div className="flex flex-col items-center justify-center mt-16 bg-gray-100">
      <div className="container mx-auto w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Box 1 */}
          <Link to="/page1" className="flex flex-col items-center justify-center bg-gray-200 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div
              style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              className="w-full h-56 rounded-lg mb-4"
            >
              <div className="flex flex-col items-center justify-center w-full h-full bg-transparent">
              </div>
            </div>
            <button className="mt-4 w-full bg-[#F31559] text-white py-2 px-4 rounded">Shortest Path Finder</button>

          </Link>
          {/* Box 2 */}
          <Link to="/page2" className="flex flex-col items-center justify-center bg-gray-200 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div
              style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              className="w-full h-56 rounded-lg mb-4"
            >
              <div className="flex flex-col items-center justify-center w-full h-full bg-transparent">
               
              </div>
            </div>
            <button className="mt-4 w-full bg-[#F31559] text-white py-2 px-4 rounded">Sorting</button>
          </Link>
          {/* Box 3 */}
          <Link to="/page3" className="flex flex-col items-center justify-center bg-gray-200 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div
              style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              className="w-full h-56 rounded-lg mb-4"
            >
              <div className="flex flex-col items-center justify-center w-full h-full bg-transparent">
              </div>
            </div>
            <button className="mt-4 w-full bg-[#F31559]  text-white py-2 px-4 rounded">Special Problem</button>
          </Link>
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default Homepage;
