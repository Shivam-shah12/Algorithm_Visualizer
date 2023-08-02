import React, { useState, useEffect } from "react";
import './styles/Sorting.css';
import { motion } from "framer-motion";
import selectionSort from "./algorithms/SelectionSort";
import mergeSort from "./algorithms/MergeSort";
import quickSort from "./algorithms/QuickSort";
import { NavLink } from "react-router-dom";

const springAnim = {
    type: "spring",
    damping: 20,
    stiffness: 300
};

const Sorting = () => {
    const [arr, setArr] = useState([]);
    const [method, setMethod] = useState("Algorithms");
    const [length, setLength] = useState(0);
    const [compare, setCompare] = useState({ i: null, j: null });
    const [sorted, setSorted] = useState([]);
    const [speed, setSpeed] = useState(100);
  

    const createArray = (e = Math.floor(window.innerWidth / 50) / 2) => {
        let newArr = [];
        for (let i = 0; i < e; i++) {
            newArr.push({
                value: Math.floor(Math.random() * ((window.innerHeight / 4) - 30 + 1)) + 30,
                id: "id-" + i
            });
        }
        setArr(newArr);
        setLength(e);
        setSorted([]);
        setCompare({});
    };

    const changeArray = (e) => {
        if(e.target.value<0)
        {
            const value=0;
            createArray(value);
            setLength(value);
        }
        else if(e.target.value>28)
        {
            const value=30;
            createArray(value);
            setLength(value);
        }
        else
        {createArray(e.target.value);
        setLength(e.target.value)}
    };

    useEffect(() => {
        createArray();
        window.addEventListener("resize", () => {
            createArray();
        });

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    const randomize = () => {
        createArray(length);
    };

    const sortFunc = (e) => {
        e.preventDefault();
        var results = [];
        document.getElementById('error').style.display = "none";
        if (method === "Algorithms") {
            document.getElementById('error').style.display = "block";
        } else {
            if (method === "Selection Sort")
                results = selectionSort(arr, length);
            else if (method === "Merge Sort")
                results = mergeSort(arr, length);
            else if (method === "Quick Sort")
                results = quickSort(arr, length);

            for (let i = 0; i < results.length; i++) {
                setTimeout(() => {
                    setArr(results[i]);
                }, speed * i);
            }
        }
    };

    const changeSpeed = (e) => {
        if(e.target.value<0)
        {
            const value=100;
            setSpeed(value);
        }
        else if(e.target.value>1000)
        {
            const value=1000;
            setSpeed(value)
        }
        else
        setSpeed( e.target.value);
    };

    const algorithmOptions = [
        { label: "Selection Sort", value: "Selection Sort" },
        { label: "Merge Sort", value: "Merge Sort" },
        { label: "Quick Sort", value: "Quick Sort" },
    ];


    return (
        <div className="w-full flex flex-col h-full bg-primaryBlack" >
            <nav className="bg-primaryBlack w-full flex py-2 text-white items-center">
                <div className=" w-full flex items-center" id="navbarSupportedContent">
                    <ul className="navbar-nav flex items-center">
                    
                    <li className="mx-4 px-8 py-2">
                    <select
                    id="algorithmSelect"
                    className="bg-white text-black p-2 rounded shadow"
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option value="Algorithms">Choose an algorithm</option>
                    {algorithmOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                    </li>
                    <li >
                        <div className="flex " aria-labelledby="navbarDropdown">
                            <li className="ml-3 ">
                                <input onChange={changeArray} type="number" value={length} placeholder="Enter size"   className="px-8 py-2 text-black rounded-md" id="changeSize" />
                            </li>
                            <li className="ml-3 ">
                                <input onChange={changeSpeed} type="number" value={speed} placeholder="Enter speed"  defaultValue={500} id="changeSize" className="px-8 py-2 text-black rounded-md"  />
                            </li>
                        </div>
                    </li>
                    <div id="error" className="alert alert-danger" style={{ marginLeft: "10px", display: "none" }} role="alert">
                        Select an algorithm first!
                    </div>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <button className=" my-2 my-sm-0 border-white border-2 rounded-md px-8 py-2 mx-6" type="submit" onClick={sortFunc}>Sort</button>
                    </form>
                </div>
            </nav>
            <div className="bars" id="bars" style={{ margin: "20px" }}>
                {arr.map((element, index) =>
                    <motion.div
                        key={element.id}
                        layout transition={springAnim}
                        className={`bar ${element.style}`}
                        id={element.id}
                        style={{ height: element.value * 3, order: index }}
                    >
                        {element.value}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Sorting;
