import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage.jsx'
import { Routes,Route } from 'react-router-dom';
import PathFinding from './components/PathFinding';
import Sorting from './components/Sorting.jsx';
import SpecialProblem from './components/SpecialProblem.jsx';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/page1" element={<PathFinding/>}/>
        <Route path="/page2" element={<Sorting/>}/>
        <Route path="/page3" element={<SpecialProblem/>}/>
       </Routes>
    </div>
  );
}

export default App;
