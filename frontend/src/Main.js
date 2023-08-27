import Navbar from "./Navbar";
import './Main.css';
import { useState, useEffect } from 'react';


function Main () {

    const [subject, setSubject] = useState("CPSC");
    const [number, setNumber] = useState(103);
    const [courseCode, setCourseCode] = useState("");

    const mathNumbers = [
        {label: 100, value: 100},
        {label: 101, value: 101},
    ]

    const cpscNumbers = [
        {label: 110, value: 110},
        {label: 330, value: 330},
    ]

    const statNumbers = [
        {label: 200, value: 200},
        {label: 201, value: 201},
    ]

    function returnArray(s) {
        switch (s) {
            case "CPSC":
                return cpscNumbers;
            case "MATH":
                return mathNumbers;
            case "STAT":
                return statNumbers;
        }
    }

    function handleSubject(e) {
        setSubject(e.target.value);
        setNumber(returnArray(e.target.value)[0].value);
    }
    
    function handleNumber(e) {
        setNumber(e.target.value);
    }

    function handleSubmit(e) {
        const code = subject + " " + number;
        setCourseCode(code);
        window.location.replace("/result");
    }

    useEffect(() => {
        window.localStorage.setItem('COURSE-CODE', courseCode)
    }, [courseCode])

    return (
        <>
            <Navbar />
            <h1 id='course-selection'>Course Selection</h1>
            <h2 id='subject'>Search for Subject</h2>
            <div id="selection">
                <div className="select-course">
                    <label id='select-label'>
                        Select Course Code
                        <select value={subject} onChange={handleSubject}>
                            <option value="CPSC">CPSC</option>
                            <option value="MATH">MATH</option>
                            <option value="STAT">STAT</option>
                        </select>
                    </label>
                </div>

                <div className="select-number">
                    <label id='select-label'>
                        Select Course Number
                        <select value={number} onChange={handleNumber}>
                            
                            {returnArray(subject).map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
        
                        </select>
                    </label>
                </div>
            </div>

            <div className ="search-btn">
                 <button id='search' onClick={handleSubmit}>Search Database</button>
            </div>

            
        </>
    );
}

export default Main;