import Navbar from "./Navbar";
import { useState, useEffect } from 'react';


function Result () {

    const [courseCode, setCourseCode] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const data = window.localStorage.getItem('COURSE-CODE');
        if ( data !== null ) setCourseCode(data)
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem('USERNAME');
        if ( data !== null ) setUsername(data)
    }, [])

    return (
        <>
            <Navbar />
            <h1>Result Page</h1>
            <h2>Showing notes for {courseCode}</h2>
        </>
    );
}

export default Result;